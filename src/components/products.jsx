import React from "react";

export default function Products() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Products</h1>
      </div>

      <button type="button" className="btn btn-primary">
        Add +
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Image</th>
              <th>Starting Inventory</th>
              <th>Inventory Shipped</th>
              <th>Inventory on Hand</th>
              <th>Min Required</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Category</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Image</th>
              <th>Starting Inventory</th>
              <th>Inventory Shipped</th>
              <th>Inventory on Hand</th>
              <th>Min Required</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Category</th>
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
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Image</th>
              <th>Starting Inventory</th>
              <th>Inventory Shipped</th>
              <th>Inventory on Hand</th>
              <th>Min Required</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Category</th>
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
