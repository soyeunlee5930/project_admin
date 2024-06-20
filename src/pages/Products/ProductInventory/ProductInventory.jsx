import { React, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductInventory.scss';

const ProductInventory = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  const moveAddProductOptionPage = () => {
    navigate(`/products/inventory/add/${productId}`);
  };

  const getProductsInfo = () => {
    fetch(`http://localhost:8080/admins/products/${productId}/details`, {
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
        // console.log(data);
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

  const handleSelectAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    if (newAllChecked) {
      const allProductOptionsIds = productInfo.map(
        product => product.productOptionsId,
      );
      setCheckedProducts(allProductOptionsIds);
    } else {
      setCheckedProducts([]);
    }
  };

  const handleCheckboxChange = productOptionsId => {
    const newCheckedProducts = checkedProducts.includes(productOptionsId)
      ? checkedProducts.filter(id => id !== productOptionsId)
      : [...checkedProducts, productOptionsId];
    setCheckedProducts(newCheckedProducts);
    setAllChecked(newCheckedProducts.length === productInfo.length);
  };

  // 단일 삭제
  const handleDeleteProductOption = productOptionsId => {
    fetch(
      `http://localhost:8080/admins/product-options/${productOptionsId}/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => {
        if (res.ok) {
          alert('선택한 옵션이 삭제되었습니다.');
          getProductsInfo();
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .catch(error => {
        console.error('서버에서 상품 옵션 삭제 중 에러가 발생했습니다', error);
        alert('옵션 삭제 실패');
      });
  };

  // 여러 개 삭제
  const handleDeleteChecked = () => {
    if (checkedProducts.length === 0) {
      alert('삭제할 상품 옵션을 선택하세요.');
      return;
    }

    fetch(`http://localhost:8080/admins/product-options/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkedProducts),
    })
      .then(res => {
        if (res.ok) {
          alert('선택한 옵션들이 삭제되었습니다.');
          getProductsInfo();
          setCheckedProducts([]);
          setAllChecked(false);
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .catch(error => {
        console.error('서버에서 상품 옵션 삭제 중 에러가 발생했습니다', error);
        alert('옵션 삭제 실패');
      });
  };

  return (
    <div className="productInventory">
      <h1>상품 재고관리</h1>
      {productInfo && productInfo.length > 0 ? (
        <>
          <h3 className="productName">{productInfo[0].productName}</h3>
          <div className="productStockDiv">
            <div className="buttonBox">
              <div className="deleteCheckButton">
                <button type="button" onClick={handleDeleteChecked}>
                  선택 삭제
                </button>
              </div>
              <div className="addStockButton">
                <button
                  type="button"
                  onClick={() => moveAddProductOptionPage(productId)}
                >
                  옵션 등록
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="checkbox">
                    <input
                      type="checkbox"
                      className="deleteAll"
                      checked={allChecked}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>상품명</th>
                  <th>색상</th>
                  <th>사이즈</th>
                  <th>재고</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productInfo.map((product, index) => (
                  <tr key={index} className="productsInfo">
                    <td className="checkbox">
                      <input
                        type="checkbox"
                        className="checkProduct"
                        checked={checkedProducts.includes(
                          product.productOptionsId,
                        )}
                        onChange={() =>
                          handleCheckboxChange(product.productOptionsId)
                        }
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.color}</td>
                    <td>
                      {product.size === 0 ? '호수 없음' : `${product.size}호`}
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <Link
                        to={`/products/inventory/${product.productOptionsId}/edit`}
                      >
                        <button>수정</button>
                      </Link>
                      <span>|</span>
                      <button
                        onClick={() => {
                          console.log(product.productOptionsId);
                          handleDeleteProductOption(product.productOptionsId);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="productStockDiv">
          <div className="buttonBox">
            <div className="deleteCheckButton">
              <button type="button" onClick={handleDeleteChecked}>
                선택 삭제
              </button>
            </div>
            <div className="addStockButton">
              <button
                type="button"
                onClick={() => moveAddProductOptionPage(productId)}
              >
                옵션 등록
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="checkbox">
                  <input
                    type="checkbox"
                    className="deleteAll"
                    checked={allChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>상품명</th>
                <th>색상</th>
                <th>사이즈</th>
                <th>재고</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="productsInfo">
                <td colSpan={6} className="noData">
                  <p>상품 옵션 데이터가 없거나 불러오는 중입니다...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductInventory;
