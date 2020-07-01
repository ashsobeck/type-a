import React from "react";
import { PseudoBox } from "@chakra-ui/core";

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
      w="10rem"
      textAlign="center"
      boxShadow="md"
      my="5"
      h="2rem"
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
