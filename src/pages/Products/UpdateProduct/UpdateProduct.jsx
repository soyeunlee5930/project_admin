import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateProduct.scss';

const UpdateProduct = () => {
  const params = useParams();
  const productId = params.id;

  const [productName, setProductName] = useState('');
  const [categoryList, setCategoryList] = useState([]); // select option 출력
  const [categoryId, setCategoryId] = useState(''); // 선택한 카테고리
  const [discountRate, setDiscountRate] = useState(''); // 할인율
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState(''); // 할인금액
  const [quantity, setQuantity] = useState('');
  const [accumulatedAmount, setAccumulatedAmount] = useState(''); // 적립금
  const [productCode, setProductCode] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState('');

  // 상품설명, 대표이미지, 상세이미지관련 코드
  const [productDescriptionImgFile, setProductDescriptionImgFile] =
    useState(null);
  const [thumnailImgFile, setThumnailImgFile] = useState(null);
  const [detailImgFiles, setDetailImgFiles] = useState(null);

  const productNameRef = useRef(null);
  const discountRateRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const productCodeRef = useRef(null);

  useEffect(() => {
    if (discountRate !== '' && price !== '') {
      const discountedPrice = price - (price * discountRate) / 100;
      setDiscountPrice(discountedPrice);
    } else {
      setDiscountPrice('');
    }
  }, [discountRate, price]);

  useEffect(() => {
    if (discountPrice) {
      const accumulatedAmountByProduct = discountPrice / 100;
      setAccumulatedAmount(accumulatedAmountByProduct);
    } else {
      setAccumulatedAmount('');
    }
  }, [discountPrice]);

  useEffect(() => {
    getCategoryList();
    getProductData();
  }, []);

  const getCategoryList = () => {
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
  };

  const getProductData = () => {
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
        setCategoryId(data.categoryId);
        setDiscountRate(data.discountRate);
        setPrice(data.price);
        setDiscountPrice(data.discountPrice);
        setQuantity(data.quantity);
        setAccumulatedAmount(data.accumulatedAmount);
        setProductCode(data.productCode);
        setDeliveryCountry(data.deliveryCountry);
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  const handleProductUpdateSubmit = event => {
    event.preventDefault();

    if (!productName.trim()) {
      alert('상품명을 등록해주세요');
      productNameRef.current.focus();
      return;
    }

    if (!categoryId) {
      alert('카테고리를 선택해주세요');
      return;
    }

    if (!discountRate) {
      alert('상품의 할인율을 입력해주세요');
      discountRateRef.current.focus();
      return;
    }

    if (!price) {
      alert('상품의 가격을 입력해주세요');
      priceRef.current.focus();
      return;
    }

    if (!quantity) {
      alert('상품의 수량을 입력해주세요');
      quantityRef.current.focus();
      return;
    }

    if (!productCode.trim()) {
      alert('상품코드를 입력해주세요');
      productCodeRef.current.focus();
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('categoryId', categoryId);
    formData.append('discountRate', discountRate);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);
    formData.append('quantity', quantity);
    formData.append('accumulatedAmount', accumulatedAmount);
    formData.append('productCode', productCode);
    formData.append('deliveryCountry', deliveryCountry);

    if (productDescriptionImgFile) {
      formData.append('productDescription', productDescriptionImgFile);
    }

    if (thumnailImgFile) {
      formData.append('thumnailImg', thumnailImgFile);
    }

    if (detailImgFiles) {
      for (let i = 0; i < detailImgFiles.length; i++) {
        formData.append('detailImg', detailImgFiles[i]);
      }
    }

    // 서버로 상품 등록 정보 보내기, alert로 등록 완료 띄우기
    fetch(`http://localhost:8080/admins/products/${productId}`, {
      method: 'PUT',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          alert('상품 수정 실패');
          return;
        }
        alert('상품 수정 완료');
      })
      .catch(error => {
        console.error('서버와의 통신 중 오류가 발생했습니다', error);
        alert('서버와의 통신 중 오류 발생');
      });
  };

  return (
    <div className="updateProduct">
      <h1>상품 수정</h1>
      <div className="productForm">
        <form
          onSubmit={handleProductUpdateSubmit}
          method="PUT"
          encType="multipart/form-data"
        >
          <div className="inputContainer">
            <label htmlFor="productName">상품명</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={productName}
              placeholder="상품명을 입력하세요"
              onChange={e => setProductName(e.target.value)}
              ref={productNameRef}
            />
          </div>
          <div className="selectContainer">
            <label htmlFor="categoryId">카테고리</label>
            <select
              name="categoryId"
              id="categoryId"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">선택되지 않음</option>
              {categoryList.map(category => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="discountRate">할인율</label>
            <input
              type="number"
              name="discountRate"
              id="discountRate"
              value={discountRate}
              placeholder="10%는 10으로 입력하세요"
              onChange={e => setDiscountRate(e.target.value)}
              ref={discountRateRef}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="price">가격</label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              placeholder="가격을 입력하세요"
              onChange={e => setPrice(e.target.value)}
              ref={priceRef}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="discountPrice">할인가격</label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={discountPrice}
              placeholder="할인율과 가격을 입력하면 자동으로 계산됩니다"
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="quantity">수량</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              placeholder="수량을 입력하세요"
              onChange={e => setQuantity(e.target.value)}
              ref={quantityRef}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="accumulatedAmount">적립금</label>
            <input
              type="number"
              name="accumulatedAmount"
              id="accumulatedAmount"
              value={accumulatedAmount}
              placeholder="할인율과 가격을 입력하면 자동으로 계산됩니다"
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="productCode">상품코드</label>
            <input
              type="text"
              name="productCode"
              id="productCode"
              value={productCode}
              placeholder="상품코드를 입력하세요"
              onChange={e => setProductCode(e.target.value)}
              ref={productCodeRef}
            />
          </div>
          <div className="selectContainer">
            <label htmlFor="deliveryCountry">배송국가</label>
            <select
              name="deliveryCountry"
              id="deliveryCountry"
              value={deliveryCountry}
              onChange={e => setDeliveryCountry(e.target.value)}
            >
              <option value="">선택되지 않음</option>
              <option value="0">국내배송</option>
              <option value="1">해외배송</option>
              <option value="2">국내,해외배송</option>
            </select>
          </div>
          <div className="imageContainer">
            <label htmlFor="productDescription">상품 설명</label>
            <input
              type="file"
              name="productDescription"
              id="productDescription"
              accept="image/*"
              onChange={e => setProductDescriptionImgFile(e.target.files[0])}
            />
          </div>
          <div className="imageContainer">
            <label htmlFor="thumnailImg">대표이미지</label>
            <input
              type="file"
              name="thumnailImg"
              id="thumnailImg"
              accept="image/*"
              onChange={e => setThumnailImgFile(e.target.files[0])}
            />
          </div>
          <div className="imageContainer">
            <label htmlFor="detailImg">상세이미지</label>
            <input
              type="file"
              name="detailImg"
              id="detailImg"
              accept="image/*"
              onChange={e => {
                setDetailImgFiles(e.target.files);
              }}
              multiple
            />
          </div>
          <div className="submitBtn">
            <button type="submit">상품 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
