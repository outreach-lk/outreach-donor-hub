/**
 * Rich Text Editor Component
 */
import { KeyboardEventHandler, MouseEventHandler, RefObject, useMemo, useRef, useState, } from "react";
import ReactDom from 'react-dom'
import { BlockTypeSel } from "./block-type.cmp";

interface RichTextEditorProps {

}

export function RichTextEditor(props: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const activeBlockRef = useRef<HTMLElement>(null);
    const {current:tree} = useRef<EditorTree>(new EditorTree(editorRef));

    /**
     * handle back slash options
     */
    const handleBackSlash = () => {
    
    }

    /**
     * main key press event handler
     * @param e 
     */
    const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
        switch(e.code){
          case 'Slash':
            handleBackSlash();
            break;
        }
    }

    const handleInitClick: MouseEventHandler<HTMLDivElement> = (e) => {
      if(tree.isEmpty()){
        tree.append(BlockType.p);
      }else{
        console.log(e.target);
      }
    }
    
    return(
      <>
        <div  
          ref={editorRef}
          onClick={handleInitClick}
          style={{width:'100vw',height:'100vh', position:'absolute'}}
          className="wysiwyg-editor-container"
        >      

        </div>
      </>
    )
}

class EditorBlock {
  type: BlockType;
  tree: EditorTree;
  elem?: HTMLElement;
  next: null | EditorBlock;
  prev: null | EditorBlock;
  rawValue: string;
  _nextType: BlockType;

  constructor(type: any, next: null | EditorBlock, prev: null | EditorBlock, tree: EditorTree){
    this.type = type;
    this.next = next;
    this.prev = prev;
    this.rawValue = '';
    this.tree = tree;
    this._nextType = BlockType.p;
  }
  focus() {
    if(this.elem){
      setTimeout(()=>{
        if(this.elem){
          this.elem.focus();
        }
      },0)
      this.elem.setAttribute('contentEditable','true');
    }
  }

  blur() {
    this.elem?.setAttribute('contentEditable','false');
  }

  setText() {
    if(this.elem){
      this.elem.innerText = this.rawValue;
    }
  }

  onKeyDown(e: KeyboardEvent) {
    switch(e.key){
      case 'Enter':
        this.onEnter();
        break;
      case '/':
        this.onSlash();
        break;
    }
  }

  onEnter(){
    this.blur();
    if(this.next){
      this.next.focus();
    } else {
      this.tree.append(this._nextType);
    }
  }

  onSlash(){
    this._nextType = BlockType.h1;
    if(this.elem && this.elem.parentElement){
      this.elem.style.color ='red'
      ReactDom.createPortal(<div>Hello</div> ,this.elem)
    }
  }

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
  constructor(editorRef: RefObject<HTMLDivElement>){
    this.root = null;
    this.last = this.root;
    this.ref = editorRef;
  }

  append(type: BlockType ){
    let _elem: HTMLElement;
    const block = new EditorBlock(type, null, this.last,this)
    switch(block.type){
      default:
      case 'p':
        _elem = document.createElement('p');
        _elem.classList.add('editor-p')
        break;
      case 'h1':
        _elem =  document.createElement('h1');
        _elem.classList.add('editor-h1')
        break;
      case 'h2':
        _elem = document.createElement('h2');
        _elem.classList.add('heditor-h2')
        break;
    }
    this.ref.current?.append(_elem);
    block.bindDOMElement(_elem);
    if(this.isEmpty()){
      this.root = block;
    } else {
      block.prev = this.last;
      this.last = block
    }
  }

  isEmpty(){
    return (this.last ===  null && this.root === null);
  }
  
}

export enum BlockType {
  p='p',
  h1='h1',
  h2='h2',
  h3='h3',
  i='i',
  b='b',
  u='u',
  img='img'
} 
