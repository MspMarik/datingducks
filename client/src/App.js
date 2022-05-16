import logo from "./spinning-duck.gif";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Matches from "./components/Matches";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Chat from "./components/Chat";
import Chatroom from "./components/Chatroom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
    // function dTab() {
    //     document.getElementById("ducksTab").classList.add("showlinkActive");
    //     document.getElementById("matchesTab").classList.remove("showlinkActive");
    //     document.getElementById("profileTab").classList.remove("showlinkActive");
    //     document.getElementById("loginTab").classList.remove("showlinkActive");
    //     document.getElementById("logoutTab").classList.remove("showlinkActive");
    //     document.getElementById("chatTab").classList.remove("showlinkActive");
    // }

    // function mTab() {
    //     document.getElementById("matchesTab").classList.add("showlinkActive");
    //     document.getElementById("ducksTab").classList.remove("showlinkActive");
    //     document.getElementById("profileTab").classList.remove("showlinkActive");
    //     document.getElementById("loginTab").classList.remove("showlinkActive");
    //     document.getElementById("logoutTab").classList.remove("showlinkActive");
    //     document.getElementById("chatTab").classList.remove("showlinkActive");
    // }

    // function pTab() {
    //     document.getElementById("profileTab").classList.add("showlinkActive");
    //     document.getElementById("ducksTab").classList.remove("showlinkActive");
    //     document.getElementById("matchesTab").classList.remove("showlinkActive");
    //     document.getElementById("loginTab").classList.remove("showlinkActive");
    //     document.getElementById("logoutTab").classList.remove("showlinkActive");
    //     document.getElementById("chatTab").classList.remove("showlinkActive");
    // }

    // function cTab() {
    //     document.getElementById("chatTab").classList.add("showlinkActive");
    //     document.getElementById("ducksTab").classList.remove("showlinkActive");
    //     document.getElementById("matchesTab").classList.remove("showlinkActive");
    //     document.getElementById("loginTab").classList.remove("showlinkActive");
    //     document.getElementById("logoutTab").classList.remove("showlinkActive");
    //     document.getElementById("profileTab").classList.remove("showlinkActive");
    // }

    // function linTab() {
    //     document.getElementById("loginTab").classList.add("showlinkActive");
    //     document.getElementById("ducksTab").classList.remove("showlinkActive");
    //     document.getElementById("matchesTab").classList.remove("showlinkActive");
    //     document.getElementById("profileTab").classList.remove("showlinkActive");
    //     document.getElementById("logoutTab").classList.remove("showlinkActive");
    //     document.getElementById("chatTab").classList.remove("showlinkActive");
    // }

    // function loutTab() {
    //     document.getElementById("logoutTab").classList.add("showlinkActive");
    //     document.getElementById("ducksTab").classList.remove("showlinkActive");
    //     document.getElementById("matchesTab").classList.remove("showlinkActive");
    //     document.getElementById("profileTab").classList.remove("showlinkActive");
    //     document.getElementById("loginTab").classList.remove("showlinkActive");
    //     document.getElementById("chatTab").classList.remove("showlinkActive");
    // }

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Dating Ducks</h1>
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
                        <Link id="logoutTab" className="showlink float-end" to="/logout" hidden>
                            Logout
                        </Link>
                    </div>
                </header>
                <br />
                <br />
                <div className="App-body">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/logout" element={<Logout />} />
                        <Route exact path="/matches" element={<Matches />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/chat" element={<Chat />} />
                        <Route exact path="/chatroom/:num" element={<Chatroom />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
