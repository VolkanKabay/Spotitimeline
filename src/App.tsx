import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./components/Callback";
import SpotifyAuth from "./components/SpotifyAuth";
import Timeline from "./components/Timeline";
import Tracks from "./components/Tracks";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/tracks" element={<Tracks />} />
      </Routes>
    </Router>
  );
};

export default App;
