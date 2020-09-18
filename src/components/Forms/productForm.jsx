import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";
import { getCategories } from "../../services/categoryService";
import {
  getProduct,
  createProduct,
  updateProduct,
} from "../../services/productService";

export default function ProductForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(0);
  const [title, setTitle] = useState("Update");

  const cID = props.match.params.id;

  const populateProducts = async () => {
    try {
      if (cID === "new") {
        setTitle("Add");
        return;
      }
      const { data: product } = await getProduct(cID);
      setValue("productname", product.data.productname);
      setValue("productnumber", product.data.productnumber);
      setValue("startinginventory", product.data.startinginventory);
      setValue("inventoryshipped", product.data.inventoryshipped);
      setValue("inventoryonhand", product.data.inventoryonhand);
      setValue("minimumurequired", product.data.minimumurequired);
      setValue("buyingPrice", product.data.buyingPrice);
      setValue("sellingPrice", product.data.sellingPrice);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("product not found.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data: categories } = await getCategories();
      setCategories(categories.data);
      populateProducts();
    }
    fetchData();
  }, []);

  const handleCategory = (e) => {
    setCategoryID(e.target.value);
  };

  const onSubmit = async (data) => {
    const productData = {
      productname: data.productname,
      productnumber: data.productnumber,
      startinginventory: data.startinginventory,
      inventoryshipped: data.inventoryshipped,
      inventoryonhand: data.inventoryonhand,
      minimumurequired: data.minimumurequired,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      categoryId: categoryID,
    };
    try {
      if (cID === "new") {
        const { data: response } = await createProduct(productData);
        if (response.data.status === 1) {
          window.location = "/products";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateProduct(cID, productData);
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
        <h1 className="h2">Product - {title}</h1>
      </div>
      <div>
        <Col sm={4}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                name="productname"
                type="text"
                placeholder="Enter Product name"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="productnumber"
                type="text"
                placeholder="Enter Product number"
                ref={register}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                name="startinginventory"
                type="number"
                placeholder="Enter Starting Inventory"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="inventoryshipped"
                type="number"
                placeholder="Enter Inventory Shipped"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="inventoryonhand"
                type="number"
                placeholder="Enter Inventory on Hand"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="minimumurequired"
                type="number"
                placeholder="Enter minimumum required"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="buyingPrice"
                type="number"
                placeholder="Enter Buying Price"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="sellingPrice"
                type="number"
                placeholder="Enter Selling Price"
                ref={register}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
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
            <Button variant="primary" type="submit">
              {title}
            </Button>
          </Form>
        </Col>
      </div>
    </main>
  );
}
