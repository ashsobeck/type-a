import React from "react";
import { Box } from "@chakra-ui/core";

const WordBox = (props) => {
  return (
    <Box
      className="word-box"
      bg="gray.100"
      p="1"
      h="auto"
      alignSelf="center"
      rounded="lg"
      display="block"
      direction="ltr"
      w={["85%", "77%", "72%", "67%"]}
      // maxW="80%"
      textAlign="left"
      boxShadow="xl"
    >
      {props.renderWord(props.currentWord, props.wordlist)}
    </Box>
  );
};

export default WordBox;
