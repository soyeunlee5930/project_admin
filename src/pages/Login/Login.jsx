import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';
import { FaLock } from 'react-icons/fa';
import './Login.scss';

const Login = () => {
  const [adminId, setAdminId] = useState('');
  const [adminPwd, setAdminPwd] = useState('');
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const navigate = useNavigate();

  const handleLogin = event => {
    event.preventDefault();

    if (!adminId.trim()) {
      alert('ID를 입력하세요');
      return;
    }

    if (!adminPwd.trim()) {
      alert('Password를 입력하세요');
      return;
    }

    fetch('http://localhost:8080/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminId,
        adminPwd,
      }),
    })
      .then(result => {
        if (result.status === 200) {
          setLoginCheck(false);
          localStorage.setItem('adminId', adminId);
          alert('로그인되었습니다');
          navigate('/home');
        } else if (result.status === 401) {
          setLoginCheck(true);
          alert('아이디 또는 비밀번호를 확인해주세요');
          return;
        } else if (!result.ok) {
          setLoginCheck(true);
          alert('로그인 실패');
          return;
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  return (
    <div className="login">
      <div className="formContainer">
        <div className="wrapper">
          <form onSubmit={handleLogin} method="POST">
            <h1>ADMIN</h1>
            <div className="inputContainer">
              <input
                type="text"
                id="adminId"
                placeholder="Admin ID"
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                required
              />
              <RiAdminFill className="icon" />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                id="adminPwd"
                placeholder="Password"
                value={adminPwd}
                onChange={e => setAdminPwd(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            {loginCheck && (
              <label className="loginMsg">
                잘못된 아이디 또는 비밀번호입니다.
              </label>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
