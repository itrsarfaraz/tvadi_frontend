import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
toast.configure();
const Login = () => {

  const [ResToken, setResToken] = useState("");


  // if login Redirect to home
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = sessionStorage.getItem('userDetails');
    if (user_id)
      navigate('/home');
  }, []);

  //************** */

  const something = (event) => {
    if (event.keyCode === 13) {
      let inputtx = document.getElementById("next_username_class");
      if (inputtx.value.length == 0) { toast.error("Please enter email or mobile number!", {}); return false; }
      setNext({ display: "none" });
      setNextshow({ display: "block" });
    }
  }

  // Style Sheet
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.paddingTop = "0px";
    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName('main-container')[0].style.height = "100vh";
  }, []);
  const [button_hide, setNext] = useState({ display: "block" });
  const [button_show, setNextshow] = useState({ display: "none" });
  const { register, handleSubmit, click, formState: { errors }, } = useForm({ defaultValues: { email_or_mobile: "", password: "" } });
  // const onSubmit = data => console.log(data);
  const hide_button = (obj) => {
    let inputtx = document.getElementById("next_username_class");
    if (inputtx.value.length == 0) {
      toast.error("Please enter email or mobile number!", {});
      return false;
    }
    if (!inputtx.value.match(/^[A-Za-z0-9.@]+$/)) {
      toast.error("Space and Spical Charcter Not Allowed !", {});
      return false;
    }
    setNext({ display: "none" });
    setNextshow({ display: "block" });
  };
  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_API_URL + "/user/login", { email: data["email"], password: data["password"], role: "2" })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const responseData = JSON.stringify(res.data);
          setResToken(res.data.token);
          sessionStorage.setItem("userDetails", responseData);
          if (window.location.href.split("from=")[1]) {
            if (window.location.href.split("from=")[1] === "dfbchebf5254652dnsfydf")
              navigate("/playlist");
            else if (window.location.href.split("from=")[1] === "p1&r%odfbchebf5254652dnsfydf")
              navigate("/profile");
            else if (window.location.href.split("from=")[1] === "creatorbf5254652dnsfydf")
              navigate("/make");
            else
              navigate("/make");
          }
          else
            navigate("/home");
          window.location.reload();
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMessage) {
          setNext({ display: "block" });
          setNextshow({ display: "none" });
          toast.error(err.response.data.errorMessage, {});
        }
      });
  };
  return (
    <>

      {/* <!--wrapper--> */}
      <div className="wrapper">
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div className="col mx-auto">
                <div className="card">
                  <div className="card-body">
                    <div className="fadeBorder p-4 rounded">

                      <div className="form-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Enter Email / Mobile</label>
                            <input {...register("email", { required: "This is Requird" })} type="text" className="form-control" id="inputEmailAddress" placeholder="Enter Email/Mobile" />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Enter Password</label>
                            <div className="input-group" id="show_hide_password">
                              <input type="password" {...register("password", { required: "This is Requird" })} className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Password" />
                              {/* <a href="true" className="input-group-text bg-transparent" ></a> */}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                              <label className="form-check-label" >Remember Me</label>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">	<Link to={"/forget"} className="link text-decoration-none"><Button className="form-signup text-white">Forget Password ?</Button></Link>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button onClick={handleSubmit(onSubmit)} className="btn text-white signButton"><i className="bx bxs-lock-open"></i>Sign in</button>
                            </div>
                          </div>
                          <Link to={"/register"} className="link text-decoration-none">
                            <div className="col-12">
                              <div className="d-grid">
                                <button className="btn text-white signButton"><i className="bx bxs-lock-open"></i>Sign up</button>
                              </div>
                            </div>
                          </Link>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!--end row-->*/}
          </div>
        </div>
      </div>
      {/*<!--end wrapper-->*/}
    </>
  );
};
export default Login;