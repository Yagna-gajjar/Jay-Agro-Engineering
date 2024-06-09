import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./footer.css";

export default function Footer() {
    const [dth, setDth] = useState([]);

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
            <li><Link onClick={gototop} class="text-truncate links" to={"/dthdetails/" + e._id}>{e.dthname} DTH Rig</Link></li>
        );
    })

    let b = productpart.map((e) => {
        return (
            <li><Link onClick={gototop} class="text-truncate links" to='./ProductPart' >{e.productname}</Link></li>
        );
    })

    return (<div >
        <div className="footer">
            <div className="footer_about p-3 p-md-5">
                <div className="footer_brand p-md-5">
                    <img className="img-fluid logoimg" src="https://firebasestorage.googleapis.com/v0/b/jayagro-e8608.appspot.com/o/LOGO.PNG?alt=media&token=d7932cef-1cbd-438a-88b9-8a355d0c5f2b" />
                    <h1 className="footer_name">Jay Agro</h1>
                </div>
                <div className="footer_par">
                    Jay Agro Engineering is one of the well-known names in the DTH rig machine manufacturing industry. We are a well-established company also manufacturing DTH rig machine parts. We are committed in our efforts towards continuously trying to innovate and develop our machines to be of even more superior quality than what it was previously
                </div>
            </div>
            <div className="row">
                <div className="footer_links col-md-12 col-lg-4 p-3 p-md-5">
                    <ul>
                        <h3>Quick Links</h3>
                        <li><Link onClick={gototop} className="links" to="/">Home</Link></li>
                        <li><Link onClick={gototop} className="links" to="./About">About Us</Link></li>
                        <li><Link onClick={gototop} className="links" to="./DTHrig">DTH Rig</Link></li>
                        <li><Link onClick={gototop} className="links" to="./ProductPart">Product Part</Link></li>
                    </ul>
                </div>
                <div className="footer_links col-md-12 col-lg-4 p-3 p-md-5">
                    <ul>
                        <h3>Our Products & DTH</h3>
                        {a}
                        {b}
                    </ul>
                </div>
                <div className="footer_links col-md-12 col-lg-4 p-3 p-md-5">
                    <ul>
                        <h3>Contact Us</h3>
                        <li>
                            <div className="icon-box links">
                                <i className="bi bi-geo-alt-fill pe-2"></i>
                                Metoda, GIDC, Rajkot
                            </div>
                        </li>
                        <li className="links">
                            GST No.: 24AHJPG7548K1Z0
                        </li>
                        <li>
                            <div className="icon-box">
                                <i class="bi bi-telephone pe-2"></i>
                                <a href="tel:+919978422542">9978422542</a>
                            </div>
                        </li>
                        <li>
                            <div className="icon-box">
                                <i class="bi bi-telephone pe-2"></i>
                                <a href="tel:+919825536118">9825536118</a>
                            </div>
                        </li>
                        <li>
                            <div className="icon-box d-flex">
                                <i class="bi bi-envelope pe-2"></i>
                                <a href="mailto:jayagroengineerimg@gmail.com">jayagroengineerimg@gmail.com</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}