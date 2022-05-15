import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import markFace from "../testImg/mark-face.JPEG";
import io from "socket.io-client";
import "../App.css";

const ChatPage = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    // const [users, setUsers] = useState([]);


    const socketRef = useRef();

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        document.getElementById("chatTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("matchesTab").classList.remove("showlinkActive");
        document.getElementById("loginTab").classList.remove("showlinkActive");
        document.getElementById("logoutTab").classList.remove("showlinkActive");
        document.getElementById("profileTab").classList.remove("showlinkActive");
    }, []);

    // useEffect(() => {
    //     const sessionID = localStorage.getItem("sessionID");
    //     if (sessionID) {
    //         // this.usernameAlreadySelected = true;
    //         socketRef.current.auth = { sessionID };
    //         socketRef.current.connect();
    //     }
    // });

    const testSend = () => {
        socketRef.current.emit("hello", "world!");
    };

    const testLogin = () => {
        socketRef.current = io("/");
        // socketRef.current = io("/", {autoConnect: true});
        console.log("socket", socketRef.current);

        const sessionID = localStorage.getItem("sessionID");
        if (sessionID) {
            // this.usernameAlreadySelected = true;
            socketRef.current.auth = { sessionID };
            socketRef.current.connect();
        } else {
            socketRef.current.on("session", ({ sessionID, userID }) => {
                // attach the session ID to the next reconnection attempts
                socketRef.current.auth = { sessionID };
                // store it in the localStorage
                localStorage.setItem("sessionID", sessionID);
                // save the ID of the user
                socketRef.current.userID = userID;
            });
        }

        // socketRef.current.on("session", ({ sessionID, userID }) => {
        //     // attach the session ID to the next reconnection attempts
        //     socketRef.current.auth = { sessionID };
        //     // store it in the localStorage
        //     localStorage.setItem("sessionID", sessionID);
        //     // save the ID of the user
        //     socketRef.current.userID = userID;
        // });
        // socketRef.current.connect();
        // console.log("socket", socketRef.current);
    };

    const testLogout = () => {
        socketRef.current.disconnect();
        console.log("socket", socketRef.current);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("HELLO WORLD!!!");
    };

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <div className="container align-self-center card-container">
                <Card className="card-shadow">
                    <Card.Header>
                        <h2>Username ???</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id="name"> render chat in here??? </Card.Title>
                        <Button onClick={testLogin}> Login </Button>
                        <Button onClick={testSend}> Send </Button>
                        <Button onClick={testLogout}> Logout </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default ChatPage;
