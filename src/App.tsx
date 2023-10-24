import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecVideos } from "./pages/recVideos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={RecVideos} />
      </Routes>
    </Router>
  );
}

export default App;
