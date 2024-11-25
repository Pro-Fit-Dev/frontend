import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot, faComments, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로가 active인지 확인하는 함수
    const isActive = (path: string) => location.pathname === path;

    return (
        <FooterContainer>
            <IconContainer onClick={() => navigate("/home")}>
                <FontAwesomeIcon
                    icon={faHouse}
                    style={{ ...iconStyle, opacity: isActive("/home") ? 1 : 0.5 }}
                />
                <Text style={{ color: isActive("/home") ? "#2c3e50" : "#95a5a6" }}>홈</Text>
            </IconContainer>
            <IconContainer onClick={() => navigate("/map")}>
                <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ ...iconStyle, opacity: isActive("/map") ? 1 : 0.5 }}
                />
                <Text style={{ color: isActive("/map") ? "#2c3e50" : "#95a5a6" }}>내 주변 찾기</Text>
            </IconContainer>
            <IconContainer onClick={() => navigate("/community")}>
                <FontAwesomeIcon
                    icon={faComments}
                    style={{ ...iconStyle, opacity: isActive("/community") ? 1 : 0.5 }}
                />
                <Text style={{ color: isActive("/community") ? "#2c3e50" : "#95a5a6" }}>커뮤니티</Text>
            </IconContainer>
            <IconContainer onClick={() => navigate("/mypage")}>
                <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ ...iconStyle, opacity: isActive("/mypage") ? 1 : 0.5 }}
                />
                <Text style={{ color: isActive("/mypage") ? "#2c3e50" : "#95a5a6" }}>마이 페이지</Text>
            </IconContainer>
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 9%;
    background-color: #f8f8f8;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
`;

const IconContainer = styled.div`
    text-align: center;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const iconStyle = {
    fontSize: "24px",
    transition: "opacity 0.3s ease, color 0.3s ease",
};

const Text = styled.p`
    font-size: 12px;
    margin: 5px 0 0;
    transition: color 0.3s ease;
`;
