import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import "./bootstrap.min.css";
import FileBox from "./components/FileBox";
import axios from 'axios'
import { BASE_URL } from "./api";
import { useEffect, useState } from "react";

function App() {

  const [files,setFiles] = useState([])

  const fetchFiles = async () => {
    try {
      const response = await axios.get(BASE_URL+'/files')
      setFiles(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchFiles()
  },[])
  

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post(BASE_URL+'/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      // Handle success
    })
    .catch(error => {
      console.error('Error uploading file: ', error);
      // Handle error
    });
  };


  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Google Drive</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-between align-items-center mt-1">
          <Col xs="9" md="10">
            <Form.Control type="text" placeholder="Search" />
          </Col>
          <Col xs="3" md="2">
          <Button><i className="fa add" />New</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <input type="file" multiple={false} onChange={async (e)=>{

             try {
              

              const file = e.target.files[0];

              const formData = new FormData()

              formData.append('file', file)

              const response = await axios.post(BASE_URL+"/files",formData)

              fetchFiles()

             } catch (error) {
              console.log(error);
             }



            }} />
          </Col>
        </Row>

        <div className="mt-4">
          <Row className="no-margin">
            {files.map((item, index)=>(
              <Col key={index} xs="12" lg="12" className="no-margin my-2">
                <FileBox data={item} />
              </Col>
            ))}
            
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default App;
