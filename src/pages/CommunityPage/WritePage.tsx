import React, { useState } from "react";
import * as S from "./Styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const WritePage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleSubmit = () => {
        if (!selectedHashtag) {
            alert("해시태그를 선택해주세요!");
            return;
        }
        console.log({
            title,
            content,
            hashtag: selectedHashtag,
        });
        navigate("/community"); // 등록 후 커뮤니티 페이지로 이동
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
                                        setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
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
