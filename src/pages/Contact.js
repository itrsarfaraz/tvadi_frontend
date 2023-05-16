import React from 'react'
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const axios = require("axios");


toast.configure();

function Contact() 
{
    const navigate = useNavigate();
    const {register,handleSubmit,watch,formState: { errors },} = useForm({defaultValues: {email_or_number: ""}});
    const onSubmit = (data) =>
    {   
        axios.post(process.env.REACT_APP_API_URL + "/user/contact",{name:data.name,email:data.email_or_number,message:data.message})
        .then((res) => 
        {
            toast.success("Thanks For Contact ");
            navigate("/");
        })
        .catch((err) => {toast.error("Email Address Not Found ")});
    }
    return (
        <>
            <div className="contact card_box">
                <h1 className='mt-2'>Contact Us</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and<br /> typesetting industry.</p>
                <form id='contactFrom' onSubmit={handleSubmit(onSubmit)} style={{paddingTop:'0'}}>
                    <div className="form-Group"> <label>Name</label> <input type="text" {...register("name", { required: "This is Required" })} /> <p className="inputError">{errors.name?.message}</p></div>
                    <div className="form-Group">
                        <label>Email</label>
                        <input type="text" {...register("email_or_number", { required: "This is Required" })}/>
                        <p className="inputError">{errors.email_or_number?.message}</p>
                    </div>
                    <div className="form-Group">
                        <label>Message</label>
                        <textarea type="text" style={{height:'112px'}} {...register("message", { required: "This is Required" })}/>
                        <p className="inputError">{errors.message?.message}</p>
                    </div>
                    <Button type="submit" className="form-signup">Contact Now</Button>
                </form>
            </div>
        </>
    )
}

export default Contact