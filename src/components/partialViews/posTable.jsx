import React, { useState, useEffect } from "react";
import { Col, Table, Form, Button, Badge, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { itemRemoved, itemUpdated, cartCleared } from "../../store/cart";

export default function PosTable() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { items } = useSelector((state) => state.entities.cart);

  const total = () => {
    return items.reduce((result, c) => result + c.totalPrice, 0);
  };
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="4">Dealer :</th>
            <th>
              <Button variant="primary" size="sm">
                Clear Cart
              </Button>
            </th>
          </tr>
          <tr>
            <th>Label </th>
            <th>Price Unit</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.productName}</td>
              <td>{c.price_unit}</td>
              <td>{c.quantity}</td>
              <td>{c.totalPrice} RWF</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(itemRemoved({ itemID: c.id }))}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <strong>Total : RWF {total()}</strong>
            </td>
            <td>
              <button className="btn btn-success btn-sm">Checkout</button>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Tabs defaultActiveKey="t2" transition={false}>
        <Tab eventKey="t2" title="MTN MoMo">
          <br />
          <h2>Pay with MTN MoMo</h2>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Control placeholder="Your Phone Number " />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Control placeholder="Your PIN number" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Control placeholder="total" disabled value={total()} />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Pay
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}
