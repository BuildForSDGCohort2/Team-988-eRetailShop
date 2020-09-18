import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";
import {
  getClient,
  createClient,
  updateClient,
} from "../../services/clientService";

export default function ClientForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Update");

  const cID = props.match.params.id;

  const populateClients = async () => {
    try {
      if (cID === "new") {
        setTitle("Add");
        return;
      }
      const { data: client } = await getClient(cID);
      setValue("clientname", client.data.name);
      setValue("address", client.data.address);
      setValue("phone", client.data.phone);
      setValue("email", client.data.email);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Client not found.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      populateClients();
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const clientData = {
      name: data.clientname,
      address: data.address,
      phone: data.phone,
      email: data.email,
    };
    try {
      if (cID === "new") {
        const { data: response } = await createClient(clientData);
        if (response.data.status === 1) {
          window.location = "/clients";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateClient(cID, clientData);
        if (response.data.status === 1) {
          window.location = "/clients";
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
                name="clientname"
                type="text"
                placeholder="Enter Category name"
                ref={register}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter Address"
                ref={register}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="Enter Phoone number"
                ref={register}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
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
