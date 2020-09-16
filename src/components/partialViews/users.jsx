import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { getUsersProfiles, deleteUser } from "../../services/userService";

export default function Users() {
  const [usersProfile, setUsersProfile] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUsersProfiles();
      if (response) setUsersProfile(response);
    }
    fetchData();
  }, []);

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

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
      </div>

      <Link className="btn btn-primary" to={"/userform/new"}>
        Add +
      </Link>
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
            {usersProfile.map((u) => (
              <tr key={u.id}>
                <th>{u.name}</th>
                <th>{u.username}</th>
                <th>{u.phone}</th>
                <th>{u.email}</th>
                <th>{u.status === true ? "Active" : "Disabled"}</th>
                <th>{u.profilename}</th>
                <th>{dateFormat(u.createdAt, "yyyy-mm-dd")}</th>
                <th>{dateFormat(u.updatedAt, "yyyy-mm-dd")}</th>
                <td>
                  <Link
                    className="btn btn-warning btn-xs mr-1"
                    to={"/userform/" + u.id}
                  >
                    <FaPencilAlt />
                  </Link>
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
      </div>
    </main>
  );
}
