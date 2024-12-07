import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { formatPhoneNumber } from '../../utils/phoneFormatter';
import { userState } from '../../recoil/atoms/userState';
import TextField from '@mui/material/TextField';
import * as S from './Styles';
import LogoPic from '/assets/images/logo.png';
const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const setUser = useSetRecoilState(userState);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = () => {
        let phoneNumber = phoneNumberRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        phoneNumber = formatPhoneNumber(phoneNumber);

        if (!phoneNumber || !password) {
            alert('핸드폰 번호와 비밀번호를 입력하세요!');
            return;
        }

        fetch(`${apiUrl}/api/users/login?phoneNumber=${phoneNumber}&password=${password}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Server Response Data:", data);
                if (data.success) {
                    setUser({
                        id: data.userId,
                        username: data.username,
                        birthDay: data.birthDay,
                        gender: data.gender,
                        nickName: data.nickName,
                        disability: data.disability,
                    });

                    console.log("Recoil UserState Updated:", {
                        id: data.userId,
                        username: data.username,
                        birthDay: data.birthDay,
                        gender: data.gender,
                        nickName: data.nickName,
                        disability: data.disability,
                    });

                    alert(data.message);
                    window.location.href = '/home';
                } else {
                    alert('로그인 실패! 정보를 확인하세요.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };
    return (
        <S.Container>
            <S.Logo>
                <img src={LogoPic} alt="Logo" />
            </S.Logo>
            <S.Title>로그인</S.Title>
            <S.InputWrapper>
                <TextField
                    id="phone-number"
                    label="핸드폰 번호 ( - 제외 )"
                    variant="outlined"
                    fullWidth
                    inputRef={phoneNumberRef}
                />
                <TextField
                    id="password"
                    label="비밀번호"
                    variant="outlined"
                    type="password"
                    fullWidth
                    style={{ marginTop: '16px' }}
                    inputRef={passwordRef}
                />
            </S.InputWrapper>
            <S.ButtonWrapper>
                <a href="#">비밀번호 찾기</a>
                <a href="/signup">회원가입</a>
            </S.ButtonWrapper>
            <S.InputWrapper>
                <S.LoginBtn onClick={handleLogin} style={{ marginTop: '30px' }}> 로그인
                </S.LoginBtn>
            </S.InputWrapper>
        </S.Container>
    );
};

export default LoginPage;
