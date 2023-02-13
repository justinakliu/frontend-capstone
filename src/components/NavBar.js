import { Flex, Spacer, Heading, IconButton, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100vw"
      h="60px"
      padding={4}
      align="center"
      justify="space-between"
      borderBottomColor="orange.300"
      borderBottomWidth={3}
    >
      <Flex align="center">
        <Heading size="lg" fontStyle="italic" color="green.300">
          GoalTree
        </Heading>
      </Flex>
      <Spacer />
      <IconButton
        margin={2}
        size="sm"
        icon={<Icon as={AiOutlineHome} />}
        onClick={() => navigate("/goals")}
      ></IconButton>
    </Flex>
  );
};

export default NavBar;
