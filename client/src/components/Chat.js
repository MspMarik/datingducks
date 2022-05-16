import React, { useState, useEffect, useRef, useContext } from "react";
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
import "../App.css";
import {AuthContext} from '../firebase/Auth';

const Chat = () => {
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        if(!currentUser){
            navigate("/login");
        }
        document.getElementById("chatTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("matchesTab").classList.remove("showlinkActive");
        if (currentUser) {
            document.getElementById("logoutTab").classList.remove("showlinkActive");
        } else {
            document.getElementById("loginTab").classList.remove("showlinkActive");
        }
        document.getElementById("profileTab").classList.remove("showlinkActive");
    }, []);

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
                        <ListGroup variant="flush" className="float-center">
                            <ListGroup.Item>
                                <Card.Text>Jan plz do chat ty</Card.Text>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Chat;
