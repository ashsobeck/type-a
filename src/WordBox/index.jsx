import React from "react";
import { Box } from "@chakra-ui/core";

const WordBox = (props) => {
  return (
    <Box
      className="word-box"
      bg="gray.100"
      p="1"
      maxW="90%"
      minW="36%"
      w={["97%", "70%", "50%", "35%"]}
      h="auto"
      alignSelf="center"
      rounded="lg"
      display="block"
      direction="ltr"
      textAlign="left"
      boxShadow="xl"
    >
      {props.renderWord(props.currentWord, props.wordlist).map((t) => t)}
    </Box>
  );
};

export default WordBox;
