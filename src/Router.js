import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
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

const Router = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openSidebarMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <BrowserRouter>
      <div className="gridContainer">
        <Header openSidebarMenu={openSidebarMenu} />
        <Sidebar openSidebar={openSidebar} openSidebarMenu={openSidebarMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<UpdateProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/subcategories/add" element={<AddSubCategory />} />
          <Route path="/categories/:id" element={<UpdateCategory />} />
          <Route path="/subcategories/:id" element={<UpdateSubCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
