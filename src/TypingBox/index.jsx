import React from "react";
import { PseudoBox } from "@chakra-ui/core";
import "../index.css";

const TypingBox = (props) => {
  const pholder = props.currentWord === 0 ? " happy typing!" : "";
  return (
    <PseudoBox
      id="typing-box"
      as="input"
      placeholder={pholder}
      rounded="sm"
      bg="gray.200"
      alignSelf="center"
      maxW="30%"
      textAlign="center"
      boxShadow="md"
      my="5"
      h="2rem"
      _hover={{
        bg: "blue.100",
        boxShadow: "lg",
      }}
      _focus={{
        bg: "blue.100",
        outline: "none",
        boxShadow: "lg",
      }}
      onChange={(w) => props.compWord(w)}
    />
  );
};

export default TypingBox;
