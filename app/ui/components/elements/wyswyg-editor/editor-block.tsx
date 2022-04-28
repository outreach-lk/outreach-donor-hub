import { BlockAlignment, BlockType } from ".";
import { v4 as uuidv4 } from "uuid";
import { EditorTree } from "./tree";


export class EditorBlock {
    type: BlockType;
    tree: EditorTree;
    elem?: HTMLElement;
    next: null | EditorBlock;
    rawValue: string;
    blockAlignment: BlockAlignment;
    media?: {
      src: string;
      width?: number;
      height?: number;
    };
    popupOpen = false;
    _nextType: BlockType;
    id: string;
    /**
     * special block properties
     */
    preventDeletion: boolean;
    preventAlignmentChange: boolean;
    hideMenu: boolean;

    private mutObserver: MutationObserver;
    private static mutObserverConfig: MutationObserverInit = {
      characterData: true, attributes: false, childList: false, subtree: true
    };
  
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
      this.mutObserver = new MutationObserver(this.onMutation.bind(this));
      this.blockAlignment = BlockAlignment.left;
      /**
       * block protection properties
       */
      this.preventDeletion = false
      this.preventAlignmentChange = false;
      this.hideMenu = false;
    }
    focus() {
      this.tree.dispatchSetCurrBlock(this);
      if (this.elem) {
        this.mutObserver.observe(this.elem, EditorBlock.mutObserverConfig);
        setTimeout(() => {
          if (this.elem) {
            const resizeObserver = new ResizeObserver(() => {
              if (this.tree.menu.current && this.elem) {
                this.tree.menu.current.style.marginTop = `${
                  this.elem.offsetTop + this.tree.menu.current.offsetHeight
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
      setTimeout(()=>{
          this.tree.dispatchSetCurrBlock(null);
      },100)
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
        this.next = this.tree.append(this._nextType,this.next || undefined);
      }
    }
  
  
    /**
     * mutation observer callback.
     * Sets rawValue to current innerHTML value of the element.
     * @param mutationList 
     * @param observer 
     */
    onMutation(mutationList: MutationRecord[], observer: MutationObserver) {
      if (this.type !== BlockType.img && this.elem) {
        this.rawValue = this.elem?.innerHTML;
      } else {
        // handle image mutation.
      }
    }

    changeAlignment(alignment: BlockAlignment){
        if(this.preventAlignmentChange) throw new Error('Block Frozen');
        this.blockAlignment = alignment;
        if(this.elem){
            this.elem.style.textAlign = this.blockAlignment.valueOf()
        }
    }
  
    bindDOMElement(elem: HTMLElement) {
      this.elem = elem;
      this.elem.onclick = () => this.focus();
      this.elem.onblur = () => this.blur();
      this.elem.onkeydown = (e) => this.onKeyDown(e);
      this.elem.style.textAlign = this.blockAlignment.valueOf()
      this.focus();
    }
  }
  