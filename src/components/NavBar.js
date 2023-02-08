import { Flex, Spacer, Heading, IconButton, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

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
      <IconButton
        icon={<Icon as={AiOutlineHome} />}
        onClick={() => navigate("/goals")}
      ></IconButton>
    </Flex>
  );
};

export default NavBar;
