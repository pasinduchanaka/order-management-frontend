import React, {useEffect, useState} from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddProduct() {

  const [name, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock_quantity, setQuantity] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/add-product');
    }
  },[])

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('products', { 
      name, 
      description,
      price,
      stock_quantity
     })
    .then(response => {
       alert("order added successfully !!")
       setProductName("");
       setDescription("");
       setPrice("");
       setQuantity("");
    })
    .catch(error => {
       if (error.response.status === 400) {
       }else if (error.response.status === 422) {
        alert('Validation error. Check your data !!')
       }
    });
  }

  return (
    <div className='row'>
      <Header/>
      <div className="d-flex justify-content-center align-items-center"  style={{ height: '80vh' }}>

      <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ width: '600px' }}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter product name" 
        onChange={e => setProductName(e.target.value)}
        value={name}
        required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter description" 
        onChange={e => setDescription(e.target.value)}
        value={description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter price" 
        onChange={e => setPrice(e.target.value)}
        value={price}
        required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="quantity">
        <Form.Label>Stock qunatity</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Enter qauantity" 
        onChange={e => setQuantity(e.target.value)}
        value={stock_quantity}
        required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
    </div>
    </div>

  )
}

export default AddProduct