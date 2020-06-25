import React from "react";
import { PseudoBox } from "@chakra-ui/core";
import "../index.css";

const TypingBox = (props) => {
  const words = props.words;
  const checkWord = props.compWord;
  return (
    <PseudoBox
      id="typing-box"
      as="input"
      placeholder=" happy typing!"
      border="green.100"
      borderRadius="1px"
      rounded="sm"
      bg="gray.200"
      alignSelf="center"
      maxW="30%"
      textAlign="center"
      my="5"
      h="2rem"
      _focus={{
        borderColor: "green.100",
      }}
      onChange={(w) => checkWord(words, w.target.value)}
    />
  );
};

export default TypingBox;
