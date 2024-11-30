import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface CalculateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CalculateModal: React.FC<CalculateModalProps> = ({ isOpen, onClose }) => {
    const [height, setHeight] = useState<number | "">("");
    const [weight, setWeight] = useState<number | "">("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string>("");

    useEffect(() => {
        if (!isOpen) {
            setHeight("");
            setWeight("");
            setBmi(null);
            setBmiCategory("");
        }
    }, [isOpen]);

    // 모달 상태 초기화
    const handleClose = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmiCategory("");
        onClose();
    };

    const calculateBMI = () => {
        if (typeof height === "number" && typeof weight === "number" && height > 0) {
            const calculatedBMI = +(weight / (height / 100) ** 2).toFixed(2);

            setBmi(calculatedBMI);

            if (calculatedBMI < 18.5) {
                setBmiCategory("저체중");
            } else if (calculatedBMI < 23) {
                setBmiCategory("정상");
            } else if (calculatedBMI < 25) {
                setBmiCategory("과체중");
            } else {
                setBmiCategory("비만");
            }
        }
    };

    const getArrowPosition = () => {
        if (bmi === null) return "0%";
        if (bmi < 18.5) return "10%";
        if (bmi < 23) return "40%";
        if (bmi < 25) return "70%";
        return "90%";
    };

    return (
        <ModalOverlay>
            <ModalContent expand={!!bmi}>
                <ModalHeader>BMI 계산기</ModalHeader>
                {!bmi ? (
                    <>
                        <InputRow>
                            <ModalInput
                                type="number"
                                placeholder="신장"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                            />
                            <Unit>cm</Unit>
                        </InputRow>
                        <InputRow>
                            <ModalInput
                                type="number"
                                placeholder="몸무게"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                            />
                            <Unit>kg</Unit>
                        </InputRow>
                        <ModalFooter>
                            <ConfirmButton onClick={calculateBMI}>계산</ConfirmButton>
                        </ModalFooter>
                    </>
                ) : (
                    <>
                        <ResultText>
                            신장 <strong>{height} cm</strong>, 체중 <strong>{weight} kg</strong>
                        </ResultText>
                        <ProgressBar>
                            <Range color="#B0E0E6" flex="18.5%">
                                저체중
                            </Range>
                            <Range color="#3C6E71" flex="22%">
                                정상
                            </Range>
                            <Range color="#FFD700" flex="2%">
                                과체중
                            </Range>
                            <Range color="#FF6F61" flex="15%">
                                비만
                            </Range>
                        </ProgressBar>
                        <ArrowWrapper style={{ left: getArrowPosition() }}>
                            <FontAwesomeIcon icon={faArrowUp} size="lg" />
                            <ArrowLabel>내 위치</ArrowLabel>
                        </ArrowWrapper>
                        <BmiResult>
                            <strong>BMI {bmi} {bmiCategory}</strong>
                        </BmiResult>
                        <ModalFooter>
                            <ConfirmButton onClick={handleClose}>확인</ConfirmButton>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

export default CalculateModal;

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

const ModalContent = styled.div<{ expand: boolean }>`
  background: #ffffff;
  border-radius: 16px;
  padding: 5%;
  width: 80%;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  height: ${(props) => (props.expand ? "55%" : "40%")};
  transition: height 0.3s ease;
  box-sizing: border-box;
`;

const ModalHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 15%;
  color: #333;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalInput = styled.input`
  flex: 1;
  padding: 5%;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  margin: 0 5% 0 0;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #3c6e71;
  }
`;

const Unit = styled.span`
  margin-left: 8px;
  font-size: 16px;
  color: #666;
`;

const ModalFooter = styled.div`
  margin-top: 5%;
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

const ResultText = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
`;

const ProgressBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  margin: 20px 0;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
`;

const Range = styled.div<{ color: string; flex: string }>`
  flex: ${(props) => props.flex};
  background: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
`;

const ArrowWrapper = styled.div`
  position: relative;
  top: 0;
  transform: translateX(-40%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArrowLabel = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #333;
`;

const BmiResult = styled.p`
  font-size: 1rem;
  margin-top: 16px;
  color: #3c6e71;
  strong {
    font-weight: bold;
  }
`;
