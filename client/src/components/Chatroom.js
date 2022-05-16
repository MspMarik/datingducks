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

const Chatroom = () => {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ message: "" });
    const [chat, setChat] = useState([]);

    const socketRef = useRef();
    let { num } = useParams();

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

    useEffect(() => {
        socketRef.current = io("/");
        return () => {
          socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        socketRef.current.on("direct message", ({ message, room }) => {
          setChat([...chat, { message }]);
        });
        socketRef.current.emit("user_join", "Chatroom " + num);
    }, [chat, num]);

    const onMessageSubmit = (e) => {
        e.preventDefault();
        let msgEle = document.getElementById("message").value;
        // console.log([msgEle.name], msgEle.value);
        // console.log(msgEle.value);
        console.log(msgEle);
        // setState({ ...state, [msgEle.name]: msgEle.value });
        setState({ ...state, message: msgEle });
        // socketRef.current.emit("private message", {
        //   message: msgEle
        // });
        // socketRef.current.emit("repeat", {
        //     message: msgEle,
        //     room: "Chatroom " + num
        // });
        socketRef.current.emit("direct message", {
            message: msgEle,
            room: "Chatroom " + num
        });
        // socketRef.current.emit("private message", {
        //     message: msgEle
        // });
        // e.preventDefault();
        // setState({ message: "", name: state.name });
        setState({ message: ""});
        msgEle = "";
        // msgEle.focus();
        // e.preventDefault();
        // console.log(count++);
    };

    const renderChat = () => {
        return chat.map(({ message }, index) => (
          <div key={index}>
            <h3>
              User: <span>{message}</span>
            </h3>
          </div>
        ));
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
                        <h2>Chatroom {num}</h2>
                    </Card.Header>
                    <Card.Body>
                        {renderChat()}
                    </Card.Body>
                    <Card.Footer>
                        <Form onSubmit={ onMessageSubmit }>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" id="message" name="messageBox" placeholder="Start chatting!"/>
                            </Form.Group>
                            <Button type="submit"> Send </Button>
                        </Form>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
};

export default Chatroom;
