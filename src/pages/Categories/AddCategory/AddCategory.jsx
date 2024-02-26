import { React, useState, useEffect } from 'react';
import './AddCategory.scss';

const AddCategory = () => {
  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const [categoryName, setCategoryName] = useState('');
  const [categoryChoice, setCategoryChoice] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');

  const handleCategorySubmit = event => {
    event.preventDefault();

    // 서버로 상품 등록 정보 보내기, alert로 등록 완료 띄우기

    // 상품 등록 후 내용 초기화
    setCategoryName('');
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
