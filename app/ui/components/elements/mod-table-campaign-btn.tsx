import { Button, Tooltip } from "@chakra-ui/react"
import { FaCopy, FaExternalLinkSquareAlt } from "react-icons/fa"
import { getConfig } from "../../../config";
import { useFeedback } from "../../../hooks/feedback.hook";

/**
 * a simple button that will copy the id to clipboard on a click
 * and open the entity on double click
 * TODO: Make it generic
 * @param props 
 * @returns 
 */
export function EntityIDButton(props: {id:string,title?:string,open?:boolean,entity:string}){
    const {show} = useFeedback();
    const openCauseInNewTab = (id: string) => {
        window.open(
          getConfig().appUrl.concat(`/${props.entity}/`).concat(id.split("cause-")[1])
        );
      };
    return (
        <Tooltip
        label={props.open? "Click to Copy ID & Double Click to Open":"Click to Copy ID"}
      >
      <Button
        variant={"link"}
        onClick={() =>{
            navigator.clipboard.writeText(props.id)
            show("ID Copied to Clipboard",{
                type:'success'
            })
        }}
        onDoubleClick={()=>{
            if(props.open){
                openCauseInNewTab(props.id as string)
            }
        }}
        leftIcon={props.open?<FaExternalLinkSquareAlt />:<FaCopy/>}
        size="xs"
        whiteSpace={"break-spaces"}
      >
        {props.title || props.id}
      </Button>
      </Tooltip>
    )
}