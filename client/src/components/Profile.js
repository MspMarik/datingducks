import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import markFace from "../testImg/mark-face.JPEG";
import "../App.css";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, []);

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
            <div className="container align-self-center" style={{ width: "40rem" }}>
                <Card className="card-shadow">
                    <Card.Header>
                        <h2>Profile</h2>
                    </Card.Header>
                    <Form className="p-3 text-start" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="loginUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Username" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
};

export default Profile;
