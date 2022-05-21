import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormLabel, Heading, HStack, Input, InputAddon, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GoInfo, GoMail } from "react-icons/go";
import User from "../../../../data/entities/user.entity";
import UserRepo from "../../../../data/repos/user.repo";
import { useAuth } from "../../../../hooks/auth.hooks";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { UserRole } from "../../../../types/dtos/user.dtos";

export default function ChangeUserVerification(props:{
}){
    const boxBg = useColorModeValue("white", "facebook.800");
    const [uid,setUid] = useState<string>()
    const {user} = useAuth();
    const {show} = useFeedback();

    const handleElevate = () => {
    }
    return (
        <Box px="6" py={"6"} bg={boxBg} rounded={"md"} maxW="md">
            <HStack>
            <FaUserAstronaut/>
            <Heading size={"md"}>
            Verify User
            </Heading>
            </HStack>
       <>
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
                This user will be marked as a verified User
                and will have access some exclusive features.
            </AlertDescription>
        </Alert>
        </>
        </Box>
    )
}