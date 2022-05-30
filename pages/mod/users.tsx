import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../app/hooks/auth.hooks";
import { UserDto, UserRole } from "../../app/types/dtos/user.dtos";
import { UserRoleDropdown } from "../../app/ui/components/elements/user-role-dropdown";
import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import ModUserList from "../../app/ui/components/modules/mod/users/mod-users.list.module";
import ChangeUserRole from "../../app/ui/components/modules/user/change-user-role";
import ChangeUserVerification from "../../app/ui/components/modules/user/change-user-verification";

export default function ModUsers() {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useAuth();
  const [changeRoleTo, setChangeRoleTo] = useState<UserRole>();
  const [changeRoleUser, setChangeRoleUser] = useState<UserDto>();

  const {
    isOpen: isChangeRoleOpen,
    onClose: onChangeRoleClose,
    onOpen: onChangeRoleOpen,
    onToggle: onChangeRoleToggle,
  } = useDisclosure();

  const showChangeRoleModal = (user: UserDto) => {
    setChangeRoleUser(user);
    onChangeRoleOpen();
  };

  const onUserRoleChangeSuccess = () => {
    if (changeRoleTo === UserRole.REGULAR || changeRoleTo === UserRole.GUEST) {
      setTabIndex(0);
    } else {
      setTabIndex(1);
    }
    onChangeRoleClose();
    setChangeRoleTo(undefined);
    setChangeRoleUser(undefined);
  };
  return (
    <DashboardLayout>
      <Tabs isLazy index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Regular Users</Tab>
          <Tab>Admins &amp; Mods</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ModUserList
              roles={UserRole.REGULAR}
              action={(data: UserDto) => (
                <>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => showChangeRoleModal(data)}
                  >
                    Change Role
                  </Button>
                  {/* {!data.isVerifiedUser && 
                  <Button colorScheme={"blue"}>Verify</Button>} */}
                  {/* <Button colorScheme={"red"}>Delete</Button> */}
                </>
              )}
            />
          </TabPanel>
          <TabPanel>
            <ModUserList
              roles={[UserRole.ADMIN, UserRole.MODERATOR]}
              action={(data: UserDto) => (
                <>
                  {/* TODO: ensure the following checks apply to backend logic as well.*/}
                  {(user?.role === UserRole.ADMIN ||
                    (user?.role === UserRole.MODERATOR &&
                      data.role === UserRole.MODERATOR)) &&
                    user?.uid !== data.uid && (
                      <>
                        <Button
                          colorScheme={"blue"}
                          onClick={() => showChangeRoleModal(data)}
                        >
                          Change Role
                        </Button>
                        {/* <Button colorScheme={"red"}>Delete</Button> */}
                      </>
                    )}
                </>
              )}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Wrap>
        <ChangeUserRole role={UserRole.MODERATOR} />

        <ChangeUserRole role={UserRole.ADMIN} />
        <ChangeUserVerification />
      </Wrap> */}
      <Modal isOpen={isChangeRoleOpen} onClose={onChangeRoleClose} size="lg">
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Change User Role</ModalHeader>
          <ModalBody>
            <UserRoleDropdown
              current={changeRoleTo}
              onChange={(r) => setChangeRoleTo(r as UserRole)}
            />
            {changeRoleUser && (
              <ChangeUserRole
                user={changeRoleUser}
                role={changeRoleTo || UserRole.MODERATOR}
                callback={onUserRoleChangeSuccess}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
