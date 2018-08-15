const express = require('express');
let Order = require('../model/Order');
const Calculator = require('../util/PriceCalculator');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

let router = express.Router();
var orderNumber = 1;

// order page index
router.get('/', function(req, res){
    var vm = {title : "Place Your Order"};
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
    
    // error! user will refresh, add placeholders in html to aid user
    if(error) {
        res.status(400).json({error : "Form validation error: something went wrong" });
    }    

    // no errors! continue
    if(!error) {
        console.log("YAY: no validation errors");

        var tempOrder = matchedData(req);
        tempOrder.number = orderNumber;
        
        var calculator = new Calculator(tempOrder.size, tempOrder.topping);
        tempOrder.amount = calculator.total;

        var newOrder = new Order(tempOrder);

        console.log("Received add order request\n", newOrder);
        
        newOrder.save(function(error) {
            if(error) {
                console.log("Error saving order in db: " + error);
                return;
            }

            res.json({status : "Successfully added a order"});
        })
        orderNumber++;
    }    
});

// order list
router.get('/api/orders', function(req, res){
    
    // list
    Order.find({}, function(err, allOrders) {
        res.json(allOrders);
    });  
});


// search for an order
router.get('/api/orders', function(req, res){
    // todo
});

module.exports = router;