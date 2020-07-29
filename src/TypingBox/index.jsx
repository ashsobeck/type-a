import React from "react";
import { PseudoBox } from "@chakra-ui/core";

const TypingBox = (props) => {
  const pholder = props.currentWord === 0 ? "happy typing!" : "";
  return (
    <PseudoBox
      id="typing-box"
      as="input"
      placeholder={pholder}
      rounded="sm"
      bg="gray.200"
      alignSelf="center"
      maxW="8rem"
      minW="4rem"
      w="auto"
      textAlign="center"
      boxShadow="md"
      my="5"
      ml="3"
      h="2.2rem"
      padding="4"
      _hover={{
        bg: props.color,
        boxShadow: "lg",
      }}
      _focus={{
        bg: props.color,
        outline: "none",
        boxShadow: "lg",
      }}
      onChange={(w) => props.compWord(props.words[props.currentWord], w)}
    />
  );
};

export default TypingBox;
