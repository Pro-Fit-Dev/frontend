import React, { useState } from "react";
import * as S from "../Write/Styles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WritePage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleSubmit = async () => {
        if (!selectedHashtag) {
            alert("해시태그를 선택해주세요!");
            return;
        }
        if (!title || !content) {
            alert("제목과 본문을 입력해주세요!");
            return;
        }

        const tagMap: Record<string, string> = {
            모집: "recruitment",
            동네친구: "homie",
            질문: "question",
        };

        try {
            const response = await axios.post(
                "http://49.247.169.44:8080/custom/api/communities/save",
                {
                    tag: tagMap[selectedHashtag],
                    title,
                    contents: content,
                    userId: 1, // 유저 ID는 필요에 따라 동적으로 설정
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Response:", response.data);
                alert("게시글이 성공적으로 등록되었습니다!");
                navigate("/community");
            } else {
                alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <Header />
            <S.Container>
                <S.Title>게시글 작성</S.Title>
                <S.FilterWrapper>
                    <S.FilterToggle onClick={toggleDropdown}>
                        {selectedHashtag || "해시태그 선택"} ▼
                    </S.FilterToggle>
                    {isDropdownOpen && (
                        <S.FilterDropdown>
                            {["모집", "동네친구", "질문"].map((tag) => (
                                <S.FilterOption
                                    key={tag}
                                    onClick={() => {
                                        setSelectedHashtag(tag);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {tag}
                                </S.FilterOption>
                            ))}
                        </S.FilterDropdown>
                    )}
                </S.FilterWrapper>
                <S.Input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <S.TextArea
                    placeholder="본문을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <S.SubmitButton onClick={handleSubmit}>등록</S.SubmitButton>
            </S.Container>
            <Footer />
        </>
    );
};

export default WritePage;
