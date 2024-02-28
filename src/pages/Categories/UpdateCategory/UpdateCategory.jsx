import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateCategory.scss';

const UpdateCategory = () => {
  const params = useParams();
  const categoryId = params.id;

  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/admins/categories/${categoryId}`, {
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
        setCategoryName(data.category_name);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  }, [categoryId]);

  const sendUpdateCategoryData = async () => {
    try {
      const response = await fetch(`/admins/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId,
          category_name: categoryName,
        }),
      });

      if (response.ok) {
        alert('카테고리 수정 완료');
      } else {
        alert('카테고리 수정 실패');
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류가 발생했습니다', error);
      alert('서버와의 통신 중 오류 발생');
    }
  };

  const handleCategorySubmit = event => {
    event.preventDefault();
    sendUpdateCategoryData();
  };

  return (
    <div className="updateCategory">
      <h1>카테고리 수정</h1>
      <div className="categoryForm">
        <form onSubmit={handleCategorySubmit} method="PUT">
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
            <button type="submit">카테고리 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
