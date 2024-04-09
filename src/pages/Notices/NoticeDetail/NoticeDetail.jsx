import { React, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './NoticeDetail.scss';

const NoticeDetail = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  const params = useParams();
  const noticeId = params.id;

  const noticeTitleRef = useRef(null);
  const noticeContentRef = useRef(null);

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

  const handleNoticeUpdateSubmit = event => {
    event.preventDefault();

    if (!noticeTitle.trim()) {
      alert('제목을 작성해주세요');
      noticeTitleRef.current.focus();
      return;
    }

    if (!noticeContent.trim()) {
      alert('내용을 작성해주세요');
      noticeContentRef.current.focus();
      return;
    }

    fetch(`http://localhost:8080/admins/notices/${noticeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        admin_id: 1,
        title: noticeTitle,
        content: noticeContent,
      }),
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
          alert('공지사항 수정 실패');
          return;
        } else {
          alert('공지사항 수정 완료');
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  return (
    <div className="noticeDetail">
      <h1>공지사항 상세보기</h1>
      <div className="noticeForm">
        <form onSubmit={handleNoticeUpdateSubmit} method="PUT">
          <div className="inputContainer">
            <label htmlFor="noticeTitle">제목</label>
            <input
              type="text"
              name="noticeTitle"
              id="noticeTitle"
              value={noticeTitle}
              placeholder="제목을 입력하세요"
              onChange={e => setNoticeTitle(e.target.value)}
              ref={noticeTitleRef}
            />
          </div>
          <div className="textareaContainer">
            <label htmlFor="noticeContent">내용</label>
            <textarea
              name="noticeContent"
              id="noticeContent"
              value={noticeContent}
              placeholder="내용을 입력하세요"
              onChange={e => setNoticeContent(e.target.value)}
              ref={noticeContentRef}
            />
          </div>
          <div className="moveUpdateNoticePageBtn">
            <button type="submit">공지사항 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeDetail;
