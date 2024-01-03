import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object 
const router = express.Router();

// Actual routing for Registration on post method 

router.post('/register', registerController)

// test route 
router.get('/test', requireSignIn, isAdmin, testController)

// LOGIN || POST 
router.post('/login', loginController);

//forget password 
router.post('/forgotpassword', forgotPasswordController);


//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route 
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
// protected admin route 
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//get order
router.get("/orders", requireSignIn, getOrdersController);

//get all order
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);


//update order status
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);
export default router;