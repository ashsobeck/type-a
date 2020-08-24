import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Accuracy = (props) => {
  const accStr = `     ${props.acc}`;
  const accAppend = " | acc";
  return (
    <Box id="acc" fontSize="sm" my="5" h="2.2rem" alignContent="right">
      <Text my="2" direction="ltr" textAlign="right" ml="1" paddingLeft=".1">
        {accStr + accAppend}
      </Text>
    </Box>
  );
};

export default Accuracy;
