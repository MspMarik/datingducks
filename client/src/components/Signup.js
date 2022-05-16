import React, { useContext, useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import markFace from "../testImg/mark-face.JPEG";
import "../App.css";
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../firebase/Auth';
import axios from "axios";
import picone from "../profile/1.jpeg"

const Signup = () => {
    const {currentUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    let mongoId;

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    async function handleSubmit (event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            // let pathtopic = "";
            let formData = new FormData();
            // let file = form.elements.signupPic.files[0]
            // let d = new Date();
            // let filename = d.getMonth().toString() + "-" + d.getDay().toString() + "-" + d.getFullYear().toString() + "_" + file.name;
            let gender = form.elements.signupGender.value;
            if (gender =="Goose (Other)") {
                gender = form.elements.signupOtherGenderText.value
            }
            let mPref = form.elements.signupPref[0];
            let fPref = form.elements.signupPref[1];
            let oPref = form.elements.signupPref[2];
            let aPref = form.elements.signupPref[3];
            let pref = [];
            if (aPref.checked) {
                pref.push(aPref.value);
            } else {
                if (mPref.checked) {
                    pref.push(mPref.value);
                }
                if (fPref.checked) {
                    pref.push(fPref.value);
                }
                if (oPref.checked) {
                    pref.push(oPref.value);
                }
            }
            // let data = {
            //     signupName: form.elements.signupName.value,
            //         signupAge: form.elements.signupAge.value,
            //         signupGender: gender,
            //         signupEmail: form.elements.signupEmail.value,
            //         pic: pathtopic,
            //         signupUser: form.elements.signupUser.value,
            //         signupPass: form.elements.signupPass.value,
            //         signupBio: form.elements.signupBio.value,
            //         signupLikes: form.elements.signupLikes.value,
            //         signupDislikes: form.elements.signupDislikes.value,
            //         signupStatus: form.elements.signupStatus.value,
            //         signupPref: pref,
            // }
            formData.append("pic", form.elements.signupPic.value);
            formData.append("signupName",form.elements.signupName.value);
            formData.append("signupAge",form.elements.signupAge.value);
            formData.append("signupGender",gender);
            formData.append("signupEmail",form.elements.signupEmail.value);
            formData.append("signupUser",form.elements.signupUser.value);
            formData.append("signupPass",form.elements.signupPass.value);
            formData.append("signupBio",form.elements.signupBio.value);
            formData.append("signupLikes",form.elements.signupLikes.value);
            formData.append("signupDislikes",form.elements.signupDislikes.value);
            formData.append("signupStatus",form.elements.signupStatus.value);
            formData.append("signupPref",pref);
            console.log(formData)
            let data = await axios.post('http://localhost:3001/date/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).catch(function (error) {
                console.log(error.toJSON());
              }).then (function(response) {
                  console.log(response)
                  mongoId = response.data._id;

              });
            console.log(data);
        
            try {
    
              await doCreateUserWithEmailAndPassword(
                form.elements.signupEmail.value,
                form.elements.signupPass.value,
                mongoId
              );
    
            } catch (error) {
              alert(error);
            }
        }
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        //upload.single('signupPic');
        
        // let {data} = axios.post("http://localhost:3001/date/", 
        //     {
                // signupName:,
                // signupAge:,
                // signupGender:,
                // signupEmail:,
                // pic:,
                // signupUser:,
                // signupPass:,
                // signupBio:,
                // signupLikes:,
                // signupDisikes:,
                // signupStatus:,
                // signupPref:,

        //     }
        //     );
        const {signupName, signupEmail, signupPassword} = e.target.elements;
    
        try {

          await doCreateUserWithEmailAndPassword(
            signupEmail.value,
            signupPassword.value,
            signupName
          );

        } catch (error) {
          alert(error);
        }
      };
      if (currentUser) {
        return <Navigate to='/' />;
      }
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

    if (currentUser) {
        return <Navigate to='/' />;
      }
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <div className="container align-self-center mb-5 card-container">
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
                            <Form.Control type="number" name="signupAge" placeholder="Age" min="18" max="125" required />
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
                            <Form.Check name="signupPic" id="pic1" type="radio" value="1" label="1" required /><img className="w60" src={picone} alt="profile picture" />
                            {/* <Form.Control type="file" name="signupPic" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg, image/bmp" required /> */}
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
