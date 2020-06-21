import React from 'react';
import './index.css';
import InputField from './InputField';
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
        w="34%"
        margin="auto"
        my="20%"
      >
        <WordBox />
        <InputField textPlace="text-center" />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
