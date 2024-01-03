import Layout from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layouts from "../components/Layout/Layouts";
import "../styles/ProductDetailsStyles.css";


const ProductDetails = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initial detail
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"300px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product details</h1>
          <hr />
          <h6>Name-{product.name}</h6>
          <h6>Description-{product.description}</h6>
          <h6>Price-{product.price}</h6>
          <h6>Category-{product?.category?.name}</h6>
          <button className="btn btn-secondary">Add To Cart</button>

        </div>
      </div>
      <hr />
      <div className="row container similer-products">
        <h6>Similer product</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similer Product Found.</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => {

            return (
              <div className="card m-2" key={p._id} >
                <img
                  className="card-img-top"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Detail
                  </button>
                </div>
                {/* <pre>{JSON.stringify(relatedProducts, null, 4)}</pre> */}
              </div>
            );
          })}
        </div>
      </div>
    </Layouts>
  );
};

export default ProductDetails;
