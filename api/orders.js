const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Order = require('./ord');

// Handle incoming GET requests to /orders
router.get('/', (req,res,next) => {
   Order.find()
   .select('product quantity _id')
   .exec()
   .then(docs => {
       res.status(200).json({
           count:docs.length,
           order:docs.map(doc => {
               return {
                   _id:doc._id,
                   product:doc.product,
                   quantity:doc.quantity,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:300/orders/' + doc._id
                   }
               }
           })
           
       });
   })
   .catch(err => {
       res.status(500).json({
           error:err
       });
   });
});
router.post('/', (req,res,next) => {
    const order = new Order ({
        _id:mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        product:req.body.productId
    });
    order
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Order stored',
            createdOrder: {
                _id:result._id,
                product:result.product,
                quantity:result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:300/orders/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/:orderID', (req,res,next) => {
    res.status(200).json({
        message: 'Order details',
        orderID: req.params.orderID
    });
});

router.delete('/:orderID', (req,res,next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderID: req.params.orderID
    });
});


module.exports = router;

