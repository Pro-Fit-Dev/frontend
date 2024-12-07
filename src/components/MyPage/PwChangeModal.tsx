import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { userState } from "../../recoil/atoms/userState";

const apiUrl = import.meta.env.VITE_API_URL;

interface PwChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PwChangeModal: React.FC<PwChangeModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useRecoilValue(userState);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    console.log("Attempting password change...");
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("User ID:", user.id);

    try {
      const response = await fetch(
        `${apiUrl}/api/users/password?userId=${user.id}&password=${currentPassword}&newPassword=${newPassword}`,
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
        onClose();
      } else if (response.status === 400) {
        console.error("Server Response Error:", data.message);
        alert(data.message);
      } else {
        console.error("Unexpected server error:", response.status);
        alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>비밀번호 변경</ModalHeader>
        <ModalInput
          type="password"
          placeholder="기존 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <ModalInput
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <ModalInput
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ModalFooter>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PwChangeModal;

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
  height: 40%;
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
  margin: 5% 0;
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
  margin-top: 7%;
  font-size: 0.9rem;
  color: #3c6e71;
  background-color: transparent;
  border: 1px solid #3c6e71;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d6e6e7;
  }
`;
