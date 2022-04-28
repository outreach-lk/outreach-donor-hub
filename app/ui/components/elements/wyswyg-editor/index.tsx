/**
 * Rich Text Editor Component
 * @author kulathilake
 * @since 26/04/2022
 */
import {
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDom from "react-dom";
import { BlockTypeSel } from "./block-type.cmp";
import { Button } from "@chakra-ui/react";
import { EditorBlock } from "./editor-block";
import { EditorTree } from "./tree";

interface RichTextEditorProps {}

export function RichTextEditor(props: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // const {current:tree} = useRef<EditorTree>(new EditorTree(editorRef,menuRef));
  const [currBlock,setCurrBlock] = useState<EditorBlock | null>(null);
  const [tree, setTree] = useState<EditorTree>(
    new EditorTree(editorRef, menuRef,setCurrBlock)
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
      blockAlignment: 'center' as BlockAlignment,
      nextBlockId: "504ac521-9259-452c-bdec-985d3e2f6499",
    },
    {
      id: "504ac521-9259-452c-bdec-985d3e2f6499",
      type: "img" as BlockType,
      rawValue: "",
      media: {
        src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
      },
    },
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
          setTree(EditorTree.createFromMap(sample, editorRef, menuRef,setCurrBlock));
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
        addCallback={(tag) => tree.append(tag,undefined, (currBlock?.next || undefined), currBlock || undefined)}
        removeCallback={tree.removeBlock.bind(tree)}
        alignmentCallback={tree.setBlockAlignment.bind(tree)}
        onClose={console.log}
        currentBlock = {currBlock || undefined}
      />
    </>
  );
}




export enum BlockType {
  p = "p",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  a = "a",
  img = "img",
}

export type SerializableBlock = {
  id: string;
  type: BlockType;
  rawValue: string;
  blockAlignment?: BlockAlignment,
  media?: {
    src: string;
    width?: number;
    height?: number;
  };
  nextBlockId?: string;
};

export enum BlockAlignment {
  center = 'center',
  left = 'left',
  right = 'right'
}
