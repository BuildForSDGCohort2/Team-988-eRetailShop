import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getCategories, deleteCategory } from "../../services/categoryService";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await getCategories();
      if (response) setCategories(response.data);
    }
    fetchData();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      const newcategories = categories.filter(
        (category) => category.id !== categoryId
      );
      toast.success("This category is now deleted.");
      setCategories(newcategories);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This category has already been deleted.");
    }
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Category</h1>
      </div>

      <Link className="btn btn-primary" to={"/categoryform/new"}>
        Add +
      </Link>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <th>{c.name}</th>
                <th>{dateFormat(c.createdAt, "yyyy-mm-dd")}</th>
                <th>{dateFormat(c.updatedAt, "yyyy-mm-dd")}</th>
                <td>
                  <Link
                    className="btn btn-warning btn-xs mr-1"
                    to={"/categoryform/" + c.id}
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
