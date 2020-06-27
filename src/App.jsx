import React, { useState } from "react";
import "./index.css";
import words from "./WordBox/words.json";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import { ThemeProvider, CSSReset, Flex, Box, Text } from "@chakra-ui/core";

const App = () => {
  const [currentWord, setCurrentWord] = useState(0);

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

  const [numWords, setNumWords] = useState(100);
  const [wordlist, setWordlist] = useState(getWords(numWords));

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
              fontSize="md"
              className="word-highlighted"
              color="green.400"
            >
              {w + " "}
            </Text>
          )
        : textBoxes.push(
            <Text
              as="span"
              m="1"
              fontSize="md"
              className="word"
              color="grey.900"
            >
              {w + " "}
            </Text>
          );
      renderedWord++;
    });

    return textBoxes;
  };

  const [typeBoxColor, setTypeBoxC] = useState("blue.100");

  const compareWords = (currWord, playerWord) => {
    if (playerWord.target.value === " ") {
      playerWord.target.value = "";
      return;
    }
    if (
      playerWord.target.value.slice(-1) === " " &&
      playerWord.target.value.length > 1
    ) {
      if (currentWord < numWords - 1) {
        setCurrentWord(currentWord + 1);
        if (typeBoxColor === "red.100") setTypeBoxC("blue.100");
      } else {
        setCurrentWord(0);
      }
      playerWord.target.value = "";
    } else {
      if (
        playerWord.target.value !==
        currWord.substring(0, playerWord.target.value.length)
      ) {
        setTypeBoxC("red.100");
      } else {
        if (typeBoxColor === "red.100") setTypeBoxC("blue.100");
      }
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
          <WordBox
            renderWord={highlightCurrWord}
            wordlist={wordlist}
            currentWord={currentWord}
          />
          <TypingBox
            words={wordlist}
            compWord={compareWords}
            currentWord={currentWord}
            color={typeBoxColor}
          />
        </Flex>
      </Box>
    </ThemeProvider>
  );
};

export default App;
