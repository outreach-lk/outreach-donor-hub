/**
 * Rich Text Editor Component
 */
import {
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDom from "react-dom";
import { BlockTypeSel } from "./block-type.cmp";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@chakra-ui/react";

interface RichTextEditorProps {}

export function RichTextEditor(props: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // const {current:tree} = useRef<EditorTree>(new EditorTree(editorRef,menuRef));
  const [tree, setTree] = useState<EditorTree>(
    new EditorTree(editorRef, menuRef)
  );
  const handleInitClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (tree.isEmpty()) {
      tree.append(BlockType.p);
    } else {
      console.log(e.target);
    }
  };

  const sample: SerializableBlock[] = [
    {
      id: "0a03c6f4-2db6-497b-be84-75262dfc815e",
      type: "p" as BlockType,
      rawValue: "Hello",
      nextBlockId: "5867cbf4-d4db-4843-a3b0-7541c95ccdfe",
    },
    {
      id: "5867cbf4-d4db-4843-a3b0-7541c95ccdfe",
      type: "p" as BlockType,
      rawValue: "oyata <b>kohomada? </b>I am <i>fine</i>",
      nextBlockId: "f8559c87-d4b1-4449-8ac2-7ee8eccef8e3",
    },
    {
      id: "f8559c87-d4b1-4449-8ac2-7ee8eccef8e3",
      type: "p" as BlockType,
      rawValue: "Bula bula",
      nextBlockId: "504ac521-9259-452c-bdec-985d3e2f6499",

    },
    {
      "id": "504ac521-9259-452c-bdec-985d3e2f6499",
      "type": "img" as BlockType,
      "rawValue": "",
      "media": {
          "src": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
      }
  }
  ];

  return (
    <>
      <Button
        onClick={() => {
          console.log(tree.serializeTree());
        }}
      >
        JSON
      </Button>
      <Button
        onClick={() => {
          tree.clearTree();
          setTree(EditorTree.createFromMap(sample, editorRef, menuRef));
        }}
      >
        Sample
      </Button>
      <Button
        onClick={() => {
          tree.clearTree();
        }}
      >
        Clear
      </Button>
      <div
        ref={editorRef}
        onClick={handleInitClick}
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
        className="wysiwyg-editor-container"
      ></div>

      <BlockTypeSel
        menuRef={menuRef}
        isOpen={true}
        callback={(tag) => tree.append(tag)}
        onClose={console.log}
      />
    </>
  );
}

class EditorBlock {
  type: BlockType;
  tree: EditorTree;
  elem?: HTMLElement;
  next: null | EditorBlock;
  rawValue: string;
  media?: {
    src: string,
    width?: number,
    height?: number,
  }
  popupOpen = false;
  _nextType: BlockType;
  id: string;

  constructor(
    type: any,
    next: null | EditorBlock,
    tree: EditorTree,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.type = type;
    this.next = next;
    this.rawValue = "";
    this.tree = tree;
    this._nextType = BlockType.p;
  }
  focus() {
    if (this.elem) {
      setTimeout(() => {
        if (this.elem) {
          const resizeObserver = new ResizeObserver(() => {
            if (this.tree.menu.current && this.elem) {
              this.tree.menu.current.style.marginTop = `${
                this.elem.offsetTop + this.elem.offsetHeight
              }px`;
            }
          });
          this.elem.focus();
          resizeObserver.observe(this.elem);
        }
      }, 0);
      this.elem.setAttribute("contentEditable", "true");
    }
  }

  blur() {
    this.elem?.setAttribute("contentEditable", "false");
  }

  setText() {
    if (this.elem) {
      this.elem.innerText = this.rawValue;
    }
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Enter":
        this.onEnter();
        break;
    }
  }

  onEnter() {
    this.blur();
    if (this.next) {
      this.next.focus();
    } else {
      this.next = this.tree.append(this._nextType);
    }
  }

  // onSlash() {
  //   this.popupOpen = !this.popupOpen;
  //   if (this.tree.menu && this.tree.menu.current) {
  //     this.tree.menu.current.style.visibility = this.popupOpen
  //       ? "visible"
  //       : "hidden";
  //   }
  // }

  bindDOMElement(elem: HTMLElement) {
    this.elem = elem;
    this.elem.onclick = () => this.focus();
    this.elem.onblur = () => this.blur();
    this.elem.onkeydown = (e) => this.onKeyDown(e);
    this.focus();
  }
}

class EditorTree {
  root: null | EditorBlock;
  last: null | EditorBlock;
  ref: RefObject<HTMLDivElement>;
  menu: RefObject<HTMLDivElement>;
  serializableBlocks: SerializableBlock[] = [];
  id: string;
  static createFromMap(
    sBlocks: SerializableBlock[],
    editorRef: RefObject<HTMLDivElement>,
    menuRef: RefObject<HTMLDivElement>
  ): EditorTree {
    const _tree = new EditorTree(editorRef, menuRef);
    const _blocks: Map<string, EditorBlock> = new Map<string, EditorBlock>();
    sBlocks.forEach((sBlock) => {
      _blocks.set(
        sBlock.id,
        new EditorBlock(sBlock.type, null, _tree, sBlock.id)
      );
    });
    sBlocks.reverse().forEach((sBlock)=>{
      const curr = _blocks.get(sBlock.id);
      if(curr){
        curr.rawValue = sBlock.rawValue;
        curr.media = sBlock.media;
        if(sBlock.nextBlockId){
          curr.next = _blocks.get(sBlock.nextBlockId) || null;
        }
      }
    })
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
    menuRef: RefObject<HTMLDivElement>
  ) {
    this.id = uuidv4();
    this.root = null;
    this.last = this.root;
    this.ref = editorRef;
    this.menu = menuRef;
  }

  append(
    type: BlockType,
    next?: EditorBlock,
    block?: EditorBlock
  ) {
    let _elem: HTMLElement;
    const _block = block || new EditorBlock(type, null, this);
    switch (_block.type) {
      default:
      case "p":
        _elem = document.createElement("p");
        _elem.classList.add("block","editor-p");
        break;
      case "h1":
        _elem = document.createElement("h1");
        _elem.classList.add("block","editor-h1");
        break;
      case "h2":
        _elem = document.createElement("h2");
        _elem.classList.add("block","heditor-h2");
        break;
      case "img":
        _elem = document.createElement("img");
        let media = _block.media;
        if(!media){
          const url = prompt("block","Image URL");
          media = {
            src: url || ''
          }
          _block.media = media;
        }
        (_elem as HTMLImageElement).src = media?.src || "";
        (_elem as HTMLImageElement).style.width = '50%';
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
    _elem.innerHTML = block?.rawValue || ''
    this.ref.current?.append(_elem);
    if (this.isEmpty()) {
      this.root = _block;
    } else if (next) {
      _block.next = next;
    } else if(this.last) {
      this.last.next = _block
    } else {
      this.last = _block;
    }
    console.log(this);
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
  public clear(block: EditorBlock | null) {
    if (block) {
      if(block.elem){
        block.elem.parentElement?.removeChild(block.elem)
      }
      this.clear(block.next);
      block = null;
    } else {
      return;
    }
  }
  serializeTree() {
    if (this.root) {
      return {
        id: this.id,
        blocks: this.serializeBlocks(this.root)
      }
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

export enum BlockType {
  p = "p",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  a = "a",
  img = "img",
}

type SerializableBlock = {
  id: string;
  type: BlockType;
  rawValue: string;
  media?: {
    src: string,
    width?: number,
    height?: number
  }
  nextBlockId?: string;
};
