import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw; /* 화면 전체 너비 */
  background-color: #ffffff;
  padding: 0 10%; /* 양옆 여백 추가 */
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
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10%;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;

  a {
    font-size: 14px;
    color: #7a7a7a;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CircleBtn = styled.a`
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: #dddddd;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const LoginBtn = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
  width: 100%;
  height: 11vw;
  border: 1px solid #dddddd;
  cursor: pointer;
  color: #111;
  border-radius: 4px;
  
  &:hover {
    background-color: #111;
    color: #fff;
  }
`