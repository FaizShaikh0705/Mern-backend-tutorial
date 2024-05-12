import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, Container } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../constants/api";

const OrderPage = () => {
  const params = useParams()
  const orderId = params.orderId;

  const [order, setOrder] = useState();
  const [rzp_key, setRzp_key] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const getOrderDetails = async () => {
    try {
      const config = {
        "headers": {
          "Authorization": `Bearer ${user.token}`
        }
      }
      const response = await axios.get(API_URL + `/orders/${orderId}`, config);

      setOrder(response.data.order);
      setRzp_key(response.data.key);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderDetails()
  }, [])

  const paymentHandler = async () => {
    try {
      const options = {
        key: rzp_key,
        amount: order?.rzp_order_response.amount,
        currency: "INR",
        name: "Apni Dukaan",
        description: "Apni Dukaan Transaction",
        image: "/logo512.png",
        order_id: order?.rzp_order_response.id,
        handler: async (res) => {
          console.log("pay",res);
        
            const config = {
              "headers": {
                "Authorization": `Bearer ${user.token}`
              }
            }
            const response = await axios.put(API_URL+`/orders/${order._id}`,res, config);

            console.log("payment verified",response);
         
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "8286841995"
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log('options', options);

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  }

  const deliverHandler =()=>{}

  return (
    <Container>
      {loading && <Loader />} 
      {error && <Message variant="danger">{error}</Message>}

    {order && (<>
      <h2>Order</h2>
      <h5>{order._id}</h5>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt?.slice(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt?.slice(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                 <Button
                      type="button"
                      className="btn btn-block"
                      onClick={paymentHandler}
                    >
                      Pay Now
                    </Button>
                </ListGroup.Item>
              )}
              {user &&
                user.role === "admin" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>)}
    </Container>
  )
};

export default OrderPage;