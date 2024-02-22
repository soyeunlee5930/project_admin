import { React, useEffect, useState } from 'react';
import './User.scss';

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('/data/user.json')
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  return (
    <div className="user">
      <h1>회원 관리</h1>
      <div className="user-list">
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
              <tr key={index} className="user-info">
                <td>{index + 1}</td>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.phone_num}</td>
                <td>{user.email}</td>
                <td>{user.gender === 0 ? '남성' : '여성'}</td>
                <td>{user.birth}</td>
                <td>{user.state === 0 ? '탈퇴' : '가입'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
