import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import './Login.scss';

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  function handleInput(e) {
    setId(e.target.value);
  }
  function handleInputPw(e) {
    setPw(e.target.value);
  }
  const submitLoginForm = () => {
    fetch('http://13.209.117.55/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: id,
        password: pw,
      }),
    })
      .then(response => response.json())
      .then(result => {
        sessionStorage.setItem('access_token', result.access_token);
        navigate('/main');
        alert('로그인에 성공하였습니다!');
      });
  };
  const activeLogin = id.length >= 7 && pw.length >= 7;

  return (
    <div>
      <Nav />
      <div className="formContainer">
        <h3 className="loginTitle">로그인</h3>
        <p className="loginUserName">
          <input
            type="text"
            className="loginUser"
            placeholder="아이디를 입력해 주세요"
            onChange={handleInput}
          />
        </p>
        <p className="loginUserPassword">
          <input
            type="password"
            className="loginUser"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputPw}
          />
        </p>

        <div className="loginFind">
          <span> 아이디 찾기 </span>|<span> 비밀번호 찾기 </span>
        </div>

        <button
          className="buttons btnLogin"
          disabled={!activeLogin}
          onClick={submitLoginForm}
        >
          로그인
        </button>
        <Link to="/signup">
          <button className="buttons btnSignUp">회원가입</button>
        </Link>
      </div>
    </div>
  );
}
// 20220305 clone 이후 테스트
export default Login;
