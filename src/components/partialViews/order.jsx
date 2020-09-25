import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { getOrdersDetails } from "../../services/orderService";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getOrdersDetails();
      if (response) {
        setLoading(false);
        setOrders(response);
      }
    }
    fetchData();
  }, []);
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Orders</h1>
      </div>
      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <div>
        Click on Order Number to view corresponding Sales Details
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>User Name</th>
              <th>Tax</th>
              <th>Net Price</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>MomoPay Tnx</th>
              <th>Created</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((c) => (
              <tr key={c.id}>
                <td>
                  <Link to={"/sales/" + c.id}>{c.orderNumber}</Link>
                </td>
                <td>{c.clientname}</td>
                <td>{c.username}</td>
                <td>{c.tax}</td>
                <td>{c.netPrice}</td>
                <td>{c.totalPrice}</td>
                <td>{c.paymentMethod}</td>
                <td>{c.externalId}</td>
                <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                <td>{c.orderStatus === true ? "Completed" : "Cancelled"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
