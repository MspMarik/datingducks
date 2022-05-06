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
                    <Card.Header>
                        <h2>Sign Up</h2>
                    </Card.Header>
                    <Form className="p-3">
                        <Form.Group className="mb-3" controlId="signupUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signupPass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" placeholder="Age" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="gender" placeholder="Gender" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="gender" placeholder="Gender" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
                <Link className="signuponloginpagelink mt-4" to="/login">
                    Already have an account? Click here to login!
                </Link>
            </div>
        );
    }
};

export default Home;
