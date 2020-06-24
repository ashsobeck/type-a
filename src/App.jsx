import React from "react";
import "./index.css";
import TypingBox from "./TypingBox";
import WordBox from "./WordBox";
import { ThemeProvider, CSSReset, Flex, Box } from "@chakra-ui/core";

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box>
        <Flex
          className="test-area"
          alignContent="center"
          justify="center"
          flexDirection="column"
          w="32%"
          margin="auto"
          h="100vh"
          alignItems="center"
        >
          <WordBox />
          <TypingBox />
        </Flex>
      </Box>
    </ThemeProvider>
  );
};

export default App;
