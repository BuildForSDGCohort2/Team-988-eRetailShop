import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Table, Row } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import usePagination from "../common/usePagination";
import Loader from "react-loader-spinner";
import { getOrdersDetails } from "../../services/orderService";
import { getSalesDetails } from "../../services/saleService";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesByOrder, setSalesByOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

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

  const countPage = Math.ceil(orders.length / PER_PAGE);
  const _DATA = usePagination(orders, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const getSalesByOrder = (orderID) => {
    const response = sales.filter((s) => s.orderId === Number(orderID));
    setSalesByOrder(response);
  };

  return (
    <div className="header  pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h2  d-inline-block mb-0">Orders </h6> | Click on
              Order Number to view corresponding Sales Details
            </div>
          </div>

          <Row>
            {loading && (
              <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
            )}
            <Table responsive className="table align-items-center table-flush">
              <thead className="thead-light">
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
                {_DATA.currentData().map((c) => (
                  <tr key={c.id}>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-1"
                        onClick={() => getSalesByOrder(c.id)}
                      >
                        {c.orderNumber}
                      </button>
                    </td>
                    <td>{c.clientname}</td>
                    <td>{c.username}</td>
                    <td>{c.tax}</td>
                    <td>{c.netPrice}</td>
                    <td>{c.totalPrice}</td>
                    <td>{c.paymentMethod}</td>
                    <td>{c.externalId}</td>
                    <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                    <td>
                      {c.orderStatus === true ? "Completed" : "Cancelled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              color="primary"
              count={countPage}
              page={page}
              shape="rounded"
              onChange={handlePageChange}
            />
          </Row>
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h2  d-inline-block mb-0">Sales </h6>
            </div>
          </div>
          <Row>
            <Table responsive className="table align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th>Product Name</th>
                  <th>Sales Number</th>
                  <th>Price Unit</th>
                  <th>Total Price</th>
                  <th>Sale Date</th>
                </tr>
              </thead>
              <tbody>
                {salesByOrder.map((c) => (
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
          </Row>
        </div>
      </div>
    </div>
  );
}
