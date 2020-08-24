import React, { useState } from "react";
import "./index.css";
import words from "./WordBox/words.json";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import Wpm from "./Wpm";
import Accuracy from "./Accuracy";
import SettingsModal from "./SettingsModal";
import { RefreshCw } from "react-feather";
import {
  ChakraProvider,
  CSSReset,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/core";

import theme from "@chakra-ui/theme";

const App = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [typeBoxColor, setTypeBoxC] = useState("blue.100");
  let start = 0;
  let endTime = 0;
  const [startTime, setStartTime] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [netWpm, setNetWpm] = useState(0);
  const [grossWpm, setGrossWpm] = useState(0);
  const [acc, setAcc] = useState(0);
  const [numWords, setNumWords] = useState(10);
  const [listOfWrong, setListOfWrong] = useState([]);
  const [listOfRight, setListOfRight] = useState([]);
  const [autoReset, setAutoReset] = useState(false);
  const [uncorrectedErrors, setUncorrectedErrors] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const getWords = (numWords) => {
    return Array.from(
      // make an array of the length passed in from random
      // indeces of the words file
      { length: numWords },
      () => words.english[Math.floor(Math.random() * words.english.length)]
    );
  };
  const [wordlist, setWordlist] = useState(getWords(numWords));

  const highlightCurrWord = (
    current,
    listOfWords,
    listOfWrong,
    listOfRight
  ) => {
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
              color={
                listOfRight.includes(renderedWord)
                  ? "blue.400"
                  : listOfWrong.includes(renderedWord)
                  ? "orange.400"
                  : "grey.900"
              }
            >
              {w + " "}
            </Text>
          );
      renderedWord++;
    });
    return textBoxes;
  };

  const diffBetweenTwoWords = (wordOne, wordTwo) => {
    let diff = 0;
    for (let i = 0; i < wordOne.length; i++) {
      if (wordOne.charAt(i) !== wordTwo.charAt(i)) diff++;
    }
    return diff;
  };

  const calculateWPM = () => {
    // put into mins
    const timeElapsed = (endTime - startTime) / 1000 / 60;
    // 5 is the average length of a word, bigger words will count more
    const wordsTyped = correctChars / 5;
    setGrossWpm(wordsTyped / timeElapsed);
    setNetWpm(Math.trunc((wordsTyped - uncorrectedErrors) / timeElapsed));
    setAcc(
      Math.trunc(
        ((wordsTyped - uncorrectedErrors) /
          timeElapsed /
          (wordsTyped / timeElapsed)) *
          100
      )
    );
  };

  const reset = () => {
    setStartTime(0);
    setCorrectChars(0);
    setCurrentWord(0);
    setWordlist(getWords(numWords));
    setListOfWrong([]);
    setListOfRight([]);
    setTypeBoxC("blue.100");
    setUncorrectedErrors(0);
    setIsFocus(true);

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
      start = Date.now();
      setStartTime(start);
      console.log(`starttime: ${start}`);
      // setNumChars(() => {
      //   let numC = 0;
      //   wordlist.forEach((w) => {
      //     numC += w.length + 1;
      //   });
      //   return numC;
      // });
    }
    if (
      playerWord.target.value.slice(-1) === " " &&
      playerWord.target.value.length > 1
    ) {
      // moving to the next word if we aren't at the end
      if (playerWord.target.value.substring(0, currWord.length) === currWord) {
        setCorrectChars(correctChars + playerWord.target.value.length);

        listOfRight.push(currentWord);
        setListOfRight(listOfRight);
      } else {
        const localDiff = diffBetweenTwoWords(
          currWord,
          playerWord.target.value
        );
        setUncorrectedErrors(uncorrectedErrors + localDiff);
        setCorrectChars(
          correctChars + Math.max(0, currWord.length - localDiff)
        );
        listOfWrong.push(currentWord);
        setListOfWrong(listOfWrong);
      }
      if (currentWord < numWords - 1) {
        setCurrentWord(currentWord + 1);
        if (typeBoxColor === "red.100") {
          setTypeBoxC("blue.100");
        }
      } else {
        // test is done, going to calculations now
        endTime = Date.now();
        setCurrentWord(currentWord + 1);
        calculateWPM();
        // let localAcc = (netWpm / grossWpm) * 100;
        // setAcc(localAcc);
        console.log(netWpm);
        if (autoReset) reset();
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
    <ChakraProvider theme={theme}>
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
          <SettingsModal
            numWords={numWords}
            autoReset={autoReset}
            getWords={getWords}
            setNumWords={setNumWords}
            setWordlist={setWordlist}
            setAutoReset={setAutoReset}
          ></SettingsModal>
          <WordBox
            renderWord={highlightCurrWord}
            wordlist={wordlist}
            currentWord={currentWord}
            listOfWrong={listOfWrong}
            listOfRight={listOfRight}
          />
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            w={
              wordlist.length > 25
                ? ["85%", "77%", "72%", "40%"]
                : ["85%", "77%", "72%", "50%"]
            }
            alignItems="center"
          >
            <Wpm wpm={netWpm} />
            <Flex
              flexDirection="row"
              alignItems="center"
              p="3"
              position="center
              "
            >
              <TypingBox
                words={wordlist}
                compWord={compareWords}
                currentWord={currentWord}
                color={typeBoxColor}
                isFocus={isFocus}
              />
              <IconButton
                icon={<RefreshCw size="16" className="image" p="5" />}
                mr="3"
                mx="1"
                my="5"
                backgroundColor="gray.200"
                boxShadow="md"
                h="2.2rem"
                onClick={() => {
                  setIsFocus(true);
                  reset();
                }}
              />
            </Flex>
            <Accuracy acc={acc} />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
