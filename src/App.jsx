import React from 'react';
import './index.css';
import words from './WordBox/words.json';
import TypingBox from './TypingBox';
import WordBox from './WordBox';
import { ThemeProvider, CSSReset, Flex, Text } from '@chakra-ui/core';

const App = () => {
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

  const highlightCurrWord = (current, numWords) => {
    const words = getWords(numWords);
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
              {w + ' '}
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
              {w + ' '}
            </Text>
          );
      renderedWord++;
    });

    return textBoxes;
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <Flex
        className="test-area"
        alignContent="center"
        justify="center"
        flexDirection="column"
        w="32%"
        margin="auto"
        my="15%"
      >
        <WordBox words={highlightCurrWord(0, 50)} />
        <TypingBox />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
