import { React, useState, useEffect } from 'react';
import './AddSubCategory.scss';

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryChoice, setCategoryChoice] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');

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

  const handleSubCategorySubmit = event => {
    event.preventDefault();

    const selectedCategory = categories.find(
      category => category.category_name === categoryChoice,
    );

    const selectedCategoryId = () =>
      selectedCategory ? selectedCategory.id : null;

    if (!selectedCategory) {
      alert('메인 카테고리를 선택하세요.');
      return;
    }

    if (!subCategoryName) {
      alert('서브카테고리명을 입력하세요');
      return;
    } else {
      fetch('http://localhost:8080/admins/subcategories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sub_category_name: subCategoryName,
          category_id: selectedCategoryId(),
        }),
      })
        .then(res => {
          if (!res.ok) {
            alert('서브카테고리 등록 실패');
          }
          alert('서브카테고리 등록 완료');
          setCategoryChoice('');
          setSubCategoryName('');
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  return (
    <div className="addSubCategory">
      <h1>서브카테고리 등록</h1>
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

export default AddSubCategory;
