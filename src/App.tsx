import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import LocationPage from './pages/LocationPage/LocationPage';
import MyPage from './pages/MyPage/MyPage';
import CommunityPage from "./pages/CommunityPage/Main/CommunityPage";
import WritePage from "./pages/CommunityPage/Write/WritePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/map" element={<LocationPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<WritePage />} />
      </Routes>
    </Router>
  );
}

export default App;
