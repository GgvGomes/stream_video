import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecVideos } from "./pages/recVideos";
import { ViewVideos } from "./pages/viewVideos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={RecVideos} />
        <Route path="/videos" Component={ViewVideos} />
      </Routes>
    </Router>
  );
}

export default App;
