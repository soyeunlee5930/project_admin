import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.scss';

const Products = () => {
  const navigate = useNavigate();

  const moveProductAddPage = () => {
    navigate('/admins/products/add');
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
              <th>서브카테고리</th>
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
                <td>{product.product_name}</td>
                <td>{product.sub_category_id}</td>
                <td>{product.discount_rate}</td>
                <td>{product.price}</td>
                <td>{product.discount_price}</td>
                <td>{product.quantity}</td>
                <td>{product.accumulated_amount}</td>
                <td>{product.product_code}</td>
                <td>{product.delivery_country}</td>
                <td>{product.product_description}</td>
                <td>{product.thumnail_image_url}</td>
                <td>{product.detail_image_url}</td>
                <td>{product.created_at}</td>
                <td>{product.updated_at}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
