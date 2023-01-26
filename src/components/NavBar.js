import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex w="100vw" h="60px" padding={6}>
      <Flex align="center">
        <Heading size="lg">GoalTree</Heading>
      </Flex>
    </Flex>
  );
};

export default NavBar;
