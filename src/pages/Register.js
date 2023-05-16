import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SmsIcon from '@mui/icons-material/Sms';
const axios = require("axios");
toast.configure();

function Register() {
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName('main-container')[0].style.height = "100vh";
    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.paddingTop = "0px";

  }, []);

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { email_or_number: "", username: "", password: "", confirm_password: "" } });
  const user_password = watch("password");
  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_API_URL + "/user/add", { email: data["email_or_number"].toLowerCase().replace(" ", ''), username: data["username"].toLowerCase(), password: data["password"], role: "2", opration: "add" })
      .then((res) => {
        if (res.data.type == "email")
          toast(<div><MarkEmailUnreadIcon /> Check Your Email Address and Verfiy Your Account</div>, { autoClose: true });
        else
          toast(<div><SmsIcon />Send Verification link in Sms</div>, { autoClose: false });
        swal({ text: res.data.title, icon: 'success', type: "success" }).then(function () { window.location.replace("/login"); });
      }).catch((err) => {
        swal({ text: err.response.data.errorMessage, icon: "error", type: "error" });
        console.log(err)
      });
  };

  const commingSoon = () => {
    toast.warning("feature coming soon");
  }
  return (
    <>



      <div class="wrapper">
        <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div class="col mx-auto">
                <div class="my-4 text-center">
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <div class="text-center">
                        <h3 class="">Sign Up</h3>
                        <p>Already have an account? <a href="/login">Sign in
                          here</a>
                        </p>
                      </div>
                      <div class="d-grid">
                        <a onClick={commingSoon} class="btn my-4 shadow-sm btn-light" href="javascript:;"> <span
                          class="d-flex justify-content-center align-items-center">
                          <img class="me-2" src="assets/images/icons/search.svg" width="16"
                            alt="Image Description" />
                          <span>Sign Up with Google</span>
                        </span>
                        </a> <a onClick={commingSoon} href="javascript:;" class="btn btn-light"><i
                          class="bx bxl-facebook"></i>Sign Up with Facebook</a>
                      </div>
                      <div class="login-separater text-center mb-4"> <span>OR SIGN UP WITH EMAIL</span>
                        <hr />
                      </div>
                      <div class="form-body">
                        <form onSubmit={handleSubmit(onSubmit)} class="row g-3">
                          <div class="col-sm-12">
                            <label for="inputFirstName" class="form-label">Email or Mobile Number</label>
                            <input {...register("email_or_number", { required: "This is Required", pattern: { value: /^[A-Za-z0-9.@]+$/, message: "Space and Spical Charcter Not Allowed" } })} type="text" className="form-control" id="inputEmailAddress" placeholder="Enter Email/Mobile" />
                            <p className="inputError">{errors.email_or_number?.message}</p>
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">Username</label>
                            <input type="text" {...register("username", { required: "This is Required", pattern: { value: /^[A-Za-z0-9._]+$/, message: "Space and Spical Charcter Not Allowed" } })} className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Username" />
                            <p className="inputError">{errors.username?.message}</p>
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">Password</label>
                            <div class="input-group" id="show_hide_password">
                              <input type="password" {...register("password", { required: "This is Required", minLength: { value: 8, message: "minimum length 8 character" }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, message: "Must Be One Capital Letter , One Special Character" } })} className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Password" />
                            </div>
                            <p className="inputError">{errors.password?.message}</p>
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">Confirm Password</label>
                            <div class="input-group" id="show_hide_password">
                              <input type="password" {...register("confirm_password", { validate: (value) => value === user_password || "The passwords do not match" })} className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Password" />
                            </div>
                            <p className="inputError">{errors.confirm_password?.message}</p>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <button onClick={handleSubmit(onSubmit)} type="submit" class="btn btn-light"><i
                                class='bx bx-user'></i>Sign up</button>
                            </div>
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
      </div>
    </>
  );
}
export default Register;