import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ViewGoal from "./pages/ViewGoal";
import MyGoals from "./pages/MyGoals";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <>
      <ChakraProvider>
        <NavBar />
        <Routes>
          <Route path="/goals" element={<MyGoals />} />
          <Route path="/goal/:goalId/:view" element={<ViewGoal />} />
          <Route path="*" element={<MyGoals />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
