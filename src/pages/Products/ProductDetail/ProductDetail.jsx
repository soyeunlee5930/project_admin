import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.scss';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  const moveUpdateProductPage = () => {
    navigate(`/products/${productId}/edit`);
  };

  const [productName, setProductName] = useState('');
  const [categoryList, setCategoryList] = useState([]); // select option 출력
  const [categoryId, setCategoryId] = useState(''); // 선택한 카테고리
  const [discountRate, setDiscountRate] = useState(''); // 할인율
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState(''); // 할인금액
  const [accumulatedAmount, setAccumulatedAmount] = useState(''); // 적립금
  const [productCode, setProductCode] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState('');

  // 상품설명, 대표이미지, 상세이미지 URL
  const [descriptionImgURL, setDescriptionImgURL] = useState('');
  const [thumnailImgURL, setThumnailImgURL] = useState('');
  const [detailImgURLs, setDetailImgURLs] = useState([]);

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
        setAccumulatedAmount(data.accumulatedAmount);
        setProductCode(data.productCode);
        setDeliveryCountry(data.deliveryCountry);
        setDescriptionImgURL(data.productDescription);
        setThumnailImgURL(data.thumnailImageUrl);
        setDetailImgURLs(JSON.parse(data.detailImageUrl));
      })
      .catch(error => {
        console.error(
          '서버에서 데이터를 가져오는 중 에러가 발생했습니다',
          error,
        );
      });
  };

  return (
    <div className="productDetail">
      <h1>상품 상세</h1>
      <div className="productForm">
        <form>
          <div className="inputContainer">
            <label htmlFor="productName">상품명</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={productName}
              readOnly
            />
          </div>
          <div className="selectContainer">
            <label htmlFor="categoryId">카테고리</label>
            <select
              name="categoryId"
              id="categoryId"
              value={categoryId}
              disabled
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
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="price">가격</label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="discountPrice">할인가격</label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={discountPrice}
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="accumulatedAmount">적립금</label>
            <input
              type="number"
              name="accumulatedAmount"
              id="accumulatedAmount"
              value={accumulatedAmount}
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
              readOnly
            />
          </div>
          <div className="selectContainer">
            <label htmlFor="deliveryCountry">배송국가</label>
            <select
              name="deliveryCountry"
              id="deliveryCountry"
              value={deliveryCountry}
              disabled
            >
              <option value="">선택되지 않음</option>
              <option value="0">국내배송</option>
              <option value="1">해외배송</option>
              <option value="2">국내,해외배송</option>
            </select>
          </div>
          <div className="imageContainer">
            <label htmlFor="productDescription">상품 설명</label>
            <img src={descriptionImgURL} alt="상품 설명 이미지" />
          </div>
          <div className="imageContainer">
            <label htmlFor="thumnailImg">대표이미지</label>
            <img src={thumnailImgURL} alt="대표 이미지" />
          </div>
          <div className="imageContainer">
            <label htmlFor="detailImg">상세이미지</label>
            {detailImgURLs.map((url, index) => (
              <img key={index} src={url} alt={`상세 이미지 ${index}`} />
            ))}
          </div>
        </form>
        <div className="productUpdateBtn">
          <button onClick={() => moveUpdateProductPage(productId)}>
            상품 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
