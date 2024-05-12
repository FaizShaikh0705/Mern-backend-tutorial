import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import Message from "../../components/Message";
import { CartContext } from "../../contexts/CartContext";

const CartPage = () => {

  const { cart, updateCart } = useContext(CartContext);


  useEffect(() => {
   
  }, [cart]);

  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    const newCart = cart.filter(item => item._id!==id);
    updateCart(newCart)
  };

  const checkoutHandler = () => {
    navigate("/shipping")
  };

  const updateCartItem = (id, qty) =>{
    updateCart(cart.map((item)=>{
      if (item._id === id) {
        item.qty = Number(qty);
      }
      return item;
    }))
  }

  return (
    <Container className="mt-5">
      <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e)=>{
                        updateCartItem(item._id, e.target.value)
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cart
                .reduce((acc, item) => acc + item.qty * Number(item.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </Container>
  );
};

export default CartPage;