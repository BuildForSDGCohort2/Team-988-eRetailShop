import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";
import {
  getSupplier,
  createSupplier,
  updateSupplier,
} from "../../services/supplierService";

export default function SupplierForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Update");

  const cID = props.match.params.id;

  const populateSuppliers = async () => {
    try {
      if (cID === "new") {
        setTitle("Add");
        return;
      }
      const { data: supplier } = await getSupplier(cID);
      setValue("suppliername", supplier.data.suppliername);
      setValue("address", supplier.data.address);
      setValue("phone", supplier.data.phone);
      setValue("email", supplier.data.email);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Supplier not found.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      populateSuppliers();
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const supplierData = {
      suppliername: data.suppliername,
      address: data.address,
      phone: data.phone,
      email: data.email,
    };
    try {
      if (cID === "new") {
        const { data: response } = await createSupplier(supplierData);
        if (response.data.status === 1) {
          window.location = "/suppliers";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateSupplier(cID, supplierData);
        if (response.data.status === 1) {
          window.location = "/suppliers";
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
        <h1 className="h2">Supplier - {title}</h1>
      </div>
      <div>
        <Col sm={4}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                name="suppliername"
                type="text"
                placeholder="Enter supplier name"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter Address"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="Enter Phone"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter Email"
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
