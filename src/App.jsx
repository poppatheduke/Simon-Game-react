import React from "react";
import { Routes, Route } from "react-router-dom"
import SimonGame from "./components/SimonGame";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Help from "./components/Help1";
import Dashboard from "./components/Dashboard";

function App() {
    return <div>
        <Routes>
            <Route path="/" element={<SimonGame />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/help" element={<Help />} />
            <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
    </div>
}

export default App;