import React, { useState, useEffect, useRef, useContext } from "react";
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
import {AuthContext} from '../firebase/Auth';
import axios from "axios";

const Chatroom = () => {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ message: "", name: "" });
    const [chat, setChat] = useState([]);
    const [username, setUsername] = useState("");
    const {currentUser} = useContext(AuthContext);

    const socketRef = useRef();
    let { num } = useParams();

    let getUsername = async (id) => {
        let userInfo = await axios.get('http://localhost:3001/date/' + id);
        return userInfo.data.username;
    }

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        document.getElementById("chatTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("matchesTab").classList.remove("showlinkActive");
        if (currentUser) {
            document.getElementById("logoutTab").classList.remove("showlinkActive");
        } else {
            document.getElementById("loginTab").classList.remove("showlinkActive");
        }
    }, []);

    useEffect(() => {
        // let id = currentUser.displayName;
        // let uname = getUsername(id);
        setUsername(currentUser.displayName);
    }, [currentUser.displayName]);

    useEffect(() => {
        socketRef.current = io("/");
        return () => {
          socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        socketRef.current.on("direct message", ({ message, name, room }) => {
          setChat([...chat, { message, name }]);
        });
        socketRef.current.emit("user_join", "Chatroom " + num);
    }, [chat, num]);

    const onMessageSubmit = (e) => {
        e.preventDefault();
        let msgEle = document.getElementById("message").value;
        console.log(msgEle);
        setState({ ...state, message: msgEle, name: username });
        socketRef.current.emit("direct message", {
            message: msgEle,
            name: username,
            room: "Chatroom " + num
        });
        // setState({ message: "", name: state.name });
        setState({ message: ""});
        msgEle = "";
        // console.log(username);
    };

    const renderChat = () => {
        return chat.map(({ message , name}, index) => (
          <div key={index}>
            <h3>
              {name}: <span>{message}</span>
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
