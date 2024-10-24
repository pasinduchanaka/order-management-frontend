import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Header() {

  const navigate = useNavigate();

  const handleLogOutModalButtonChange = (event) => {
    axios.get(`auth/logout`)
    .then(response => {
      localStorage.clear();  
      localStorage.removeItem('token');
      navigate('/login');    
    
    })
    .catch(error => {
        console.log(error);
        localStorage.clear();  
        localStorage.removeItem('token');
        navigate('/login');    
    });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {
              localStorage.getItem('token') ?
              <>
                <Link to="/add-product" style={{ marginLeft: '15px' }}>Add Product</Link>
                <Link to="/view-product" style={{ marginLeft: '15px' }}>View Product</Link>
                <Link to="/add-order" style={{ marginLeft: '15px' }}>Add Order</Link>
                <Link to="/view-order" style={{ marginLeft: '15px' }}>View Order</Link>
                <Link onClick={handleLogOutModalButtonChange} style={{ marginLeft: '50px' }}>Log out</Link>
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