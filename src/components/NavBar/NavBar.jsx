import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/images/terra_logo.svg";
import styles from "./NavBar.module.css";

export default function NavBar() {
    const navigate = useNavigate();

    const Page = () => {
        navigate('/');
    };

    return (
        <div className={styles.background}>
            <div className={styles.item_01}>
                <img className={styles.img_01} src={Logo} onClick={Page} />
            </div>
            <div className={styles.search_01}>
                <div className={styles.search_02}>
                    <svg width="17" height="17" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.5 24.5L19.425 19.425M22.1667 12.8333C22.1667 17.988 17.988 22.1667 12.8333 22.1667C7.67868 22.1667 3.5 17.988 3.5 12.8333C3.5 7.67868 7.67868 3.5 12.8333 3.5C17.988 3.5 22.1667 7.67868 22.1667 12.8333Z"
                            stroke="#B3B3B3"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input className={styles.input_01} type='search' name="search" placeholder='원하는 지역을 겁색 하세요' />
                </div>
            </div>
            <ul className={styles.item_02}>
                <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : styles.Link_01}>유동인구</NavLink>
                <NavLink to="/recommend" className={({ isActive }) => isActive ? styles.active : styles.Link_01}>상권분석</NavLink>
                <NavLink to="/analysis" className={({ isActive }) => isActive ? styles.active : styles.Link_01}>상권추천</NavLink>
                <NavLink to='/trendhome' className={({ isActive }) => isActive ? styles.active : styles.Link_01}>트렌드</NavLink>
            </ul>
        </div>
    );
};