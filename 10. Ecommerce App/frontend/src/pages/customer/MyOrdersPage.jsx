import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap'

function MyOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const getOrderList = async () => {
    try {
      const config = {
        "headers": {
          "Authorization": `Bearer ${user.token}`
        }
      }
      const response = await axios.get(API_URL + `/users/${user.id}/orders`, config);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getOrderList();
  },[])

  return (
    <Container className='mt-5'>
      <h1>My Orders</h1>
      <Row>
        <Col>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </Col>
      </Row>
    </Container>
  )
}

export default MyOrdersPage