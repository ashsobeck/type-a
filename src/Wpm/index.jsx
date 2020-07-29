import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Wpm = (props) => {
  const wpmStr = `wpm | ${props.wpm}`;
  console.log(wpmStr);
  return (
    <Box id="wpm" my="5" fontSize="sm" h="2.2rem" alignContent="center">
      <Text my="2" direction="ltr" textAlign="left">
        {wpmStr}
      </Text>
    </Box>
  );
};

export default Wpm;
