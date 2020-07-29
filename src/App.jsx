import React, { useState } from "react";
import "./index.css";
import words from "./WordBox/words.json";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import Wpm from "./Wpm";
import Accuracy from "./Accuracy";
import {
  ThemeProvider,
  CSSReset,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/core";

const App = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [typeBoxColor, setTypeBoxC] = useState("blue.100");
  // const [startTime, setStartTime] = useState(0);
  let start = 0;
  let endTime = 0;
  const [startTime, setStartTime] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(0);
  const [numWords, setNumWords] = useState(10);

  const getWords = (numWords) => {
    return Array.from(
      // make an array of the length passed in from random
      // indeces of the words file
      { length: numWords },
      () => words.english[Math.floor(Math.random() * words.english.length)]
    );
  };
  const [wordlist, setWordlist] = useState(getWords(numWords));
  const [numChars, setNumChars] = useState(() => {
    let numC = 0;
    wordlist.forEach((w) => {
      numC += w.length + 1;
    });
    return numC;
  });

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

  const calculateWPM = () => {
    // put into mins
    console.log("starttime: " + startTime);
    console.log("endtime: " + endTime);
    console.log("correctChars: " + correctChars);
    const timeElapsed = (endTime - startTime) / 1000 / 60;
    console.log(timeElapsed);
    // 5 is the average length of a word, bigger words will count more
    const wordsTyped = correctChars / 5;
    console.log(`num chars ${numChars}`);
    console.log(wordsTyped);
    return Math.floor(wordsTyped / timeElapsed);
  };

  const reset = () => {
    setStartTime(0);
    setCorrectChars(0);
    setCurrentWord(0);
    setWordlist(getWords(numWords));

    return;
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
      setNumChars(() => {
        let numC = 0;
        wordlist.forEach((w) => {
          numC += w.length;
        });
        return numC;
      });
    }
    if (
      playerWord.target.value.slice(-1) === " " &&
      playerWord.target.value.length > 1
    ) {
      // moving to the next word if we aren't at the end
      if (playerWord.target.value.substring(0, currWord.length) === currWord) {
        setCorrectChars(correctChars + playerWord.target.value.length);
      }
      if (currentWord < numWords - 1) {
        setCurrentWord(currentWord + 1);
        if (typeBoxColor === "red.100") {
          setTypeBoxC("blue.100");
        }
      } else {
        // test is done, going to calculations now
        endTime = Date.now();
        setWpm(calculateWPM());
        setAcc(Math.trunc((correctChars / numChars) * 100));
      }
      playerWord.target.value = "";
      return;
      // clear the input box every time we go to the next word
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
            w={["80%", "74%", "71%", "65%"]}
            alignItems="center"
          >
            <Wpm wpm={wpm} />
            <Flex flexDirection="row" alignItems="center">
              <TypingBox
                words={wordlist}
                compWord={compareWords}
                currentWord={currentWord}
                color={typeBoxColor}
              />
              <IconButton
                icon="repeat"
                mr="3"
                mx="1"
                my="5"
                backgroundColor="gray.200"
                boxShadow="md"
                h="2.2rem"
                onClick={reset}
              />
            </Flex>
            <Accuracy acc={acc} />
          </Flex>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

export default App;
