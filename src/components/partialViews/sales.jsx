import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Row, Col, Table } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { getSalesDetails } from "../../services/saleService";
import { getOrdersDetails } from "../../services/orderService";

export default function Sales(props) {
  const cID = props.match.params.id;
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const responseOrders = await getOrdersDetails();
      const responseSales = await getSalesDetails();
      if (responseOrders && responseSales) {
        setLoading(false);
        setOrders(responseOrders);
        setSales(responseSales);
      }
    }
    fetchData();
  }, []);

  const orderData = orders.filter((o) => o.id === Number(cID));
  const saleData = sales.filter((s) => s.orderId === Number(cID));

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales</h1>
      </div>
      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <Row>
        <Col sm={4}>
          <Table bordered responsive>
            <thead>
              <tr>
                <th colSpan="2">Order</th>
              </tr>
            </thead>
            {orderData.map((c) => (
              <tbody key={c.id}>
                <tr>
                  <td>Order Number</td>
                  <td>{c.orderNumber}</td>
                </tr>
                <tr>
                  <td>Customer Name</td>
                  <td>{c.clientname}</td>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td>{c.username}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>{c.tax}</td>
                </tr>
                <tr>
                  <td>Net Price</td>
                  <td>{c.netPrice}</td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>{c.totalPrice}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>{c.paymentMethod}</td>
                </tr>
                <tr>
                  <td>MomoPay Tnx</td>
                  <td>{c.externalId}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>{c.orderStatus === true ? "Completed" : "Cancelled"}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
        <Col sm={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="5" className="center">
                  <h4>Sale</h4>
                </th>
              </tr>
              <tr>
                <th>Product Name</th>
                <th>Sales Number</th>
                <th>Price Unit</th>
                <th>Total Price</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {saleData.map((c) => (
                <tr key={c.id}>
                  <td>{c.productname}</td>
                  <td>{c.sales}</td>
                  <td>{c.sellingPrice}</td>
                  <td>{c.price}</td>
                  <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </main>
  );
}
