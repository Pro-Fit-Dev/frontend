import React, { useRef, useState } from 'react';
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
import { formatPhoneNumber } from '../../utils/phoneFormatter';
import * as S from './Styles';
import LogoPic from '/assets/images/logo.png';

const apiUrl = import.meta.env.VITE_API_URL;

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

dayjs.locale('ko');

const SignUpPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nickNameRef = useRef<HTMLInputElement>(null);

    const [birthDay, setBirthDay] = useState<Dayjs | null>(null);
    const [gender, setGender] = useState<string>('male');
    const [disability, setDisability] = useState<string>('No');

    const handleSignUp = async () => {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumberRef.current?.value || '');

        const userInfo = {
            username: usernameRef.current?.value || '',
            phoneNumber: formattedPhoneNumber,
            password: passwordRef.current?.value || '',
            birthDay: birthDay ? birthDay.format('YYYY.MM.DD') : '',
            gender,
            disability,
            nickName: nickNameRef.current?.value || '',
        };

        console.log('Sending data:', userInfo);

        try {
            const response = await fetch(`${apiUrl}/api/users/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert(`회원가입 실패: ${errorText}`);
                return;
            }

            const responseText = await response.text();
            console.log('Response:', responseText);

            if (responseText.includes('회원가입이 성공적으로 완료되었습니다.')) {
                alert('회원가입 성공!');
                window.location.href = '/';
            } else if (responseText.includes('중복')) {
                alert('회원가입 실패: 중복된 데이터가 있습니다.');
            } else {
                alert(`회원가입 실패: ${responseText}`);
            }
        } catch (error) {
            console.error('회원가입 중 오류:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }

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
                <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
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
                    <div style={{ flex: 1 }}>
                        <FormLabel>장애 여부</FormLabel>
                        <RadioGroup
                            row
                            value={disability}
                            onChange={(e) => setDisability(e.target.value)}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="장애인" />
                            <FormControlLabel value="No" control={<Radio />} label="비장애인" />
                        </RadioGroup>
                    </div>
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
