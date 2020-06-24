import React from "react";
import "../index.css";
import words from "./words.json";
import { Box, Text } from "@chakra-ui/core";

const WordBox = (props) => {
  const getWords = (numWords) => {
    const numW = numWords;
    let typingWords = [];

    typingWords = Array.from(
      // make an array of the length passed in from random
      // indeces of the words file
      { length: numW },
      () => words.english[Math.floor(Math.random() * words.english.length)]
    );

    console.log(typingWords);

    return typingWords;
  };

  const highlightCurrWord = (current, listOfWords) => {
    const words = listOfWords;
    let textBoxes = [];
    let currWord = current;
    let renderedWord = 0;

    words.forEach((w) => {
      // if we're at the current word, highlight it
      renderedWord === currWord
        ? textBoxes.push(
            <Text
              as="span"
              m="1"
              direction="ltr"
              fontSize="md"
              className="word-highlighted"
              color="green.500"
            >
              {w + " "}
            </Text>
          )
        : textBoxes.push(
            <Text
              as="span"
              m="1"
              direction="ltr"
              fontSize="md"
              className="word"
              color="grey.800"
            >
              {w + " "}
            </Text>
          );
      renderedWord++;
    });

    return textBoxes;
  };

  const wordlist = highlightCurrWord(0, getWords(100));

  return (
    <Box
      className="word-box"
      bg="gray.100"
      p="1"
      maxW="100%"
      h="auto"
      alignSelf="center"
      rounded="lg"
      display="block"
      direction="ltr"
      textAlign={["left"]}
      boxShadow="xl"
    >
      {wordlist.map((t) => t)}
    </Box>
  );
};

export default WordBox;
