import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PlaylistPlayer } from "./NewPlaylistPlayer";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

import LinearProgress from "@mui/material/LinearProgress";
// import './App.scss'
import "./asset/css/index.css";
const axios = require("axios");

function PlayList() {
  // auth
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.location.href.split("id=")[1]) {
      const user_id = sessionStorage.getItem("userDetails");
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
  },[]);
  // console.log(allPlaylistData.length);
  return (
    <>
      <div className="borderRadius todayList">
        
          {window.location.href.split("id=")[1] ? (
            <div className="App" style={{ marginTop: "24px" }}>
              <div className="App__player">
                <PlaylistPlayer playlists={allPlaylistData} />
              </div>
            </div>
          ) : (
            <div className="App" style={{ marginTop: "1%" }}>
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
