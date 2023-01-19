import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import TaskList from "./components/TaskList.js";

function App() {
  return (
    <ChakraProvider>
      <TaskList />
    </ChakraProvider>
  );
}
export default App;
