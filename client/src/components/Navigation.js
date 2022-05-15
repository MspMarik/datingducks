import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../firebase/Auth';
// import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <div className="w-100">
        <Link id="ducksTab" className="showlink showlinkActive float-start" to="/">
            Find Ducks
        </Link>
        <Link id="matchesTab" className="showlink float-start" to="/matches">
            Matches
        </Link>
        <Link id="profileTab" className="showlink float-start" to="/profile">
            Profile
        </Link>
        <Link id="chatTab" className="showlink float-start" to="/chat">
            Chat
        </Link>
        <Link id="logoutTab" className="showlink float-end" to="/logout">
            Logout
        </Link>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div className="w-100">
        <Link id="ducksTab" className="showlink showlinkActive float-start" to="/">
            Find Ducks
        </Link>
        <Link id="matchesTab" className="showlink float-start" to="/matches">
            Matches
        </Link>
        <Link id="profileTab" className="showlink float-start" to="/profile">
            Profile
        </Link>
        <Link id="chatTab" className="showlink float-start" to="/chat">
            Chat
        </Link>
        <Link id="loginTab" className="showlink float-end" to="/login">
            Login
        </Link>
    </div>
  );
};

export default Navigation;



