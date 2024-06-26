import Img from "./img/LOGO.PNG"
import "./Navbar.css"
import NavContact from "./NavContact";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Enquiry from "./Enquiry";

export default function Navbar() {

    const [dth, setDth] = useState([]);

    const [showModel, setShowModel] = useState(false);

    let [pasingdthname, setPasingdthname] = useState({});
    const passdthname = async (e) => {
        const { id } = e.target;
        await setPasingdthname({ type: "merge", prop1: id });
        setShowModel(true)
    }

    const Mymodal = () => {
        return (
            <div className="modal-wrapper">

                <div className="modal-container container">
                    <div className="modal-header">
                        <h5></h5>
                        <button className="btn btn-warning" onClick={() => {
                            setShowModel(false)
                        }}>X</button>
                    </div>
                    <Enquiry name={pasingdthname.prop1} />
                </div>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jay-agro-server.onrender.com/dthrig');
            setDth(response.data);
        }
        fetchData();
    }, [])

    const [productpart, setProductpart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jay-agro-server.onrender.com/productparts');
            setProductpart(response.data);
        }
        fetchData();
    }, [])


    const gototop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    let a = dth.map((e) => {
        return (
            <li><Link class="dropdown-item text-truncate" to={"/dthdetails/" + e._id}>{e.dthname} DTH Rig</Link></li>
        );
    })

    let b = productpart.map((e) => {
        return (
            <li><Link class="dropdown-item text-truncate" id={e.productname} onClick={passdthname}>{e.productname}</Link></li>
        );
    })

    return (
        <>
            <NavContact />
            <nav class="navbar navbar-expand-xl bg-warning p-0 p-md-4">
                <div className="header_menu_bar">
                    <div className="d-flex">
                        <img className="logoimg me-1" src={Img} />
                        <Link class="navbar-brand text-white ps-1 ps-lg-4 text-truncate" to="/">JAY AGRO ENGINEERING.</Link>
                    </div>
                    <button class="navbar-toggler" type="button" onClick={() => {
                        document.getElementsByClassName("phone_menu")[0].classList.toggle("display");
                    }}>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="navlinks">
                        <ul class="navbar me-auto mb-0 mb-lg-0 pe-md-2 pe-lg-3">
                            <li class="nav-item mb-1">
                                <Link onClick={gototop} class="nav-link active text-truncate" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item mb-1">
                                <Link onClick={gototop} to="./About" class="nav-link text-truncate">About Us</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <div class="btn-group dropnavlink">
                                    <Link onClick={gototop} to="./DTHrig" class="nav-link text-truncate">DTH Rig
                                    </Link>
                                    <button type="button" class="btn btn-warning btn-sm text-black dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu">{a}
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item dropdown">
                                <div class="btn-group dropnavlink">
                                    <Link onClick={gototop} to="./ProductPart" class="nav-link text-truncate">Product Part</Link>
                                    <button type="button" class="btn btn-warning btn-sm text-black dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu">
                                        {b}
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link onClick={gototop} to="./contact" class="nav-link text-truncate mb-1 ps-1 pe-1">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="phone_menu">
                    <ul class="navbar me-auto mb-0 mb-lg-0 pe-md-2 pe-lg-3">
                        <li class="nav-item mb-1">
                            <Link onClick={gototop} class="nav-link active text-truncate" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item mb-1">
                            <Link onClick={gototop} to="./About" class="nav-link text-truncate">About Us</Link>
                        </li>
                        <li class="nav-item dropdown mb-1">
                            <div class="btn-group dropnavlink">
                                <Link onClick={gototop} to="./DTHrig" class="nav-link text-truncate">DTH Rig</Link>
                                <button type="button" class="btn btn-warning btn-sm text-black dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                <ul class="dropdown-menu">{a}</ul>
                            </div>
                        </li>
                        <li class="nav-item dropdown mb-1">
                            <div class="btn-group dropnavlink">
                                <Link onClick={gototop} to="./ProductPart" class="nav-link text-truncate">Product Part</Link>
                                <button type="button" class="btn btn-warning btn-sm text-black dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                <ul class="dropdown-menu">{b}</ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link onClick={gototop} to="./contact" class="nav-link text-truncate mb-1">Contact Us</Link>
                        </li>
                    </ul>

                </div>
                {showModel && <Mymodal />}
            </nav >
        </>);
}