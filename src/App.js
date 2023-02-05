import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewGoal from "./pages/ViewGoal";
import MyGoals from "./pages/MyGoals";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/goals" element={<MyGoals />} />
      <Route path="/goal/:id" element={<ViewGoal />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
