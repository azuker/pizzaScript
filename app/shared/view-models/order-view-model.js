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
        let toppings = menu.toppings;
        let extras = menu.extras;


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
    return viewModel;
}

module.exports = OrderViewModel;
