import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState";

const apiUrl = import.meta.env.VITE_API_URL;

interface NickNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NickNameModal: React.FC<NickNameModalProps> = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState("");
  const [user, setUser] = useRecoilState(userState);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/users/nickname?userId=${user.id}&nickName=${nickname}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Response Data:", data);
      if (response.ok) {
        alert(data.message);

        // Recoil 상태 업데이트
        setUser((prevState) => ({
          ...prevState,
          nickName: nickname,
        }));

        onClose();
        window.location.reload();
      } else if (response.status === 400) {
        alert(data.message);
      } else {
        alert("닉네임 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>내 별명 설정</ModalHeader>
        <ModalInput
          type="text"
          placeholder="별명을 입력해주세요!"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <ModalFooter>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NickNameModal;

// 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 5%;
  width: 70%;
  height: 30%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #333;
`;

const ModalInput = styled.input`
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ddd;
  margin: 10% 0 20% 0;
  outline: none;
  text-align: center;
  box-sizing: border-box;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-bottom-color: #3c6e71;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #3c6e71;
  background-color: transparent;
  border: 1px solid #3c6e71;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d6e6e7;
  }
`;
