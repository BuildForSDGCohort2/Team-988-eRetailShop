import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getOrders } from "../../services/orderService";
import { getSales } from "../../services/saleService";
import { getProducts } from "../../services/productService";
import { getClients } from "../../services/clientService";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: responseOrders } = await getOrders();
      const { data: responseSales } = await getSales();
      const { data: responseProducts } = await getProducts();
      const { data: responseClients } = await getClients();

      setLoading(false);
      setOrders(responseOrders.data);
      setSales(responseSales.data);
      setProducts(responseProducts.data);
      setClients(responseClients.data);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="header bg-primary pb-6">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h2 text-white d-inline-block mb-0">Dashboard</h6>
                {loading && (
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Orders
                        </h5>
                        <span className="h2 font-weight-bold mb-0">
                          {orders.length}
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Clients
                        </h5>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {clients.length}
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Sales
                        </h5>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {sales.length}
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Products
                        </h5>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {products.length}
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
