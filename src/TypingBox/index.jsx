import React from 'react';
import { PseudoBox } from '@chakra-ui/core';
import '../index.css';

const TypingBox = (props) => {
  return (
    <PseudoBox
      as="input"
      placeholder=" happy typing!"
      border="green.100"
      rounded="sm"
      bg="gray.200"
      alignSelf="center"
      maxW="30%"
      textAlign="center"
      my="5"
      h="2rem"
      _focus={{}}
    />
  );
};

export default TypingBox;
