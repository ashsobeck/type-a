import React from 'react';
import '../index.css'
import { Box } from '@chakra-ui/core'
import words from "./words.json";


const WordBox = () => {
  const getWords = () => {
    const typingWords = [];

    words.english.forEach((w) => {
      typingWords.push(w);
    });
    console.log(typingWords);

    return typingWords;
  };
  
  return (
    <Box bg='gray.100' w='25%' my='50' rounded='lg' wordBreak="break-word"> 
      {getWords().map(word => (word + " "))}
    </Box>
  );
};

export default WordBox;