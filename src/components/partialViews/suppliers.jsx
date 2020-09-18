import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getSuppliers, deleteSupplier } from "../../services/supplierService";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await getSuppliers();
      if (response) {
        setLoading(false);
        setSuppliers(response.data);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (supplierId) => {
    try {
      await deleteSupplier(supplierId);
      const newsuppliers = suppliers.filter(
        (supplier) => supplier.id !== supplierId
      );
      toast.success("This Supplier is now deleted.");
      setSuppliers(newsuppliers);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Supplier has already been deleted.");
    }
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Suppliers</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Link className="btn btn-primary" to={"/supplierform/new"}>
          Add +
        </Link>
      </div>

      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((c) => (
              <tr key={c.id}>
                <td>{c.suppliername}</td>
                <td>{c.address}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                <td>{dateFormat(c.updatedAt, "yyyy-mm-dd")}</td>
                <td>
                  <Link
                    className="btn btn-warning btn-xs mr-1"
                    to={"/supplierform/" + c.id}
                  >
                    <FaPencilAlt />
                  </Link>
                  <button
                    className="btn btn-danger btn-xs mr-1"
                    onClick={() => handleDelete(c.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
