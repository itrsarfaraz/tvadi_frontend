import React from "react";
import { Routes, Route, BrowserRouter, Router, useNavigate, } from "react-router-dom";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ChangePassword from "../pages/ChangePassword";
import Logout from "../pages/Logout";
import Main from "../pages/Main";
import PlayList from "../playlist/PlayList";
import NewPlayList from "../playlist/NewPlayList";
import NewPlaylistCreator from "../new_creatorPlaylist/PlaylistCreator";
import HomeCreator from "../homePage/HomeCreator";
import Register from "../pages/Register";
import Error404 from "../pages/errors/Error404";
import Verify from "../pages/auth/Verify";
import Forgot from "../pages/auth/Forgot";
import NewHome from "../pages/NewHome";
import Player from "../pages/Player";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import YoutubeApi from "../pages/YoutubeApi";
import VimeoApi from "../pages/VimeoApi";
import Search from "../searchApi/youtubeApi/Search";

import PlaylistManager from "../playlistManger/PlaylistManager";

function RouteSys() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget" element={<ForgetPassword />} />
          <Route path="change_pass" element={<ChangePassword />} />
          <Route path="/" element={<NewHome />} />
          <Route path="home" element={<NewHome />} />
          {/* <Route path="/newhome" element={<HomePlayer />} /> */}
          <Route path="player" element={<Player />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="playlist" element={<PlayList />} />
          <Route path="newplaylist" element={<NewPlayList />} />
          {/* <Route path="oldcreator" element={<PlaylistCreator/>} /> */}
          <Route path="make" element={<NewPlaylistCreator />} />
          <Route path="home_page" element={<HomeCreator />} />
          <Route path="home_creator" element={<HomeCreator />} />
          <Route path="logout" element={<Logout />} />
          <Route path="youtube" element={<YoutubeApi />} />
          <Route path="vimeo" element={<VimeoApi />} />
          <Route path="youapi" element={<Search />} />
          <Route path="new" element={<PlaylistManager />} /> {/* new */}
          <Route path="user/verify" element={<Verify />} />
          <Route path="user/changepwd" element={<Forgot />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSys;
