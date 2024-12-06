import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userId } from '../../recoil/atoms/userId';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as S from './Styles';
import LogoPic from '../../assets/gpt.png';

const apiUrl = import.meta.env.VITE_API_URL;

// 커스텀 스타일링된 TextField
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '0',
        '& fieldset': {
            borderColor: '#ddd',
        },
        '&:hover fieldset': {
            borderColor: '#007bff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0056b3',
            borderWidth: '2px',
        },
    },
    marginBottom: '16px',
});

dayjs.locale('ko'); // 한국어 설정

const SignUpPage = () => {
    const setUser = useSetRecoilState(userId);
    const idRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const heightRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const nickNameRef = useRef<HTMLInputElement>(null);

    const [birthDay, setBirthDay] = useState<Dayjs | null>(null);
    const [gender, setGender] = useState<string>('male');

    // 핸드폰 번호 형식 변환 함수
    const formatPhoneNumber = (phoneNumber: string) => {
        return phoneNumber
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    };

    // 회원가입 처리 함수
    const handleSignUp = () => {
        const id = idRef.current?.value || '';
        const height = parseFloat(heightRef.current?.value || '0');
        const weight = parseFloat(weightRef.current?.value || '0');
        const formattedPhoneNumber = formatPhoneNumber(phoneNumberRef.current?.value || '');

        // 유저 정보 생성
        const userInfo = {
            id,
            username: usernameRef.current?.value || '',
            phoneNumber: formattedPhoneNumber,
            password: passwordRef.current?.value || '',
            birthDay: birthDay ? birthDay.format('YYYY.MM.DD') : '',
            gender,
            height,
            weight,
            nickName: nickNameRef.current?.value || '',
        };

        console.log('Sending data:', userInfo); // 콘솔에 확인

        // 서버에 데이터 전송
        fetch(`${apiUrl}/api/users/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Recoil 상태에 유저 정보 저장
                    setUser(userInfo);
                    alert('회원가입 성공!');
                    window.location.href = '/login';
                } else {
                    alert('회원가입 실패! 정보를 확인하세요.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <S.Container>
            <S.Logo>
                <img src={LogoPic} alt="Logo" />
            </S.Logo>
            <S.Title>회원가입</S.Title>
            <S.InputWrapper>
                <CustomTextField inputRef={usernameRef} label="이름" variant="outlined" fullWidth />
                <CustomTextField
                    inputRef={phoneNumberRef}
                    label="핸드폰 번호 ( - 제외 )"
                    variant="outlined"
                    fullWidth
                />
                <CustomTextField
                    inputRef={passwordRef}
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <DatePicker
                        label="생년월일"
                        value={birthDay}
                        onChange={(newValue) => setBirthDay(newValue)}
                        format="YYYY.MM.DD"
                        slots={{
                            textField: (params) => <CustomTextField {...params} fullWidth />, toolbar: () => null,
                        }}
                    />
                </LocalizationProvider>
                <div>
                    <FormLabel>성별</FormLabel>
                    <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="male" control={<Radio />} label="남" />
                        <FormControlLabel value="female" control={<Radio />} label="여" />
                    </RadioGroup>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <CustomTextField
                        inputRef={heightRef}
                        label="키 (cm)"
                        variant="outlined"
                        style={{ flex: 1 }}
                    />
                    <CustomTextField
                        inputRef={weightRef}
                        label="몸무게 (kg)"
                        variant="outlined"
                        style={{ flex: 1 }}
                    />
                </div>
                <CustomTextField
                    inputRef={nickNameRef}
                    label="닉네임"
                    variant="outlined"
                    fullWidth
                />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.LoginBtn onClick={handleSignUp}>회원가입</S.LoginBtn>
            </S.InputWrapper>
        </S.Container>
    );
};

export default SignUpPage;
