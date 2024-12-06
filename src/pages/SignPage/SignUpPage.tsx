import { useRef, useState } from 'react';
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

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '0',
        height: 'auto',
        '& fieldset': {
            borderColor: '#ddd', // 기본 테두리 색
        },
        '&:hover fieldset': {
            borderColor: '#007bff', // 호버 시 테두리
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0056b3', // 포커스 시 테두리 색
            borderWidth: '2px',
        },
    },
    marginBottom: '16px', // 필드 간 간격
});

dayjs.locale('ko');

const SignUpPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const heightRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const nickNameRef = useRef<HTMLInputElement>(null);

    const [birthDay, setBirthDay] = useState<Dayjs | null>(null);
    const [gender, setGender] = useState<string>('male');

    const formatPhoneNumber = (phoneNumber: string) => {
        return phoneNumber
            .replace(/[^0-9]/g, '') // 숫자 외 제거
            .replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3'); // 형식에 맞게 변환
    };

    const handleSignUp = () => {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumberRef.current?.value || '');

        const userInfo = {
            username: usernameRef.current?.value || '',
            phoneNumber: formattedPhoneNumber,
            password: passwordRef.current?.value || '',
            birthDay: birthDay ? birthDay.format('YYYY.MM.DD') : '',
            gender,
            height: parseFloat(heightRef.current?.value || '0'),
            weight: parseFloat(weightRef.current?.value || '0'),
            nickName: nickNameRef.current?.value || '',
        };

        console.log('Sending data:', userInfo);

        fetch(`${apiUrl}/api/users/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
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
                        format="YYYY/MM/DD"
                        slots={{ textField: CustomTextField, toolbar: () => null, }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                            },
                        }}
                    />
                </LocalizationProvider>
                <div>
                    <FormLabel>성별</FormLabel>
                    <RadioGroup
                        row
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
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
