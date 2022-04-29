import { Button, IconButton, Popover, PopoverContent, Stack } from "@chakra-ui/react";
import { RefObject } from "react";
import { FaCameraRetro, FaLink, FaPlusCircle, FaTrash, FaDotCircle, FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { BlockAlignment, BlockType } from ".";
import { EditorBlock } from "./editor-block";


interface BlockTypeSelProps {
    isOpen: boolean;
    addCallback: (tag:BlockType)=>void;
    removeCallback: (block:EditorBlock)=>void;
    alignmentCallback: (block: EditorBlock, alignment: BlockAlignment) => void;
    menuRef: RefObject<HTMLDivElement>;
    currentBlock?: EditorBlock

}

export function BlockTypeSel(props:BlockTypeSelProps){
    if(props.currentBlock?.hideMenu) return null;
    return (
        <div ref={props.menuRef} className="editor-popover">
                <Stack className="editor-popover-toolbar" direction={'row'} align='center' justify={"center"} >
                <FaPlusCircle/>
                <Button onClick={()=>props.addCallback(BlockType.p)}>p</Button>
                <Button onClick={()=>props.addCallback(BlockType.h1)}>h1</Button>
                <Button onClick={()=>props.addCallback(BlockType.h2)}>h2</Button>
                <Button onClick={()=>props.addCallback(BlockType.h3)}>h3</Button>
                <IconButton 
                    onClick={()=>props.addCallback(BlockType.a)}
                    aria-label="Add Link"
                    icon={<FaLink/>}
                />
                <IconButton 
                    onClick={()=>props.addCallback(BlockType.img)}
                    aria-label="Add Image"
                    icon={<FaCameraRetro/>}
                />
                   {props.currentBlock && 
                   <>
                    <FaDotCircle/>
                    <IconButton
                       icon={<FaAlignLeft/>}
                       aria-label="align-left"
                       onClick={()=>props.alignmentCallback(props.currentBlock as EditorBlock, BlockAlignment.left)}
                   />
                    <IconButton
                        icon={<FaAlignCenter/>}
                        aria-label="align-center"
                       onClick={()=>props.alignmentCallback(props.currentBlock as EditorBlock, BlockAlignment.center)}

                    />
                     <IconButton
                        icon={<FaAlignRight/>}
                        aria-label="align-right"
                       onClick={()=>props.alignmentCallback(props.currentBlock as EditorBlock, BlockAlignment.right)}

                    />
                    {!props.currentBlock.preventDeletion &&<IconButton 
                        onClick={()=>{
                            props.removeCallback(props.currentBlock as EditorBlock)
                        }}
                        colorScheme="red"
                        aria-label="Remove"
                        icon={<FaTrash/>}
                        />}
                   </>
                }
                </Stack>
        </div>
    )
}