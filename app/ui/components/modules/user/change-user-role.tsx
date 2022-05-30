import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputAddon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GoInfo, GoMail } from "react-icons/go";
import User from "../../../../data/entities/user.entity";
import UserRepo from "../../../../data/repos/user.repo";
import { useAuth } from "../../../../hooks/auth.hooks";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { UserDto, UserRole } from "../../../../types/dtos/user.dtos";
import { UserCard } from "../../elements/user/user-card";

export default function ChangeUserRole(props: {
  role: UserRole;
  user: UserDto;
  callback: () => void;
}) {
  const boxBg = useColorModeValue("white", "facebook.800");
  const uid = "user-" + props.user.uid;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { show } = useFeedback();
  const isAllowed = user?.role === props.role || user?.role === UserRole.ADMIN;

  const handleElevate = () => {
    if (uid && uid.match("user-")) {
      setIsLoading(true);
      UserRepo.getRepo()
        .$browserElevateUser(uid, props.role)
        .then((res) => {
          show("Changed User Role", {
            type: "success",
            title: "Change User Role",
          });
          props.callback();
        })
        .catch((error) => {
          show(error, {
            type: "error",
            title: "Change User Role Error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      show("Provide a valid user id.", {
        type: "error",
        title: "Change User Role Error",
      });
    }
  };
  return (
    <Box px="6" py={"6"} rounded={"md"} maxW="md">
      {isAllowed ? (
        <>
          <Stack p="4">
            <UserCard {...props.user} />
            <Button onClick={handleElevate} isLoading={isLoading}>
              Change
            </Button>
          </Stack>
          <Alert status="warning" size={"sm"}>
            <AlertIcon />
            <AlertDescription fontSize={"xs"}>
              You will be giving elevated privileges to this user. Make sure the
              user has been verified and is allowed to assume role{" "}
              <strong>{props.role.toLowerCase()}</strong>.
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <Alert status="error" my="5">
          <AlertIcon />
          <AlertDescription fontSize={"xs"}>
            You do not have sufficient permissions to perform this action
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
}
