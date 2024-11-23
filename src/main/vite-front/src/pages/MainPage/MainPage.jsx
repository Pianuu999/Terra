import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

export default function MainPage() {
    const navigate = useNavigate();

    const Page = () => {
        navigate('/home');
    };

    return (
        <div className={styles.background}>
            <div className={styles.item_container}>
                <h3 className={styles.h3_01}>당신의 사업 성공을 위한 첫걸음</h3>
                <h3 className={styles.h3_01}>TERRA로 시작하세요</h3>
                <button className={styles.button_01} onClick={Page}>상권 분석하기</button>
            </div>
        </div>
    );
};