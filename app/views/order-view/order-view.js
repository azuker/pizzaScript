const frameModule = require("ui/frame");
const OrderViewModel = require("../../shared/view-models/order-view-model");
const dialogsModule = require("ui/dialogs");

let vm;

exports.loaded = function (args) {
    const page = args.object;
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
    vm.selectSize(chosenSize);
}
exports.toppingTapped = function (args) {
    let tappedTopping = args.view.bindingContext;
    vm.toggleTopping(tappedTopping);
}
exports.addExtra = function (args) {
    let addedExtra = args.object.bindingContext;
    vm.updateExtra(addedExtra, 1);
}
exports.substractExtra = function (args) {
    let substractedExtra = args.object.bindingContext;
    vm.updateExtra(substractedExtra, -1);
}

exports.placeOrder = function () {
    dialogsModule.confirm({
        message: "Are you sure you want to place this order? an amount of " + vm.orderTotal + "$ will be substracted from your credit.",
        okButtonText: "Yes! I'm hungry!",
        cancelButtonText: "Cancel",
    }).then(function (result) {
        if (result) {
            let topmost = frameModule.topmost();
            topmost.navigate({
                moduleName: "views/summary-view/summary-view",
                clearHistory: true,
                transition: {
                    name: "slide",
                    duration: 350,
                    curve: "easeIn"
                }
            });
        }
    });
}
