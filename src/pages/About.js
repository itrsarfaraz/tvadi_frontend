import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


function About() 
{
  const navigate = useNavigate();
  const callContactPage = () =>
  {
    navigate("/contact");
  }
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName('main-container')[0].style.height = "100%";
    document.getElementsByClassName('main-container')[0].style.paddingBottom = "15px";
  })
  return (
    <div className="contact card_box" style={{ width: '80%' }}>
      <h1 className='mt-2'>About Myplaylist</h1>
      <h2 className='m-4' style={{ color: '#fff' }}>Who We Are </h2>
      <p className='mx-5' style={{ textAlign: 'left' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <h2 className='m-4' style={{ color: '#fff' }}>My Playlist</h2>
      <p className='mx-5' style={{ textAlign: 'left' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <br/>
      <button onClick={callContactPage} className='btn btn-primary'>Contact Now</button>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default About