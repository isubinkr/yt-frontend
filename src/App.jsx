import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutLoader } from "./components/layouts/Loaders";
import ProtectRoute from "./components/auth/ProtectRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const WatchVideo = lazy(() => import("./pages/WatchVideo"));
const History = lazy(() => import("./pages/History"));
const Playlists = lazy(() => import("./pages/Playlists"));
const YourVideos = lazy(() => import("./pages/YourVideos"));
const LikedVideos = lazy(() => import("./pages/LikedVideos"));
const NotFound = lazy(() => import("./pages/NotFound"));

const user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          {/* Private Routes */}
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/watch/:videoId" element={<WatchVideo />} />
            <Route path="/history" element={<History />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/your-videos" element={<YourVideos />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
