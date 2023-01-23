import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

const Task = (props) => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md"> {props.name}</Heading>
      </Box>
      <Spacer />
      <Button onClick={() => {}}>x</Button>
    </Flex>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  onSetComplete: PropTypes.func.isRequired,
};
