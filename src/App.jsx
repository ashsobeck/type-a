import React from 'react';
import './index.css';
import TypingBox from './TypingBox';
import WordBox from './WordBox';
import { ThemeProvider, CSSReset, Flex } from '@chakra-ui/core';

const App = () => {
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
        <WordBox />
        <TypingBox />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
