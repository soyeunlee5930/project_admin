import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductInventory.scss';

const ProductInventory = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [check, setCheck] = useState([]);
  const [productQauntity, setProductQauntity] = useState(0);

  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  const moveAddProductOptionPage = () => {
    navigate(`/products/inventory/add/${productId}`);
  };

  const getProductsInfo = () => {
    fetch(`http://localhost:8080/admins/products/${productId}`, {
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
        console.log(data);
        setProductInfo(data);
      })
      .catch(error => {
        console.error(
          '서버에서 상품 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getProductsInfo();
  }, []);

  // const sendProductStockData = async () => {
  //   if (!quantity.trim()) {
  //     alert('수량을 입력하세요');
  //     return;
  //   } else {
  //     fetch('http://localhost:8080/admins/categories/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         categoryName: categoryName,
  //       }),
  //     })
  //       .then(res => {
  //         if (res.status === 409) {
  //           alert('중복된 카테고리명입니다.');
  //           return;
  //         } else if (!res.ok) {
  //           alert('카테고리 등록 실패');
  //           return;
  //         }
  //         alert('카테고리 등록 완료');
  //         setCategoryName('');
  //       })
  //       .catch(error => {
  //         console.error('서버와의 통신 중 오류가 발생했습니다', error);
  //         alert('서버와의 통신 중 오류 발생');
  //       });
  //   }
  // };

  const handleAddStock = event => {
    event.preventDefault();
    // sendProductStockData();
  };

  return (
    <div className="productInventory">
      <h1>상품 재고관리</h1>
      <h3 className="productName">{productInfo.productName}</h3>
      <div className="productStockForm">
        <form onSubmit={handleAddStock} method="POST">
          <div className="buttonBox">
            <div className="deleteCheckButton">
              <button type="button">선택 삭제</button>
            </div>
            <div className="addStockButton">
              <button
                type="button"
                onClick={() => moveAddProductOptionPage(productId)}
              >
                옵션 등록
              </button>
              <button type="submit">수량 등록</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="checkbox">
                  <input type="checkbox" className="deleteAll" />
                </th>
                <th>상품명</th>
                <th>색상</th>
                <th>사이즈</th>
                <th>재고</th>
                <th>수량</th>
              </tr>
            </thead>
            <tbody>
              <tr className="productsInfo">
                <td className="checkbox">
                  <input type="checkbox" className="checkProduct" />
                </td>
                <td>{productInfo.productName}</td>
                <td>color</td>
                <td>size</td>
                <td>quantity</td>
                <td>
                  <input
                    type="number"
                    name="productQauntity"
                    id="productQauntity"
                    value={productQauntity}
                    placeholder="수량을 입력하세요"
                    onChange={e => setProductQauntity(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ProductInventory;
