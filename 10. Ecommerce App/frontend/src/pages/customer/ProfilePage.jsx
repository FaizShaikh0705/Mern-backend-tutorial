import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { API_URL } from '../../constants/api'

const ProfilePage = () => {
  const {user, updateUser} = useContext(AuthContext);

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProfileData = async () =>{
    try {

      const config = {
        "headers":{
          "Authorization": `Bearer ${user.token}`
        }
      }

      const response = await axios.get(API_URL+`/users/${user.id}`, config);
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
   getProfileData();
  }, [])

  const submitHandler =async (e) => {
    e.preventDefault()

    if(!name){
      return;
    }

    if(password.length>0 && password!== confirmPassword){
      return;
    }
    
      try {
        const config = {
          "headers": {
            "Authorization": `Bearer ${user.token}`
          }
        }
        const response = await axios.put(API_URL+`/users/${user.id}`, {name, password}, config);

        updateUser(response.data);

      } catch (error) {
        console.log(error);
      }
    
  }

  return (
    <Container className="mt-5">
      <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </Col>
    </Row>
    </Container>
  )
}

export default ProfilePage