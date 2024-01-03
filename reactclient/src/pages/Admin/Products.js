import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layout/Layouts'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //GET PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        }
    }

    //use effect lifecycle 
    useEffect(() => {
        // eslint-disable-next-line
        getAllProducts();

    }, [])
    return (
        <Layouts>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center"> All products list </h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link key={p.id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>

                </div>

            </div>
        </Layouts>
    )
}

export default Products