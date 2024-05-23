/*import ResponsiveAppBar from "../src/components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
    </div>
  );
}

export default App;
*/
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ResponsiveAppBar from "../src/components/navbar/navbar";
import RPEScore from "./components/RPE/RPEScore";
import RPEDashboard from "./components/RPE/RPEDashboard";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      {/* autres composants */}
      <Routes>
        <Route path="/RPEScore" element={<RPEScore />} />
        <Route path="/RPEDashboard" element={<RPEDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
