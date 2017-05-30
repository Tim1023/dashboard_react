const express = require('express');
const passport = require('passport');
const passportConfig = require('../config/passport');
const requestRouter = express.Router();
const authController = require('../controllers/auth');
const merchantController = require('../controllers/merchant');
const categoryController = require('../controllers/category');
const userController = require('../controllers/user');
const productController = require('../controllers/product');
const subOrdersController = require('../controllers/subOrder');
const roomsController = require('../controllers/room');


requestRouter.get('/merchants', passportConfig.isAuthenticated, merchantController.get);
requestRouter.get('/categories', passportConfig.isAuthenticated, categoryController.get);
requestRouter.get('/users', passportConfig.isAuthenticated, userController.get);
requestRouter.get('/products', passportConfig.isAuthenticated, productController.get);
requestRouter.get('/subOrders', passportConfig.isAuthenticated, subOrdersController.get);
requestRouter.put('/subOrders/*', passportConfig.isAuthenticated, subOrdersController.put);

requestRouter.get('/room/:merchantId', passportConfig.isAuthenticated, roomsController.get);

requestRouter.get('/login', passport.authenticate('oauth2'));
requestRouter.get('/callback',
    passport.authenticate('oauth2', { failWithError: true }),authController.callback);

module.exports = requestRouter;
