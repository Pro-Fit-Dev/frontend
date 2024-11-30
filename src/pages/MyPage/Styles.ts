import styled from "styled-components";

// 전체 컨테이너 스타일
export const Container = styled.div`
  padding: 40% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

// 프로필 섹션 스타일
export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7%;
  gap: 15px;
`;

// 환영 메시지 스타일
export const WelcomeMessage = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 16px;

  strong {
    font-weight: bold;
  }
`;

// 메뉴 리스트 스타일
export const MenuList = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

// 메뉴 아이템 스타일
export const MenuItem = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f1f1f1;
  text-align: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

// 지원 섹션 스타일
export const SupportSection = styled.div`
  position: fixed; /* 하단 고정을 위해 fixed 사용 */
  bottom: 15%; /* 화면 하단에서 약간 위로 */
  right: 16px;
  text-align: right; /* 오른쪽 정렬 */
`;

// 지원 문구 텍스트 스타일
export const SupportText = styled.p`
  font-size: 14px;
  margin-bottom: 8px; /* 버튼과의 간격을 조정 */
  color: #666;
  text-align: right; /* 텍스트도 오른쪽 정렬 */
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 8px 16px; /* 버튼의 내부 여백 */
  font-size: 14px; /* 버튼 텍스트 크기 */
  color: #3c6e71; /* 테두리와 동일한 색상으로 변경 */
  background-color: transparent; /* 배경 투명 */
  border: 1px solid #3c6e71;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d6e6e7; /* 호버 시 연한 색상 추가 */
    color: #3c6e71; /* 글자 색상 유지 */
  }
`;
