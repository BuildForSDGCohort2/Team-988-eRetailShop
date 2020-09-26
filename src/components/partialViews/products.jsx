import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Row, Col, Table, Form, Button, Card, Spinner } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import usePagination from "../common/usePagination";
import { useForm } from "react-hook-form";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getCategories } from "../../services/categoryService";
import {
  getProductCategory,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Add");
  const [productID, setProductID] = useState(0);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      const { data: categories } = await getCategories();
      const responseProducts = await getProductCategory();
      if (responseProducts && categories) {
        setLoading(false);
        setProducts(responseProducts);
        setCategories(categories.data);
      }
    }
    fetchData();
  }, []);

  const countPage = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleCategory = (e) => {
    setCategoryID(e.target.value);
  };

  const handleUpdate = (productId) => {
    setTitle("Edit");
    const product = products.filter((c) => c.id === Number(productId));
    setValue("productname", product[0].productname);
    setValue("productnumber", product[0].productnumber);
    setValue("startinginventory", product[0].startinginventory);
    setValue("minimumurequired", product[0].minimumurequired);
    setValue("buyingPrice", product[0].buyingPrice);
    setValue("sellingPrice", product[0].sellingPrice);
    setProductID(productId);
  };

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

  const onSubmit = async (data) => {
    setLoadingChange(true);
    const productData = {
      productname: data.productname,
      productnumber: data.productnumber,
      startinginventory: data.startinginventory,
      minimumurequired: data.minimumurequired,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      categoryId: categoryID,
    };
    try {
      if (title === "Add") {
        const { data: response } = await createProduct(productData);
        if (response.data.status === 1) {
          window.location = "/products";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateProduct(productID, productData);
        if (response.data.status === 1) {
          window.location = "/products";
        } else {
          toast.error(response.data.statusMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Products</h1>
      </div>
      <Row>
        <Card>
          <Card.Header>{title} Product</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="productname"
                    type="text"
                    placeholder="Enter Product name"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="productnumber"
                    type="text"
                    placeholder="Enter Product number"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="startinginventory"
                    type="number"
                    placeholder="Enter Starting Inventory"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="minimumurequired"
                    type="number"
                    placeholder="Enter minimumum required"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="buyingPrice"
                    type="number"
                    placeholder="Enter Buying Price"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    name="sellingPrice"
                    type="number"
                    placeholder="Enter Selling Price"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    as="select"
                    onChange={handleCategory}
                    value={categoryID}
                  >
                    <option value="0">Select</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2">
                  <Button variant="primary" type="submit">
                    {title}{" "}
                    {loadingChange && <Spinner animation="border" size="sm" />}
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <Row>
        {loading && (
          <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
        )}

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
            {_DATA.currentData().map((c) => (
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
      </Row>
    </main>
  );
}
