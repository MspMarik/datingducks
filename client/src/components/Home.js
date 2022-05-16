import React, { useState, useEffect, useRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import {AuthContext} from '../firebase/Auth';
import axios from "axios";
import pic from "../profile/1.jpeg"
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(undefined);
    const {currentUser} = useContext(AuthContext);
    let navigate = useNavigate();
    let card = null;

    const likeTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );

    const dislikeTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Dislike
        </Tooltip>
    );

    async function getNextProfile() {
        let id = currentUser.displayName;
        return await axios.get('http://localhost:3001/date/random/'+id).then(function (response){
            if (response.data) {
                setContent(response.data);
            }
        }).catch(function (error) {
            console.log(error.toJSON());
            return;
          })
    }

    async function likeProfile() {
        //do somewthing\
        await axios.post('http://localhost:3001/date/like', {currentID: currentUser.displayName, likedUser: content._id}).then(function (response){
            if (response.data.match) {
                alert("It's a match! Check the Matches tab to see your matches.")
            }
        }).catch(function (error) {
            console.log(error.toJSON());
            if (error == "user is already liked") {
                alert("You've already liked this user! :)")
            }
          })
        getNextProfile()
    }

    useEffect(() => {
        setLoading(true);
        if(!currentUser){
            navigate("/login");
        }
        document.getElementById("ducksTab").classList.add("showlinkActive");
        document.getElementById("matchesTab").classList.remove("showlinkActive");
        document.getElementById("profileTab").classList.remove("showlinkActive");
        if (currentUser) {
            document.getElementById("logoutTab").classList.remove("showlinkActive");
        } else {
            document.getElementById("loginTab").classList.remove("showlinkActive");
        }
        document.getElementById("chatTab").classList.remove("showlinkActive");
        async function get(){
            return await getNextProfile().data;
        }
        let c = get();
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
                    <Card.Img variant="top" src={pic} />
                    <Card.Body>
                        <Card.Title id="name">{content && content.name}</Card.Title>
                        <ListGroup variant="flush" className="float-center">
                            <ListGroup.Item>
                                <Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Card.Text id="age">{content && content.age}</Card.Text>
                                        <Card.Text id="gender">{content && content.gender}</Card.Text>
                                    </div>
                                </Card.Text>
                                <Card.Text id="bio">{content && content.bio}</Card.Text>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text className="fw-bold">Likes</Card.Text>
                                {content && content.likes}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text className="fw-bold">Dislikes</Card.Text>
                                {content && content.dlikes}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <OverlayTrigger placement="top" overlay={likeTooltip} delay={{ show: 250, hide: 400 }}>
                    <Button className="m-4" variant="success" onClick={likeProfile}>
                        <FontAwesomeIcon icon={faHeart} />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={dislikeTooltip} delay={{ show: 250, hide: 400 }}>
                    <Button className="m-4" variant="danger" onClick={getNextProfile}>
                        <FontAwesomeIcon icon={faHeartCrack} />
                    </Button>
                </OverlayTrigger>
            </div>
        );
    }
};

export default Home;
