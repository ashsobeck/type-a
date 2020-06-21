import React from 'react';
import '../index.css';
import { Flex } from '@chakra-ui/core';

const WordBox = (props) => {
  const words = Array.from(props.words);

  // const printWords = () => {
  //   return
  // };

  return (
    <Flex
      className="word-box"
      bg="gray.100"
      p="1"
      maxW="100%"
      h="auto"
      justify="center"
      alignSelf="center"
      rounded="lg"
      display="block"
      direction="ltr"
      textAlign={['left']}
    >
      {words.map((t) => t)}
    </Flex>
  );
};

export default WordBox;
