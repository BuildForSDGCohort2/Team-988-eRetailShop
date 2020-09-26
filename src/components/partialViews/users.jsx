import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { Row, Col, Table, Form, Button, Card, Spinner } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import usePagination from "../common/usePagination";
import { useForm } from "react-hook-form";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getProfiles } from "../../services/profileService";
import {
  getUsersProfiles,
  deleteUser,
  createUser,
  updateUser,
} from "../../services/userService";

export default function Users() {
  const [usersProfile, setUsersProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("Add");
  const [userID, setUserID] = useState(0);
  const [profileID, setprofileID] = useState("");
  const [profiles, setProfiles] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      const responseUserProfiles = await getUsersProfiles();
      const { data: profiles } = await getProfiles();
      if (responseUserProfiles && profiles) {
        setLoading(false);
        setUsersProfile(responseUserProfiles);
        setProfiles(profiles.data);
      }
    }
    fetchData();
  }, []);

  const countPage = Math.ceil(usersProfile.length / PER_PAGE);
  const _DATA = usePagination(usersProfile, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleProfile = (e) => {
    setprofileID(e.target.value);
  };

  const handleUpdate = (userId) => {
    setTitle("Edit");
    const user = usersProfile.filter((c) => c.id === Number(userId));
    setValue("names", user[0].name);
    setValue("username", user[0].username);
    setValue("email", user[0].email);
    setValue("phone", user[0].phone);
    setUserID(userId);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      const newUsers = usersProfile.filter((user) => user.id !== userId);
      toast.success("This user is now deleted.");
      setUsersProfile(newUsers);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted.");
    }
  };

  const onSubmit = async (data) => {
    setLoadingChange(true);
    const userData = {
      name: data.names,
      username: data.username,
      email: data.email,
      phone: data.phone,
      profileid: profileID,
      photo: data.photo,
    };
    try {
      if (title === "Add") {
        const { data: response } = await createUser(userData);
        if (response.data.status === 1) {
          toast.success(response.data.statusMessage);
          window.location = "/users";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateUser(userID, userData);
        if (response.data.status === 1) {
          toast.success(response.data.statusMessage);
          window.location = "/users";
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
        <h1 className="h2">Users</h1>
      </div>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Header>{title} User</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicNames">
                  <Form.Label>Names</Form.Label>
                  <Form.Control
                    name="names"
                    type="text"
                    placeholder="Enter names"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    type="text"
                    placeholder="Enter phone"
                    ref={register}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicProfile">
                  <Form.Label>Profile</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleProfile}
                    value={profileID}
                  >
                    <option value="0">Select</option>
                    {profiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.profilename}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {title}
                  {loadingChange && <Spinner animation="border" size="sm" />}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={8}>
          {loading && (
            <Loader type="ThreeDots" color="#0057e7" height="50" width="50" />
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Profile</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {_DATA.currentData().map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td>{u.profilename}</td>
                  <td>{u.status === true ? "Active" : "Disabled"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-xs mr-1"
                      onClick={() => handleUpdate(u.id)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="btn btn-danger btn-xs mr-1"
                      onClick={() => handleDelete(u.id)}
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
    </main>
  );
}
