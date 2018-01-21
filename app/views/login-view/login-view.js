var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");

var vm = new UserViewModel();

exports.loaded = function (args) {
    var page = args.object;
    page.bindingContext = vm;
};

exports.signIn = function (args) {
    console.log('sign in pressed');
    vm.set("isAuthenticating", true);
    vm.login()
        .then(function () {
            vm.set("isAuthenticating", false);
            // frameModule.topmost().navigate("views/list/list");
        });
};

exports.onButtonTapped = function (args) {
    console.log('button tapped');
}
