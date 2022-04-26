import { Button, IconButton, Popover, PopoverContent, Stack } from "@chakra-ui/react";
import { RefObject } from "react";
import { FaCameraRetro, FaCross, FaLink, FaPlusCircle, FaTrash } from "react-icons/fa";
import { BlockType } from ".";


interface BlockTypeSelProps {
    isOpen: boolean;
    onClose: ()=>any;
    callback: (tag:BlockType)=>void;
    menuRef: RefObject<HTMLDivElement>

}
export function BlockTypeSel(props:BlockTypeSelProps){
    return (
        <div ref={props.menuRef} className="editor-popover">
                <Stack direction={'row'} align='center' justify={"center"} width="100vw">
                <FaPlusCircle/>
                <Button onClick={()=>props.callback(BlockType.p)}>p</Button>
                <Button onClick={()=>props.callback(BlockType.h1)}>h1</Button>
                <Button onClick={()=>props.callback(BlockType.h2)}>h2</Button>
                <Button onClick={()=>props.callback(BlockType.h3)}>h3</Button>
                <IconButton 
                    onClick={()=>props.callback(BlockType.a)}
                    aria-label="Add Link"
                    icon={<FaLink/>}
                />
                <IconButton 
                    onClick={()=>props.callback(BlockType.img)}
                    aria-label="Add Image"
                    icon={<FaCameraRetro/>}
                />
                   <IconButton 
                    onClick={()=>props.callback(BlockType.img)}
                    aria-label="Remove"
                    icon={<FaTrash/>}
                />
                </Stack>
        </div>
    )
}