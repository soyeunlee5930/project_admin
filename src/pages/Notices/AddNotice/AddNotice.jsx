import { React, useState, useRef } from 'react';
import './AddNotice.scss';

const AddNotice = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  const noticeTitleRef = useRef(null);
  const noticeContentRef = useRef(null);

  const handleNoticeSubmit = event => {
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

    fetch('http://localhost:8080/admins/notices/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        admin_id: 1,
        title: noticeTitle,
        content: noticeContent,
      }),
    })
      .then(res => {
        if (!res.ok) {
          alert('공지사항 등록 실패');
          return;
        } else {
          alert('공지사항 등록 완료');
          setNoticeTitle('');
          setNoticeContent('');
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  return (
    <div className="addNotice">
      <h1>공지사항 등록</h1>
      <div className="noticeForm">
        <form method="POST" onSubmit={handleNoticeSubmit}>
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
          <div className="submitBtn">
            <button type="submit">공지사항 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
