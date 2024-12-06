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

export const SubTitle = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
  color: #666;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.isActive ? "#3c6e71" : "#ddd")};
  background-color: ${(props) => (props.isActive ? "#3c6e71" : "transparent")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#2a544e" : "#f9f9f9")};
  }
`;

// 게시글 목록
export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 게시글 항목
export const PostItem = styled.div`
  padding: 16px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PostBadge = styled.div`
  display: inline-block;
  background: #3c6e71;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const PostTitle = styled.h2`
  font-size: 1rem;
  margin: 4px 0;
`;

export const PostPreview = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

export const AddButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3c6e71;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  &:hover {
    background-color: #2a544e;
  }
`;

export const FilterWrapper = styled.div`
    display:flex;
  position: relative;
  margin-bottom: 16px;
  width: 100%;
`;

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
