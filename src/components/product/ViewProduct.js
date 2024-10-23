import React, {useEffect, useState} from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';

function ViewProduct() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);

    const [name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock_quantity, setQuantity] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);


    const handleClose = () => setShow(false);

    useEffect(() => {
        fetchProducts(currentPage,searchTerm);
    }, [currentPage]);

    const fetchProducts = (page,searchTerm='') => {
        axios.get(`products?name=${searchTerm}&page=${page}`)
        .then(response => {
            setProducts(response.data.result.products.data);
            setTotalPages(response.data.result.products.last_page);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleProductDeleteClick = (productId) => {
        axios.delete(`products/${productId}`)
        .then(response => {
            alert('Product successfully deleted !!')
            fetchProducts(1, searchTerm)
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
          setCurrentPage(page);
        }
    };

    const handleShowModal = (index) => {
        const product = products[index];
        setSelectedProductId(product.id);
        setProductName(product.name || null);
        setDescription(product.description || null);
        setPrice(product.price || 0);
        setQuantity(product.stock_quantity || 0)

        setShow(true)
    }

    const handleSearch = () => {
        setCurrentPage(1);
        fetchProducts(1, searchTerm);
    };

    function handleSubmit(event) {
        event.preventDefault()
        axios.put(`products/${selectedProductId}`, { 
          name, 
          description,
          price,
          stock_quantity,
          status :1
         })
        .then(response => {
           alert("order updated successfully !!")
           setProductName("");
           setDescription("");
           setPrice("");
           setQuantity("");

           setShow(false)
           fetchProducts(1, searchTerm);
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
            <Form className="mb-3" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
                <Form.Control 
                    type="text" 
                    placeholder="Search product name" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                />
                
                <Button className="mt-2" onClick={handleSearch}>Search</Button>
            </Form>
        </div>
        <div className="d-flex justify-content-center align-items-center"  style={{ height: '50vh' }}>
            <Table responsive="lg" style={{width : '1100px'}}>
                <thead>
                <tr>
                    <th>Product id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock_quantity}</td>
                    <td><Button onClick={() => handleShowModal(index)}>Edit</Button></td>
                    <td><Button style={{backgroundColor:'red'}} onClick={() => handleProductDeleteClick(product.id)}>Delete</Button></td>
                </tr>
                ))}
                </tbody>
            </Table>
           
        </div>
        <div className="d-flex justify-content-center" style={{ height: '10vh' }}>
        <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        </div>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type='submit'>Save changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    </div>
    
  )
}

export default ViewProduct