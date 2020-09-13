import React from "react";

export default function Sales() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales</h1>
      </div>

      <button type="button" className="btn btn-primary">
        Add +
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Sales Number</th>
              <th>Tax</th>
              <th>Net Price</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Sales Type</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <th>Customer Name</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Sales Number</th>
              <th>Tax</th>
              <th>Net Price</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Sales Type</th>
              <th>Created</th>
              <th>Updated</th>
              <td>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <th>Customer Name</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Sales Number</th>
              <th>Tax</th>
              <th>Net Price</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Sales Type</th>
              <th>Created</th>
              <th>Updated</th>
              <td>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
