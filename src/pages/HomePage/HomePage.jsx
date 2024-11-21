import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import MapComponent from "../../api/MapComponent";

export default function HomePage() {
    return (
        <div>
            <NavBar />
            <MapComponent />
        </div>
    );
};