import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./Login";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Products } from "./Products";

function Main() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </HashRouter>
    );
}

export default Main;

if (document.getElementById("app")) {
    ReactDOM.render(<Main />, document.getElementById("app"));
}
