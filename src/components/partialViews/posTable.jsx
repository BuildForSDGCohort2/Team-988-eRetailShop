import React, { useState } from "react";
import dateFormat from "dateformat";
import { Col, Table, Form, Button, Spinner, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTrashAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { itemRemoved, cartCleared } from "../../store/cart";
import {
  processPayment,
  getTransactionStatus,
} from "../../services/momopayService";
import { createOrder } from "../../services/orderService";
import { createSale } from "../../services/saleService";

export default function PosTable({ userData }) {
  const dispatch = useDispatch();
  const [netPrice, setNetPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderNumber, setorderNumber] = useState("");

  const [showCart, toggleCartShow] = useState(true);
  const [showPay, togglePayShow] = useState(false);
  const [showInvoice, toggleInvoiceShow] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const [invoiceData, setInvoiceData] = useState([]);
  const { register, handleSubmit } = useForm();
  const { items, customer } = useSelector((state) => state.entities.cart);

  const subtotal = () => {
    return items.reduce((result, c) => result + c.totalPrice, 0);
  };

  const getValues = (amount) => {
    const vat = (amount * 10) / 100;
    const total = amount + vat;
    return {
      netPrice: amount,
      tax: vat,
      total: total,
    };
  };

  const onSubmit = async (data) => {
    setLoadingPay(true);
    const { netPrice, tax, total } = getValues(subtotal());

    const payData = {
      amount: subtotal(),
      currency: "EUR",
      externalId: "1265656565",
      phone: data.phone,
      payerMessage: "online payment",
      payeeNote: "paid",
    };
    try {
      const { data: responsePay } = await processPayment(payData);
      const tnxData = {
        uuid_user: responsePay.data.uuid,
        authToken: responsePay.data.authCode,
      };
      const { data: responseTnx } = await getTransactionStatus(tnxData);
      if (responseTnx.data.status === "SUCCESSFUL") {
        const orderData = {
          customerId: customer.id,
          sellerId: userData.userid,
          tax: tax,
          netPrice: netPrice,
          totalPrice: total,
          paymentMethod: "Momo Pay",
          externalId: responseTnx.data.financialTransactionId,
        };
        const { data: responseOrder } = await createOrder(orderData);
        let saleData = {
          productId: 0,
          sales: 0,
          price: 0,
          orderId: 0,
        };

        items.forEach(async function (c) {
          saleData = {
            productId: c.productID,
            sales: c.quantity,
            price: c.totalPrice,
            orderId: responseOrder.data.id,
          };
          await createSale(saleData);
        });

        setLoadingPay(false);
        toggleCartShow(false);
        togglePayShow(false);
        toggleInvoiceShow(true);
        setorderNumber(responseOrder.data.orderNumber);
        setInvoiceData(items);

        setNetPrice(netPrice);
        setTax(tax);
        setTotal(total);
        dispatch(cartCleared());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {showCart && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="5">Customer : {customer.name}</th>
            </tr>
            <tr>
              <th>Label </th>
              <th>Price Unit</th>
              <th>Qty</th>
              <th>Total</th>
              <th>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => dispatch(cartCleared())}
                >
                  <FaTrash />
                </Button>
              </th>
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
              <td colSpan="3">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    togglePayShow(true);
                  }}
                >
                  Checkout
                </button>
              </td>
              <td>
                Total <strong>{subtotal()} RWF </strong>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      )}

      {showPay && (
        <Card>
          <Card.Header>Pay with MTN MoMo</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Control
                    name="phone"
                    placeholder="Phone Number "
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Control
                    name="pin"
                    type="password"
                    placeholder="PIN number"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Button variant="primary" type="submit">
                    Pay
                  </Button>
                </Form.Group>
                {loadingPay && <Spinner animation="border" size="lg" />}
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      )}
      {showInvoice && (
        <div className="container">
          <div className="card">
            <div className="card-header">
              Invoice Number:
              <strong> {orderNumber}</strong>
              <span className="float-right">
                <strong>Date and Time:</strong>
                {dateFormat(new Date(), "yyyy-mm-dd hh:MM TT")}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-sm-6">
                  <h6 className="mb-3">Retailer</h6>
                  <div>
                    <strong>eRetailShop</strong>
                  </div>
                  <div>Kigali, Rwanda</div>
                  <div>Email: info@eretailshop.com</div>
                  <div>Phone: +78 444 666 3333</div>
                </div>

                <div className="col-sm-6">
                  <h6 className="mb-3">Customer</h6>
                  <div>
                    <strong>{customer.name}</strong>
                  </div>
                  <div>{customer.address}</div>
                  <div>Email: {customer.email}</div>
                  <div>Phone: {customer.phone}</div>
                </div>
              </div>

              <div className="table-responsive-sm">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Description</th>
                      <th className="right">Unit Cost</th>
                      <th className="center">Qty</th>
                      <th className="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.map((c) => (
                      <tr key={c.id}>
                        <td className="center">{c.id}</td>
                        <td className="left">{c.productName}</td>
                        <td className="right">{c.price_unit}</td>
                        <td className="center">{c.quantity}</td>
                        <td className="right">{c.totalPrice} RWF</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"></div>

                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="right">{netPrice} RWF</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>VAT (10%)</strong>
                        </td>
                        <td className="right">{tax} RWF</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>{total} RWF</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
