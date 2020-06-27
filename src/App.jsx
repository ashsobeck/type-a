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

    return typingWords;
  };

  const [numWords, setNumWords] = useState(10);
  const [wordlist, setWordlist] = useState(getWords(numWords));

  const highlightCurrWord = (current, listOfWords) => {
    let textBoxes = [];
    let currWord = current;
    let renderedWord = 0;

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
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const calculateWPM = () => {
    // in milliseconds!
    const timeElapsed = endTime - startTime;
  };

  const compareWords = (currWord, playerWord) => {
    // making sure players can't spam the space bar to increase
    // currentWord
    if (playerWord.target.value === " ") {
      playerWord.target.value = "";
      return;
    }
    // moving to the next word
    if (
      playerWord.target.value.slice(-1) === " " &&
      playerWord.target.value.length > 1
    ) {
      // moving to the next word if we aren't at the end
      if (playerWord.target.value.substring(0, currWord.length) === currWord) {
        console.log(correctWords);
        setCorrectWords(correctWords + 1);
        console.log(correctWords);
      }
      if (currentWord < numWords - 1) {
        setCurrentWord(currentWord + 1);
        if (typeBoxColor === "red.100") setTypeBoxC("blue.100");
      } else {
        // test is done, going to calculations now
        setEndTime(Date.now());
        calculateWPM();
        // setCurrentWord(0);
      }
      // clear the input box every time we go to the next word
      playerWord.target.value = "";
    } else if (
      // checking the correctness of the in progress word
      // blue for good red for bad
      playerWord.target.value !==
      currWord.substring(0, playerWord.target.value.length)
    ) {
      setTypeBoxC("red.100");
    } else if (typeBoxColor === "red.100") {
      setTypeBoxC("blue.100");
    } else if (
      // start the timer
      currentWord === 0 &&
      (playerWord.target.value !== " " || playerWord.target.value !== "")
    ) {
      setStartTime(Date.now());
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
