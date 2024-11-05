import React from "react";
import MapComponent from "../../MapComponent"; // 두 단계 위로 올라감
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
