import React, { useEffect, useState } from "react";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import Product from "../../components/Product";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { useParams, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("pageNumber")) || 1;
  const [newPageNumber, setNewPageNumber] = useState(page);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL + `/products?page=${newPageNumber}`);
      setProducts(response.data.products);
      setPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("changed",newPageNumber);
    fetchProducts();
  }, [searchParams]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product,index) => (
              <Col
                key={index}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="w-50"
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {pages > 1 && (
            <Pagination>
              {[...Array(pages)].map((item, index) => (
                <Pagination.Item
                  active={newPageNumber === index + 1 ? true : false}
                  key={item}
                  onClick={() => {
                    setNewPageNumber(index + 1);
                    setSearchParams({
                      page: `${index + 1}`
                    });
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
