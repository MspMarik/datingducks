import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
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

const Chat = () => {
    const [loading, setLoading] = useState(true);
    // const [sessID, setSessID] = useState();
    // const [username, setUsername] = useState("");
    // const [users, setUsers] = useState([]);


    // const socketRef = useRef();

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

    function usersToChat() {
        //todo call db to get matches and loop to create elements
        let users = [];
        for (let i = 0; i < 3; i++) {
            users.push(
                <ListGroup.Item>
                    <Link to={`/chat/${i}`}> user {i} </Link>
                </ListGroup.Item>
            );
        }
        return users;
    }

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
                        <h2>Chat</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id="name">Username ???</Card.Title>
                        <ListGroup variant="flush" className="float-center">
                            {usersToChat()}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Chat;
