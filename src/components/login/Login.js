import React, { useState , useRef, useEffect } from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  },[])

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('auth/login', { email, password })
    .then(response => {
       localStorage.setItem('token', response.data.access_token);
       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
       console.log(response);
       navigate('/add-product');
    })
    .catch(error => {
       if (error.response.status === 400) {
       }else if (error.response.status === 401) {
        alert('Email or password incorrect !!')
       }
       setPassword("");
    });
  }

  return (
    <div>
      <Header/>
      <div className="d-flex justify-content-center align-items-center"  style={{ height: '80vh' }}>
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ width: '600px' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  
            placeholder="Email" 
            autoComplete="email" 
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required 
          />
        </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      </div>
    </div>
  )
}

export default Login