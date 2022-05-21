import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormLabel, Heading, HStack, Input, InputAddon, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GoInfo, GoMail } from "react-icons/go";
import User from "../../../../data/entities/user.entity";
import UserRepo from "../../../../data/repos/user.repo";
import { useAuth } from "../../../../hooks/auth.hooks";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { UserRole } from "../../../../types/dtos/user.dtos";

export default function ChangeUserRole(props:{
    role: UserRole
}){
    const boxBg = useColorModeValue("white", "facebook.800");
    const [uid,setUid] = useState<string>()
    const {user} = useAuth();
    const {show} = useFeedback();
    const isAllowed = user?.role === props.role || user?.role === UserRole.ADMIN;

    const handleElevate = () => {
        if(uid && uid.match('user-')){
            UserRepo.getRepo().$browserElevateUser(uid,props.role)
            .then(res=>{
                show('Changed User Role',{
                    type:'success'
                })
            })
            .catch(error=>{
                show(error,{
                    type:'error'
                })
            })
        }else{
            show('Provide a valid user id.',{type:'error'})
        }
    }
    return (
        <Box px="6" py={"6"} bg={boxBg} rounded={"md"} maxW="md">
            <HStack>
            <FaUserAstronaut/>
            <Heading size={"md"}>
            Elevate to {props.role.at(0)?.toUpperCase().concat(props.role.slice(1).toLowerCase())}
            </Heading>
            </HStack>
       {isAllowed?<>
        <HStack p="4">
            <InputGroup>
            <InputAddon
                children="User ID"
            />
            <Input onChange={(e)=>setUid(e.target.value)}/>
            </InputGroup>
            <Button onClick={handleElevate}>Submit</Button>
        </HStack>
        <Alert status="warning" size={"sm"}>
            <AlertIcon/>
            <AlertDescription fontSize={"xs"}>
                You will be giving elevated privileges to this user.
                Make sure the user has been verified and is allowed
                to be assume role <strong>{props.role.toLowerCase()}</strong>.
            </AlertDescription>
        </Alert>
        </>:
        <Alert status="error" my="5">
            <AlertIcon/>
            <AlertDescription fontSize={"xs"}>You do not have sufficient permissions to perform this action</AlertDescription>
        </Alert>
        }
        </Box>
    )
}