import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
  const navigate = useNavigate();

  const moveCategorynSubCategoryAddPage = () => {
    navigate('/admins/categories/add');
  };

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

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
        setCategoryList(data);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  }, [categoryList]);

  useEffect(() => {
    fetch('/data/subcategory.json')
      .then(res => res.json())
      .then(data => setSubCategoryList(data));
  }, []);

  return (
    <div className="categories">
      <h1>카테고리/서브카테고리 관리</h1>
      <button
        className="moveCategorynSubCategoryAddPageBtn"
        onClick={moveCategorynSubCategoryAddPage}
      >
        카테고리/서브카테고리 등록
      </button>
      <h2 className="mainList">카테고리 목록</h2>
      <div className="categoriesList">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리명</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
                <td>{category.category_name}</td>
                <td>
                  <button>수정</button>
                  <span> | </span>
                  <button>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="subList">서브카테고리 목록</h2>
      <div className="subCategoriesList">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리명</th>
              <th>서브카테고리명</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategoryList.map((subCategory, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
                <td>{subCategory.category_name}</td>
                <td>{subCategory.sub_category_name}</td>
                <td>
                  <button>수정</button>
                  <span> | </span>
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

export default Categories;
