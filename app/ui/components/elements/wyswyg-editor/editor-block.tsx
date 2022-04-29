import { BlockAlignment, BlockType } from ".";
import { v4 as uuidv4 } from "uuid";
import { EditorTree } from "./tree";
import sanitizeHtml from 'sanitize-html';

export class EditorBlock {
    type: BlockType;
    tree: EditorTree;
    elem?: HTMLElement;
    next: null | EditorBlock;
    rawValue: string;
    placeholder?: string;
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
    isLocked: boolean;
    nonZeroRawValueRequired: boolean;
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
      this.isLocked = false;
      this.nonZeroRawValueRequired = false;
    }
    focus() {
      this.tree.dispatchSetCurrBlock(this);
      if (this.elem) {
        this.mutObserver.observe(this.elem, EditorBlock.mutObserverConfig);
        setTimeout(() => {
          if (this.elem) {
            const resizeObserver = new ResizeObserver(() => {
              if (this.tree.menu.current && this.elem) {
                this.tree.menu.current.style.top = `${
                  this.elem.offsetTop + this.tree.menu.current.offsetHeight*2
                }px`;
              }
            });
            this.elem.focus();
            resizeObserver.observe(this.elem);
          }
        }, 0);
        this.elem.setAttribute("contentEditable", String(!this.isLocked));
      }
    }
  
    blur() {
      this.elem?.setAttribute("contentEditable", "false");
      setTimeout(()=>{
        this.handlePlaceholder();
        if(this.elem &&this.nonZeroRawValueRequired && !this.rawValue?.length){
            this.elem.style.borderColor = 'red';
        }else if(this.elem){
            this.elem.style.borderColor ='none';
        }
      },100)
    }
  
    setText() {
      if (this.elem) {
        this.elem.innerText = this.rawValue;
      }
    }
  
    onKeyDown(e: KeyboardEvent) {
      this.handlePlaceholder(false);  
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
        this.rawValue = this.sanitizeValue(this.elem?.innerHTML);
        this.handlePlaceholder();
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
      this.handlePlaceholder();
      this.focus();
    }

    sanitizeValue(html:string):string{
        return sanitizeHtml(html);
    }

    private handlePlaceholder(showPlaceholder:boolean=true){
        if(this.placeholder && !this.rawValue?.length && this.elem){
            this.elem.style.color = 'grey'
            if(showPlaceholder){
                this.elem.innerHTML = this.placeholder;
            }else{
                this.elem.innerHTML = ''
            }
        } else if(this.elem) {
            this.elem.style.color = 'inherit';
        }
    }
  }
  