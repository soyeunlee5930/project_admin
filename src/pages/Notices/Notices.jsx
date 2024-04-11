import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notices.scss';

const Notices = () => {
  const navigate = useNavigate();

  const moveNoticeAddPage = () => {
    navigate('/notices/add');
  };

  const redirectToNoticeDetail = noticeId => {
    navigate(`/notices/${noticeId}`);
  };

  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = () => {
    fetch('http://localhost:8080/admins/notices', {
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
        setNoticeList(data);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  const formatDate = dateStr => {
    const createdAt = new Date(dateStr);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference < 24) {
      return createdAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }); // 24시간 이내일 경우 시간으로 표시
    } else {
      return createdAt.toLocaleDateString([], {
        hour: '2-digit',
        minute: '2-digit',
      }); // 24시간 이후일 경우 날짜로 표시
    }
  };

  return (
    <div className="notices">
      <h1>공지사항 관리</h1>
      <button className="addNoticeBtn" onClick={moveNoticeAddPage}>
        공지사항 등록
      </button>
      <div className="noticesList">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>등록일</th>
              <th>수정일</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice, index) => (
              <tr key={index} className="noticesInfo">
                <td>{index + 1}</td>
                <td>{notice.adminId}</td>
                <td
                  className="moveNoticeDetailBtn"
                  onClick={() => redirectToNoticeDetail(notice.id)}
                >
                  {notice.title}
                </td>
                <td>{formatDate(notice.createdAt)}</td>
                <td>{formatDate(notice.updatedAt)}</td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notices;
