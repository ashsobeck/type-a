import React, { useState } from "react";
import "./index.css";
import words from "./WordBox/words.json";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import Wpm from "./Wpm";
import {
  ThemeProvider,
  CSSReset,
  Flex,
  Box,
  Text,
  Grid,
} from "@chakra-ui/core";

const App = () => {
  const [currentWord, setCurrentWord] = useState(0);
  let numChars = 0;
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

  const [numWords, setNumWords] = useState(100);
  const [wordlist, setWordlist] = useState(getWords(numWords));

  const highlightCurrWord = (current, listOfWords) => {
    let textBoxes = [];
    let currWord = current;
    let renderedWord = 0;
    let count = 0;
    let idName = "";

    listOfWords.forEach((w) => {
      // if we're at the current word, highlight it
      // need to get the number of total characters for later calculation,
      // better to do it now than in another for each
      numChars += w.length;
      idName = `word-${count++}`;
      renderedWord === currWord
        ? textBoxes.push(
            <Text
              id={idName}
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
              id={idName}
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
  // const [startTime, setStartTime] = useState(0);
  let start = 0;
  const [startTime, setStartTime] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [wpm, setWpm] = useState(0);
  let endTime = 0;

  const calculateWPM = () => {
    // put into mins
    console.log("starttime: " + startTime);
    console.log("endtime: " + endTime);
    console.log("correctChars: " + correctChars);

    const timeElapsed = (endTime - startTime) / 1000 / 60;
    console.log(timeElapsed);
    // 5 is the average length of a word, bigger words will count more
    const wordsTyped = correctChars / 5;
    console.log(wordsTyped);
    setCorrectChars(0);
    return Math.floor(wordsTyped / timeElapsed);
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
      // start the timer
      currentWord === 0 &&
      startTime === 0 &&
      (playerWord.target.value !== " " || playerWord.target.value !== "")
    ) {
      console.log("here");
      // setStartTime(Date.now());
      start = Date.now();
      setStartTime(start);
      console.log(`starttime: ${start}`);
    }
    if (
      playerWord.target.value.slice(-1) === " " &&
      playerWord.target.value.length > 1
    ) {
      // moving to the next word if we aren't at the end
      if (playerWord.target.value.substring(0, currWord.length) === currWord) {
        setCorrectChars(
          currentWord < numWords - 1
            ? correctChars + currWord.length + 1
            : correctChars + currWord.length
        );
      }
      if (currentWord < numWords - 1) {
        setCurrentWord(currentWord + 1);
        if (typeBoxColor === "red.100") setTypeBoxC("blue.100");
      } else {
        // test is done, going to calculations now
        endTime = Date.now();
        setWpm(calculateWPM());
        setStartTime(0);
        setCurrentWord(0);
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
    }
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <Flex h="100%" w="100%">
        <Flex
          className="test-area"
          alignContent="center"
          justify="center"
          flexDirection="column"
          margin="auto"
          minW="36%"
          w="auto"
          h="100vh"
          alignItems="center"
        >
          <WordBox
            renderWord={highlightCurrWord}
            wordlist={wordlist}
            currentWord={currentWord}
          />
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            w={["94%", "67%", "47%", "33%"]}
            alignItems="center"
          >
            <Wpm wpm={wpm} />
            <TypingBox
              words={wordlist}
              compWord={compareWords}
              currentWord={currentWord}
              color={typeBoxColor}
            />
            <Wpm />
          </Flex>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

export default App;
