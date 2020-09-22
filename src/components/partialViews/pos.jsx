import React, { useState, useEffect } from "react";
import PosTable from "./posTable";
import { Form, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import { getCategories } from "../../services/categoryService";
import { getProductByCateg } from "../../services/productService";

import { useDispatch } from "react-redux";
import { itemsAdded, itemRemoved, cartCleared } from "../../store/cart";

export default function Pos() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loadingCateg, setLoadingCateg] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await getCategories();
      if (response) {
        setLoadingCateg(false);
        setCategories(response.data);
      }
    }
    fetchData();
  }, []);

  const getProducts = async (categoryId) => {
    setLoadingProduct(true);
    try {
      const { data: response } = await getProductByCateg(categoryId);
      if (response) {
        setLoadingProduct(false);
        setProducts(response.data);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Category not found.");
    }
  };

  const addItems = (itemid) => {
    const product = products.filter((p) => p.id === Number(itemid));
    dispatch(
      itemsAdded({
        selectedItems: {
          productID: product[0].id,
          productName: product[0].productname,
          price_unit: product[0].sellingPrice,
          quantity: qty,
          totalPrice: product[0].sellingPrice * qty,
        },
      })
    );
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Shopping Cart </h1>
      </div>
      <Row>
        <Col sm={2}>
          <ListGroup>
            <ListGroup.Item active>
              {loadingCateg && <Spinner animation="border" size="sm" />}
              Category
            </ListGroup.Item>
            {categories.map((c) => (
              <ListGroup.Item
                key={c.id}
                action
                onClick={() => getProducts(c.id)}
              >
                {c.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={4}>
          <Form.Row>
            <Form.Label column sm={8}>
              Purchase Quantity
            </Form.Label>
            <Col xs={5}>
              <Form.Control
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Col>
          </Form.Row>

          <br />
          <ListGroup>
            <ListGroup.Item active>
              {loadingProduct && <Spinner animation="border" size="sm" />}
              Products
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ul className="products">
            {products.map((p) => (
              <li key={p.id}>
                <h3>{p.productname}</h3>
                <small>RWF {p.sellingPrice}</small>
                <button
                  type="button"
                  className="btn btn-success  btn-sm"
                  onClick={() => addItems(p.id)}
                >
                  <FaCartPlus />
                </button>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <PosTable />
        </Col>
      </Row>
    </main>
  );
}
