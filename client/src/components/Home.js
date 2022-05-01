import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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
            <div className="container align-self-center" style={{ width: "40rem" }}>
                <Card className="card-shadow">
                    <Card.Img variant="top" src={markFace} style={{ backgroundColor: "black" }} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                    </Card.Body>
                </Card>
                <Button className="m-4" variant="success">
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
                <Button className="m-4" variant="danger">
                    <FontAwesomeIcon icon={faHeartCrack} />
                </Button>
            </div>
        );
    }
};

export default Home;
