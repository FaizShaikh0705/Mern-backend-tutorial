import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { API_URL } from "../../constants/api";
import {AuthContext} from "../../contexts/AuthContext"

function SignupPage() {

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {user} = useContext(AuthContext);

  const signupHandler = async (e) =>{
    e.preventDefault();
    setError("")
    if(!email || !password){
      setError("Email and password can't be blank")
      return;
    }
    try {
      const response = await axios.post(API_URL+'/users',{email, password, name});

      navigate("/login")
    } catch (error) {
      if(error.response.data && error.response.data.remark){
        setError(error.response.data.remark)
      }else {
        setError(error.message)
      }

    }
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user])

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={signupHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmpassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Signup
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Existing Customer?{" "}
              <Link
                to={"/login"}
              >
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
