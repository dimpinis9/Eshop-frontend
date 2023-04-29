import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function ColorSchemesExample() {

    const navigate = useNavigate()

    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

    const logout = () =>{
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('role');
        navigate("/login")
    }

    const addProduct = (e) => {
      if(window.localStorage.getItem('role')==1){
          return <Nav.Link href="/product-create">Add Product</Nav.Link>
      }

  }

  const allOrders = (e) => {
      if(window.localStorage.getItem('role')==1){
          return <Nav.Link href="/orders">All Orders</Nav.Link>
      }

  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          
          <Nav className="me-auto">
          <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
            <Nav.Link href="/home">Products</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/myorders">My Orders</Nav.Link>
            {allOrders()}
            {addProduct()}
            <Nav.Link onClick={logout} style={{position: "absolute",   right: "35px",   top: "12px"}}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
