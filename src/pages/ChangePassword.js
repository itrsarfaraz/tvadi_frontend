import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
// import swal from "sweetalert";
// const salt = bcrypt.genSaltSync(10);

toast.configure();
const Login = () => {


  // Featch All Data
  const [allData, setallData] = useState([]);

  useEffect(() => {
    callData();
  }, []);

  function callData() {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getAlldata")
      .then((response) => {
        setallData(response.data);
        //  console.log(response.data);
      });
  }

  window.addEventListener("ready", (event) => {
    callData();
  });

  // End Fetching Data
  const navigate = useNavigate();
  const [button_hide, setNext] = useState({ display: "block" });
  const {
    register,
    handleSubmit,
    click,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_or_mobile: "",
      password: "",
    },
  });



  // Submit Users Data
  const [opration, setOpration] = useState("");
  const [Old_Password, set_old_Password] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [updateUserId, setUpdateId] = useState("");
  // const onSubmit = data => console.log(data);

  const submitPasswordData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/user/update_password", {
        old_password: Old_Password,
        password: Password,
        confirmPassword: ConfirmPassword,
        opration: "changePassword",
        id: updateUserId,
      })
      .then((res) => {
        callData();
        if (opration !== "changePassword")
          toast.success("Added Successfully", {});
        else toast.success("Update Successfully", {});
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
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
                    <div className="border p-4 rounded">
                      <div className="form-body">
                        <h3>Change Password !</h3>
                        <form className="row g-3">
                          <div className="col-12">
                            <input type="text"
                              onChange={(e) => set_old_Password(e.target.value)}
                              placeholder="Enter Old Password"
                              style={button_hide}
                              id="next_username_class" className="form-control" />
                            <p className="inputError">{errors.email_or_mobile?.message}</p>
                          </div>

                          <div className="col-12">
                            <input type="text"
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter New Password"
                              style={button_hide}
                              id="next_username_class" className="form-control" />
                            <p className="inputError">{errors.email_or_mobile?.message}</p>
                          </div>

                          <div className="col-12">
                            <input type="text"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm Password"
                              style={button_hide}
                              id="next_username_class" className="form-control" />
                            <p className="inputError">{errors.email_or_mobile?.message}</p>
                          </div>

                          <div className="col-12">
                            <div className="d-grid">
                              <button onClick={() => {
                                submitPasswordData();

                              }} className="btn btn-light"><i className="bx bxs-lock-open"></i>Submit</button>
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

export default Login;
