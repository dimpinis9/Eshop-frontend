import React from 'react'
import Register from './Register'
import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import ProductCreateOrUpdate from './ProductCreateOrUpdate'
import Product from './Product'
import Cart from './Cart'
import AllOrders from './AllOrders'
import MyOrders from './MyOrders'
import EditProduct from './EditProduct'
import OrderProducts from './OrderProducts'

const App = () => {


    return (
      <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="product-create" element={<ProductCreateOrUpdate />} />
        <Route path="product/:productId" element={<Product/>} />
        <Route path="product/edit/:productId" element={<EditProduct/>} />
        <Route path="orders/products/:ordersId" element={<OrderProducts/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="orders" element={<AllOrders/>} />
        <Route path="myorders" element={<MyOrders/>} />
      </Routes>
      </div>
    )
  }

export default App