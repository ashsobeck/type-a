import React, { useState } from "react";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  keyframes,
} from "@chakra-ui/core";
import { Settings } from "react-feather";
import "../index.css";
const spin = keyframes`
  from { transform: rotate(0deg); }

  to { transform: rotate(360deg); }
`;

type SettingsProps = {
  numWords: number;
  autoReset: boolean;
  getWords: Function;
  setNumWords: Function;
  setWordlist: Function;
  setAutoReset: Function;
};

const SettingsModal = ({
  numWords,
  autoReset,
  getWords,
  setNumWords,
  setWordlist,
  setAutoReset,
}: SettingsProps) => {
  const [words, setWords] = useState(numWords);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        border="false"
        icon={<Settings />}
        aria-label="settings"
        onClick={onOpen}
        css={{
          animation: "freeze",
          ":hover": {
            "@media (prefers-reduced-motion: no-preference)": {
              animation: `${spin} infinite 4s linear`,
            },
          },
        }}
        className=""
        bg="transparent"
        _focus={{ outline: "none" }}
        _hover={{ bg: "transparent", color: "green.400" }}
      ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay>
          <ModalContent alignContent="center">
            <ModalHeader textAlign="center">Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Words
              <NumberInput
                w="25%"
                min={1}
                max={300}
                defaultValue={numWords}
                value={words}
                onChange={(numW) => {
                  setWords(+numW);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Checkbox
                colorScheme="green"
                p="1"
                isChecked={autoReset}
                mt={4}
                onChange={(e) => {
                  setAutoReset(e.target.checked);
                }}
              >
                Auto-Reset
              </Checkbox>
            </ModalBody>

            <ModalFooter alignItems="center">
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => {
                  if (+words !== numWords) {
                    setNumWords(+words);
                    setWordlist(getWords(+words));
                  }
                  onClose();
                }}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default SettingsModal;
