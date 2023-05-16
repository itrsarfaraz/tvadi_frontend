import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

toast.configure();
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [button_hide, setNext] = useState({ display: "block" });
  const [button_show, setNextshow] = useState({ display: "none" });
  const { register, handleSubmit, click, formState: { errors } } = useForm();


  useEffect(() => {
    document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.paddingTop = "0px";
    document.getElementsByClassName("footer")[0].style.display = "none";
  }, []);


  // const onSubmit = data => console.log(data);
  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_API_URL + "/user/forget_password",
      {
        email: data["email"],
      })
      .then((res) => {
        if (res.data.type == "email") {
          toast.success("Send Reset Password link on Email", {});
        }
        else {
          toast.success("Send Reset Password link on SMS", {});
        }
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Account Not Found !", {});
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
                        <h3>Forget Password !</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                          <div className="col-12">
                            <input type="text"
                              {...register("email", { required: "This is Requird" })}
                              placeholder="Email or mobile number"
                              style={button_hide}
                              id="next_username_class" className="form-control" />
                            <p className="inputError">{errors.email?.message}</p>
                          </div>

                          <div className="col-12">
                            <div className="d-grid">
                              <button onClick={handleSubmit(onSubmit)} className="btn text-white signButton"><i className="bx bxs-lock-open"></i>Submit</button>
                            </div>
                          </div>
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

export default ForgetPassword;
