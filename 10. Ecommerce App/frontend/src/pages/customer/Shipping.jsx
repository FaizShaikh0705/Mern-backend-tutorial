import React, { useContext, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const ShippingPage = () => {

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [state, setState] = useState("")

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/placeorder`, {
        state:{
            address,
            city,
            postalCode,
            state
        }
    })
  }

  return (
    <Container>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='state' className="my-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter State'
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </Container>
  )
}

export default ShippingPage