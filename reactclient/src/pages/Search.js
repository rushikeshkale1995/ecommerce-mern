import React from "react";
import Layout from "antd/es/layout/layout";
import { useSearch } from "../context/search";
import Layouts from "../components/Layout/Layouts";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layouts title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 25)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1">More Detail</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};
export default Search;
