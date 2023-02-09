import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewGoal from "./pages/ViewGoal";
import MyGoals from "./pages/MyGoals";
import NavBar from "./components/NavBar.js";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <>
      <ChakraProvider>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/goals" element={<MyGoals />} />
          <Route path="/goal/:goalId/:view" element={<ViewGoal />} />
          <Route path="*" element={<MyGoals />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
