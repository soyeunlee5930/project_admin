import { React, useState, useEffect } from 'react';
import './AddCategory.scss';

const AddCategory = () => {
  useEffect(() => {
    fetch('http://localhost:8080/admins/categories', {
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
        setCategories(data);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  }, []);

  const [categoryName, setCategoryName] = useState('');
  const [categoryChoice, setCategoryChoice] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');

  const sendCategoryData = async () => {
    try {
      const response = await fetch('/admins/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: categoryName,
        }),
      });

      if (response.ok) {
        alert('카테고리 등록 완료');
        setCategoryName('');
      } else {
        alert('카테고리 등록 실패');
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류가 발생했습니다', error);
      alert('서버와의 통신 중 오류 발생');
    }
  };

  const handleCategorySubmit = event => {
    event.preventDefault();
    sendCategoryData();
  };

  const handleSubCategorySubmit = event => {
    event.preventDefault();

    // 서버로 상품 등록 정보 보내기, alert로 등록 완료 띄우기

    // 상품 등록 후 내용 초기화
    setCategoryChoice('');
    setSubCategoryName('');
  };

  return (
    <div className="addCategory">
      <h1>카테고리/서브카테고리 등록</h1>
      <h2 className="main">카테고리 등록</h2>
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
      <h2 className="sub">서브카테고리 등록</h2>
      <div className="subSubCategoryForm">
        <form onSubmit={handleSubCategorySubmit} method="POST">
          <div className="selectContainer">
            <label htmlFor="categoryChoice">메인카테고리 선택</label>
            <select
              className="categoryChoice"
              name="categoryChoice"
              id="categoryChoice"
              value={categoryChoice}
              onChange={e => setCategoryChoice(e.target.value)}
            >
              <option value="">선택되지 않음</option>
              {categories.map(category => (
                <option key={category.id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="subCategoryName">서브카테고리명</label>
            <input
              type="text"
              name="subCategoryName"
              id="subCategoryName"
              value={subCategoryName}
              placeholder="서브카테고리명을 입력하세요"
              onChange={e => setSubCategoryName(e.target.value)}
            />
          </div>
          <div className="submitBtn">
            <button type="submit">서브카테고리 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
