import TextField from '@mui/material/TextField';
import * as S from './Styles';
import LogoPic from '../../assets/gpt.png';

const LoginPage = () => {
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
                />
                <TextField
                    id="password"
                    label="비밀번호"
                    variant="outlined"
                    type="password"
                    fullWidth
                    style={{ marginTop: '16px' }}
                />
            </S.InputWrapper>
            <S.ButtonWrapper>
                <a href="#">비밀번호 찾기</a>
                <a href="#">회원가입</a>
            </S.ButtonWrapper>
            <S.InputWrapper>
                <S.LoginBtn href="#" style={{ marginTop: '30px' }}> 로그인
                </S.LoginBtn>
            </S.InputWrapper>
            <div style={{ marginTop: '32px' }}>
                <S.CircleBtn href="#" style={{ backgroundColor: '#A4F77E' }} />
                <S.CircleBtn href="#" style={{ backgroundColor: '#BFBFBF', marginLeft: '16px' }} />
            </div>
        </S.Container>
    );
};

export default LoginPage;
