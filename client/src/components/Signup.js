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

const Signup = () => {
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

    function mGender() {
        document.getElementById("mGender").setAttribute("required", "");
        document.getElementById("oGender").removeAttribute("required");
        document.getElementById("fGender").removeAttribute("required");
        document.getElementById("oGenderText").setAttribute("disabled", "");
        document.getElementById("oGenderText").removeAttribute("required");
    }

    function fGender() {
        document.getElementById("fGender").setAttribute("required", "");
        document.getElementById("mGender").removeAttribute("required");
        document.getElementById("oGender").removeAttribute("required");
        document.getElementById("oGenderText").setAttribute("disabled", "");
        document.getElementById("oGenderText").removeAttribute("required");
    }

    function oGender() {
        document.getElementById("oGender").setAttribute("required", "");
        document.getElementById("mGender").removeAttribute("required");
        document.getElementById("fGender").removeAttribute("required");
        document.getElementById("oGenderText").removeAttribute("disabled");
        document.getElementById("oGenderText").setAttribute("required", "");
    }

    function aPref() {
        document.getElementById("mPref").checked = false;
        document.getElementById("fPref").checked = false;
        document.getElementById("oPref").checked = false;
        document.getElementById("mPref").removeAttribute("required");
        document.getElementById("fPref").removeAttribute("required");
        document.getElementById("oPref").removeAttribute("required");
    }

    function mfoPref() {
        if (document.getElementById("mPref").checked === true && document.getElementById("fPref").checked === true && document.getElementById("oPref").checked === true) {
            document.getElementById("aPref").checked = true;
            aPref();
        } else if (document.getElementById("mPref").checked === false && document.getElementById("fPref").checked === false && document.getElementById("oPref").checked === false && document.getElementById("aPref").checked === false) {
            document.getElementById("mPref").setAttribute("required", "");
            document.getElementById("fPref").setAttribute("required", "");
            document.getElementById("oPref").setAttribute("required", "");
            document.getElementById("aPref").setAttribute("required", "");
        } else {
            document.getElementById("aPref").checked = false;
            document.getElementById("mPref").removeAttribute("required");
            document.getElementById("fPref").removeAttribute("required");
            document.getElementById("oPref").removeAttribute("required");
            document.getElementById("aPref").removeAttribute("required");
        }
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <div className="container align-self-center mb-5" style={{ width: "40rem" }}>
                <Link className="signuponloginpagelink mb-4" to="/login">
                    Already have an account? Click here to login!
                </Link>
                <Card className="card-shadow">
                    <Card.Header>
                        <h2>Sign Up</h2>
                    </Card.Header>
                    <Form className="p-3 text-start" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="signupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="signupName" placeholder="Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupEmail">
                            <Form.Label>Your Stevens Email</Form.Label>
                            <Form.Control type="email" name="signupEmail" placeholder="example@stevens.edu" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="signupUser" placeholder="Username" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupPass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="signupPass" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" name="signupAge" placeholder="Age" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupGender" key="signupGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check name="signupGender" id="mGender" type="radio" value="Drake (Male)" label="Drake (Male)" onClick={mGender} required />
                            <Form.Check name="signupGender" id="fGender" type="radio" value="Hen (Female)" label="Hen (Female)" onClick={fGender} required />
                            <Form.Check name="signupGender" id="oGender" type="radio" value="Goose (Other)" label="Goose (Other)" onClick={oGender} required />
                            <Form.Control name="signupOtherGenderText" id="oGenderText" type="text" placeholder="If other, please specify your gender here" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupPref" key="signupPref">
                            <Form.Label>Preference</Form.Label>
                            <Form.Check name="signupPref" id="mPref" type="checkbox" value="Drake (Male)" label="Drake (Male)" onClick={mfoPref} required />
                            <Form.Check name="signupPref" id="fPref" type="checkbox" value="Hen (Female)" label="Hen (Female)" onClick={mfoPref} required />
                            <Form.Check name="signupPref" id="oPref" type="checkbox" value="Goose (Other)" label="Goose (Other)" onClick={mfoPref} required />
                            <Form.Check name="signupPref" id="aPref" type="checkbox" value="Any" label="Any" onClick={aPref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupStatus" key="signupStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Check name="signupStatus" id="qStatus" type="radio" value="Quacktonic (Platonic)" label="Quacktonic (Platonic)" required />
                            <Form.Check name="signupStatus" id="d2dStatus" type="radio" value="Down To Duck" label="Down To Duck 😏" required />
                            <Form.Check name="signupStatus" id="rStatus" type="radio" value="Requacktionship (Relationship)" label="Requacktionship (Relationship)" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" name="signupBio" placeholder="Tell us about yourself!" as="textarea" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupLikes">
                            <Form.Label>Likes</Form.Label>
                            <Form.Control type="text" name="signupLikes" placeholder="Tell us what you like with commas in between (i.e. bread, lakes, quacking)" as="textarea" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupDislikes">
                            <Form.Label>Dislikes</Form.Label>
                            <Form.Control type="text" name="signupDislikes" placeholder="Tell us what you don't like with commas in between (i.e. hunting season, Elmer Fudd, foxes)" as="textarea" required />
                        </Form.Group>
                        <Form.Group controlId="signupPic" className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" name="signupPic" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg, image/bmp" required />
                            {/* <Form.File type="file" onChange={(e) => console.log(e.target.files[0])} label="Profile Picture" accept=".png,.jpg,.jpeg,.webp" /> */}
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

export default Signup;
