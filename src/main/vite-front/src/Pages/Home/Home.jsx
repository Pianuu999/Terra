import React from "react";
import MapComponent from "../../MapComponent";
import './Home.css'
import NavBar from "../../Components/NavBar";

export default function Home() {
    return (
        <div>
            <NavBar />
            <div>
                <MapComponent />
            </div>
        </div>
    );
}