import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Accuracy = (props) => {
  return (
    <Box fontSize="sm" my="5" h="2rem" alignContent="center">
      <Text my="2" direction="ltr" textAlign="center">
        {props.acc} | acc
      </Text>
    </Box>
  );
};

export default Accuracy;
