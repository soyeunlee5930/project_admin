import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
  const navigate = useNavigate();

  const moveCategorynSubCategoryAddPage = () => {
    navigate('/admins/categories/add');
  };

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
            <tr className="productsInfo">
              <td>1</td>
              <td>GOLD</td>
              <td>
                <button>수정</button>
                <span> | </span>
                <button>삭제</button>
              </td>
            </tr>
            <tr className="productsInfo">
              <td>2</td>
              <td>SILVER</td>
              <td>
                <button>수정</button>
                <span> | </span>
                <button>삭제</button>
              </td>
            </tr>
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
            <tr className="productsInfo">
              <td>1</td>
              <td>GOLD</td>
              {/* <td>
                <select
                  name="productCategory"
                  id="productCategory"
                  value={categories}
                  onChange={e => setCategories(e.target.value)}
                >
                  <option value="">선택되지 않음</option>
                  <option value="EARRING">EARRING</option>
                  <option value="NECKLACE">NECKLACE</option>
                  <option value="RING">RING</option>
                  <option value="BRACELET">BRACELET</option>
                  <option value="ANKLET">ANKLET</option>
                </select>
              </td> */}
              <td>EARING</td>
              <td>
                <button>수정</button>
                <span> | </span>
                <button>삭제</button>
              </td>
            </tr>
            {/* {productsData.map((product, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
                <td>{subcategory.sub_category_name}</td>
                <td>
                  <button>수정</button>
                  <span> | </span>
                  <button>삭제</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
