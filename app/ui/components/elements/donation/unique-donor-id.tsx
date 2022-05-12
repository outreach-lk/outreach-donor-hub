import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/auth.hooks";
import apiMap from "../../../../api/api-map.json";
import axios from "axios";

interface UniqueDonorIdProps{
    causeId: string
}
export function UniqueDonorId(props:UniqueDonorIdProps) {
  const { isAuthorized, user,client } = useAuth();
  const [ref,setRef] = useState<string|null>(null);
  const fetchUniqueDonorId = async () => {
    let path = apiMap.v1.rpc.donation.ref.path;
    return ( await axios({
        url: path,
        method: 'POST',
        headers: {
            authorization: `Bearer ${client.accessToken}`
        },
        data: {
            user: user.uid,
            cause: props.causeId
        }
    })).data;
  }
  useEffect(()=>{
    fetchUniqueDonorId()
    .then((res)=>{
        setRef(res.data)
    })
  },[])

  return (
    <>
      {isAuthorized ? (
        <Box>
          <Text>Your Reference Number</Text>
          {ref?
            <Heading>{ref}</Heading>:
            <Spinner/>
          }
        </Box>
      ) : (
        <Button>Sign In</Button>
      )}
    </>
  );
}
