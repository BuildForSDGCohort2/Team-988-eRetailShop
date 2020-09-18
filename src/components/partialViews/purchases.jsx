import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { getPurchaseSuppliersProducts } from "../../services/purchaseService";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getPurchaseSuppliersProducts();
      if (response) {
        setLoading(false);
        setPurchases(response);
      }
    }
    fetchData();
  }, []);
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Purchases</h1>
      </div>
      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Product Name</th>
              <th>Number Received</th>
              <th>Purchase Date</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((c) => (
              <tr key={c.id}>
                <td>{c.suppliername}</td>
                <td>{c.productname}</td>
                <td>{c.numberreceived}</td>
                <td>{dateFormat(c.purchasedate, "yyyy-mm-dd")}</td>
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
