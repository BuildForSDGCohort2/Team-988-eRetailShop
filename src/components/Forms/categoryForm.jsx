import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";
import {
  getCategory,
  createCategory,
  updateCategory,
} from "../../services/categoryService";

export default function UserForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Update");

  const cID = props.match.params.id;

  const populateCategories = async () => {
    try {
      if (cID === "new") {
        setTitle("Add");
        return;
      }
      const { data: category } = await getCategory(cID);
      setValue("categoryname", category.data.name);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Category not found.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      populateCategories();
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const categoryData = {
      name: data.categoryname,
    };
    try {
      if (cID === "new") {
        const { data: response } = await createCategory(categoryData);
        if (response.data.status === 1) {
          window.location = "/category";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateCategory(cID, categoryData);
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
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Category - {title}</h1>
      </div>
      <div>
        <Col sm={4}>
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
              {title}
            </Button>
          </Form>
        </Col>
      </div>
    </main>
  );
}
