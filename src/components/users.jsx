import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getUsers } from "../services/userService";
import { getProfiles } from "../services/profileService";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { data: users } = await getUsers();
      const { data: profiles } = await getProfiles();

      const a3 = users.data.map((t1) => ({
        ...t1,
        ...profiles.data.find((t2) => t2.id === t1.profileid),
      }));

      console.log(users.data);
      console.log(profiles.data);
      console.log(a3);
      if (users) setUsers(users.data);
    }
    fetchData();
  }, []);

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
      </div>

      <button type="button" className="btn btn-primary">
        Add +
      </button>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Profile</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <th>{u.name}</th>
                <th>{u.username}</th>
                <th>{u.phone}</th>
                <th>{u.email}</th>
                <th>{u.status === true ? "Active" : "Disabled"}</th>
                <th>{u.profileid}</th>
                <th>{dateFormat(u.createdAt, "yyyy-mm-dd")}</th>
                <th>{dateFormat(u.updatedAt, "yyyy-mm-dd")}</th>
                <td>
                  <button className="btn btn-warning btn-xs mr-1">
                    <FaPencilAlt />
                  </button>
                  <button className="btn btn-danger btn-xs mr-1">
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
