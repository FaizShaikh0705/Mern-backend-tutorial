import React, { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../api";

function Note({ data, refresh }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClose = () => {
    setIsEditing(false);
  };
  const handleEditShow = () => {
    setIsEditing(true);
  };

  const noteEditHandler = async (e) => {
    e.preventDefault();
    const { title, note } = e.target.elements;

    try {
      const response = await axios.put(`${BASE_URL}/notes/${data._id}`, {
        title: title.value,
        content: note.value,
      });
      setIsEditing(false);
      refresh()
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const toggleArchived = async (isArchived)=>{
    try {
      const response = await axios.put(`${BASE_URL}/notes/${data._id}`, {
        archivedToggle: isArchived
      });
      refresh()
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  const noteDeleteHandler = async ()=>{
    try {
      const response = await axios.delete(`${BASE_URL}/notes/${data._id}`)
      refresh()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col xs={7}>{new Date(data.createdAt).toLocaleDateString()}</Col>
            <Col xs={5}>
              <Button
                className="mx-1"
                onClick={handleEditShow}
                variant="primary"
              >
                <i className="fa-solid fa-pen" />
              </Button>
              <Button onClick={noteDeleteHandler} className="mx-1" variant="danger">
                <i className="fa-solid fa-trash" />
              </Button>
              <Button onClick={()=>{
                toggleArchived(!data.isArchived)
              }} className="mx-1" variant="danger">
                <i
                  className={
                    data.isArchived
                      ? "fa-regular fa-eye"
                      : "fa-regular fa-eye-slash"
                  }
                />
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={isEditing} onHide={handleEditClose}>
        <Form onSubmit={noteEditHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  defaultValue={data.title}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  name="note"
                  type="text"
                  as="textarea"
                  rows={4}
                  placeholder="Enter note"
                  defaultValue={data.content}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditClose} variant="outline-secondary">
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

export default Note;
