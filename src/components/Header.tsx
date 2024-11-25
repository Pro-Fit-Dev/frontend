import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

// 로고와 알림 아이콘을 포함한 헤더
const Header = () => {
  return (
    <HeaderContainer>
      <Logo>FitHan</Logo>
      <NotificationIcon>
        <FontAwesomeIcon icon={faBell} />
      </NotificationIcon>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 2px solid #ccc;
`;

const Logo = styled.h1`
  font-family: 'FitHan', sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-left: 30px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const NotificationIcon = styled.div`
  font-size: 1.8rem;
  color: #3C6E71;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right : 30px;

  &:hover {
    color: #8EC6C5; /* 사용자 경험을 위해 hover 스타일 추가 */
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
