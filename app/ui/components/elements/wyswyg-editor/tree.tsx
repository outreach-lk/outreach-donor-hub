import { Dispatch, RefObject, SetStateAction } from "react";
import { BlockAlignment, BlockType, SerializableBlock } from ".";
import { EditorBlock } from "./editor-block";
import { v4 as uuidv4 } from "uuid";

export class EditorTree {
    root: null | EditorBlock;
    last: null | EditorBlock;
    ref: RefObject<HTMLDivElement>;
    menu: RefObject<HTMLDivElement>;
    serializableBlocks: SerializableBlock[] = [];
    id: string;
    dispatchSetCurrBlock: Dispatch<SetStateAction<EditorBlock|null>>;
    static createFromMap(
      sBlocks: SerializableBlock[],
      editorRef: RefObject<HTMLDivElement>,
      menuRef: RefObject<HTMLDivElement>,
      setCurrBlock: Dispatch<SetStateAction<EditorBlock|null>>
    ): EditorTree {
      const _tree = new EditorTree(editorRef, menuRef,setCurrBlock);
      const _blocks: Map<string, EditorBlock> = new Map<string, EditorBlock>();
      sBlocks.forEach((sBlock) => {
        _blocks.set(
          sBlock.id,
          new EditorBlock(sBlock.type, null, _tree, sBlock.id)
        );
      });
      sBlocks.reverse().forEach((sBlock) => {
        const curr = _blocks.get(sBlock.id);
        if (curr) {
          curr.rawValue = sBlock.rawValue;
          curr.media = sBlock.media;
          if (sBlock.nextBlockId) {
            curr.next = _blocks.get(sBlock.nextBlockId) || null;
          }
        }
      });
      sBlocks.reverse().forEach((sBlock) => {
        const curr = _blocks.get(sBlock.id);
        const _next = sBlock.nextBlockId
          ? _blocks.get(sBlock.nextBlockId)
          : undefined;
        _tree.append(sBlock.type, _next, curr);
      });
      return _tree;
    }
    constructor(
      editorRef: RefObject<HTMLDivElement>,
      menuRef: RefObject<HTMLDivElement>,
      setCurrBlock: Dispatch<SetStateAction<EditorBlock |null>>
    ) {
      this.id = uuidv4();
      this.root = null;
      this.last = this.root;
      this.ref = editorRef;
      this.menu = menuRef;
      this.dispatchSetCurrBlock = setCurrBlock;
    }
  
    append(type: BlockType, next?: EditorBlock, block?: EditorBlock) {
      let _elem: HTMLElement;
      const _block = block || new EditorBlock(type, null, this);
      switch (_block.type) {
        default:
        case "p":
          _elem = document.createElement("p");
          _elem.classList.add("block", "editor-p");
          break;
        case "h1":
          _elem = document.createElement("h1");
          _elem.classList.add("block", "editor-h1");
          break;
        case "h2":
          _elem = document.createElement("h2");
          _elem.classList.add("block", "editor-h2");
          break;
        case "img":
          _elem = document.createElement("img");
          _elem.classList.add("block", "editor-img");
  
          let media = _block.media;
          if (!media) {
            const url = prompt("Image URL");
            media = {
              src: url || "",
            };
            _block.media = media;
          }
          (_elem as HTMLImageElement).src = media?.src || "";
          (_elem as HTMLImageElement).style.width = "50%";
          break;
        case "a":
          _elem = document.createElement("a");
          const href = prompt("URL");
          (_elem as HTMLAnchorElement).href = href || "";
          (_elem as HTMLAnchorElement).target = "_blank";
          break;
      }
      _elem.setAttribute("draggable", "true");
      _block.bindDOMElement(_elem);
      _elem.innerHTML = block?.rawValue || "";
      this.ref.current?.append(_elem);
  
      if (this.isEmpty()) {
        this.root = _block;
      } else if (next) {
        _block.next = next;
      } else if (this.root && !this.root.next) {
        this.root.next = _block;
      } else if (this.last) {
        this.last.next = _block;
      }
  
      /**
       * No next block provided, this is the last block.
       */
      if (!next) {
        this.last = _block;
      }
  
      return _block;
    }
  
    isEmpty() {
      return this.last === null && this.root === null;
    }
  
    private serializeBlocks(block: EditorBlock | null): SerializableBlock[] {
      const _serializableBlocks: SerializableBlock[] = [];
      if (block) {
        _serializableBlocks.push(
          {
            id: block.id,
            type: block.type,
            rawValue: block.elem?.innerHTML || "",
            blockAlignment: block.blockAlignment,
            media: block.media,
            nextBlockId: block.next?.id,
          },
          ...this.serializeBlocks(block.next)
        );
        return _serializableBlocks;
      } else {
        return this.serializableBlocks;
      }
    }
    /**
     * FIXME: NOT WORKING!!
     * @param block
     * @returns
     */
    private clear(block: EditorBlock | null) {
        console.log(block);
      if (block) {
        if (block.elem) {
          block.elem.parentElement?.removeChild(block.elem);
        }
        this.clear(block.next);
        block = null;
      } else {
        return;
      }
    }
    /**
     * unlinks an existing block from chain
     * @param block to remove.
     */
    removeBlock(block: EditorBlock){
        let _prevBlock: EditorBlock | null = this.root;
        let _block: EditorBlock = this.root as EditorBlock;
        while(_block.id !== block.id && _block.next) {
            _prevBlock = _block;
            _block = _block.next
        }
        (_prevBlock as EditorBlock).next =_block.next;
        block.elem?.remove();
    }
    setBlockAlignment(block: EditorBlock, alignment: BlockAlignment){
        block.changeAlignment(alignment);
    }
    serializeTree() {
      if (this.root) {
        return {
          id: this.id,
          tree: this,
          blocks: this.serializeBlocks(this.root),
        };
      } else {
        return this.serializableBlocks;
      }
    }
    clearTree() {
      if (this.root) {
        return this.clear(this.root);
      } else {
        return;
      }
    }
  }