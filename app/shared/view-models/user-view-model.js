var observableModule = require("data/observable");

function UserViewModel() {

    var viewModel = new observableModule.Observable();

    viewModel.login = function () {
        return new Promise(resolve =>
            setTimeout(resolve, 2000));
    };

    return viewModel;
}

module.exports = UserViewModel;
