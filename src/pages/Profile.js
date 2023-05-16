import { React, useEffect, useState } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const axios = require("axios");
toast.configure();
function Profile() {
  const [TextArea, setTextArea] = useState(false);
  const setTextAreaChange = () => {
    if (TextArea) {
      setTextArea(false);
    } else {
      setTextArea(true);
    }
  };

  // MenuBar

  const [CloseMenu, SetCloseMenu] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  // auth
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = sessionStorage.getItem("userDetails");
    if (!user_id) {
      navigate("/login?from=p1&r%odfbchebf5254652dnsfydf");
    }
  }, []);

  const playlistWithId = () => {
    navigate("/playlist");
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (CloseMenu == true) {
    }
    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "1200px";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.paddingTop = "40px";
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    SetCloseMenu(false);
  });
  const [userBio, setUserBio] = useState(null);
  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [Address, setAddress] = useState(null);
  const [userAbout, setUserAbout] = useState(null);


  //Get User Data
  const [allUserData, setallUserData] = useState([]);
  const [CurrentUserDetails, setCurrentUserDetails] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Featch All Data
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getUserAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        setallUserData(response.data);
        response.data.forEach((element, index) => {
          // if (
          //   element._id !=
          //   JSON.parse(sessionStorage.getItem("userDetails")).user_id
          // ) {
          //   sessionStorage.clear();
          //   navigate("/logout");
          // }
          if (
            element._id ==
            JSON.parse(sessionStorage.getItem("userDetails")).user_id
          ) {
            if (Name == null) setName(element.Name);
            if (userBio == null) setUserBio(element.userbio);
            if (Phone == null) setPhone(element.Phone);
            if (Mobile == null) setMobile(element.Mobile);
            if (Address == null) setAddress(element.Address);
            if (userAbout == null) setUserAbout(element.userAbout);
            setCurrentUserDetails(element);
          }
        });
      });
  }, []);


  // Get Reserved Space
  const [allData, setallData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getResspaceData", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          if (response.data.length >= 0) {
            // if (userBio == null) setUserBio(res.data[i].users[0].userbio);
            setallData(response.data);
          }
        }
      });
  }, []);
  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event) => {
    setUploadProfileLoader(true);

    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    axios
      .post(
        process.env.REACT_APP_API_URL +
        "/user/profileupload?" +
        JSON.parse(sessionStorage.getItem("userDetails")).user_id,
        formdata,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        toast.danger("Something went wrong");
      });
  };

  const updateBio = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL +
        "/user/bioupdate?" +
        JSON.parse(sessionStorage.getItem("userDetails")).user_id,
        {
          user: JSON.parse(sessionStorage.getItem("userDetails")).user_id,
          // data: event.target.value,
          data: userBio,
          Name: Name,
          Email: Email,
          Phone: Phone,
          Mobile: Mobile,
          Address: Address,
          userAbout: userAbout,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("Data Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Something went wrong");
      });
  };

  return (
    <>
      <div onClick={closeMenu} className="container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4 card">
              <div className="">
                <div className="card-body">
                  <form
                    action=""
                    method="post"
                    enctype="multipart/form-data"
                    style={{ opacity: "0" }}
                  >
                    <input
                      onChange={(e) => uploadFile(e)}
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "135px",
                        height: "35%",
                        width: "30%",
                      }}
                      type="file"
                      name=""
                      id="input_file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control"
                      value=""
                    />
                  </form>
                  <div className="d-flex flex-column align-items-center text-center">
                    {CurrentUserDetails.profile ? (
                      <img
                        style={{ height: "100px" }}
                        src={"/asset/profile/" + CurrentUserDetails.profile}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width="110"
                      />
                    ) : (
                      <img
                        src={"/asset/images/default-profile.jpg"}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width="110"
                      />
                    )}
                    <div className="mt-3 text-white">
                      <h4>{CurrentUserDetails.username}</h4>
                      <p className="mb-1">{CurrentUserDetails.userbio}</p>
                      <p className="font-size-sm">
                        {CurrentUserDetails.Address}
                      </p>
                      <button className="btn  text-white border-white mt-2">Follow</button> &nbsp;
                      <button className="btn text-white border-white mt-2">Message</button>
                    </div>
                  </div>
                  <hr className="" />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <form>
                  <div className="card-body text-white">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          value={CurrentUserDetails.email}
                        // onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={Name}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">User Bio</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => setUserBio(e.target.value)}
                          value={userBio}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setMobile(e.target.value)}
                          value={Mobile}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setAddress(e.target.value)}
                          value={Address}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9">
                        <button
                          type="submit"
                          onClick={(e) => {
                            updateBio(e);
                          }}
                          className="btn btn-primary  px-4"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 card h-100">
              <div className="">
                <div className="card-body p-0">
                  <NavLink to="/playlist">
                    <button
                      type="button"
                      className="btn w-100 text-white border-white mt-5"
                    >
                      MY PLAYLISTS
                    </button>
                  </NavLink>

                </div>
              </div>
              <div className="">
                <div className="card-body p-0 pt-3 pb-5">
                  <NavLink to="/make">
                    <button
                      type="button"
                      className="btn w-100 text-white border-white"
                    >
                      MAKE PLAYLISTS
                    </button>
                  </NavLink>

                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <form>
                        <div className="card-body">
                          <h5 className="d-flex align-items-center mb-3 text-white">
                            About ME:
                          </h5>
                          {TextArea ? (
                            <button
                              type="button"
                              className="btn btn-primary float-end  mb-3"
                              // onClick={setTextAreaChange}
                              onClick={(e) => {
                                setTextAreaChange();
                                updateBio(e);
                              }}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary float-end  mb-3"
                              // onClick={setTextAreaChange}
                              onClick={() => {
                                setTextAreaChange();
                              }}
                            >
                              Edit
                            </button>
                          )}

                          {TextArea ? (
                            <textarea
                              value={userAbout}
                              id="Text"
                              // onChange={(e) => updateAbout(e)}
                              onChange={(e) => setUserAbout(e.target.value)}
                              className="form-control"
                              name=""
                              cols="30"
                              rows="10"
                            >
                              {userAbout}
                            </textarea>
                          ) : (
                            <textarea
                              value={userAbout}
                              className="form-control"
                              disabled
                              name=""
                              id=""
                              cols="30"
                              rows="10"
                            >
                              {userAbout}
                            </textarea>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
