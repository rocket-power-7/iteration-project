import React, { useState } from "react";
import bg from "../../sprout.png";
import { Outlet } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import "../style.css";

export default function BodyLogged() {
    return (
        <div className="container">
            {/* <img src={bg} alt="bg" style={{ width: "100%", backgroundSize: "cover" }} /> */}
            <Outlet />
        </div>
    )
}