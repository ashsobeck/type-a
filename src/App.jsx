import React from "react";
import "./index.css";
import words from "./WordBox/words.json";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import { ThemeProvider, CSSReset, Flex, Box, Text } from "@chakra-ui/core";
import { render } from "@testing-library/react";

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

  let currentWord = 0;
  const highlightCurrWord = (current, listOfWords) => {
    let textBoxes = [];
    let currWord = current;
    let renderedWord = 0;
    console.log("here");

    listOfWords.forEach((w) => {
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

  let wordlist = getWords(100);

  const compareWords = (words, playerWord) => {
    console.log("this works  " + playerWord);
    if (playerWord.slice(-1) === " ") {
      currentWord++;
      console.log("currentWord = " + currentWord);
      render(highlightCurrWord(currentWord, words));
    }
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <Box>
        <Flex
          className="test-area"
          alignContent="center"
          justify="center"
          flexDirection="column"
          w="32%"
          margin="auto"
          h="100vh"
          alignItems="center"
        >
          <WordBox words={highlightCurrWord(currentWord, wordlist)} />
          <TypingBox words={wordlist} compWord={compareWords} />
        </Flex>
      </Box>
    </ThemeProvider>
  );
};

export default App;
