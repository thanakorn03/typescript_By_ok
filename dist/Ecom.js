"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return "Name: " + this.name + "\nAddress: " + this.address;
    }
}
class Order {
    constructor(customer, date, status) {
        this.orderDetails = [];
        this.payment = new Cash(0, 0);
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    calcSubtotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.calcSubtotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    addOrderDetails(orderDetails) {
        this.orderDetails.push(orderDetails);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
    printOrderDetails() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === "not included") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printDetail() {
        console.log(this.item.getName() + "\t", this.quantity + "(ชิ้น)\t" + this.calcSubTotal() + "฿");
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    inStock() {
        return true;
    }
    getName() {
        return this.description;
    }
    getInfo() {
        return "Name:" + this.description + ", Price:" + this.price + "฿, Weigth:" + this.shippingWeight + " kg.";
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
class Check extends Payment {
    constructor(name, bankID, amount) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
    }
}
class Credit extends Payment {
    constructor(number, type, amount, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getCashTendered() {
        return this.cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
}
//create object
const customer1 = new Customer("Luck", "85 malaiman road, NP");
console.log(customer1.getInfo());
//Items
const item1 = new Item(1.5, "water", 15);
console.log(item1.getInfo());
const item2 = new Item(0.05, "lays", 35);
console.log(item2.getInfo());
const item3 = new Item(0.8, "noodel", 10);
console.log(item3.getInfo());
//order
const order1 = new Order(customer1, "16/12/2567", "in progress");
//orderdetail
const orderdetail1 = new OrderDetail(item1, 1, "not included");
const orderdetail2 = new OrderDetail(item2, 2, "not included");
const orderdetail3 = new OrderDetail(item3, 2, "not included");
//orderdetail => order
order1.addOrderDetails(orderdetail1);
order1.addOrderDetails(orderdetail2);
order1.addOrderDetails(orderdetail3);
//payment
const amount = order1.calcTotal();
const cash = new Cash(amount, 1000);
order1.printOrderDetails();
order1.payOrder(cash);
console.log("Vat: " + (order1.calcSubtotal)() + "฿");
console.log("Total: " + order1.getPayment().getCashTendered());
console.log("Recieve: " + order1.getPayment().getCashTendered());
console.log("Change:" + order1.getPayment().getChange() + "฿");
