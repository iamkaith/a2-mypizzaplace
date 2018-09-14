const express = require('express');
let Order = require('../model/Order');
const Calculator = require('../util/PriceCalculator');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

let router = express.Router();

// order page index
router.get('/', function(req, res){
    let vm = {title : "Place Your Order"};
    res.render('index', vm);
});

// order list
router.get('/orders', function(req, res){
    var vm = {title : "Orders List"};
    res.render('orders', vm);
});

//REST Endpoints
router.post('/api/order', [
    check("size").isAlpha(),
    check("crust").isAlpha(),
    check("topping").exists(),
    check("name").exists().trim(),
    check("address").exists().trim(),
    check("city").isAlpha().trim(),
    check("postal").isPostalCode("CA").trim(),
    check("phone", "Phone number invalid").isMobilePhone('any').trim(), 
    check("email").isEmail().trim()
    ], function(req, res, next) {
    
    const error = req.validationErrors(req);
    
    // error!
    if(error) {
        res.status(400).json({error : "Form validation error: something went wrong" });
    }    

    // no errors! continue
    if(!error) {
        let tempOrder = matchedData(req);
        tempOrder.number = new Date().getTime(); 
        
        let calculator = new Calculator(tempOrder.size, tempOrder.topping);
        tempOrder.amount = calculator.total;

        let newOrder = new Order(tempOrder);

        newOrder.save(function(error) {
            if(error) {
                res.status(500).json({error: "Error submitting pizza order into our system. :( "});
                return;
            }

            res.json({status : "Successfully added a order"});
        })
    }    
});

// order list
router.get('/api/orders', function(req, res){
    Order.find({}, function(err, allOrders) {
        res.json(allOrders);
    });  
});


// search for an order
router.get('/api/orders', function(req, res){
    // todo
});

module.exports = router;