import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {
  getOrdersProductClient,
  deleteOrder,
} from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getOrdersProductClient();
      if (response) {
        setLoading(false);
        setOrders(response);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      const neworders = orders.filter((order) => order.id !== orderId);
      toast.success("This order is now deleted.");
      setOrders(neworders);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");
    }
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Orders</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        {loading && (
          <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Number Shipped</th>
              <th>Order Date</th>
              <th>Client Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((c) => (
              <tr key={c.id}>
                <td>{c.productname}</td>
                <td>{c.numbershipped}</td>
                <td>{dateFormat(c.orderdate, "yyyy-mm-dd")}</td>
                <td>{c.clientname}</td>
                <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                <td>{dateFormat(c.updatedAt, "yyyy-mm-dd")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
