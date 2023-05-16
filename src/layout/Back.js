import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../asset/css/back.css";
import tvImage from "../asset/images/Button_GoToMainPlayer2.png";
import main_logo from "../asset/images/LoginLogo.png";
import user_menu_logo from "../asset/images/Button_goToUserPage2.png";
import { NavLink } from "react-router-dom";



function Back() {
  const userDetails = sessionStorage.getItem("userDetails");


  return (
    <>
      <header className="header">
        <div className="tv-logo">
        </div>
        <div className="main-logo">
          <NavLink to="home" className="img_link">
            <img src={main_logo} alt="logo" />
          </NavLink>
        </div>
        <div className="user-menu-logo">
          <Link
            className="img_link"
            style={{ position: "relative" }}
          >
            <img
              src={user_menu_logo}
              alt="menu_logo"
              className="userMenuLogo dropdown-toggle dropdown-toggle-nocaret"
              style={{ width: "50px" }}
              data-bs-toggle="dropdown"
            />

            <ul className="dropdown-menu dropdown-menu-end">
              <NavLink to="/">
                <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Home</span></a>
                </li>
              </NavLink>
              <NavLink to="/playlist">
                <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>My Playlist</span></a>
                </li>
              </NavLink>
              <NavLink to="/make">
                <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Make</span></a>
                </li>
              </NavLink>
              {userDetails == null ?
                (<>
                  <NavLink to="/login">
                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Login</span></a>
                    </li>
                  </NavLink>
                  <NavLink to="/register">
                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-out-circle'></i><span>Create Account</span></a>
                    </li>
                  </NavLink>
                </>)
                :
                (<>


                  <NavLink to="/profile">
                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Profile</span></a>
                    </li>
                  </NavLink>
                  <NavLink to="/logout">
                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-out-circle'></i><span>Logout</span></a>
                    </li>
                  </NavLink>
                </>)
              }
            </ul>
          </Link>

          <NavLink to="playlist" className="img_link">
            <img src={tvImage} alt="tvIcon" />
          </NavLink>
        </div>

      </header>
    </>
  );
}
export default Back;
