import React, { useState, useEffect, useRef, useContext } from "react";
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
import {AuthContext} from '../firebase/Auth';
import axios from "axios";

const Matches = () => {
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [matches, setMatches] = useState(undefined);
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        if(!currentUser){
            navigate("/login");
        }
        document.getElementById("matchesTab").classList.add("showlinkActive");
        document.getElementById("ducksTab").classList.remove("showlinkActive");
        document.getElementById("profileTab").classList.remove("showlinkActive");
        if(currentUser)
        {
        document.getElementById("logoutTab").classList.remove("showlinkActive");
        }
        else{
        document.getElementById("loginTab").classList.remove("showlinkActive");
        }
        document.getElementById("chatTab").classList.remove("showlinkActive");
        async function getCurrUser(){
            return await axios.get("http://localhost:3001/date/match/" + currentUser.displayName).then(function (response){
                if (response.data) {
                    setMatches(response.data);
                }
            });
        }
        let currUser = getCurrUser();

    }, []);

    function populateMatches() {
        //todo call db to get matches and loop to create elements
        let matches = [];
        matches.forEach(element => {
            async function getUser(){
                return await axios.get("http://localhost:3001/date/" + element);
            }
            let user = getUser();
            matches.push(
                <ListGroup.Item>
                    <Card.Text>{user && user.data.name}</Card.Text>
                </ListGroup.Item>
            );
        });
        return matches;
    }

    const buildMatch = (match) => {
        async function getU(id) {
            return await axios.get("http://localhost:3001/date/" + id).then(function (response) {
                return response.data.name;
            })
        }
        let name = getU(match)
        return (<ListGroup.Item>
            <Card.Text>{match}</Card.Text>
        </ListGroup.Item>)
    }

    const listItems = matches && matches.map((match) => {
        return buildMatch(match);
    });

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
                            {listItems}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Matches;
