import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
  const navigate = useNavigate();

  const moveCategorynSubCategoryAddPage = () => {
    navigate('/admins/categories/add');
  };

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(data => setCategoryList(data));
  }, []);

  useEffect(() => {
    fetch('/data/subcategory.json')
      .then(res => res.json())
      .then(data => setSubCategoryList(data));
  }, []);

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

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
              <th>서브카테고리명</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategoryList.map((subCategory, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
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
