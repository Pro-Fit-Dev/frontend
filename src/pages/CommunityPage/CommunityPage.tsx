import React, { useState } from "react";
import * as S from "./Styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const CommunityPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>("모집");
    const navigate = useNavigate();

    // 더미 데이터
    const dummyPosts = {
        모집: [
            { id: 1, title: "복싱 파티원 모집 (1/n)", preview: "본문 내용 어쩌고 미리보기" },
            { id: 2, title: "클라이밍 동호회 모집 (2/n)", preview: "이런 운동 어때요?" },
            { id: 7, title: "클라이밍 동호회 모집 (2/n)", preview: "이런 운동 어때요?" },
            { id: 8, title: "클라이밍 동호회 모집 (2/n)", preview: "이런 운동 어때요?" },
        ],
        동네친구: [
            { id: 3, title: "동네 친구 구합니다!", preview: "근처에서 운동하실 분?" },
            { id: 4, title: "산책 모임", preview: "같이 산책하며 건강 챙겨요." },
        ],
        질문: [
            { id: 5, title: "운동 루틴 추천해주세요", preview: "헬스 초보입니다." },
            { id: 6, title: "복싱 vs 헬스?", preview: "어떤 운동이 나을까요?" },
        ],
    };

    // 현재 필터에 따른 게시글 가져오기
    const filteredPosts = dummyPosts[activeFilter] || [];

    return (
        <>
            <Header />
            <S.Container>
                <S.Title>커뮤니티</S.Title>
                <S.SubTitle>친구와 같이 운동해보세요!</S.SubTitle>
                <S.FilterWrapper style={{ "gap": "5px" }}>
                    <S.FilterButton
                        isActive={activeFilter === "모집"}
                        onClick={() => setActiveFilter("모집")}
                    >
                        모집
                    </S.FilterButton>
                    <S.FilterButton
                        isActive={activeFilter === "동네친구"}
                        onClick={() => setActiveFilter("동네친구")}
                    >
                        동네친구
                    </S.FilterButton>
                    <S.FilterButton
                        isActive={activeFilter === "질문"}
                        onClick={() => setActiveFilter("질문")}
                    >
                        질문
                    </S.FilterButton>
                </S.FilterWrapper>
                <S.PostList>
                    {filteredPosts.map((post) => (
                        <S.PostItem key={post.id}>
                            <S.PostBadge>{activeFilter}</S.PostBadge>
                            <S.PostTitle>{post.title}</S.PostTitle>
                            <S.PostPreview>{post.preview}</S.PostPreview>
                        </S.PostItem>
                    ))}
                </S.PostList>
                <S.AddButton onClick={() => navigate("/community/write")}>+</S.AddButton>
            </S.Container>
            <Footer />
        </>
    );
};

export default CommunityPage;
