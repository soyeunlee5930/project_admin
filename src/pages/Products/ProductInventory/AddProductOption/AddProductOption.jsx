import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AddProductOption.scss';

const AddProductOption = () => {
  const [productName, setProductName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [productColors, setProductColors] = useState([]); // 색상리스트
  const [addColor, setAddColor] = useState('');
  const [productSizes, setProductSizes] = useState([]); // 사이즈리스트
  const [addSize, setAddSize] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);

  const params = useParams();
  const productId = params.id;

  const getProductName = () => {
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
        setProductName(data.productName);
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
        setSelectedColorId(data.length > 0 ? data[0].id : '');
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
        setSelectedSizeId(data.length > 0 ? data[0].id : '');
      })
      .catch(error => {
        console.error(
          '서버에서 상품 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  useEffect(() => {
    getProductName();
    getColors();
    getSizes();
  }, []);

  // product option add
  const handleAddProductOption = event => {
    event.preventDefault();
    sendProductOptionData();
  };

  const sendProductOptionData = async () => {
    if (!selectedColorId || !selectedSizeId || productQuantity <= 0) {
      alert('색상, 사이즈 및 수량을 모두 입력하세요');
      return;
    } else {
      fetch('http://localhost:8080/admins/product-options/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          colorId: selectedColorId,
          sizeId: selectedSizeId,
          quantity: productQuantity,
        }),
      })
        .then(res => {
          if (res.status === 409) {
            alert('등록하려는 상품 옵션과 일치하는 데이터가 존재합니다.');
            return;
          } else if (!res.ok) {
            alert('옵션 등록 실패');
            return;
          }
          alert('옵션 등록 완료');
          setSelectedColorId(
            productColors.length > 0 ? productColors[0].id : '',
          );
          setSelectedSizeId(productSizes.length > 0 ? productSizes[0].id : '');
          setProductQuantity(0);
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  const sendProductColorData = async () => {
    if (!addColor.trim()) {
      alert('색상을 입력하세요');
      return;
    } else {
      fetch('http://localhost:8080/admins/colors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          color: addColor,
        }),
      })
        .then(res => {
          if (res.status === 409) {
            alert('중복된 색상명입니다.');
            return;
          } else if (!res.ok) {
            alert('색상 등록 실패');
            return;
          }
          alert('색상 등록 완료');
          setAddColor('');
          getColors();
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  const sendProductSizeData = async () => {
    if (!addSize.trim()) {
      alert('사이즈를 입력하세요');
      return;
    } else {
      fetch('http://localhost:8080/admins/sizes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          size: addSize,
        }),
      })
        .then(res => {
          if (res.status === 409) {
            alert('중복된 사이즈입니다.');
            return;
          } else if (!res.ok) {
            alert('사이즈 등록 실패');
            return;
          }
          alert('사이즈 등록 완료');
          setAddSize('');
          getSizes();
        })
        .catch(error => {
          console.error('서버와의 통신 중 오류가 발생했습니다', error);
          alert('서버와의 통신 중 오류 발생');
        });
    }
  };

  // product color and size add
  const handleAddProductColor = event => {
    event.preventDefault();
    sendProductColorData();
  };

  const handleAddProductSize = event => {
    event.preventDefault();
    sendProductSizeData();
  };

  // color, size delete
  const handleDeleteColor = colorId => {
    fetch(`http://localhost:8080/admins/colors/${colorId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          alert('색상 삭제 완료');
          getColors();
        } else {
          throw new Error('색상 삭제 실패');
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  const handleDeleteSize = sizeId => {
    fetch(`http://localhost:8080/admins/sizes/${sizeId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          alert('사이즈 삭제 완료');
          getSizes();
        } else {
          throw new Error('사이즈 삭제 실패');
        }
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  return (
    <div className="addProductOption">
      <h1>상품 옵션등록</h1>
      <h3 className="option">상품 옵션</h3>
      <div className="productOptionForm">
        <form onSubmit={handleAddProductOption} method="POST">
          <div className="addOptionButton">
            <button type="submit">신규 등록</button>
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
                <td>{productName}</td>
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
      <h3 className="colorAndSize">색상 및 사이즈</h3>
      <div className="productColorAndSizeForm">
        <form onSubmit={handleAddProductColor} method="POST">
          <table>
            <thead>
              <tr>
                <th colSpan="2">색상</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="productColor"
                    id="productColor"
                    value={addColor}
                    placeholder="색상을 입력하세요"
                    onChange={e => setAddColor(e.target.value)}
                  />
                </td>
                <td>
                  <div className="addColorButton">
                    <button type="submit">색상 등록</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <form onSubmit={handleAddProductSize} method="POST">
          <table>
            <thead>
              <tr>
                <th colSpan="2">사이즈</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="number"
                    name="productSize"
                    id="productSize"
                    value={addSize}
                    placeholder="사이즈를 입력하세요"
                    onChange={e => setAddSize(e.target.value)}
                  />
                </td>
                <td>
                  <div className="addSizeButton">
                    <button type="submit">사이즈 등록</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="productColorAndSize">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>색상</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productColors.map((color, index) => (
              <tr key={color.id}>
                <td>{index + 1}</td>
                <td>{color.color}</td>
                <td>
                  <div className="deleteColorButton">
                    <button
                      type="button"
                      onClick={() => handleDeleteColor(color.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>사이즈</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productSizes.map((size, index) => (
              <tr key={size.id}>
                <td>{index + 1}</td>
                <td>{size.size === 0 ? '호수 없음' : `${size.size}호`}</td>
                <td>
                  <div className="deleteSizeButton">
                    <button
                      type="button"
                      onClick={() => handleDeleteSize(size.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProductOption;
