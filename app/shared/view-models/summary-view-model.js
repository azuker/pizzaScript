const observableModule = require("data/observable");
const httpModule = require("http");

function SummaryViewModel() {

    let viewModel = new observableModule.Observable();

    viewModel.getLocation = function () {
        httpModule.getJSON("http://freegeoip.net/json/")
            .then(function (response) {
                var ip = response.ip;
                country = response.country_name === "" ? undefined : response.country_name;
                region = response.region_name === "" ? undefined : response.region_name;
                city = response.city === "" ? undefined : response.city;
                viewModel.set("country", country);
                viewModel.set("region", region);
                viewModel.set("city", city);
            }, function (error) {
                console.log(error);
                viewModel.set("country", undefined);
                viewModel.set("region", "your location");
                viewModel.set("city", undefined);
            });
    }

    return viewModel;
}

module.exports = SummaryViewModel;
