import React from 'react';
import '../index.css';
import { Box } from '@chakra-ui/core';

const WordBox = (props) => {
  const words = Array.from(props.words);

  // const printWords = () => {
  //   return
  // };

  return (
    <Box
      className="word-box"
      bg="gray.100"
      p="1"
      maxW="100%"
      h="auto"
      alignSelf="center"
      rounded="lg"
      display="block"
      direction="ltr"
      textAlign={['left']}
      boxShadow="xl"
    >
      {words.map((t) => t)}
    </Box>
  );
};

export default WordBox;
