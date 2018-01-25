const frameModule = require("ui/frame");
const gestures = require("ui/gestures");
const UserViewModel = require("../../shared/view-models/user-view-model");

let vm = new UserViewModel();
let textInput1;
let textInput2;

exports.loaded = function (args) {
    let page = args.object;
    page.bindingContext = vm;
    textInput1 = page.getViewById("textInput1");
    textInput2 = page.getViewById("textInput2");
    page.observe(gestures.GestureTypes.tap, function (args) {
        textInput1.dismissSoftInput();
        textInput2.dismissSoftInput();
    })
};

exports.signIn = function (args) {
    vm.set("isAuthenticating", true);
    vm.login()
        .then(function () {
            vm.set("isAuthenticating", false);
            let username = vm.username;
            let topmost = frameModule.topmost();
            topmost.navigate({
                moduleName: "views/order-view/order-view",
                context: { username: username },
                backstackVisible: false,
                transition: {
                    name: "slide",
                    duration: 350,
                    curve: "easeIn"
                }
            });
        });
};
