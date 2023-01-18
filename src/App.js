import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import TaskTree from "./components/TaskTree.js";

function App() {
  return (
    <ChakraProvider>
      <TaskTree />
    </ChakraProvider>
  );
}
export default App;
