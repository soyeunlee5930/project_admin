import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Products from './pages/Products/Products';
import AddProduct from './pages/Products/AddProduct/AddProduct';
import ProductDetail from './pages/Products/ProductDetail/ProductDetail.jsx';
import UpdateProduct from './pages/Products/UpdateProduct/UpdateProduct.jsx';
import Categories from './pages/Categories/Categories';
import AddCategory from './pages/Categories/AddCategory/AddCategory';
import AddSubCategory from './pages/Categories/AddSubCategory/AddSubCategory';
import UpdateCategory from './pages/Categories/UpdateCategory/UpdateCategory';
import UpdateSubCategory from './pages/Categories/UpdateSubCategory/UpdateSubCategory';
import Notices from './pages/Notices/Notices.jsx';
import AddNotice from './pages/Notices/AddNotice/AddNotice.jsx';
import NoticeDetail from './pages/Notices/NoticeDetail/NoticeDetail.jsx';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import ProductInventory from './pages/Products/ProductInventory/ProductInventory.jsx';
import AddProductOption from './pages/Products/ProductInventory/AddProductOption/AddProductOption.jsx';
import EditProductOption from './pages/Products/ProductInventory/EditProductOption/EditProductOption.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header, Sidebar를 보여주고 싶은 컴포넌트(로그인해야 접근 가능) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/products/inventory/:id"
            element={<ProductInventory />}
          />
          <Route
            path="/products/inventory/:productOptionsId/edit"
            element={<EditProductOption />}
          />
          <Route
            path="/products/inventory/add/:id"
            element={<AddProductOption />}
          />
          <Route path="/products/:id/edit" element={<UpdateProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/subcategories/add" element={<AddSubCategory />} />
          <Route path="/categories/:id" element={<UpdateCategory />} />
          <Route path="/subcategories/:id" element={<UpdateSubCategory />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/add" element={<AddNotice />} />
          <Route path="/notices/:id" element={<NoticeDetail />} />
        </Route>
        {/* Header, Sidebar를 안 보여주고 싶은 컴포넌트 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
