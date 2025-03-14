import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";
import SpotifyAuth from "./SpotifyAuth";
import Timeline from "./Timeline";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
};

export default App;
