import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import HomePage from "./pages/homePage/HomePage";
import GamePage from "./pages/gamePage/GamePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ListPage from "./pages/listPage/ListPage";
import CustomListPage from "./pages/customListPage/CustomListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/backlog" element={<ListPage listType={"backlog"} />} />
        <Route path="/playing" element={<ListPage listType={"playing"} />} />
        <Route path="/played" element={<ListPage listType={"played"} />} />
        <Route path="/customList/:listTitle/:listId" element={<CustomListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
