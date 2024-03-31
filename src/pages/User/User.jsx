import { React, useEffect, useState } from 'react';
import './User.scss';

const User = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('/data/user.json')
    fetch('http://localhost:8080/admins/users/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="user">
      <h1>회원 관리</h1>
      {loading && <h3>로딩 중...</h3>}
      {error && <h3>에러가 발생했습니다.</h3>}
      {!loading && !error && (
        <div className="userList">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>성별</th>
                <th>생일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index} className="userInfo">
                  <td>{index + 1}</td>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNum}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === 0 ? '남성' : '여성'}</td>
                  <td>
                    {new Date(user.birth).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td>{user.state === 0 ? '탈퇴' : '가입'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
