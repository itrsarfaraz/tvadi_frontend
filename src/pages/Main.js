import "../asset/css/main.css";
import Container from '@mui/material/Container'
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Back from "../layout/Back";
import Footer from "../layout/Footer";
import { useState } from "react";

function Main() {
  return (
    <>
      <CssBaseline />
      {window.location.href.split("id=")[1] ? ("") : (<Back />)}
      <Container className="main-container" maxWidth={window.location.href.split("id=")[1] ? ("auto") : ("lg")} sx={{ paddingTop: "110px" }}>
        <Outlet />
      </Container>
      {window.location.href.split("id=")[1] ? ("") : (<Footer />)}

    </>

  )
}

export default Main