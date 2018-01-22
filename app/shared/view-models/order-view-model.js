var observableModule = require("data/observable");
var menu = require("../../shared/menu.json");

function OrderViewModel(username) {

    var viewModel = new observableModule.fromObject({
        username: username? username : 'Pizza Lover',
        orderTotal: 0
    });

    viewModel.initializeItems = function () {
        let sizes = menu.sizes;
        let toppings = menu.toppings;
        let extras = menu.extras;
        viewModel.set("sizes", sizes);
        viewModel.set("toppings", toppings);
        viewModel.set("extras", extras);
    };
    return viewModel;
}

module.exports = OrderViewModel;
