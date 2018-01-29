const observableModule = require("data/observable");
const menu = require("../../shared/menu.json");
var ObservableArray = require("data/observable-array").ObservableArray;

function OrderViewModel(username) {

    let viewModel = new observableModule.fromObject({
        username: username ? username : 'Pizza Lover',
        orderTotal: 0
    });

    viewModel.initializeItems = function () {
        let sizes = new ObservableArray(menu.sizes);
        let toppings = new ObservableArray(menu.toppings);
        let extras = [];
        for (let i = 0; i < menu.extras.length; i++) {
            let extra = new observableModule.fromObject({
                name: menu.extras[i].name,
                price: menu.extras[i].price,
                quantity: 0
            })
            extras.push(extra);
        }

        viewModel.set("sizes", sizes);
        viewModel.set("toppings", toppings);
        viewModel.set("extras", extras);
    };

    viewModel.selectSize = function (chosenSize) {
        let orderTotal = viewModel.orderTotal;
        let sizes = viewModel.get("sizes");
        for (let i = 0; i < sizes.length; i++) {
            let currentSize = sizes.getItem(i);
            if (currentSize.isSelected) {
                orderTotal = orderTotal - currentSize.price;
            }
            currentSize.isSelected = currentSize === chosenSize ? true : false;
            sizes.setItem(i, currentSize);
        }
        orderTotal = orderTotal + chosenSize.price;
        viewModel.orderTotal = orderTotal;
    }

    viewModel.toggleTopping = function (tappedTopping) {
        let orderTotal = viewModel.orderTotal;
        let toppings = viewModel.get("toppings");
        for (let i = 0; i < toppings.length; i++) {
            let currentTopping = toppings.getItem(i);
            if (currentTopping === tappedTopping) {
                currentTopping.isSelected = !currentTopping.isSelected;
                orderTotal = currentTopping.isSelected ? orderTotal + currentTopping.price : orderTotal - currentTopping.price;
                viewModel.orderTotal = orderTotal;
                toppings.setItem(i, currentTopping);
                return;
            }
        }
    }

    viewModel.updateExtra = function (updatedExtra, amount) {
        let orderTotal = viewModel.orderTotal;
        let extras = viewModel.get("extras");
        let currentExtra = extras.find(ex => ex === updatedExtra);
        currentExtra.quantity = currentExtra.quantity + amount;
        if (currentExtra.quantity < 0) {
            currentExtra.quantity = 0;
            return
        }
        orderTotal = orderTotal + currentExtra.price * amount;
        viewModel.orderTotal = orderTotal;
    }

    viewModel.sendOrder = function () {
        let order = { toppings: [], extras: [] };

        let sizes = viewModel.get("sizes");
        for (let i = 0; i < sizes.length; i++) {
            let currentSize = sizes.getItem(i);
            if (currentSize.isSelected === true) {
                order.size = currentSize.name;
                break;
            }
        }
        let toppings = viewModel.get("toppings");
        order.toppings = [];
        for (let i = 0; i < toppings.length; i++) {
            let currentTopping = toppings.getItem(i);
            if (currentTopping.isSelected === true) {
                order.toppings.push(currentTopping.name);
            }
        }
        let extras = viewModel.get("extras");
        for (let i = 0; i < extras.length; i++) {
            if (extras[i].quantity > 0) {
                let extra = {
                    quantity: extras[i].quantity,
                    name: extras[i].name,
                };
                order.extras.push(extra);
            }
        }
        order.total = viewModel.orderTotal;
        let orderJson = JSON.stringify(order);
        //send orderJson to backend
    }
    return viewModel;
}

module.exports = OrderViewModel;
