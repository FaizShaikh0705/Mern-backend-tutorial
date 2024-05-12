import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import fileDownload from "js-file-download";
import axios from "axios";

function FileBox({ data }) {
  const icons = {
    file: "fa-solid fa-file",
    pdf: "fa-solid fa-file-pdf",
  };

  const iconToDisplay = (fileType) => {
    if (fileType == "application/pdf") {
      return icons.pdf;
    } else {
      return icons.file;
    }
  };
  return (
    <Card>
      <Card.Body>
        <Row className="align-items-centers">
          <Col style={{ fontWeight: "bold", fontSize: "1.2rem" }} xs="3">
            <div className="flex-centered m-3">
              <i className={`${iconToDisplay(data.type)} file-icon`} />
            </div>
          </Col>
          <Col xs="7">{data.name}</Col>
          <Col xs="2" style={{fontSize:'1.6rem',display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
            <Row style={{ color: "darkgreen" }}>
              <i onClick={()=>{
                axios.get(data.fileUrl, {
                  responseType: 'blob',
                })
                .then((res) => {
                  fileDownload(res.data, data.name)
                })
              }} className="fa-solid fa-download" />
            </Row>
            <Row style={{ color: "darkred" }}>
              <i className="fa-solid fa-trash" />
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FileBox;
