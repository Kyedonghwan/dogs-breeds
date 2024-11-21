import React from "react";
import { Outlet } from "react-router-dom";
import Gnb from "../components/Gnb";

const Layout = () => {
    return (
        <>
            <Gnb />
            <Outlet />
        </>
    )
}

export default Layout;