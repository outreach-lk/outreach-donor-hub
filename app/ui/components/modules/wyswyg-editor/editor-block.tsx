import { BlockAlignment, BlockType } from ".";
import { v4 as uuidv4 } from "uuid";
import { EditorTree } from "./tree";
import sanitizeHtml from "sanitize-html";

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
  href?: string;
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
    characterData: true,
    attributes: false,
    childList: false,
    subtree: true,
  };

  constructor(
    type: BlockType,
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
    this.preventDeletion = false;
    this.preventAlignmentChange = false;
    this.hideMenu = false;
    this.isLocked = false;
    this.nonZeroRawValueRequired = false;
  }
  focus() {
    if (this.elem) {
      this.elem.setAttribute("contentEditable", String(!this.isLocked));
      this.mutObserver.observe(this.elem, EditorBlock.mutObserverConfig);
      setTimeout(() => {
        if (this.elem) {
          this.tree.dispatchSetCurrBlock(this);
          const resizeObserver = new ResizeObserver(() => {
            if (this.tree.menu.current && this.elem) {
              this.tree.menu.current.style.top = `${
                this.elem.offsetTop + this.elem.offsetHeight
              }px`;
              this.tree.menu.current.style.right = `${
                0
              }px`;
              this.tree.menu.current.style.left = 'auto'
            }
          });
          this.elem.focus();
          resizeObserver.observe(this.elem);
        }
      }, );
      
    }
  }

  blur() {
    this.elem?.setAttribute("contentEditable", "false");
    setTimeout(() => {
      this.handlePlaceholder();
      if (this.elem && this.nonZeroRawValueRequired && !this.rawValue?.length) {
        this.elem.style.borderColor = "red";
      } else if (this.elem) {
        this.elem.style.borderColor = "none";
      }
      // this.tree.dispatchSetCurrBlock(null);
    }, 100);
  }

  setText() {
    if (this.elem) {
      this.elem.innerText = this.rawValue;
    }
  }

  onKeyDown(e: KeyboardEvent) {
    this.handlePlaceholder(false);
    this.tree.dispatchSetCurrBlock(this)
    switch (e.key) {
      case "Tab":
      case "Enter":
        this.onEnter();
        break;
      case "Escape":
        if(this.tree.menu.current){
          this.tree.menu.current.style.visibility = 'hidden';
          this.popupOpen = false;
        }
        break;
      case "/":
        if(this.popupOpen) break;
        e.preventDefault();
        if(this.tree.menu.current){
          this.tree.menu.current.style.visibility = "visible";
          this.popupOpen = true;
        }
        break;
    }
  }

  onEnter() {
    this.blur();
    if (this.next) {
      this.next.focus();
    } else {
      this.next = this.tree.append(this._nextType, this.next || undefined);
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

  changeAlignment(alignment: BlockAlignment) {
    if (this.preventAlignmentChange) throw new Error("Block Frozen");
    this.blockAlignment = alignment;
    if (this.elem) {
      this.elem.style.textAlign = this.blockAlignment.valueOf();
    }
  }

  bindDOMElement(elem: HTMLElement) {
    this.elem = elem;
    this.elem.onclick = () => this.focus();
    this.elem.onblur = () => this.blur();
    this.elem.onkeydown = (e) => this.onKeyDown(e);
    this.elem.style.textAlign = this.blockAlignment.valueOf();
    this.handlePlaceholder();
    this.focus();
  }

  sanitizeValue(html: string): string {
    return sanitizeHtml(html);
  }

  private handlePlaceholder(showPlaceholder = true) {
    if (this.placeholder && !this.rawValue?.length && this.elem) {
      this.elem.style.color = "grey";
      if (showPlaceholder) {
        this.elem.innerHTML = this.placeholder;
      } else {
        this.elem.innerHTML = "";
      }
    } else if (this.elem) {
      this.elem.style.color = "inherit";
    }
  }
}
