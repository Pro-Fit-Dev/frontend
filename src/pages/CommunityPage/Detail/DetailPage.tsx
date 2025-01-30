import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Styles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { CommunityPost, tagMap } from "../../../recoil/types/recoilTypes"; // 타입과 태그 맵 가져오기

const apiUrl = import.meta.env.VITE_API_URL;

const DetailPage: React.FC = () => {
    const [commentCount, setCommentCount] = useState<number>(0);
    const location = useLocation();
    const [post, setPost] = useState<CommunityPost | null>(location.state?.selectedPost || null);

    // 📌 게시글 데이터 가져오기
    useEffect(() => {
        if (post) return;
        const fetchPost = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/communities/allCommunities`);
                const data: CommunityPost[] = await response.json(); // 💡 반드시 배열로 받기

                // state 없이 새로고침 한 경우, 전체 데이터에서 communityId 매칭
                const selectedPost = data.find((p) => p.communityId === location.state?.selectedPost?.communityId);

                if (selectedPost) {
                    setPost(selectedPost);
                } else {
                    console.error("해당 게시글을 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchPost();
    }, [post, location.state]);

    // 📌 댓글 개수 가져오기
    useEffect(() => {
        if (!post?.communityId) return;

        const fetchCommentCount = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/communities/${post.communityId}/comments`);
                const comments = await response.json(); // 💡 댓글 리스트로 받기

                // 댓글 개수 업데이트
                setCommentCount(comments.length);
            } catch (error) {
                console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchCommentCount();
    }, [post?.communityId]);

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
                <S.PostBadge>{tagMap[post.tag]}</S.PostBadge>
                <S.Title>{post.title}</S.Title>
                <hr style={{ borderColor: "#ddd", marginBottom: "16px", borderWidth: "0.5px" }} />

                {/* 게시물 본문 */}
                <p style={{ fontSize: "1rem", lineHeight: "1.5", marginBottom: "16px", height: "250px" }}>
                    {post.contents}
                </p>

                <hr style={{ borderColor: "#ddd", marginBottom: "16px", borderWidth: "0.5px" }} />
                <p style={{ fontSize: "0.875rem", color: "#666" }}>
                    댓글 수: {commentCount}
                </p>

                {post.tag === "recruitment" && (
                    <p style={{ fontSize: "0.875rem", color: "#666" }}>
                        모집 인원: {post.headCount ?? 0}, 참석 인원: {post.attendanceCount ?? 0}
                    </p>
                )}
            </S.Container>
            <Footer />
        </>
    );
};

export default DetailPage;
