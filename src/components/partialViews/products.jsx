import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {
  getProductCategory,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getProductCategory();
      if (response) {
        setLoading(false);
        setProducts(response);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      const newproducts = products.filter(
        (product) => product.id !== productId
      );
      toast.success("This product is now deleted.");
      setProducts(newproducts);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This product has already been deleted.");
    }
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Products</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Link className="btn btn-primary" to={"/productform/new"}>
          Add +
        </Link>
      </div>

      {loading && (
        <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
      )}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Starting Inventory</th>
              <th>Inventory Shipped</th>
              <th>Inventory on Hand</th>
              <th>Min Required</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((c) => (
              <tr key={c.id}>
                <td>{c.productname}</td>
                <td>{c.productnumber}</td>
                <td>{c.startinginventory}</td>
                <td>{c.inventoryshipped}</td>
                <td>{c.inventoryonhand}</td>
                <td>{c.minimumurequired}</td>
                <td>{c.buyingPrice}</td>
                <td>{c.sellingPrice}</td>
                <td>{c.categoryname}</td>
                <td>
                  <Link
                    className="btn btn-warning btn-xs mr-1"
                    to={"/productform/" + c.id}
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
        </Table>
      </div>
    </main>
  );
}
