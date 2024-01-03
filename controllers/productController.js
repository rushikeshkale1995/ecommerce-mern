import slugify from "slugify";
import productModule from "../models/productModule.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from 'fs'
import braintree from "braintree";
import dotenv from 'dotenv'

dotenv.config();
//payment gateway 
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        // validation 
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and less than 1 mb' })
        }
        // crete product controller
        const products = new productModule({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in creating product'
        })
    }
}

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModule
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalcount: products.length,
            message: "All Products",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in geting products",
            error: error.message
        })
    }
}

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModule
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category")
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while geting single product",
            error
        })
    }
}
// photo/img  controller

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModule
            .findById(req.params.pid)
            .select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while geting photo",
            error
        })
    }
}

// product delete controller

export const deleteProductController = async (req, res) => {
    try {
        await productModule
            .findByIdAndDelete(req.params.pid)
            .select("-photo")
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while geting photo",
            error
        })
    }
}

//update product controller

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields
        const { photo } = req.files
        // validation 
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and less than 1 mb' })
        }
        // update product controller
        const products = await productModule.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in update product'
        })
    }
}


// filter product 
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModule.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering product",
            error,
        })
    }
}

// product count controller

export const productCountController = async (req, res) => {
    try {
        const total = await productModule.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "error in product count",
            error,
            success: false
        });
    }
};

// product list based on pge or Pagination

export const productListController = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModule
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "error in per page ctrl",
            error,
            success: false
        });
    }
};


// search product controller 
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModule
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "error in search product API",
            error,
            success: false
        });
    }
};

//similer product 
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModule
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("_photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'error while geting related product',
            error
        })
    }
}

//get product by category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModule.find({ category }).populate("category")
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: 'Error while Getting products'
        })
    }
}

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error);
    }
};

//payment
export const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)

                }
            }

        )
    } catch (error) {
        console.log(error);
    }
};