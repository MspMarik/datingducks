import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Matches from "./components/Matches";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Marvel API</h1>
                    <div className="w-100">
                        <Link id="ducksTab" className="showlink float-center" to="/">
                            Find Ducks
                        </Link>
                        <Link id="matchesTab" className="showlink float-center" to="/matches">
                            Matches
                        </Link>
                        <Link className="showlink float-end" to="/login">
                            Login
                        </Link>
                        {/* <Link className="showlink" to="/signup">
                            Sign Up
                        </Link>
                        <Link className="showlink" to="/logout">
                            Logout
                        </Link> */}
                    </div>
                </header>
                <br />
                <br />
                <div className="App-body">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/signup" element={<Matches />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
