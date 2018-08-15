// Price Calculator Module

const GST = 0.05;
const PST = 0.07;

const pricePerTopping = 3;

module.exports = class PriceCalculator {
    constructor(size, toppings) {
        if(size == "small") {
            this.size = 8;
        }

        if(size == "medium") {
            this.size = 10;
        }
        
        if(size == "large") {
            this.size = 12;
        }

        this.numOfToppings = Number(toppings.length);

        this.subtotal = this.size + (this.numOfToppings * pricePerTopping);
        this.tax = this.subtotal * (GST + PST);
        this.total = parseFloat((this.subtotal + this.tax).toFixed(2));
    }
}