import styled from "styled-components";

export const Container = styled.div`
  padding: 25% 5% 15% 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7%;
  gap: 15px;
`;

export const WelcomeMessage = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 16px;

  strong {
    font-weight: bold;
  }
`;

export const MenuList = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

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

export const SupportSection = styled.div`
  width: 100%;
  right: 16px;
  text-align: right; 
`;

// 지원 문구 텍스트 스타일
export const SupportText = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
  text-align: right; 
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 8px 16px; 
  font-size: 14px; 
  color: #3c6e71; 
  background-color: transparent; 
  border: 1px solid #3c6e71;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d6e6e7;
    color: #3c6e71; 
  }
`;
