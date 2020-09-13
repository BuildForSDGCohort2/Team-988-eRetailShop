import React from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

export default function Purchases() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Purchases</h1>
      </div>

      <button type="button" className="btn btn-primary">
        Add +
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Product Name</th>
              <th>Number Received</th>
              <th>Purchase Date</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <th>Supplier Name</th>
              <th>Product Name</th>
              <th>Number Received</th>
              <th>Purchase Date</th>
              <th>Created</th>
              <th>Updated</th>
              <td>
                <button class="btn btn-warning btn-xs mr-1">
                  <FaPencilAlt />
                </button>
                <button class="btn btn-danger btn-xs mr-1">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <th>Supplier Name</th>
              <th>Product Name</th>
              <th>Number Received</th>
              <th>Purchase Date</th>
              <th>Created</th>
              <th>Updated</th>
              <td>
                <button class="btn btn-warning btn-xs mr-1">
                  <FaPencilAlt />
                </button>
                <button class="btn btn-danger btn-xs mr-1">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
