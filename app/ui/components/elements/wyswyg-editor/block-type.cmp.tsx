import { Button, Popover, PopoverContent } from "@chakra-ui/react";
import { BlockType } from ".";


interface BlockTypeSelProps {
    isOpen: boolean;
    onClose: ()=>any;
    callback: (tag:BlockType)=>void;
}
export function BlockTypeSel(props:BlockTypeSelProps){
    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={props.isOpen}
            onClose={props.onClose}
            placement='right'
            closeOnBlur={false}
        >
            <PopoverContent>
                <Button>h1</Button>
                <Button>h2</Button>
                <Button>h3</Button>
            </PopoverContent>

        </Popover>
    )
}