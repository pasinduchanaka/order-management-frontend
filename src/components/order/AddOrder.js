import React, {useEffect, useState} from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function AddOrder() {
   const [quantity, setProductQuantity] = useState('');
   const [products, setProducts] = useState([]);
   const [items, setItems] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);

   const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        if(!localStorage.getItem('token')) {
            navigate('/login');
          }
    },[])

   const fetchProducts = (page,searchTerm='') => {
        axios.get(`products?paginate=false`)
        .then(response => {
            setProducts(response.data.result.products);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleProductChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
    };

    const handleAddProduct = () => {
        if(!quantity) {
            alert("Add a valid quantity !!")
            return
        }

        var productDetailsItem = {};
        productDetailsItem = {
            product_id: selectedProduct.id,
            quantity: quantity,
            name: selectedProduct.name,
            price: selectedProduct.price,
            total_price: selectedProduct.price * quantity
        };

        const selectedSpareParts = [...items, productDetailsItem];
        setItems(selectedSpareParts)
        setProductQuantity('');
    };

   function handleSubmit(event) {
    event.preventDefault()

    if(items.length == 0) {
        alert("Please add one or more product !!")
        return
    }
    axios.post('orders', { 
        items, 
     })
    .then(response => {
       alert("order added successfully !!")
       setItems([]);
    })
    .catch(error => {
       if (error.response.status === 500) {
        alert('Something went wrong. Please check the stock !!')
       }else if (error.response.status === 422) {
        alert('Validation error. Check your data !!')
       }
    });
  }

  return (
    <div className='row'>
    <Header/>
    <div className="d-flex justify-content-center align-items-center"  style={{ height: '40vh' }}>
      <Form className="p-4 shadow rounded" style={{ width: '600px' }}>
      <Form.Group className="mb-3" controlId="quantity">
            <Form.Select aria-label="Default select example"   onChange={e => handleProductChange(products.find(product => product.id === Number(e.target.value)))} required>
                <option>Select product</option>
                {products.map((product) => (
                <option key={product.id} value={product.id}>
                    {product.name}-(Ava.stock - {product.stock_quantity})
                </option>
        ))}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
            type="number" 
            placeholder="Enter product quantity" 
            onChange={e => setProductQuantity(e.target.value)}
            value={quantity}
            required
            />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => handleAddProduct()}>
        Add
        </Button>
      </Form>
    </div>
    {items.length > 0 && (
        <div className="d-flex justify-content-center align-items-center"  style={{ height: '20vh' }}>
            <Table responsive="lg" style={{width : '1100px'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>quantity</th>
                    <th>Total Price</th>

                </tr>
                </thead>
                <tbody>
                {items.map((product, index) => (
                    <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.total_price}</td>
                </tr>
                ))}
                </tbody>
            </Table>
        </div>                    
    )}
    <div className="d-flex justify-content-center align-items-center"  style={{ height: '40vh' }}> 
        <Button variant="success" type="button" onClick={handleSubmit}>
            Add order
        </Button>
    </div>
  </div>
  )
}

export default AddOrder