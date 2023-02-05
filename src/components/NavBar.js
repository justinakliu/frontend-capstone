import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100vw"
      h="60px"
      padding={6}
      bg="blue.200"
      align="center"
      justify="space-between"
    >
      <Flex align="center">
        <Heading size="lg">GoalTree</Heading>
      </Flex>
      <Spacer />
      <Button onClick={() => navigate("/goals")}>My Goals</Button>
    </Flex>
  );
};

export default NavBar;
