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
        document.getElementById("profileTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("matchesTab").classList.remove("showlinkActive");
        document.getElementById("loginTab").classList.remove("showlinkActive");
        document.getElementById("logoutTab").classList.remove("showlinkActive");
        document.getElementById("chatTab").classList.remove("showlinkActive");
        //todo populate fields w/ current user info data from db
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
                <p>Here you can update your information of you want.</p>
                <Card className="card-shadow">
                    <Card.Header>
                        <h2>Profile</h2>
                    </Card.Header>
                    <Form className="p-3 text-start" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="profileNewName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="profileNewName" placeholder="Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewPass">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" name="profileNewPass" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" name="profileNewAge" placeholder="Age" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewGender" key="profileNewGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check name="profileNewGender" id="mGender" type="radio" value="Drake (Male)" label="Drake (Male)" onClick={mGender} required />
                            <Form.Check name="profileNewGender" id="fGender" type="radio" value="Hen (Female)" label="Hen (Female)" onClick={fGender} required />
                            <Form.Check name="profileNewGender" id="oGender" type="radio" value="Goose (Other)" label="Goose (Other)" onClick={oGender} required />
                            <Form.Control name="profileNewOtherGenderText" id="oGenderText" type="text" placeholder="If other, please specify your gender here" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewPref" key="profileNewPref">
                            <Form.Label>Preference</Form.Label>
                            <Form.Check name="profileNewPref" id="mPref" type="checkbox" value="Drake (Male)" label="Drake (Male)" onClick={mfoPref} required />
                            <Form.Check name="profileNewPref" id="fPref" type="checkbox" value="Hen (Female)" label="Hen (Female)" onClick={mfoPref} required />
                            <Form.Check name="profileNewPref" id="oPref" type="checkbox" value="Goose (Other)" label="Goose (Other)" onClick={mfoPref} required />
                            <Form.Check name="profileNewPref" id="aPref" type="checkbox" value="Any" label="Any" onClick={aPref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewStatus" key="profileNewStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Check name="profileNewStatus" id="qStatus" type="radio" value="Quacktonic (Platonic)" label="Quacktonic (Platonic)" required />
                            <Form.Check name="profileNewStatus" id="d2dStatus" type="radio" value="Down To Duck" label="Down To Duck 😏" required />
                            <Form.Check name="profileNewStatus" id="rStatus" type="radio" value="Requacktionship (Relationship)" label="Requacktionship (Relationship)" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" name="profileNewBio" placeholder="Tell us about yourself!" as="textarea" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewLikes">
                            <Form.Label>Likes</Form.Label>
                            <Form.Control type="text" name="profileNewLikes" placeholder="Tell us what you like with commas in between (i.e. bread, lakes, quacking)" as="textarea" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileNewDislikes">
                            <Form.Label>Dislikes</Form.Label>
                            <Form.Control type="text" name="profileNewDislikes" placeholder="Tell us what you don't like with commas in between (i.e. hunting season, Elmer Fudd, foxes)" as="textarea" required />
                        </Form.Group>
                        <Form.Group controlId="profileNewPic" className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" name="profileNewPic" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg, image/bmp" required />
                            {/* <Form.File type="file" onChange={(e) => console.log(e.target.files[0])} label="Profile Picture" accept=".png,.jpg,.jpeg,.webp" /> */}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
};

export default Profile;
