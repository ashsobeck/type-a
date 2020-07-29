import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Accuracy = (props) => {
  const accStr = `  ${props.acc} | acc`;
  return (
    <Box id="acc" fontSize="sm" my="5" h="2.2rem" alignContent="flex-end">
      <Text my="2" direction="ltr" textAlign="left">
        {accStr}
      </Text>
    </Box>
  );
};

export default Accuracy;
