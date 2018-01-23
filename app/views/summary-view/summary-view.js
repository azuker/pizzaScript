const frameModule = require("ui/frame");
const httpModule = require("http");

exports.loaded = function (args) {
    httpModule.getJSON("http://freegeoip.net/json/")
        .then(function (response) {
            var ip = response.ip;
            const page = args.object;
            page.bindingContext = response;
        }, function (error) {
            console.log(error);
            page.bindingContext = {
                city: "",
                region_name: "your home.",
                country_name: ""
            }
        });
}