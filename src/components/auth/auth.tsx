import styled from '@emotion/styled';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api/api';

export default function Auth01() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [newMember, setNewMember] = useState(true);
  const navigate = useNavigate();

  const checkEmail = (email: string) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return valid.test(email);
  };

  const validEmail = checkEmail(email);
  const validPassword = password.length > 7;
  const validForm = validEmail && validPassword;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const onClickSubmitBtn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    if (newMember) {
      await axios
        .post(apiUrl + '/auth/signup', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const accessToken = res.data.access_token;
          localStorage.setItem('accessToken', accessToken);
          console.log(accessToken);
          alert('회원가입 성공!');
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    } else {
      await axios
        .post(apiUrl + '/auth/signin', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const accessToken = res.data.access_token;
          localStorage.setItem('accessToken', accessToken);
          console.log(accessToken);
          alert('로그인!');
          navigate('/todo');
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  };

  const toggleSwitch = () => setNewMember((prev) => !prev);

  return (
    <Main>
      <Wrap>
        <Title>{newMember ? '회원가입' : '로그인'}</Title>
        <input
          type="text"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChangeEmail}
        />
        <div className="validMessgae">
          {!validEmail && <>이메일 형식이 아닙니다!</>}
        </div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangePassword}
        />
        <div className="validMessgae">
          {!validPassword && <>비밀번호 8자리 이상 입력해주세요!</>}
        </div>
        <SubmitButton disabled={!validForm} onClick={onClickSubmitBtn}>
          {newMember ? '회원가입' : '로그인'}
        </SubmitButton>
        <span onClick={toggleSwitch}>{newMember ? '로그인' : '회원가입'}</span>
      </Wrap>
    </Main>
  );
}

const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  max-width: 350px;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid grey;

  .validMessgae {
    color: red;
  }

  input {
    max-width: 268px;
    width: 100%;
    padding: 10px;
    margin: 10px;
    background-color: white;
    font-size: 20px;
    color: black;
  }

  span {
    color: #04aaff;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 50px;
    display: block;
    font-size: 18px;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 27px;
`;

const SubmitButton = styled.button`
  max-width: 268px;
  width: 100%;
  border: 0.5px solid white;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  color: white;
  background-color: #0095f6;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: skyblue;
  }
`;
