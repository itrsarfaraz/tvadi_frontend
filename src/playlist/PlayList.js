import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlaylistPlayer } from "./PlaylistPlayer";
import { toast } from "react-toastify";
// import './App.scss'
import "./asset/css/index.css";
const axios = require("axios");

function PlayList() {
  // auth
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.location.href.split("id=")[1]) {
      const user_id = sessionStorage.getItem("userDetails");
      if (!user_id) {
        navigate("/login?from=dfbchebf5254652dnsfydf");
        toast.warning("Please Login First!");
      }
      if (allPlaylistData.length == 0) {
        // toast.warning("First Create a Playlist!");
        // navigate("/creator")
      }
    }
  }, []);

  // code
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  var playThumbnail = [];

  useEffect(() => {
    // document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.maxWidth = "1330px";

    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
      .then((res) => {
        if (res.data.length != 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].title == "test") res.data.splice(i, 1);
          }

          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < 1; j++) {
              if (res.data[i].videos.length != 0)
                playThumbnail.push(res.data[i].videos[j].thumbnail);
              else if (res.data[i].videos.length == 0) {
                playThumbnail.push("no");
              }
            }
          }
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].image = playThumbnail[i];
          }

          if (!window.location.href.split("id=")[1]) {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].videos.length; j++) {
                if (res.data[i].videos[j].likes_by != null) {
                  // String Search

                  if (
                    res.data[i].videos[j].likes_by.search(
                      JSON.parse(sessionStorage.getItem("userDetails")).user_id
                    ) != -1
                  ) {
                    res.data[i].videos[j].likesThisUser = true;
                  } else {
                    res.data[i].videos[j].likesThisUser = false;
                  }
                } else {
                  res.data[i].videos[j].likesThisUser = false;
                }
              }
            }
          }

          SetPlaylist(res.data);
          SetLoadData(true);
        }
      })
      .catch((err) => {
        SetLoadData(false);
      });
  }, [allPlaylistData]);
  const [CloseMenu, SetCloseMenu] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  useEffect(() => {
    if (CloseMenu == true) {
      if (window.location.href.split("id=")[1]) {
        // document.getElementsByClassName("dropDown")[0].classList.add("hidden");
      }
    }
    SetCloseMenu(false);
  });
  return (
    <>
      <div onClick={closeMenu} className="borderRadius todayList mb-3">
        {window.location.href.split("id=")[1] ? (
          <div className="App" style={{ marginTop: "24px" }}>
            <div className="App__player">
              <PlaylistPlayer playlists={allPlaylistData} />
            </div>
          </div>
        ) : (
          <div className="App" style={{ marginTop: "0" }}>
            <div className="App__player">
              <PlaylistPlayer playlists={allPlaylistData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PlayList;
