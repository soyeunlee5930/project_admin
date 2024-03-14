import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateSubCategory.scss';

const UpdateSubCategory = () => {
  const params = useParams();
  const subCategoryId = params.id;

  const [categoryChoice, setCategoryChoice] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');

  useEffect(() => {
    getCategoryList();
  }, []);

  // 서브카테고리 select에 사용할 카테고리 목록 가져오기
  const getCategoryList = () => {
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
        getSubCategoryData(data);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  const getSubCategoryData = categoriesData => {
    fetch(`http://localhost:8080/admins/subcategories/${subCategoryId}`, {
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
        setSubCategoryName(data.sub_category_name);
        const categoryId = data.category_id;
        const category = categoriesData.find(
          category => category.id === categoryId,
        );
        if (category) {
          setCategoryChoice(category.category_name);
        }
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

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
      fetch(`http://localhost:8080/admins/subcategories/${subCategoryId}`, {
        method: 'PUT',
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
            alert('서브카테고리 수정 실패');
          }
          alert('서브카테고리 수정 완료');
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  return (
    <div className="updateSubCategory">
      <h1>서브카테고리 수정</h1>
      <div className="subSubCategoryForm">
        <form onSubmit={handleSubCategorySubmit} method="PUT">
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
            <button type="submit">서브카테고리 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
