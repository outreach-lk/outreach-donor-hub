import { Button, Heading, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import User from "../../../../data/entities/user.entity";
import { useAuth } from "../../../../hooks/auth.hooks";
import { useEntity } from "../../../../hooks/entity";
import { UserDto } from "../../../../types/dtos/user.dtos";
import { UserCard } from "./user-card";

export function ModTableUserButton(props:{uid:string}){
    const [userData,setUserData] = useState<UserDto>();
    const {user} = useAuth();
    const initialDisplayText =  (user?.uid === props.uid)?"You":props.uid
    const {fetchEntity} = useEntity('user');
    const fetchUserData = () =>{
        
        const cache = localStorage.getItem(props.uid);
        if(cache){
            const data = JSON.parse(cache) as UserDto & {cachedAt:number}
            const cacheAge = (Date.now() - data.cachedAt) ;
            // if user data was cached more than an hour ago fecth again
            if(cacheAge < 3600000){
                setUserData(JSON.parse(cache) as UserDto);
                return;
            }
        }
        fetchEntity("user-"+props.uid)
        .then(res=>{
            if(res.data){
                localStorage.setItem(props.uid, JSON.stringify({...res.data.data,cachedAt:Date.now()}))
                setUserData(res.data.data as UserDto)
            }else{
                //TODO: handle
            }
        })
        .catch(e=>{
            //TODO: handle
        })
    }
    return (
    <Popover>
    <PopoverTrigger>
        <Button
            size={"sm"}
            variant="link"
            leftIcon={<FaUser/>}
            fontWeight="bold"
            onClick={fetchUserData}
        >
            {initialDisplayText}
        </Button>
    </PopoverTrigger>
    <PopoverContent>
        <PopoverArrow/>
        <PopoverHeader>
            <HStack>
                <FaUser/>
                <Heading size={"xs"}>{initialDisplayText}</Heading>
            </HStack>
        </PopoverHeader>
        <PopoverBody>

        {userData&&
        <UserCard {...userData}/>
    }
    </PopoverBody>
    </PopoverContent>
    </Popover>
    )
}