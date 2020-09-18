import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { getSalesDetails } from "../../services/saleService";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getSalesDetails();
      if (response) {
        setLoading(false);
        setSales(response);
      }
    }
    fetchData();
  }, []);
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales</h1>
      </div>
      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Sales Number</th>
              <th>Tax</th>
              <th>Net Price</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Sales Type</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((c) => (
              <tr key={c.id}>
                <td>{c.clientname}</td>
                <td>{c.username}</td>
                <td>{c.productname}</td>
                <td>{c.sales}</td>
                <td>{c.tax}</td>
                <td>{c.netPrice}</td>
                <td>{c.totalPrice}</td>
                <td>{c.paymentMethod}</td>
                <td>{c.salestype}</td>
                <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                <td>{dateFormat(c.updatedAt, "yyyy-mm-dd")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
