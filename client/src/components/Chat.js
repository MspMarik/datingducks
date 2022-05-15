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
import "../App.css";

const Chat = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setLoading(false);
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
                    <Card.Body>
                        <Card.Title id="name">Chat</Card.Title>
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
