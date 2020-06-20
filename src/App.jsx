import React from 'react';
import './index.css'
import InputField from './InputField';
import WordBox from './WordBox';
import { ThemeProvider, CSSReset, Flex } from '@chakra-ui/core'
import words from "./WordBox/words.json";


const App = () => {
  const getWords = () => {
    const typingWords = [];
    
    words.english.forEach(w => {
      typingWords.push(w);
    });
    console.log(typingWords);
    
    return typingWords;
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <Flex alignContent='center' align='column' justifyContent='center'>
        <WordBox typingWords={getWords} />
        <InputField class="typing-test-entry" textPlace="text-center" />
      </Flex>
    </ThemeProvider>
  );
};

export default App;