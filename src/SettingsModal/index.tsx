import React from "react";
import {
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  PseudoBox,
} from "@chakra-ui/core";
import { Settings } from "react-feather";
import "../index.css";

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        // backgroundColor="white"
        border="false"
        icon={Settings}
        aria-label="settings"
        onClick={onOpen}
        _active={{ className: "image" }}
        className="image"
        bg="transparent"
        _focus={{ outline: "none" }}
        _hover={{ bg: "transparent", color: "green.400" }}
      ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hi</ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
