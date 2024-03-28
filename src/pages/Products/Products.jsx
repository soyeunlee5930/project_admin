import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.scss';

const Products = () => {
  const navigate = useNavigate();

  const moveProductAddPage = () => {
    navigate('/products/add');
  };
  return (
    <div className="products">
      <h1>상품 관리</h1>
      <button className="moveProductBtn" onClick={moveProductAddPage}>
        상품 등록
      </button>
      <div className="productsList">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품명</th>
              <th>카테고리</th>
              <th>할인율</th>
              <th>가격</th>
              <th>할인가격</th>
              <th>수량</th>
              <th>적립금</th>
              <th>상품코드</th>
              <th>배송국가</th>
              <th>상품설명</th>
              <th>대표이미지</th>
              <th>상세이미지</th>
              <th>등록일</th>
              <th>수정일</th>
            </tr>
          </thead>
          <tbody>
            {/* {productsData.map((product, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.categoryName}</td>
                <td>{product.discountRate}</td>
                <td>{product.price}</td>
                <td>{product.discountPrice}</td>
                <td>{product.quantity}</td>
                <td>{product.accumulatedAmount}</td>
                <td>{product.productCode}</td>
                <td>{product.deliveryCountry}</td>
                <td>{product.productDescription}</td>
                <td>{product.thumnailImageUrl}</td>
                <td>{product.detailImageUrl}</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
