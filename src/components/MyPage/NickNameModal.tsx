import { useState } from "react";
import styled from "styled-components";

interface NickNameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NickNameModal: React.FC<NickNameModalProps> = ({ isOpen, onClose }) => {
    const [nickname, setNickname] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        console.log("Nickname set to:", nickname);
        onClose();
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
