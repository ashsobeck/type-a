import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Wpm = (props) => {
  return (
    <Box fontSize="sm" my="5" h="2rem" alignContent="center">
      <Text my="2" direction="ltr" textAlign="center">
        wpm | {props.wpm}
      </Text>
    </Box>
  );
};

export default Wpm;
