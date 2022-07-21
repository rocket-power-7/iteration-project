import React, { useState } from "react";
import bg from "../../sprout.jpg";
import { Outlet } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import "../style.css";

export default function BodyLogged() {
    return (
        <div className="container" style={{width:"100%", border: "solid"}}>
            <img src={bg} alt="bg" style={{ width: "100%", backgroundSize: "cover" }} />
            <Outlet />
        </div>
    )
}