import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./Styles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { CommunityPost, tagMap } from "../../../recoil/types/recoilTypes"; // 타입과 태그 맵 가져오기

const apiUrl = import.meta.env.VITE_API_URL;

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL에서 ID 가져오기
    const [post, setPost] = useState<CommunityPost | null>(null); // 게시물 데이터 상태

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/communities/${id}`); // API 요청
                const data: CommunityPost = await response.json();
                setPost(data); // 데이터 상태 설정
            } catch (error) {
                console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post)
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                Loading...
            </div>
        );

    return (
        <>
            <Header />
            <S.Container>
                {/* 태그 표시 */}
                <S.PostBadge>{tagMap[post.tag]}</S.PostBadge>

                {/* 게시물 제목 */}
                <S.Title>{post.title}</S.Title>

                {/* 구분선 */}
                <hr style={{ borderColor: "#ddd", marginBottom: "16px" }} />

                {/* 게시물 본문 */}
                <p style={{ fontSize: "1rem", lineHeight: "1.5", marginBottom: "16px" }}>
                    {post.contents}
                </p>

                {/* 추가 데이터 */}
                {post.tag === "recruitment" && (
                    <p style={{ fontSize: "0.875rem", color: "#666" }}>
                        모집 인원: {post.headCount}, 참석 인원: {post.attendanceCount}
                    </p>
                )}
            </S.Container>
            <Footer />
        </>
    );
};

export default DetailPage;
