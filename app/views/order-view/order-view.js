const frameModule = require("ui/frame");
const OrderViewModel = require("../../shared/view-models/order-view-model");
const dialogsModule = require("ui/dialogs");
const application = require('application');

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

confirmAndNavigate = function () {
    dialogsModule.confirm({
        message: "Are you sure you want to place this order? an amount of " + vm.orderTotal + "$ will be substracted from your credit.",
        okButtonText: "Yes! I'm hungry!",
        cancelButtonText: "Cancel",
    }).then(function (result) {
        if (result) {
            vm.sendOrder();
            let topmost = frameModule.topmost();
            topmost.navigate({
                moduleName: "views/summary-view/summary-view",
                transition: {
                    name: "slide",
                    duration: 350,
                    curve: "easeIn"
                }
            });
        }
    });
}

alertEmptyOrderNatively = function () {
    const alertTitle = "Your order is empty";
    const alertMessage = "You must add at least one item if you wish to place an order";
    const buttonText = "OK"
    if (application.ios) {
        dialogsModule.alert({
            message: alertMessage,
            title: alertTitle,
            okButtonText: buttonText,
        });
    }
    // the following block of code was not verified; 
    //also - UIAlertView is relevant up to ios 8, afterwards it's deprecated and UIAlertController should be used
    // const alertView = new UIAlertView();
    // alertView.title = alertTitle;
    // alertView.message = alertMessage;
    // alertView.addButtonWithTitle(buttonText);
    // alertView.show();

    if (application.android) {
        const alertDialog = new android.app.AlertDialog.Builder(application.android.currentContext);
        alertDialog.setTitle(alertTitle);
        alertDialog.setMessage(alertMessage);
        alertDialog.setPositiveButton(buttonText, new android.content.DialogInterface.OnClickListener({
            onClick: function (dialog) {
                dialog.cancel();
            }
        }));
        alertDialog.show();
    }
}

exports.placeOrder = function () {
    let orderTotal = vm.orderTotal;
    if (orderTotal > 0) {
        confirmAndNavigate();
    }
    else {
        alertEmptyOrderNatively();
    }
}
