import { useEffect, useState } from "react";
import "./App.css";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "./api";

function App() {
  // Get Users
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create User
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/users`,
        { name: name, email: email },
        config
      );

      getUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Update User
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const updateUser = async (e) => {
    e.preventDefault();
    const { name, email } = e.target.elements;

    try {
      const response = await axios.put(`${BASE_URL}/users`, {
        name: name.value,
        email: email.value,
        id: users[userToEdit]['id']
      });
      setIsEditing(false)
      setUserToEdit(null)
      
      getUsers()
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users`, {
        data: { id: userId },
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClose = () => {
    setUserToEdit(null);
    setIsEditing(false);
  };
  const handleEditShow = (userIndex) => {
    setUserToEdit(userIndex);
    setIsEditing(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Form onSubmit={createUser}>
        <Row className="align-items-center">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Col>
            <Button
              onClick={createUser}
              type="submit"
              variant="outline-primary"
            >
              <i className="fa solid fa-plus" />
              {"  "}Add
            </Button>
          </Col>
        </Row>
      </Form>
      {users.length < 1 ? (
        <p>No user to show</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={() => handleEditShow(index)}
                  >
                    <i className="fa solid fa-pen" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      deleteUser(item.id);
                    }}
                  >
                    <i className="fa solid fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={isEditing} onHide={handleEditClose}>
        <Form onSubmit={updateUser}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userToEdit !== null && (
              <>
                <Row>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      defaultValue={users[userToEdit]["name"] || ""}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      defaultValue={users[userToEdit]["email"] || ""}
                    />
                  </Form.Group>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="outline-primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default App;
