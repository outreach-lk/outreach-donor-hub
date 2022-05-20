import { Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export function ModTableUserButton(props:{uid:string}){
    return (
        <Button
        size={"sm"}
        variant="link"
        leftIcon={<FaUser/>}
        fontWeight="bold"
    >
        {props.uid}
    </Button>
    )
}