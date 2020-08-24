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
      w={
        props.wordlist.length > 25
          ? ["85%", "77%", "72%", "43%"]
          : ["85%", "77%", "72%", "50%"]
      }
      // maxW="80%"
      textAlign="left"
      boxShadow="xl"
    >
      {props.renderWord(
        props.currentWord,
        props.wordlist,
        props.listOfWrong,
        props.listOfRight
      )}
    </Box>
  );
};

export default WordBox;
