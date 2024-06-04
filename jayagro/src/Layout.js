import Navbar from "./Navbar.js";
import Footer from "./Footer.js"
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <a href="https://wa.me/+919978422542" className="whatsaApp"><i class="bi bi-whatsapp"></i></a>
        </>
    );
}