var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Customer = /** @class */ (function () {
    function Customer(name, address) {
        this.name = name;
        this.address = address;
    }
    Customer.prototype.getInfo = function () {
        return "Name: " + this.name + "\nAddress: " + this.address;
    };
    return Customer;
}());
var Order = /** @class */ (function () {
    function Order(customer, date, status) {
        this.orderDetails = [];
        this.payment = new Cash(0, 0);
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    Order.prototype.calcSubtotal = function () {
        var subtotal = 0;
        for (var i = 0; i < this.orderDetails.length; i++) {
            subtotal = subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    };
    Order.prototype.calcTax = function () {
        var vat = 0;
        for (var i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    };
    Order.prototype.calcTotal = function () {
        return this.calcSubtotal() + this.calcTax();
    };
    Order.prototype.calcTotalWeight = function () {
        var weight = 0;
        for (var i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    };
    Order.prototype.addOrderDetails = function (orderDetails) {
        this.orderDetails.push(orderDetails);
    };
    Order.prototype.payOrder = function (payment) {
        this.payment = payment;
    };
    Order.prototype.getPayment = function () {
        return this.payment;
    };
    Order.prototype.printOrderDetails = function () {
        for (var i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    };
    return Order;
}());
var OrderDetail = /** @class */ (function () {
    function OrderDetail(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    OrderDetail.prototype.calcSubTotal = function () {
        return this.quantity * this.item.getPriceForQuantity();
    };
    OrderDetail.prototype.calcWeight = function () {
        return this.quantity * this.item.getShippingWeight();
    };
    OrderDetail.prototype.calcTax = function () {
        if (this.taxStatus === "not included") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    };
    OrderDetail.prototype.printDetail = function () {
        console.log(this.item.getName() + "\t", this.quantity + "(ชิ้น)\t" + this.calcSubTotal() + "฿");
    };
    return OrderDetail;
}());
var Item = /** @class */ (function () {
    function Item(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }
    Item.prototype.getPriceForQuantity = function () {
        return this.price;
    };
    Item.prototype.getTax = function () {
        return this.price * 0.07;
    };
    Item.prototype.getShippingWeight = function () {
        return this.shippingWeight;
    };
    Item.prototype.inStock = function () {
        return true;
    };
    Item.prototype.getName = function () {
        return this.description;
    };
    Item.prototype.getInfo = function () {
        return "Name:" + this.description + ", Price:" + this.price + "฿, Weigth:" + this.shippingWeight + " kg.";
    };
    return Item;
}());
var Payment = /** @class */ (function () {
    function Payment(amount) {
        this.amount = amount;
    }
    Payment.prototype.getAmount = function () {
        return this.amount;
    };
    return Payment;
}());
var Check = /** @class */ (function (_super) {
    __extends(Check, _super);
    function Check(name, bankID, amount) {
        var _this = _super.call(this, amount) || this;
        _this.name = name;
        _this.bankID = bankID;
        return _this;
    }
    Check.prototype.authorized = function () {
    };
    return Check;
}(Payment));
var Credit = /** @class */ (function (_super) {
    __extends(Credit, _super);
    function Credit(number, type, amount, expDate) {
        var _this = _super.call(this, amount) || this;
        _this.number = number;
        _this.type = type;
        _this.expDate = expDate;
        return _this;
    }
    Credit.prototype.authorized = function () {
    };
    return Credit;
}(Payment));
var Cash = /** @class */ (function (_super) {
    __extends(Cash, _super);
    function Cash(amount, cashTendered) {
        var _this = _super.call(this, amount) || this;
        _this.cashTendered = cashTendered;
        return _this;
    }
    Cash.prototype.getCashTendered = function () {
        return this.cashTendered;
    };
    Cash.prototype.getChange = function () {
        return this.cashTendered - this.getAmount();
    };
    return Cash;
}(Payment));
//create object
var customer1 = new Customer("Luck", "85 malaiman road, NP");
console.log(customer1.getInfo());
//Items
var item1 = new Item(1.5, "water", 15);
console.log(item1.getInfo());
var item2 = new Item(0.05, "lays", 35);
console.log(item2.getInfo());
var item3 = new Item(0.8, "noodel", 10);
console.log(item3.getInfo());
//order
var order1 = new Order(customer1, "16/12/2567", "in progress");
//orderdetail
var orderdetail1 = new OrderDetail(item1, 1, "not included");
var orderdetail2 = new OrderDetail(item2, 2, "not included");
var orderdetail3 = new OrderDetail(item3, 2, "not included");
//orderdetail => order
order1.addOrderDetails(orderdetail1);
order1.addOrderDetails(orderdetail2);
order1.addOrderDetails(orderdetail3);
//payment
var amount = order1.calcTotal();
var cash = new Cash(amount, 1000);
order1.printOrderDetails();
order1.payOrder(cash);
console.log("Vat: " + (order1.calcSubtotal)() + "฿");
console.log("Total: " + order1.getPayment().getCashTendered());
console.log("Recieve: " + order1.getPayment().getCashTendered());
console.log("Change:" + order1.getPayment().getChange() + "฿");
