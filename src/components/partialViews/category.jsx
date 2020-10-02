import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import dateFormat from "dateformat";
import { Row, Col, Table, Form, Button, Card, Spinner } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import usePagination from "../common/usePagination";
import { useForm } from "react-hook-form";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../services/categoryService";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Add");
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);
  const [categID, setCategID] = useState(0);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await getCategories();
      if (response) {
        setLoading(false);
        setCategories(response.data);
      }
    }
    fetchData();
  }, []);

  const countPage = Math.ceil(categories.length / PER_PAGE);
  const _DATA = usePagination(categories, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleUpdate = (categoryId) => {
    setTitle("Edit");
    const category = categories.filter((c) => c.id === Number(categoryId));
    setValue("categoryname", category[0].name);
    setCategID(categoryId);
  };

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

  const onSubmit = async (data) => {
    setLoadingChange(true);
    const categoryData = {
      name: data.categoryname,
    };
    try {
      if (title === "Add") {
        const { data: response } = await createCategory(categoryData);
        if (response.data.status === 1) {
          window.location = "/category";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateCategory(categID, categoryData);
        if (response.data.status === 1) {
          window.location = "/category";
        } else {
          toast.error(response.data.statusMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header  pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h2  d-inline-block mb-0">Category</h6>
            </div>
          </div>

          <Row>
            <Col sm={4}>
              <Card>
                <Card.Header>{title} Category</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        name="categoryname"
                        type="text"
                        placeholder="Enter Category name"
                        ref={register}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      {title}{" "}
                      {loadingChange && (
                        <Spinner animation="border" size="sm" />
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={8}>
              {loading && (
                <Loader
                  type="ThreeDots"
                  color="#0057e7"
                  height="50"
                  width="50"
                />
              )}
              <Table
                responsive
                className="table align-items-center table-flush"
              >
                <thead className="thead-light">
                  <tr>
                    <th>Category Name</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {_DATA.currentData().map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{dateFormat(c.createdAt, "yyyy-mm-dd")}</td>
                      <td>{dateFormat(c.updatedAt, "yyyy-mm-dd")}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-xs mr-1"
                          onClick={() => handleUpdate(c.id)}
                        >
                          <FaPencilAlt />
                        </button>
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
              <Pagination
                count={countPage}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
