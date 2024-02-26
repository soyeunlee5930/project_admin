import { React, useState, useEffect } from 'react';
import './AddProduct.scss';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategories, setSubCategories] = useState('');
  const [productDiscountRate, setProductDiscountRate] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscountPrice, setProductDiscountPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [accumulatedAmount, setAccumulatedAmount] = useState('');

  useEffect(() => {
    if (productDiscountRate !== '' && productPrice !== '') {
      const discountedPrice =
        productPrice - (productPrice * productDiscountRate) / 100;
      setProductDiscountPrice(discountedPrice);
    } else {
      setProductDiscountPrice('');
    }
  }, [productDiscountRate, productPrice]);

  useEffect(() => {
    if (productDiscountPrice) {
      const accumulatedAmountByProduct = productDiscountPrice / 100;
      setAccumulatedAmount(accumulatedAmountByProduct);
    } else {
      setAccumulatedAmount('');
    }
  }, [productDiscountPrice]);

  useEffect(() => {
    fetch('/data/subcategory.json')
      .then(res => res.json())
      .then(data => setSubCategoryList(data));
  }, []);

  const handleProductSubmit = event => {
    event.preventDefault();

    // 서버로 상품 등록 정보 보내기, alert로 등록 완료 띄우기

    // 상품 등록 후 내용 초기화
    setProductName('');
    setSubCategories('');
    setProductDiscountRate('');
    setProductPrice('');
    setProductDiscountPrice('');
    setProductQuantity('');
    setAccumulatedAmount('');
  };

  return (
    <div className="addProduct">
      <h1>상품 등록</h1>
      <div className="productForm">
        <form
          onSubmit={handleProductSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="inputContainer">
            <label htmlFor="productName">상품명</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={productName}
              placeholder="상품명"
              onChange={e => setProductName(e.target.value)}
            />
          </div>
          <div className="selectContainer">
            <label htmlFor="subCategories">서브카테고리</label>
            <select
              name="subCategories"
              id="subCategories"
              value={subCategories}
              onChange={e => setSubCategories(e.target.value)}
            >
              <option value="">선택되지 않음</option>
              {subCategoryList.map(subCategory => (
                <option
                  key={subCategory.id}
                  value={subCategory.sub_category_name}
                >
                  {subCategory.sub_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="productDiscountRate">할인율</label>
            <input
              type="number"
              name="productDiscountRate"
              id="productDiscountRate"
              value={productDiscountRate}
              placeholder="10%는 10으로 입력하세요"
              onChange={e => setProductDiscountRate(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="productPrice">가격</label>
            <input
              type="number"
              name="productPrice"
              id="productPrice"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="productDiscountPrice">할인가격</label>
            <input
              type="number"
              name="productDiscountPrice"
              id="productDiscountPrice"
              value={productDiscountPrice}
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="productQuantity">수량</label>
            <input
              type="number"
              name="productQuantity"
              id="productQuantity"
              value={productQuantity}
              onChange={e => setProductQuantity(e.target.value)}
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
          <div className="descriptionImageContainer">
            <label htmlFor="productDescription">상품 설명</label>
            <input
              type="file"
              name="productDescription"
              id="productDescription"
              accept="image/*"
              required
            />
          </div>
          <div className="imageContainer">
            <label htmlFor="thumnailImg">대표이미지</label>
            <input
              type="file"
              name="thumnailImg"
              id="thumnailImg"
              accept="image/*"
              required
            />
          </div>
          <div className="imageContainer">
            <label htmlFor="detailImg">상세이미지</label>
            <input
              type="file"
              name="detailImg"
              id="detailImg"
              accept="image/*"
              multiple
            />
          </div>
          <div className="submitBtn">
            <button type="submit">상품 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
