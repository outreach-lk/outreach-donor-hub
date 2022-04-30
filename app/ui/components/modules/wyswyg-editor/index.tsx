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
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDom from "react-dom";
import { BlockTypeSel } from "./block-type.cmp";
import { Button } from "@chakra-ui/react";
import { EditorBlock } from "./editor-block";
import { EditorTree } from "./tree";
import sample from "./sample.json";
interface RichTextEditorProps {
  debug?: boolean;
  blocklist?: SerializableBlock[];
  treeGrabber: (tree: EditorTree) => void;
  init?: RichTextEditorInit
}

interface RichTextEditorInit {
  hideMenu?: boolean;
  readonly?: boolean;
}

export function RichTextEditor(props: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currBlock, setCurrBlock] = useState<EditorBlock | null>(null);
  const [tree, setTree] = useState<EditorTree>(
    new EditorTree(editorRef, menuRef, setCurrBlock)
  );
  const [showMenu, setShowMenu] = useState(false);
  const handleInitClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (tree.isEmpty()) {
      tree.append(BlockType.p);
    } else {
      console.log(e.target);
    }
  };

  useEffect(() => {
    if (props.blocklist) {
      tree.clearTree();
      setTree(
        EditorTree.createFromMap(
          props.blocklist as SerializableBlock[],
          editorRef,
          menuRef,
          setCurrBlock
        )
      );
    }
  }, [props]);

  useEffect(() => {
    props.treeGrabber(tree);
  }, [tree]);

  return (
    <>
      {props.debug && (
        <>
          <Button
            onClick={() => {
              const data = tree.serializeTree();
              const str = JSON.stringify(data);
              const bytes = new TextEncoder().encode(str);
              const blob = new Blob([bytes], {
                type: "application/json;charset=utf-8",
              });
              var fileURL = window.URL.createObjectURL(blob);
              window.open(fileURL);
            }}
          >
            JSON
          </Button>
          <Button
            onClick={() => {
              tree.clearTree();
              setTree(
                EditorTree.createFromMap(
                  sample.blocks as SerializableBlock[],
                  editorRef,
                  menuRef,
                  setCurrBlock
                )
              );
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
        </>
      )}
      <div
        ref={editorRef}
        onClick={handleInitClick}
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        style={{ width: "100%", position: "relative" }}
        className="wysiwyg-editor-container"
      ></div>

      {!props.init?.hideMenu&&<BlockTypeSel
        menuRef={menuRef}
        isOpen={showMenu}
        addCallback={(tag) =>
          tree.append(
            tag,
            undefined,
            currBlock?.next || undefined,
            currBlock || undefined
          )
        }
        removeCallback={tree.removeBlock.bind(tree)}
        alignmentCallback={tree.setBlockAlignment.bind(tree)}
        currentBlock={currBlock || undefined}
      />}
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
  placeholder?: string;
  blockAlignment?: BlockAlignment;
  media?: {
    src: string;
    width?: number;
    height?: number;
  };
  nextBlockId?: string;
  preventDeletion?: boolean;
  preventAlignmentChange?: boolean;
  hideMenu?: boolean;
  isLocked?: boolean;
  nonZeroRawValueRequired?: boolean;
};

export enum BlockAlignment {
  center = "center",
  left = "left",
  right = "right",
}
