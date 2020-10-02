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
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../services/clientService";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Add");
  const [clientID, setClientID] = useState(0);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await getClients();
      if (response) {
        setLoading(false);
        setClients(response.data);
      }
    }
    fetchData();
  }, []);

  const countPage = Math.ceil(clients.length / PER_PAGE);
  const _DATA = usePagination(clients, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleDelete = async (clientId) => {
    try {
      await deleteClient(clientId);
      const newclients = clients.filter((client) => client.id !== clientId);
      toast.success("This client is now deleted.");
      setClients(newclients);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This client has already been deleted.");
    }
  };

  const handleUpdate = (clientId) => {
    setTitle("Edit");
    const client = clients.filter((c) => c.id === Number(clientId));
    setValue("clientname", client[0].name);
    setValue("address", client[0].address);
    setValue("phone", client[0].phone);
    setValue("email", client[0].email);
    setClientID(clientId);
  };

  const onSubmit = async (data) => {
    setLoadingChange(true);
    const clientData = {
      name: data.clientname,
      address: data.address,
      phone: data.phone,
      email: data.email,
    };
    try {
      if (title === "Add") {
        const { data: response } = await createClient(clientData);
        if (response.data.status === 1) {
          window.location = "/clients";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateClient(clientID, clientData);
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
    <div className="header  pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h2  d-inline-block mb-0">Clients</h6>
            </div>
          </div>

          <Row>
            <Col sm={4}>
              <Card>
                <Card.Header>{title} Client</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Names</Form.Label>
                      <Form.Control
                        name="clientname"
                        type="text"
                        placeholder="Enter names"
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
                        placeholder="Enter Phone number"
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
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {_DATA.currentData().map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.address}</td>
                      <td>{c.phone}</td>
                      <td>{c.email}</td>
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
