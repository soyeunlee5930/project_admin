import { React, useState } from 'react';
import './AddCategory.scss';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const sendCategoryData = async () => {
    if (!categoryName) {
      alert('카테고리명을 입력하세요');
      return;
    } else {
      fetch('http://localhost:8080/admins/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: categoryName,
        }),
      })
        .then(res => {
          if (!res.ok) {
            alert('카테고리 등록 실패');
          }
          alert('카테고리 등록 완료');
          setCategoryName('');
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  const handleCategorySubmit = event => {
    event.preventDefault();
    sendCategoryData();
  };

  return (
    <div className="addCategory">
      <h1>카테고리 등록</h1>
      <div className="categoryForm">
        <form onSubmit={handleCategorySubmit} method="POST">
          <div className="inputContainer">
            <label>카테고리명</label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              value={categoryName}
              placeholder="카테고리명을 입력하세요"
              onChange={e => setCategoryName(e.target.value)}
            />
          </div>
          <div className="submitBtn">
            <button type="submit">카테고리 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
