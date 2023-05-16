import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
const axios = require("axios");
toast.configure();

function Forgot() {

    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const user_password = watch("password");

    const onSubmit = (data) => {
        if (window.location.href.split("ids=")[1]) {
            axios.post(process.env.REACT_APP_API_URL + "/user/update_password",
                {
                    password: data["password"],
                    id: window.location.href.split("ids=")[1]
                })
                .then((res) => {
                    toast.success("Update Successfully", {});
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error("Password Not Updated !", {});
                });
        }
        else {
            console.log("err");
        }
    }
    return (
        <>
            <div className="sign-up card_box">
                <h3>Reset Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-Group">
                        <label>New Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "This is Required",
                                minLength: {
                                    value: 8,
                                    message: "minimum length 8 character",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                    message: "Must Be One Capital Letter , One Special Character"
                                }
                            })}
                        />
                        <p className="inputError">{errors.password?.message}</p>
                    </div>
                    <div className="form-Group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirm_password", {
                                validate: (value) =>
                                    value === user_password || "The passwords do not match",
                            })}
                        />
                        <p className="inputError">{errors.confirm_password?.message}</p>
                    </div>
                    <Button type="submit" className="form-signup">
                        Change Password
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Forgot