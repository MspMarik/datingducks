import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import markFace from "../testImg/mark-face.JPEG";
import "../App.css";

const Matches = () => {
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        document.getElementById("matchesTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("profileTab").classList.remove("showlinkActive");
        document.getElementById("loginTab").classList.remove("showlinkActive");
        document.getElementById("logoutTab").classList.remove("showlinkActive");
        document.getElementById("chatTab").classList.remove("showlinkActive");
    }, []);

    function populateMatches() {
        //todo call db to get matches and loop to create elements
        let matches = [];
        for (let i = 0; i < 10; i++) {
            matches.push(
                <ListGroup.Item>
                    <Card.Text>match {i}</Card.Text>
                </ListGroup.Item>
            );
        }
        return matches;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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
                    <Card.Header className="card-header">
                        <h2>Matches</h2>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush" className="float-center">
                            {populateMatches()}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Matches;
