import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Pages/TrendHome/TrendHome.module.css";
import NavBar from "../../components/NavBar/NavBar";

const TrendHome = () => {

    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className={styles.TrendHomeWrapper}>
                <div className={styles.wrapper}>
                    <div className={styles.textContainer}>
                        <p className={styles.tropicalText}>한 눈에 2024년</p>
                        <p className={styles.tropicalText}>상권 트렌드들을 파악해보세요!</p>
                    </div>
                    <div className={styles.box} onClick={() => {navigate('/trend')}}>
                        <div className={styles.img1} />
                        <div className={styles.informContainer}>
                            <div className={styles.inform}>“데이터로 분석한</div>
                            <div className={styles.inform}>올해의 뜨는 상권”</div>
                        </div>
                    </div>
                    <div className={styles.box} onClick={() => {navigate('/trend')}}>
                        <div className={styles.img2} />
                        <div className={styles.informContainer}>
                            <div className={styles.inform2}>“현재의 서울은 현황이 어떤지 알고싶다면?”</div>
                        </div>
                    </div>
                    <div className={styles.box} onClick={() => {navigate('/trend')}}>
                        <div className={styles.img3} />
                        <div className={styles.informContainer}>
                            <div className={styles.inform2}>"MZ들의 소비 페턴과 관련한 소비 트렌드"</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendHome;