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
// let im = require('imagemagick');

function App() {

// im.identify('./testImg/mark-face.JPEG', function(err, features){
//     if (err) throw err;
//     console.log(features);
//   });
//   im.crop({
//     srcPath: './testImg/mark-face.JPEG',
//     dstPath: './testImg/mark-face.JPEG',
//     width: 900,
//     height: 900,
//     quality: 1,
//     gravity: "North"
//   }, function(err, stdout, stderr){
//     // foo
//     console.log(err);
//   });
//   im.crop({
//     srcPath: './testImg/mark-face.JPEG',
//     dstPath: './testImg/mark-smol.JPEG',
//     width: 900,
//     height: 900,
//     quality: 1,
//     gravity: "North"
//   }, function(err, stdout, stderr){
//     // foo
//     console.log(err);
//   });

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
