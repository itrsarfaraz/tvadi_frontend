import { Link } from "@mui/material";
import React, { useState } from "react";
import "../asset/css/back.css";
import tvImage from "../asset/images/Button_GoToMainPlayer2.png";
import gearImage from "../asset/images/gear.png";
import main_logo from "../asset/images/LoginLogo.png";
import user_menu_logo from "../asset/images/Button_goToUserPage2.png";
import { NavLink, useNavigate } from "react-router-dom";

function Back() {
  const CloseMenu = () => {
    if (OpenMenuBar == true) {
      setOpenMenuBar(false);
    }
  };
  const [OpenMenuBar, setOpenMenuBar] = useState(false);
  const setOpenMenuBarChange = () => {
    if (OpenMenuBar) {
      setOpenMenuBar(false);
    } else {
      setOpenMenuBar(true);
    }
  };

  const userDetails = sessionStorage.getItem("userDetails");

  return (
    <>
      <header onClick={CloseMenu} className="header">
        <div className="tv-logo">
          
        </div>
        <div className="main-logo">
          <NavLink to="home" className="img_link">
            <img src={main_logo} alt="logo" />
          </NavLink>
        </div>
        <div className="user-menu-logo">
          <Link
            onClick={setOpenMenuBarChange}
            className="img_link"
            style={{ position: "relative" }}
          >
            <img
              src={user_menu_logo}
              alt="menu_logo"
              className="userMenuLogo"
              style={{ cursor: "pointer" , width:"40px" }}
            />
            <ul className={OpenMenuBar ? "dropDown" : "dropDown hidden"}>
              <NavLink className="navLink" to="/">
                Home
              </NavLink>
              <NavLink className="navLink" to="/playlist">
                My Playlist
              </NavLink>
              <NavLink className="navLink" to="/creator">
                Playlist Creator
              </NavLink>
              {userDetails != null ? (
                <>
                  <NavLink className="navLink" to="/profile">
                    Profile
                  </NavLink>
                  <NavLink className="navLink" to="/logout">
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="navLink" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="navLink" to="/register">
                    Create Account
                  </NavLink>
                </>
              )}

              
            </ul>
          </Link>
          <NavLink to="playlist" className="img_link">
            <img src={gearImage} alt="tvIcon" />
          </NavLink>
          
          <NavLink to="playlist" className="img_link">
            <img src={tvImage} alt="tvIcon" />
          </NavLink>

          
        </div>
      </header>
    </>
  );
}
export default Back;
