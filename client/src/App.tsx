import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../src/components/navbar/navbar";
import RPEScore from "./components/RPE/RPEScore";
import RPEDashboard from "./components/RPE/RPEDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<RPEScore />} />

        <Route path="/RPEScore" element={<RPEScore />} />
        <Route path="/RPEDashboard" element={<RPEDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
