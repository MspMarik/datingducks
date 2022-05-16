import logo from "./ddnotextlogo.png";
import textlogo from "./ddlogo.png";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Matches from "./components/Matches";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Chat from "./components/Chat";
import Chatroom from "./components/Chatroom";
import Navigation from "./components/Navigation";
import {AuthProvider} from './firebase/Auth';
import {AuthContext} from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";

function App() {


    return (
        <AuthProvider>
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Dating Ducks</h1>
                    <span style={{width: "100%"}}><Navigation /></span>
                    
                </header>
                <br />
                <br />
                <div className="App-body">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/logout" element={<Logout />} />
                        <Route exact path="/matches" element={<Matches />} />
                        {/* <Route exact path="/profile" element={<Profile />} /> */}
                        <Route exact path="/chat" element={<Chat />} />
                        <Route exact path="/chatroom/:num" element={<Chatroom />} />
                    </Routes>
                </div>
            </div>
            <footer>
                <img src={textlogo} className="App-logo" alt="logo" />
            </footer>
        </Router>
        </AuthProvider>
    );
}

export default App;
