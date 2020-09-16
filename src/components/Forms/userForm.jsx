import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";
import { getProfiles } from "../../services/profileService";
import { createUser, getUser, updateUser } from "../../services/userService";

export default function UserForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [profileID, setprofileID] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [title, setTitle] = useState("Update");

  const uID = props.match.params.id;

  const populateUsers = async () => {
    try {
      if (uID === "new") {
        setTitle("Add");
        return;
      }
      const { data: user } = await getUser(uID);
      setValue("names", user.data.name);
      setValue("username", user.data.username);
      setValue("email", user.data.email);
      setValue("phone", user.data.phone);
      setValue("photo", user.data.photo);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("User not found.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data: profiles } = await getProfiles();
      setProfiles(profiles.data);
      populateUsers();
    }
    fetchData();
  }, []);

  const handleProfile = (e) => {
    setprofileID(e.target.value);
  };

  const onSubmit = async (data) => {
    const userData = {
      name: data.names,
      username: data.username,
      email: data.email,
      phone: data.phone,
      profileid: profileID,
      photo: data.photo,
    };
    try {
      if (uID === "new") {
        const { data: response } = await createUser(userData);
        if (response.data.status === 1) {
          toast.success(response.data.statusMessage);
          window.location = "/users";
        } else {
          toast.error(response.data.statusMessage);
        }
      } else {
        const { data: response } = await updateUser(uID, userData);
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
        <h1 className="h2">Users - {title}</h1>
      </div>
      <div>
        <Col sm={4}>
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

            <Form.Group controlId="formBasicPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                name="photo"
                type="text"
                placeholder="Enter photo"
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
