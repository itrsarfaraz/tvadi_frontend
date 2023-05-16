import React, { useState, useRef, useEffect } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import { NavLink, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { ShareSocial } from "react-share-social";
import "../asset/css/index.css";
import { array } from "prop-types";
import { toast } from "react-toastify";


const axios = require("axios");
//  Set Item for Matrial Ui
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//  Home page main function
function Home() {


  const style = {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "white",
  };
  //Share Button

  const setOpenSettingBarChange = () => {
    if (OpenSettingBar) setOpenSettingBar(false);
    else {
      if (socialMediaMenu) {
        setSocialMediaMenu(false);
        setOpenSettingBar(false);
      } else setOpenSettingBar(true);
    }
  };



  const [OpenSettingBar, setOpenSettingBar] = useState(false);

  // Social Media Menu Bar
  const [socialMediaMenu, setSocialMediaMenu] = useState(false);

  const navigate = useNavigate();

  const [morePoolOn, SetmorePoolOn] = useState(true);
  const [OpenMenuBar, setOpenMenuBar] = useState(false);
  const [LikeImage, SetLikeImage] = useState(false);

  // End
  const [PlayUrl, setPlayUrl] = useState("");
  const [UrlDetails, setUrlDetails] = useState("");
  const [PlaylistDetails, setPlaylistDetails] = useState([]);
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [topPlaylistData, TopPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  const [allLiveVideolistData, SetLiveVideolist] = useState([]);
  const [allVideolistData, SetVideolist] = useState([]);
  const [allData, setallData] = useState("");
  const [videoIndex, setVideoIndex] = useState(0);
  const videoIndexx = (index) => {
    setVideoIndex(index + 1);
  };
  // Channel Data
  const [channelArray, SetChannelArray] = useState([]);
  const [allchannelArray, SetAllChannelArray] = useState([]);
  const [allPlaylistArray, SetAllPlaylistArray] = useState([]);
  const [RandomPoolData, SetRandomPoolData] = useState([]);
  const [MorePoolData, SetMorePoolData] = useState([]);
  const [HomePlayData, SetHomePlayData] = useState([]);






  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData", {
        headers: { Token: token },
      })
      .then((response) => {
        axios
          .get(process.env.REACT_APP_API_URL + "/homecontrol/getAlldata", {
            headers: { Token: token },
          }).then((res) => {



            for (let i = 0; i < response.data.length; i++) {
              for (let j = 0; j < response.data[i].videos.length; j++) {
                if (response.data[i].videos[j].likes_by != null && JSON.parse(sessionStorage.getItem("userDetails"))) {
                  // String Search

                  if (
                    response.data[i].videos[j].likes_by.search(
                      JSON.parse(sessionStorage.getItem("userDetails")).user_id
                    ) != -1
                  ) {
                    response.data[i].videos[j].likesThisUser = true;
                  } else {
                    response.data[i].videos[j].likesThisUser = false;
                  }
                } else {
                  response.data[i].videos[j].likesThisUser = false;
                }
              }
            }



            const MorePoolPlaylist = [];
            const RandomPoolPlaylist = [];
            const HomePlayPlaylist = [];
            SetAllPlaylistArray(response.data);
            SetAllChannelArray(res.data);
            response.data.forEach(element => {
              if (element.locationStatus == "randomPool") {
                RandomPoolPlaylist.push(element);
                SetRandomPoolData(RandomPoolPlaylist);
              }
              if (element.locationStatus == "morePool") {
                MorePoolPlaylist.push(element);
                SetMorePoolData(MorePoolPlaylist);
              }
              if (element.locationStatus == "homePlay") {
                HomePlayPlaylist.push(element);
                SetHomePlayData(HomePlayPlaylist);
                setUrlDetails(HomePlayPlaylist[0].videos[0]);
                setPlayUrl(HomePlayPlaylist[0].videos[0].url);
                setPlaylistDetails(HomePlayPlaylist);
                SetVideolist(HomePlayPlaylist[0].videos);
              }
            });
          })
      });
  }, []);

  //  Set Style For Home Page(main)
  useEffect(() => {
    document.body.style.backgroundRepeat = "repeat-y";
    document.body.style.height = "auto";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "100%";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("main-container")[0].style.width = "100%";

    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.paddingTop = "10px";
    // document.getElementsByClassName("header")[0].style.height = "unset";
  });
  var allLiveVideos = [];
  useEffect(() => {
    //  Call All Playlist Data
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
      .then((res) => {
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
        SetPlaylist(res.data);
        // 1. Set top playlist using likes
        if (res.data.length != 0) {
          if (res.data[0].videos.length != 0) {
            setPlayUrl(res.data[0].videos[0].url);
            setUrlDetails(res.data[0].videos[0]);
            setPlaylistDetails(res.data);
            SetVideolist(res.data[0].videos);
            setPlaylistDetails(res.data[0]);
          }
        }
        var tempPlaylistData = res.data;
        for (let i = 0; i < tempPlaylistData.length; i++) {
          var totalLikes = 0;
          for (let j = 0; j < tempPlaylistData[i].videos.length; j++) {
            totalLikes =
              totalLikes + parseInt(tempPlaylistData[i].videos[j].likes);
          }
          tempPlaylistData[i].likes = totalLikes;
        }
        var tempData = null;
        for (let i = 0; i < tempPlaylistData.length; i++) {
          for (let j = i + 1; j < tempPlaylistData.length; j++) {
            if (tempPlaylistData[i].likes < tempPlaylistData[j].likes) {
              tempData = tempPlaylistData[i];
              tempPlaylistData[i] = tempPlaylistData[j];
              tempPlaylistData[j] = tempData;
            }
          }
        }
        TopPlaylist(tempPlaylistData);
      });
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getVideoData", {
        headers: { Token: "sdsndsddbsbdjsfdbsfdJDSKDjldfsd" },
      })
      .then((res) => {
        // console.log(res.data);
        // Set All Videos
        SetVideolist(res.data);
        // Set All Live Videos
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].duration == 0) {
            var VideoIdis = "";
            let UslIs = res.data[index].url;
            let paramString = UslIs.split("?")[1];
            let queryString = new URLSearchParams(paramString);
            for (let pair of queryString.entries()) {
              VideoIdis = pair[1];
            }
            axios
              .get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=` +
                VideoIdis +
                `&key=AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0`
              )
              .then((videores) => {
                if (videores.data.items) {
                  if (
                    videores.data.items.liveBroadcastContent ==
                    "live"
                  ) {
                    allLiveVideos.push(res.data[index]);
                    SetLiveVideolist((allLiveVideos) => [
                      ...allLiveVideos,
                      res.data[index],
                    ]);
                  }
                }
              });
          }
        }
      });
  }, []);
  // Get Location
  const [CurrentLocationData, SetCurrentLocationData] = useState(
    new Date().toString().split("(")[1].split(" ")[0]
  );
  // End Location
  var playThumbnail = [];
  useEffect(() => {
    if (topPlaylistData.length != 0) {
      for (let i = 0; i < topPlaylistData.length; i++) {
        for (let j = 0; j < 1; j++) {
          if (topPlaylistData[i].videos.length != 0)
            playThumbnail.push(topPlaylistData[i].videos[j].thumbnail);
          else if (topPlaylistData[i].videos.length == 0) {
            topPlaylistData.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < topPlaylistData.length; i++) {
        topPlaylistData[i].image = playThumbnail[i];
      }
      SetLoadData(true);
    }
    if (allPlaylistData.length != 0) {
      for (let i = 0; i < allPlaylistData.length; i++) {
        for (let j = 0; j < 1; j++) {
          if (allPlaylistData[i].videos.length != 0)
            playThumbnail.push(allPlaylistData[i].videos[j].thumbnail);
          else if (allPlaylistData[i].videos.length == 0) {
            allPlaylistData.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < allPlaylistData.length; i++) {
        allPlaylistData[i].image = playThumbnail[i];
      }
      SetLoadData(true);
    }
  }, []);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getResspaceData", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          if (response.data.length >= 0) {
            setallData(response.data);
          }
        }
      });
  }, []);

  const onEnded = () => {
    if (allVideolistData[videoIndex + 1]) {
      setVideoIndex(videoIndex + 1);
    }
    setUrlDetails(allVideolistData[videoIndex]);
    setPlayUrl(allVideolistData[videoIndex].url);
  };

  const onBack = () => {
    if (allVideolistData[videoIndex - 1]) {
      setVideoIndex(videoIndex - 1);
    }
    setUrlDetails(allVideolistData[videoIndex]);
    setPlayUrl(allVideolistData[videoIndex].url);
  };
  // copy Embed Code
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }
  const MoveToNowPlaying = () => {
    document.getElementById("noanim-tab-example-tab-home").click();
  };
  const EmptyCopy = () => {
    setCopySuccess("");
  };

  // Like and dislike
  const LikeDislike = (video_id, likeopr) => {
    if (!sessionStorage.getItem("userDetails")) {
      toast.warning("Please Login First!");
      navigate("/login");
    } else {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      axios
        .post(process.env.REACT_APP_API_URL + "/playlist/like", {
          user: user_id,
          video: video_id,
          opr: likeopr,
        })
        .then((res) => {
          console.log("Video Like");
        })
        .catch((err) => {
          console.log("error Video not like");
        });
    }
  };



  return (
    <>
      <main>
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-lg-2 mb-3 order-lg-1 order-sm-second">
            <div className="sideVideos Categories mt-2 borderRadius todayList p-0">
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                Channel
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "80vh" }}
              >
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("channel") && !val.position.includes("topchannel") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div className="mb-3 videoItem">
                        <Item className="aboutVideo transparent todayList" style={{ zIndex: "1" }}>
                          <img className="playBtn me-2" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                          <span title={val1.title}>{val1.title.substring(0, 10) + "..."}</span>
                        </Item>
                        {val ?
                          (
                            <>
                              {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ cursor: "pointer" }}
                                  />

                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ? (
                                <>

                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />


                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[3].url);
                                      setUrlDetails(val1.videos[3]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (""))))}




                            </>
                          ) : (
                            ""
                          )}
                      </div>

                    </>) : ("")))
                ))
                }

              </div>
            </div>
          </div>
          <div className=" col-sm-12 col-xs-12 col-lg-8 mb-3 order-lg-2 order-sm-first ">
            <div className="row borderRadius">
              <Grid
                item
                className="displayVideoBox my-2 borderRadius todayList mainDisplay"
              >
                <Item className="displayVideo ">
                  <div className="row">
                    <div className="col-10">
                      <div
                        className="PlaylistPlayer__player-wrapper"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <ReactPlayer
                          url={PlayUrl ? PlayUrl : ""}
                          className="PlaylistPlayer__player"
                          width="100%"
                          height="100%"
                          playing
                          controls
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="col-12 col-md-11 ">
                        <div
                          className="row hideScrollBar setHeigthofScroller"

                        >
                          {allVideolistData.map((videos, index) => (
                            <>
                              <div
                                className=""
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "block",
                                  padding: "0",
                                  height: "auto",
                                }}
                              >
                                {videos.thumbnail !== "" && !videos.thumbnail.includes(".mp4") && !videos.thumbnail.includes(".mov") ? (
                                  <div
                                    onClick={() => {
                                      setPlayUrl(videos.url);
                                      setUrlDetails(videos);
                                    }}
                                    style={{
                                      backgroundImage: `url(${videos.thumbnail})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      height: "5em",
                                      width: "100%",
                                      backgroundRepeat: "no-repeat",
                                      cursor: "pointer",
                                    }}
                                  ></div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black" style={{ height: "12.6%" }}>
                    <div className="col-12">
                      <div className="row m-0">
                        <div
                          className="col-12 col-md-10 bg-black"
                        >
                          <div className="row">
                            <div className="col-12 col-md-8 p-0">
                              {allData[0] ? (
                                <img
                                  src={
                                    "http://190.92.153.226:5000/assets/images/reserved/" +
                                    allData[0].resimage
                                  }
                                  className="img-fluid"
                                  style={{ width: "100%", height: "68px" }}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={
                                    "http://190.92.153.226:5000/assets/images/reserved/"
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              )}
                            </div>
                            <div
                              className="col-12 col-md-4 bg-black"
                              style={{ color: "#fff" }}
                            >
                              <div>
                                <div
                                  style={{ fontSize: "18px" }}
                                  className="border-bottom "
                                  title={UrlDetails.title}
                                >
                                  {UrlDetails
                                    ? UrlDetails.title.substring(0, 18) + "..."
                                    : "Untitled"}
                                </div>
                                <div>
                                  <div className="row playlist_bottom_header1">
                                    <div className="col-12 p-0 d-flex">
                                      <ul style={{ margin: "auto" }}>
                                        <li
                                          style={{
                                            display: "inline",
                                            margin: "2px 0px 0px -22px",
                                          }}
                                        >
                                          <img
                                            onClick={() =>
                                              setOpenSettingBar(false)
                                            }
                                            style={{
                                              cursor: "pointer",
                                              width: "27%",
                                            }}
                                            src={require(`../asset/images/LoginLogo.png`)}
                                            className="img-fluid p-1"
                                            alt=""
                                          />
                                        </li>
                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                          className="p-1"
                                        >
                                          <img
                                            onClick={onBack}
                                            src={require(`../asset/images/DoublePlayBack.webp`)}
                                            className="img-fluid m-auto"
                                            alt=""
                                            style={{
                                              width: "12%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                        >
                                          <img
                                            onClick={onEnded}
                                            src={require(`../asset/images/PlayButton.webp`)}
                                            className="img-fluid m-auto p-1"
                                            alt=""
                                            style={{
                                              width: "14%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                          className="p-1"
                                        >
                                          <img
                                            onClick={onEnded}
                                            src={require(`../asset/images/DoublePlayFront.webp`)}
                                            className="img-fluid m-auto p-1"
                                            alt=""
                                            style={{
                                              width: "16%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                            setSocialMediaMenu(false);
                                          }}
                                          style={{ display: "inline", margin: "2px" }}
                                        >
                                          {window.location.href.split("iid=")[1] ? (
                                            <img
                                              onClick={() =>
                                                alert("Please Login First")
                                              }
                                              style={{
                                                cursor: "pointer",
                                                width: "16%",
                                              }}
                                              src={require(`../asset/images/ButtonNotLike.png`)}
                                              className="img-fluid"
                                              alt=""
                                            />
                                          ) : UrlDetails ? (
                                            LikeImage ? (
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                  width: "16%",
                                                }}
                                                onClick={() => {
                                                  LikeDislike(UrlDetails._id, "dislike");
                                                  SetLikeImage(false);

                                                }
                                                }
                                                src={require(`../asset/images/ButtonLike.png`)}
                                                className="img-fluid"
                                                alt=""
                                              />
                                            ) : (
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                  width: "16%",
                                                }}
                                                onClick={() => {
                                                  LikeDislike(UrlDetails._id, "like");
                                                  SetLikeImage(true);

                                                }
                                                }
                                                src={require(`../asset/images/ButtonNotLike.png`)}
                                                className="img-fluid"
                                                alt=""
                                              />
                                            )
                                          ) : (
                                            <img
                                              onClick={() => alert("No Video Found")}
                                              style={{
                                                cursor: "pointer",
                                                width: "16%",
                                              }}
                                              src={require(`../asset/images/ButtonNotLike.png`)}
                                              className="img-fluid"
                                              alt=""
                                            />
                                          )}
                                        </li>

                                        <li
                                          style={{
                                            display: "inline",
                                            margin: "2px",
                                          }}
                                        >
                                          <ul
                                            className={
                                              OpenSettingBar
                                                ? "dropDownSettingHome"
                                                : "dropDownSettingHome hidden"
                                            }
                                          >
                                            <li
                                              style={{
                                                cursor: "pointer",
                                                width: "13%",
                                              }}
                                              onClick={() => {
                                                setOpenSettingBar(false);
                                                setSocialMediaMenu(true);
                                              }}
                                              className="p-1"
                                              to="/"
                                            >
                                              Share to Social
                                            </li>
                                            <li
                                              style={{
                                                cursor: "pointer",
                                                width: "13%",
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target="#exampleModal"
                                              className="p-1"
                                              to="/playlist"
                                            >
                                              Share Embed
                                            </li>
                                          </ul>
                                          <ul
                                            className={
                                              socialMediaMenu
                                                ? "dropDownSettingHome"
                                                : "dropDownSettingHome hidden"
                                            }
                                            style={{ padding: "0 18px" }}
                                          >
                                            {socialMediaMenu ? (
                                              <ShareSocial
                                                style={style}
                                                url={
                                                  "http://190.92.153.226:3000/playlist?id=" +
                                                  PlaylistDetails._id
                                                }
                                                socialTypes={[
                                                  "facebook",
                                                  "twitter",
                                                  "reddit",
                                                  "linkedin",
                                                  "email",
                                                  "pinterest",
                                                  "whatsapp",
                                                ]}
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </ul>
                                          <img
                                            style={{
                                              cursor: "pointer",
                                              width: "13%",
                                            }}
                                            onClick={() => {
                                              setOpenSettingBarChange();
                                              setOpenMenuBar(false);
                                            }}
                                            src={require(`../asset/images/Setting.webp`)}
                                            className="img-fluid"
                                            alt=""
                                          />
                                        </li>

                                        {/* <img style={{ cursor: "pointer" , width:'14%' }} onClick={setOpenMenuBar} src={require(`../asset/images/Button_goToUserPage2.png`)} className="img-fluid" alt="" /> */}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                setOpenSettingBar(false);
                              }}
                              className="col-12"
                            >
                              <div className="row border-top">
                                <div className="col-12 col-md-11 ">
                                  {morePoolOn ? (
                                    <div className="row">
                                      {MorePoolData.slice(0, 5).map(
                                        (val, index) => (
                                          <>
                                            {!val.videos[0].thumbnail.includes(".mp4") && !val.videos[0].thumbnail.includes(".mov") ? (<>
                                              <div
                                                className=""
                                                style={{
                                                  cursor: "pointer",
                                                  background: "#fff",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  display: "flex",
                                                  padding: "0",
                                                  width: "20%",
                                                  height: "auto",
                                                }}
                                              >
                                                {val.videos !== "" ? (<>
                                                  <div
                                                    onClick={() => {
                                                      setPlayUrl(val.videos[0].url);
                                                      setUrlDetails(val.videos[0]);
                                                      SetVideolist(val.videos);
                                                    }}
                                                    style={{
                                                      backgroundImage: `url(${val.videos[0].thumbnail})`,
                                                      backgroundSize: "cover",
                                                      backgroundPosition: "center",
                                                      height: "5em",
                                                      width: "100%",
                                                      backgroundRepeat: "no-repeat",
                                                      cursor: "pointer",
                                                    }}
                                                  ></div></>
                                                ) : (
                                                  <div
                                                    onClick={() => {
                                                      setPlayUrl(val.url);
                                                      setUrlDetails(val.videos[0]);
                                                      SetVideolist(val.videos);
                                                    }}
                                                    style={{
                                                      backgroundImage: `url(${val.thumbnail})`,
                                                      backgroundSize: "cover",
                                                      backgroundPosition: "center",
                                                      height: "5em",
                                                      width: "100%",
                                                      backgroundRepeat: "no-repeat",
                                                      cursor: "pointer",
                                                    }}
                                                  ></div>
                                                )}
                                              </div>
                                            </>) : (<></>)}

                                          </>
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    <div className="row">
                                      {RandomPoolData.slice(0, 5).map(
                                        (val, index) => (
                                          <>
                                            <div
                                              className=""
                                              style={{
                                                background: "#fff",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                display: "flex",
                                                padding: "0",
                                                width: "20%",
                                                height: "auto",
                                              }}
                                            >
                                              {val.videos !== "" ? (<>
                                                <div
                                                  onClick={() => {
                                                    setPlayUrl(val.videos[0].url);
                                                    setUrlDetails(val.videos[0]);
                                                    SetVideolist(val.videos);
                                                  }}
                                                  style={{
                                                    backgroundImage: `url(${val.videos[0].thumbnail})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    height: "5em",
                                                    width: "100%",
                                                    backgroundRepeat: "no-repeat",
                                                    cursor: "pointer",
                                                  }}
                                                ></div></>
                                              ) : (
                                                <div
                                                  onClick={() => {
                                                    setPlayUrl(val.url);
                                                    setUrlDetails(val.videos[0]);
                                                    SetVideolist(val.videos);
                                                  }}
                                                  style={{
                                                    backgroundImage: `url(${val.thumbnail})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    height: "5em",
                                                    width: "100%",
                                                    backgroundRepeat: "no-repeat",
                                                    cursor: "pointer",
                                                  }}
                                                ></div>
                                              )}
                                            </div>
                                          </>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="col-12 col-md-1 bg-black">
                                  <div className="row">
                                    <div
                                      onClick={() => {
                                        SetmorePoolOn(true);
                                      }}
                                      style={{ cursor: "pointer" }}
                                      className="col-6 col-sm-12 p-1 d-flex mt-2"
                                    >
                                      <img
                                        src={require(`../asset/images/DoublePlayFront.webp`)}
                                        className="img-fluid m-auto ButtonNext"
                                        alt=""
                                        style={{ width: "54%" }}
                                      />
                                    </div>
                                    <div
                                      onClick={() => {
                                        SetmorePoolOn(false);
                                      }}
                                      style={{ cursor: "pointer" }}
                                      className="col-6 col-sm-12 d-flex p-0"
                                    >
                                      <img
                                        src={require(`../asset/images/Mix.webp`)}
                                        className="img-fluid m-auto ButtonMix"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-2 p-0 bg-black"
                          style={{ color: "#fff" }}
                        >
                          {allData[7] ? (
                            <img
                              src={
                                "http://190.92.153.226:5000/assets/images/reserved/" +
                                allData[7].resimage
                              }
                              className="img-fluid"
                              style={{ width: "95%", height: "145px", marginLeft: "5%" }}
                              alt=""
                            />
                          ) : (
                            <img
                              src={
                                "http://190.92.153.226:5000/assets/images/reserved/"
                              }
                              className="img-fluid"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Embed Code
                  </h5>
                  <button
                    onClick={EmptyCopy}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    {document.queryCommandSupported("copy") && (
                      <div>
                        <button
                          type="button"
                          className="btn btn-dark"
                          onClick={copyToClipboard}
                        >
                          Copy
                        </button>{" "}
                        {copySuccess}
                      </div>
                    )}
                    {UrlDetails ? (
                      <form>
                        <textarea
                          className="embedTextArea"
                          ref={textAreaRef}
                          value={
                            "<iframe width='560' src='http://190.92.153.226:3000/playlist?id=" +
                            PlaylistDetails._id +
                            "'title='YouTube video player' frameborder='0' allow='autoplay; fullscreen; picture-in-picture;' allowfullscreen style='position:absolute;top:0;left:0;width:100%;height:119%;'></iframe>"
                          }
                        />
                      </form>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div onClick={EmptyCopy} className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-xs-12  col-lg-2 mb-3 order-lg-3 order-sm-last">
            <div className="sideVideos Categories mt-2 borderRadius todayList p-0">
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                Top Channel
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "80vh" }}
              >
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("topchannel") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div className="mb-3 videoItem">
                        <Item className="aboutVideo transparent todayList" style={{ zIndex: "1" }}>
                          <img className="playBtn me-2" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                          <span title={val1.title}>{val1.title.substring(0, 10) + "..."}</span>
                        </Item>
                        {val ?
                          (
                            <>
                              {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[3].url);
                                      setUrlDetails(val1.videos[3]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (""))))}




                            </>
                          ) : (
                            ""
                          )}
                      </div>

                    </>) : ("")))
                ))
                }
              </div>
            </div>
          </div>
        </div>
      </main>







      <main>
        <div className="row">
          <div className="col-sm-12 col-xs-12  col-lg-2 mb-3 ">
            <div
              className="sideVideos Categories borderRadius todayList p-0"

            >
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                EXPLORE
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "90vh" }}
              >
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("explore") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div className="mb-3 videoItem">
                        <Item className="aboutVideo transparent todayList" style={{ zIndex: "1" }}>
                          <img className="playBtn me-2" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                          <span title={val1.title}>{val1.title.substring(0, 10) + "..."}</span>
                        </Item>
                        {val ?
                          (
                            <>
                              {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[3].url);
                                      setUrlDetails(val1.videos[3]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (""))))}




                            </>
                          ) : (
                            ""
                          )}
                      </div>

                    </>) : ("")))
                ))
                }
              </div>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData[1] ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[1].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={"http://190.92.153.226:5000/assets/images/reserved/"}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData[2] ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[2].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={"http://190.92.153.226:5000/assets/images/reserved/"}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
            </div>
          </div>
          <div className="col-sm-12 col-xs-12 col-lg-8 mb-3 todayList borderRadius" style={{ height: "140vh" }}>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              className="sideVideos mainDisplay"
            >
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={6}
                sm={12}
                md={6}
              >
                <Item className="aboutVideo transparent todayList">
                  <img className="playBtn" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                  Todays List{" "}
                </Item>
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("todayTopclip") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div>
                        {val ? (
                          <>
                            {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ?
                              (
                                <img
                                  onClick={() => {
                                    setPlayUrl(val1.videos[0].url);
                                    setUrlDetails(val1.videos[0]);
                                    SetVideolist(val1.videos);
                                    setPlaylistDetails(val1);
                                  }}
                                  src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                  alt=""
                                  className="w-100" style={{ height: "200px" }}
                                />
                              )
                              :
                              (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ?
                                (<>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100" style={{ height: "100px" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-100" style={{ height: "100px" }}
                                  />
                                </>
                                ) :
                                (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ?
                                  (
                                    <>
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[0].url);
                                          setUrlDetails(val1.videos[0]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                        alt=""
                                        className="w-50" style={{ height: "100px" }}
                                      />
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[1].url);
                                          setUrlDetails(val1.videos[1]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                        alt=""
                                        className="w-50" style={{ height: "100px" }}
                                      />
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[2].url);
                                          setUrlDetails(val1.videos[2]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                        alt=""
                                        className="w-100" style={{ height: "100px" }}
                                      />
                                    </>
                                  )
                                  : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ?
                                    (
                                      <>
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[0].url);
                                            setUrlDetails(val1.videos[0]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[1].url);
                                            setUrlDetails(val1.videos[1]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[2].url);
                                            setUrlDetails(val1.videos[2]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[3].url);
                                            setUrlDetails(val1.videos[3]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                      </>
                                    )
                                    : (""))))}
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                    </>) : ("")))
                ))
                }
                <Item
                  className="videoDesc transparent"
                  style={{ background: "transparent" }}
                ></Item>
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={6}
                sm={12}
                md={6}
              >
                <Item className="aboutVideo transparent todayList">
                  <img className="playBtn" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                  Discover Music
                </Item>
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("supermusic") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div>
                        {val ? (
                          <>
                            {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ?
                              (
                                <img
                                  onClick={() => {
                                    setPlayUrl(val1.videos[0].url);
                                    setUrlDetails(val1.videos[0]);
                                    SetVideolist(val1.videos);
                                    setPlaylistDetails(val1);
                                  }}
                                  src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                  alt=""
                                  className="w-100" style={{ height: "200px" }}
                                />
                              )
                              :
                              (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ?
                                (<>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100" style={{ height: "100px" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-100" style={{ height: "100px" }}
                                  />
                                </>
                                ) :
                                (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ?
                                  (
                                    <>
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[0].url);
                                          setUrlDetails(val1.videos[0]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                        alt=""
                                        className="w-50" style={{ height: "100px" }}
                                      />
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[1].url);
                                          setUrlDetails(val1.videos[1]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                        alt=""
                                        className="w-50" style={{ height: "100px" }}
                                      />
                                      <img
                                        onClick={() => {
                                          setPlayUrl(val1.videos[2].url);
                                          setUrlDetails(val1.videos[2]);
                                          SetVideolist(val1.videos);
                                          setPlaylistDetails(val1);
                                        }}
                                        src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                        alt=""
                                        className="w-100" style={{ height: "100px" }}
                                      />
                                    </>
                                  )
                                  : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ?
                                    (
                                      <>
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[0].url);
                                            setUrlDetails(val1.videos[0]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[1].url);
                                            setUrlDetails(val1.videos[1]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[2].url);
                                            setUrlDetails(val1.videos[2]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                        <img
                                          onClick={() => {
                                            setPlayUrl(val1.videos[3].url);
                                            setUrlDetails(val1.videos[3]);
                                            SetVideolist(val1.videos);
                                            setPlaylistDetails(val1);
                                          }}
                                          src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                          alt=""
                                          className="w-50" style={{ height: "100px" }}
                                        />
                                      </>
                                    )
                                    : (""))))}
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                    </>) : ("")))
                ))
                }
                <Item
                  className="videoDesc transparent"
                  style={{ background: "transparent" }}
                ></Item>
              </Grid>
              {/* center divs */}
              <Grid
                style={{ cursor: "pointer", height: "90vh" }}
                item
                container
                xs={12}
                sm={12}
                md={12}
                className="hideScrollBar moreVideos mt-2"
              >
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("featured") && val.url.split("id=")[1] == val1._id ?
                    (<>
                      <Grid className="videoItem d-flex mt-3" item xs={12} sm={12} md={12}>
                        <Item className="aboutVideo transparent todayList" style={{ zIndex: "1" }}>
                          <img className="playBtn" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                          {val1.title}
                        </Item>
                        <Grid className="videoItem" item xs={12} sm={12} md={3}>

                          <div className="setImage">
                            {val1.videos[0] ? (<img
                              onClick={() => {
                                setPlayUrl(val1.videos[0].url);
                                setUrlDetails(val1.videos[0]);
                                SetVideolist(val1.videos);
                                setPlaylistDetails(val1);
                              }}
                              src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                              alt=""
                              className="w-100"
                            />) : (
                              <img
                                src="asset/images/default-thumbnail.png"
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>

                        </Grid>
                        <Grid className="videoItem" item xs={12} sm={12} md={3}>

                          <div className="setImage">
                            {val1.videos[1] ? (<img
                              onClick={() => {
                                setPlayUrl(val1.videos[1].url);
                                setUrlDetails(val1.videos[1]);
                                SetVideolist(val1.videos);
                                setPlaylistDetails(val1);
                              }}
                              src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                              alt=""
                              className="w-100"
                            />) : (
                              <img
                                src="asset/images/default-thumbnail.png"
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>

                        </Grid>
                        <Grid className="videoItem" item xs={12} sm={12} md={3}>

                          <div className="setImage">
                            {val1.videos[2] ? (<img
                              onClick={() => {
                                setPlayUrl(val1.videos[2].url);
                                setUrlDetails(val1.videos[2]);
                                SetVideolist(val1.videos);
                                setPlaylistDetails(val1);
                              }}
                              src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                              alt=""
                              className="w-100"
                            />) : (
                              <img
                                src="asset/images/default-thumbnail.png"
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>

                        </Grid>
                        <Grid className="videoItem" item xs={12} sm={12} md={3}>

                          <div className="setImage">
                            {val1.videos[3] ? (<img
                              onClick={() => {
                                setPlayUrl(val1.videos[3].url);
                                setUrlDetails(val1.videos[3]);
                                SetVideolist(val1.videos);
                                setPlaylistDetails(val1);
                              }}
                              src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                              alt=""
                              className="w-100"
                            />) : (
                              <img
                                src="asset/images/default-thumbnail.png"
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>

                        </Grid>
                      </Grid>
                    </>) : ("")))
                ))
                }
              </Grid>
            </Grid>
          </div>
          <div className="col-sm-12 col-xs-12 col-lg-2 mb-3">
            <div
              className="sideVideos Categories borderRadius todayList p-0"
            >
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                TRENDING
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "90vh" }}
              >
                {allchannelArray.map((val, index) => (
                  allPlaylistArray.map((val1, index) => (val.position.includes("trending") && val.url.split("id=")[1] == val1._id ?
                    (<>

                      <div className="mb-3 videoItem">
                        <Item className="aboutVideo transparent todayList" style={{ zIndex: "1" }}>
                          <img className="playBtn me-2" src={playBtn} alt="" style={{ width: "30px", height: "30px" }} />
                          <span title={val1.title}>{val1.title.substring(0, 10) + "..."}</span>
                        </Item>
                        {val ?
                          (
                            <>
                              {val1.videos[0] != undefined && val1.videos[1] == undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] == undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "160px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] == undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-100"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (val1.videos[0] != undefined && val1.videos[1] != undefined && val1.videos[2] != undefined && val1.videos[3] != undefined ? (
                                <>
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[0].url);
                                      setUrlDetails(val1.videos[0]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[0].thumbnail.includes(".mp4") || val1.videos[0].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[0].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[1].url);
                                      setUrlDetails(val1.videos[1]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[1].thumbnail.includes(".mp4") || val1.videos[1].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[1].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[2].url);
                                      setUrlDetails(val1.videos[2]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[2].thumbnail.includes(".mp4") || val1.videos[2].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[2].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                  <img
                                    onClick={() => {
                                      setPlayUrl(val1.videos[3].url);
                                      setUrlDetails(val1.videos[3]);
                                      SetVideolist(val1.videos);
                                      setPlaylistDetails(val1);
                                    }}
                                    src={val1.videos[3].thumbnail.includes(".mp4") || val1.videos[3].thumbnail.includes(".mov") ? (require(`../asset/images/default-thumbnail.webp`)) : (val1.videos[3].thumbnail)}
                                    alt=""
                                    className="w-50"
                                    style={{ height: "80px", cursor: "pointer" }}
                                  />
                                </>
                              ) : (""))))}




                            </>
                          ) : (
                            ""
                          )}
                      </div>

                    </>) : ("")))
                ))
                }
              </div>
              <Grid
                style={{ cursor: "pointer", marginTop: "2px" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData[3] ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[3].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={require("../asset/reserved/default.jpg")}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData[4] ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[4].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={require("../asset/reserved/default.jpg")}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;
