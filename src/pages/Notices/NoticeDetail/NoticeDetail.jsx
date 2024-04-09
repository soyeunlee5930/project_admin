import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NoticeDetail.scss';

const NoticeDetail = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  const params = useParams();
  const noticeId = params.id;
  const navigate = useNavigate();

  const moveUpdateNoticePage = noticeId => {
    navigate(`/notices/${noticeId}/edit`);
  };

  const getNotice = () => {
    fetch(`http://localhost:8080/admins/notices/${noticeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setNoticeTitle(data.title);
        setNoticeContent(data.content);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="noticeDetail">
      <h1>공지사항 상세보기</h1>
      <div className="noticeForm">
        <form>
          <div className="inputContainer">
            <label htmlFor="noticeTitle">제목</label>
            <input
              type="text"
              name="noticeTitle"
              id="noticeTitle"
              value={noticeTitle}
              readOnly
            />
          </div>
          <div className="textareaContainer">
            <label htmlFor="noticeContent">내용</label>
            <textarea
              name="noticeContent"
              id="noticeContent"
              value={noticeContent}
              readOnly
            />
          </div>
          <div className="moveUpdateNoticePageBtn">
            <button onClick={() => moveUpdateNoticePage(noticeId)}>
              공지사항 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeDetail;
