import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20% 10%;
  width: 100vw;
  height: auto;
  background-color: #ffffff;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;

  a {
    font-size: 14px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LoginBtn = styled.button`
  width: 100%;
  padding: 12px; /* 버튼 높이 조정 */
  background-color: #007bff; /* 버튼 색상 변경 */
  color: white;
  border: none;
  border-radius: 8px; /* 버튼 둥근 테두리 */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* 호버 시 색상 변경 */
  }
`;