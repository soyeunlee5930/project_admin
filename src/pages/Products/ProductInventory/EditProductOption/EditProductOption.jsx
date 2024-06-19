import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditProductOption.scss';

const EditProductOption = () => {
  const [productOption, setProductOption] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productId, setProductId] = useState(null);

  const { productOptionsId } = useParams();

  const getProductOption = () => {
    fetch(
      `http://localhost:8080/admins/product-options/${productOptionsId}/details`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProductOption(data);
        setSelectedColorId(data.colorId); // 초기 색상 선택값 설정
        setSelectedSizeId(data.sizeId); // 초기 사이즈 선택값 설정
        setProductQuantity(data.quantity); // 초기 수량 설정
        setProductId(data.productId);
      })
      .catch(error => {
        console.error(
          '서버에서 상품 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  const getColors = () => {
    fetch(`http://localhost:8080/admins/colors`, {
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
        setProductColors(data);
      })
      .catch(error => {
        console.error(
          '서버에서 상품 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  const getSizes = () => {
    fetch(`http://localhost:8080/admins/sizes`, {
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
        setProductSizes(data);
      })
      .catch(error => {
        console.error(
          '서버에서 상품 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getProductOption();
    getColors();
    getSizes();
  }, []);

  // product option add
  const handleEditProductOption = event => {
    event.preventDefault();
    sendEditProductOptionData();
  };

  const sendEditProductOptionData = async () => {
    if (!selectedColorId || !selectedSizeId || productQuantity <= 0) {
      alert('색상, 사이즈 및 수량을 모두 입력하세요');
      return;
    } else {
      fetch(
        `http://localhost:8080/admins/product-options/${productOptionsId}/edit`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            colorId: selectedColorId,
            sizeId: selectedSizeId,
            quantity: productQuantity,
          }),
        },
      )
        .then(res => {
          if (res.status === 409) {
            alert('중복된 옵션이 이미 존재합니다.');
            return;
          } else if (!res.ok) {
            alert('옵션 수정 실패');
            return;
          }
          alert('옵션 수정 완료');
        })
        .catch(error => {
          console.error('상품 옵션 수정 중 에러 발생 : ', error);
          alert('상품 옵션 수정 실패');
        });
    }
  };

  return (
    <div className="editProductOption">
      <h1>상품 옵션수정</h1>
      {productOption ? (
        <>
          <h3 className="option">Product Option ID : {productOptionsId}</h3>
          <div className="productOptionForm">
            <form onSubmit={handleEditProductOption} method="POST">
              <div className="editOptionButton">
                <button type="submit">수정하기</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>상품명</th>
                    <th>색상</th>
                    <th>사이즈</th>
                    <th>수량</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{productOption.productName}</td>
                    <td>
                      <label htmlFor="productColors" />
                      <select
                        id="productColors"
                        value={selectedColorId}
                        onChange={e => setSelectedColorId(e.target.value)}
                      >
                        {productColors.map(color => (
                          <option key={color.id} value={color.id}>
                            {color.color}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <label htmlFor="productSizes" />
                      <select
                        id="productSizes"
                        value={selectedSizeId}
                        onChange={e => setSelectedSizeId(e.target.value)}
                      >
                        {productSizes.map(size => (
                          <option key={size.id} value={size.id}>
                            {size.size === 0 ? '호수 없음' : `${size.size}호`}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="productQuantity"
                        id="productQuantity"
                        value={productQuantity}
                        placeholder="수량을 입력하세요"
                        onChange={e => setProductQuantity(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default EditProductOption;
