import React, {useEffect, useState} from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';

function ViewOrder() {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);

    const [products, setProducts] = useState('');
    const [status, setStatus] = useState('');
    const [selectedOrderId, setOrderId] = useState('');
    
    const handleClose = () => setShow(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
        navigate('/login');
        }
    },[])

    useEffect(() => {
        fetchOrders(currentPage,searchTerm);
    }, [currentPage]);

    const fetchOrders = (page,searchTerm='') => {
        axios.get(`orders?name=${searchTerm}&page=${page}`)
        .then(response => {

            setOrders(response.data.result.orders.data);
            setTotalPages(response.data.result.orders.last_page);
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

    const handleSearch = () => {
        setCurrentPage(1);
        fetchOrders(1, searchTerm);
    };

    const handleShowModal = (index) => {
        const order = orders[index];
        setOrderId(orders[index]['id'])
        setProducts(orders[index]['order_items'])
        setStatus(order.status)
        setShow(true)
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleStatusUpdate = (event) => {
        event.preventDefault()
        axios.put(`orders/update-status/${selectedOrderId}`, { 
          status :status
         })
        .then(response => {
           alert("order status updated successfully !!")
            setShow(false)
            fetchOrders(currentPage,searchTerm);
        })
        .catch(error => {
           if (error.response.status === 400) {
           }else if (error.response.status === 422) {
            alert('Validation error. Check your data !!')
           }
        });
    };

    return (
        <div className='row'>
        <Header/>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
            <Form className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Search customer name" 
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
                    <th>Order id</th>
                    <th>Name</th>
                    <th>Total price</th>
                    <th>Status</th>
                    <th>View</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.created_by.name}</td>
                    <td>{order.total_price}</td>
                    <td>{order.status}</td>
                    <td><Button onClick={() => handleShowModal(index)}>View</Button></td>
                </tr>
                ))}
                </tbody>
            </Table>
           
        </div>
        <div className="d-flex justify-content-center" style={{ height: '30vh' }}>
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
            <Modal show={show} onHide={handleClose} size="lg">
                <Form >
                    <Modal.Header closeButton>
                    <Modal.Title>View Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {products.length > 0 && (
                        <Table style={{width : '700px'}}>
                            <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Product price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                <td>{product.product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>  
                    )}
                    <Form.Select value={status} onChange={handleStatusChange}>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type='button' onClick={handleStatusUpdate}>Update status</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    </div>
    )
}

export default ViewOrder