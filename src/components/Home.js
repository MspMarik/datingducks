import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
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
                    <Card.Img variant="top" src={logo} style={{ backgroundColor: "black" }} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                    </Card.Body>
                </Card>
                <Button className="m-4" variant="success">
                    Like
                </Button>
                <Button className="m-4" variant="danger">
                    Dislike
                </Button>
            </div>
        );
    }
};

export default Home;
