const express = require('express');

const app =express();

const productRoutes = require('./api/products');

const orderRoutes = require('./api/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);



module.exports = app;