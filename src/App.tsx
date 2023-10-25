import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { RecVideos } from "./pages/recVideos";
// import { ViewVideos } from "./pages/viewVideos";
import { Suspense, lazy } from "react";

const RecVideos = lazy(() => import("./pages/recVideos"));
const ViewVideos = lazy(() => import("./pages/viewVideos"));
const ViewUnicVideo = lazy(() => import("./pages/viewUnicVideo"));

function Loading() {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex justify-center items-center text-center">
      <h1 className="text-muted-foreground font-semibold text-lg">Loading...</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <Suspense fallback={Loading()}>
              <RecVideos />
            </Suspense>
          }
        />
        <Route
          path="/videos"
          element={
            <Suspense fallback={Loading()}>
              <ViewVideos />
            </Suspense>
          }
        />
        <Route
          path="/unic/video"
          element={
            <Suspense fallback={Loading()}>
              <ViewUnicVideo />
            </Suspense>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
