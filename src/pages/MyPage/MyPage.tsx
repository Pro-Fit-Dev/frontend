import React, { useState } from "react";
import * as S from "./Styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NickNameModal from "../../components/MyPage/NickNameModal";
import PwChangeModal from "../../components/MyPage/PwChangeModal";
import CalculateModal from "../../components/MyPage/CalculateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const MyPage: React.FC = () => {
    const [modalState, setModalState] = useState<"nickname" | "password" | "bmi" | null>(null);

    const openModal = (type: "nickname" | "password" | "bmi") => setModalState(type);
    const closeModal = () => setModalState(null);

    return (
        <>
            <Header />
            <S.Container>
                <S.ProfileSection>
                    <FontAwesomeIcon icon={faUserCircle} size="7x" />
                    <S.WelcomeMessage>
                        안녕하세요! <strong>마루</strong>님의 마이페이지입니다.
                    </S.WelcomeMessage>
                </S.ProfileSection>
                <S.MenuList>
                    <S.MenuItem onClick={() => openModal("nickname")}>내 별명 설정</S.MenuItem>
                    <S.MenuItem onClick={() => openModal("password")}>비밀번호 변경</S.MenuItem>
                    <S.MenuItem onClick={() => openModal("bmi")}>BMI 계산기</S.MenuItem>
                </S.MenuList>
                <S.SupportSection>
                    <S.SupportText>
                        내가 청소년이라면? 국가에서 지원받고 운동하자!
                    </S.SupportText>
                    <S.Button>스포츠 바우처 신청</S.Button>
                </S.SupportSection>
            </S.Container>
            {modalState === "nickname" && <NickNameModal isOpen={true} onClose={closeModal} />}
            {modalState === "password" && <PwChangeModal isOpen={true} onClose={closeModal} />}
            {modalState === "bmi" && <CalculateModal isOpen={true} onClose={closeModal} />}
            <Footer />
        </>
    );
};

export default MyPage;
