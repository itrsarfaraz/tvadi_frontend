import { Link } from "@mui/material";
import React, { useState } from "react";
import "../asset/css/footer.css";
import tvImage from "../asset/images/Button_GoToMainPlayer2.png";
import main_logo from "../asset/images/logo.png";
import user_menu_logo from "../asset/images/Button_goToUserPage2.png";
import { NavLink, useNavigate } from "react-router-dom";

function Footer() {
  const userDetails = sessionStorage.getItem("userDetails");

  return (
    <>
          <footer className="footer">
            <Link>
              <ul className="ul-div">
                <NavLink className="navLink" to="/">
                  Home
                </NavLink>
                <NavLink className="navLink" to="/about">
                  About us
                </NavLink>
                <NavLink className="navLink" to="/playlist">
                  My Playlist
                </NavLink>
                <NavLink className="navLink" to="/creator">
                  Playlist Creator
                </NavLink>
                <NavLink className="navLink" to="/contact">
                  Contact
                </NavLink>
              </ul>
            </Link>
          </footer>
    </>
  );
}
// className={OpenMenuBar?"dropDown":"dropDown hidden"}
// onClick={OpenMenuBar?setOpenMenuBar(false):setOpenMenuBar(true)}
export default Footer;
