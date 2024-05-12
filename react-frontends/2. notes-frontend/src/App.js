import "./App.css";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Note from "./components/Note";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { BASE_URL } from "./api";
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([]);
 
  const [search, setSearch] = useState('')

  const [radioValue, setRadioValue] = useState("all");

  const radios = [
    { name: "All", value: "all" },
    { name: "Archived", value: "archived" },
  ];


  const fetchNotes=async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/notes?search=${search}&isArchived=${radioValue=='all'?false: true}`);
      setNotes(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(()=>{
    fetchNotes()
  },[search, radioValue])

  return (
    <div>
      <Header />
      <input value={search} onChange={(e)=> setSearch(e.target.value)} />
      <Container className="mt-5">
        <Row className="mb-2">
          <Col>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-primary"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        {notes.length>0 && (<Row>
          {notes.map((item, index) => (
            <Col className="m-2" sm={12} md={5} key={index}>
              <Note noteSr={index + 1} data={item} refresh={()=>{
                fetchNotes()
              }} />
            </Col>
          ))}
        </Row>)}
      </Container>
    </div>
  );
}

export default App;
