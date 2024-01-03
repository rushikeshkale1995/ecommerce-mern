import Layout from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layouts from "../components/Layout/Layouts";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layouts title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default Categories;
