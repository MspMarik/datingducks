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

const Home = () => {
    const [loading, setLoading] = useState(true);

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

    function populateLikes() {
        //todo call db to get likes and loop to create elements
        let likes = [];
        return <Card.Text>Likes list</Card.Text>;
    }

    function populateDislikes() {
        //todo call db to get dislikes and loop to create elements
        let dislikes = [];
        return <Card.Text>Dislikes list</Card.Text>;
    }

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
                    <Card.Img variant="top" src={markFace} />
                    <Card.Body>
                        <Card.Title id="name">Name</Card.Title>
                        <ListGroup variant="flush" className="float-center">
                            <ListGroup.Item>
                                <Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Card.Text id="age">Age</Card.Text>
                                        <Card.Text id="gender">Gender</Card.Text>
                                    </div>
                                </Card.Text>
                                <Card.Text id="bio">Bio</Card.Text>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text className="fw-bold">Likes</Card.Text>
                                {populateLikes()}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text className="fw-bold">Dislikes</Card.Text>
                                {populateDislikes()}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <OverlayTrigger placement="top" overlay={likeTooltip} delay={{ show: 250, hide: 400 }}>
                    <Button className="m-4" variant="success">
                        <FontAwesomeIcon icon={faHeart} />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={dislikeTooltip} delay={{ show: 250, hide: 400 }}>
                    <Button className="m-4" variant="danger">
                        <FontAwesomeIcon icon={faHeartCrack} />
                    </Button>
                </OverlayTrigger>
            </div>
        );
    }
};

export default Home;
