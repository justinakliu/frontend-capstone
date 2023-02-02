import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ViewGoal } from "./pages/ViewGoal";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/goals" element={<ViewGoal />} />
    </Routes>
  );
}
