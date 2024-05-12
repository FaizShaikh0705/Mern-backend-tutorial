import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card, Container } from "react-bootstrap";
import Message from "../../components/Message";
import { CartContext } from "../../contexts/CartContext";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { AuthContext } from "../../contexts/AuthContext";

const PlaceOrderScreen = () => {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const location = useLocation();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const totalPrice = cart
        .reduce((acc, item) => acc + item.qty * Number(item.price), 0)
        .toFixed(2)

    useEffect(() => {

    }, []);

    const placeOrderHandler = async () => {
        try {

            const config = {
                "headers": {
                    "Authorization": `Bearer ${user.token}`
                }
            }

            let body = {}

            body['shippingAddress'] = {
                "address": location.state.address,
                "city": location.state.city,
                "postalCode": location.state.postalCode,
                "state": location.state.state,
            }

            body['products'] = cart.map((item) => { return { productId: item._id, qty: item.qty } });

            const response = await axios.post(API_URL + "/orders", body, config);

            navigate(`/orders/${response.data.order._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {location.state.address}, {location.state.city}{" "}
                                {location.state.postalCode},{" "}
                                {location.state.state}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart?.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart?.map((item, index) => (
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
                                    <Col>Total</Col>
                                    <Col>₹{totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart?.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceOrderScreen;