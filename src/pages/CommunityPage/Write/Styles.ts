import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  padding: 20% 5% 25% 5%;
`;

// 제목
export const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 5%;
`;

// 입력 필드 스타일
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }
`;

// 텍스트 영역 스타일
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: #aaa;
  }
`;

// 등록 버튼
export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #3c6e71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2a544e;
  }
`;

// 해시태그 버튼 컨테이너
export const HashtagWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
`;

// 해시태그 드롭다운 컨테이너
export const FilterWrapper = styled.div`
    display:flex;
  position: relative;
  margin-bottom: 16px;
  width: 100%;
`;

// 드롭다운
export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%; /* 버튼 바로 아래 */
  left: 0;
  width: 100%; /* 버튼과 동일한 너비 */
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const FilterToggle = styled.button`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const FilterOption = styled.div`
  padding: 10px 12px;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;
