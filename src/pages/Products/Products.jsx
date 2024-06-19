import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.scss';

const Products = () => {
  const navigate = useNavigate();

  const moveProductAddPage = () => {
    navigate('/products/add');
  };

  const redirectToProductDetail = productId => {
    navigate(`/products/${productId}`);
  };

  const redirectToProductInventory = productId => {
    navigate(`/products/inventory/${productId}`);
  };

  const [productsList, setProductsList] = useState([]);

  const getProductsList = () => {
    fetch('http://localhost:8080/admins/products', {
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
        setProductsList(data);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const formatDate = localDateTimeString => {
    const date = new Date(localDateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDeleteProduct = productId => {
    fetch(`http://localhost:8080/admins/products/${productId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          alert('상품 삭제 완료');
          getProductsList();
        } else {
          throw new Error('상품 삭제 실패');
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
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
              <th>옵션</th>
              <th>대표이미지</th>
              <th>등록일</th>
              <th>수정일</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, index) => (
              <tr key={index} className="productsInfo">
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.categoryId}</td>
                <td>{product.discountRate}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.discountPrice.toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => redirectToProductInventory(product.id)}
                  >
                    상세
                  </button>
                </td>
                <td>
                  <img src={product.thumnailImageUrl} alt="상품 대표이미지" />
                </td>
                <td>{formatDate(product.createdAt)}</td>
                <td>{formatDate(product.updatedAt)}</td>
                <td>
                  <button onClick={() => redirectToProductDetail(product.id)}>
                    상세
                  </button>
                  <span> | </span>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
