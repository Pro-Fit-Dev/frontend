import React, { useEffect, useState } from "react";
import * as S from "./Styles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { CommunityPost, tagMap } from "../../../recoil/types/recoilTypes";
const apiUrl = import.meta.env.VITE_API_URL;

const CommunityPage: React.FC = () => {

    const [activeFilter, setActiveFilter] = useState<CommunityPost["tag"]>("recruitment");
    const [posts, setPosts] = useState<CommunityPost[]>([]); // ✅ 전체 게시물 상태 추가
    const navigate = useNavigate();

    // 📌 데이터 로드 (전체 게시물 가져오기)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/communities/allCommunities`);
                const data: CommunityPost[] = await response.json();
                setPosts(data); // ✅ 전체 게시물 상태 저장
            } catch (error) {
                console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchPosts();
    }, []);

    // 📌 필터링된 게시물 목록
    const filteredPosts = posts.filter((post) => post.tag === activeFilter);

    return (
        <>
            <Header />
            <S.Container>
                <S.Title>커뮤니티</S.Title>
                <S.SubTitle>친구와 같이 운동해보세요!</S.SubTitle>
                <S.FilterWrapper style={{ gap: "5px" }}>
                    {Object.keys(tagMap).map((filter) => (
                        <S.FilterButton
                            key={filter}
                            isActive={activeFilter === filter}
                            onClick={() => setActiveFilter(filter as CommunityPost["tag"])}
                        >
                            {tagMap[filter as CommunityPost["tag"]]}
                        </S.FilterButton>
                    ))}
                </S.FilterWrapper>
                <S.PostList>
                    {filteredPosts.map((post) => (
                        <S.PostItem
                            key={post.communityId}
                            onClick={() => navigate(`/community/detail`, { state: { selectedPost: post } })}
                        >
                            <S.PostBadge>{tagMap[post.tag]}</S.PostBadge>
                            <S.PostTitle>{post.title}</S.PostTitle>
                            <S.PostPreview>{post.contents}</S.PostPreview>
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
