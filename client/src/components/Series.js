import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
const axios = require("axios");
const md5 = require("blueimp-md5");
const publickey = "649919672e4b578bcae36d66802be45c";
const privatekey = "76c1f7437954df25423bd40e78b708cd5fae0fa4";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/series";

const Series = (props) => {
    const [loading, setLoading] = useState(true);
    const [seriesData, setseriesData] = useState(undefined);
    let card = null;
    let prevHidden = useRef(""); //found useRef stuff at https://dmitripavlutin.com/react-useref-guide/
    let offset = useRef(0);
    let { page } = useParams(); //found useParams() at https://chrisvhur.medium.com/how-to-access-url-parameters-using-react-router-6-a4cf6bdad4dd
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            let url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
            if (parseInt(page) === 0) {
                console.log("on first page");
                prevHidden.current = "hidden"; //true, hidden
            } else {
                prevHidden.current = ""; //false, shown
            }
            try {
                let { data } = await axios.get(url, { params: { offset: 20 * page } });
                console.log(data);
                data = data.data.results;
                if (data.length == 0) {
                    navigate("/404");
                }
                console.log(data);
                setseriesData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [page]);

    const buildCard = (serie) => {
        return (
            <li>
                <Link to={`/series/${serie.id}`}>{serie.title}</Link>
            </li>
        );
    };
    if (seriesData) {
        card =
            seriesData &&
            seriesData.map((serie) => {
                return buildCard(serie);
            });
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <div>
                <ul>{card}</ul>
                <Link className={`prevnext ${prevHidden.current}`} to={`/series/page/${parseInt(page) - 1}`}>
                    Prev
                </Link>

                <Link className="prevnext" to={`/series/page/${parseInt(page) + 1}`}>
                    Next
                </Link>
            </div>
        );
    }
};

export default Series;
