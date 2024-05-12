import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product, match, history }) => {

  return (
    <Card
      className="my-2 text-left card"
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img className="w-60" src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <strong as="h4">₹ {product.price}</strong>
          <Rating
            color="black"
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;