import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Trend/Trend.module.css";
import logo from '../../Assets/Image/logo_01.svg';
import profile from '../../Assets/Image/analysist.jpg';
import mark from '../../Assets/Image/markdown.jpg';
import icon from '../../Assets/Image/3dhouse.jpg';
import graph from '../../Assets/Image/trendgraph.jpg';
import graph2 from '../../Assets/Image/trend2graph.jpg';
import NavBar from "../../Components/NavBar";

const Trend = () => {

    const navigate = useNavigate('')

    return (
        <>
        <NavBar/>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <div className={styles.logo} onClick={() => navigate('/home')}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className={styles.textContainer}>
                        <h3 className={styles.text1}>전문가와 알아보는</h3>
                        <h3 className={styles.text2}>2024년 상권 트렌드</h3>
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentContainer}>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.mediumTitle}>“데이터로 분석한 올해의 뜨는 상권”</h3>
                            <h3 className={styles.mediumTitleMini}>전문가와 함께 알아보시죠.</h3>
                            <div className={styles.profileContainerWrapper}>
                                <div className={styles.profileContainer}>
                                    <img src={profile} className={styles.profile} />
                                    <ul className={styles.profileInform}>
                                        <li>주시태</li>
                                        <li>- NICE지니테이타 실장</li>
                                        <li>- 데이터 분석 전문가</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.contextContainer}>
                                <h3 className={styles.context}>
                                    본격적인 이야기에 들어가기 앞서, 전문가가 꼽은 올해의 상권 3대 트렌드 키워드부터 확인해볼께요.
                                </h3>
                            </div>
                            <div className={styles.keywordContainer}>
                                <ul className={styles.keyword}>
                                    <li><img src={mark} />슬로우 스타터(Slow Starter)</li>
                                    <li><img src={mark} />리디스커버리(Re-discovery)</li>
                                    <li><img src={mark} />뉴타운(New Town)</li>
                                </ul>
                            </div>
                            <div className={styles.contextContainer}>
                                <h3 className={styles.context}>
                                    이번 콘텐츠에선 3대 키워드를 중심으로,
                                    “올해는 어떤 상권이 떠오를지” 구체적인 예시와 함께 분석해보겠습니다.
                                </h3>
                            </div>
                            <div className={styles.miniTitleContainer}>
                                <img src={icon} />
                                <h3 className={styles.miniTitle}>'늦었지만 더 높게' 슬로우스타터 상권</h3>
                            </div>
                            <div className={styles.contextContainer}>
                                <h3 className={styles.context}>
                                    지난해 말 ~ 올해 초, 길었던 코로나19 사태가 종료되면서
                                    많은 상권은 완연한 회복세를 보였죠. 하지만 워낙 타격이 컸던 탓에 아직도 완벽하게 회복되지 못한 상권이 있습니다. 바로 대학가죠.
                                </h3>
                            </div>
                            <div className={styles.miniTitleContainer2}>
                                <h3 className={styles.miniTitle2}>상권 유형별 외식시장 규모 변화</h3>
                            </div>
                            <div className={styles.graph}>
                                <img src={graph} />
                            </div>
                            <div className={styles.contextContainer2}>
                                <h3 className={styles.context}>
                                    2019년을 기준으로, 각 상권별 외식 시장 규모를 비교한 그래인데요. 코로나19 당시 폭발적으로 성장했던 도심 외곽 상권(기타 지역)의 그래프가 눈에 띄게 증가한 것이 보이시죠? 반면 대학가 상권은 모든 상권을 통틀어 가장 아래로 쳐졌고,
                                    지난해에도 그리 사정이 좋지 않았는데요. 다들 아시다시피,
                                    코로나19 당시 원격 수업이 시작되며 대학가의 유동인구가
                                    크게 감소했기 때문입니다. 하지만 내년부터는 눌려있던 대학가
                                    수요가 증가세로 돌아설 가능성이 높은데요. 아래 두 개
                                    그래프를 보시죠.
                                </h3>
                            </div>
                            <div className={styles.graph}>
                                <img src={graph2} />
                            </div>
                            <div className={styles.contextContainer2}>
                                <h3 className={styles.context}>
                                위 그래프는 일반 상권인 서울 용리
                                단길 아래 그래프는 대학가인 서울 신촌 상권의 월별 매출
                                변화를 표시한 건데요. 용리단길의 경우 2021년 말부터 회복을
                                시작해 2022년 하반기부터는 코로나19 이전보다 오히려 매출이
                                 늘어나는 현상이 발생했죠. 여전히 코로나19 이전과 비슷하거나
                                  낮은 매출을 기록하고 있는 신촌"대학가" 역시 올해에는 다른
                                   상권과 마찬가지로 코로나19 이전 수준을 넘어서는 성장을
                                   할 것으로 예측됩니다. 이러한 슬로우스타터는 상권이 하나
                                   더 있는데요. 바로 '위성상권'입니다. 전통적인 대형
                                    상권의 수요 일부가 인근으로 넘어가면서 형성되는
                                    상권을 위성 상권이라고 합니다. 코로나19 이후 폭
                                    발적으로 증가한 수요를 기존 상권이 전부 흡수하지
                                     못하면서 지난해부터 이러한 위성상권들이 크게 성
                                     장하고 있습니다. 대표적인 예로, 성수동 상권의
                                      위성 상권인 왕십리역을 보시죠.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h4>회사 정보</h4>
                        <ul>
                            <li><a href="#">회사 소개</a></li>
                            <li><a href="#">채용 정보</a></li>
                            <li><a href="#">서비스 이용 약관</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
            </div>
        </>
    )
}

export default Trend;