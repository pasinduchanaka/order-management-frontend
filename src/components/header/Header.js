import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {
              localStorage.getItem('token') ?
              <>
                <Link to="/add-product" style={{ marginLeft: '15px' }}>Add Product</Link>
                <Link href="#features" style={{ marginLeft: '15px' }}>View Product</Link>
                <Link href="#pricing" style={{ marginLeft: '15px' }}>Add Order</Link>
              </>
              :
              <>
                <Link to="/login" style={{ marginLeft: '15px' }}>Login</Link>
              </>
            }
           
          </Nav>
        </Container>
      </Navbar> 
    </>  
    )
}

export default Header