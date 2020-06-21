import React from 'react';
import '../index.css';
import { Box, Text, Flex } from '@chakra-ui/core';
import words from './words.json';

const WordBox = () => {
  const getWords = (numWords) => {
    const numW = numWords;
    let typingWords = [];

    // words.english.forEach((w) => {
    //   typingWords.push(w);
    // });

    typingWords = Array.from(
      { length: numW },
      // () => words.english[Math.floor(Math.random * words.english.length]
      () => words.english[Math.floor(Math.random() * words.english.length)]
    );

    console.log(typingWords);

    return typingWords;
  };

  const highlightRandWord = (current) => {
    const words = getWords(50);
    let textBoxes = [];
    const randomHighlight = Math.floor(Math.random() * words.length);
    let currWord = current;

    words.forEach((w) => {
      // if we're at the current word, highlight it
      randomHighlight === currWord
        ? textBoxes.push(
            <Text
              as="span"
              m="2"
              direction="ltr"
              fontSize="md"
              className="word-highlighted"
              color="green.500"
            >
              {w}
            </Text>
          )
        : textBoxes.push(
            <Text
              as="span"
              m="2"
              direction="ltr"
              fontSize="md"
              className="word"
              color="grey.800"
            >
              {w}
            </Text>
          );
      currWord++;
    });

    return textBoxes;
  };

  return (
    <Box
      className="word-box"
      display="block"
      bg="gray.100"
      maxW="100%"
      h="auto"
      overflowWrap="break-word"
      alignSelf="center"
      rounded="lg"
    >
      {highlightRandWord().map((t) => t)}
    </Box>
  );
};

export default WordBox;
