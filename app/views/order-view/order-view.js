const frameModule = require("ui/frame");
const OrderViewModel = require("../../shared/view-models/order-view-model");

let vm;

exports.loaded = function (args) {
    let page = args.object;
    page.bindingContext = vm;
};

exports.navigatingTo = function (args) {
    const page = args.object;
    const context = page.navigationContext;
    vm = new OrderViewModel(context.username);
    vm.initializeItems();
}

exports.sizeTapped = function (args) {
    let chosenSize = args.view.bindingContext;
    console.log(chosenSize.name);
    vm.selectSize(chosenSize);
}
