const observableModule = require("data/observable");

function UserViewModel() {

    let viewModel = new observableModule.Observable();

    viewModel.login = function () {
        return new Promise(resolve =>
            setTimeout(resolve, 200));
    };

    return viewModel;
}

module.exports = UserViewModel;
