import express from 'express'
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js"
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateteCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//  Routes 

//create category
router.post("/category", requireSignIn, isAdmin, createCategoryController)

// update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateteCategoryController)

//get category 
router.get("/get-category", categoryController)

//get single category

router.get("/single-category/:slug", singleCategoryController)

//delete category 

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)



export default router