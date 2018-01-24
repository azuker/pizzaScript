const frameModule = require("ui/frame");
const httpModule = require("http");

exports.loaded = function (args) {
    httpModule.getJSON("http://freegeoip.net/json/")
        .then(function (response) {
            var ip = response.ip;
            const page = args.object;
            page.bindingContext = response;
            response.country_name === "" ? response.country_name = undefined : response.country_name = response.country_name;
            response.region_name === "" ? response.region_name = undefined : response.region_name = response.region_name;
            response.city === "" ? response.city = undefined : response.city = response.city;
        }, function (error) {
            console.log(error);
            page.bindingContext = {
                city: undefined,
                region_name: "your location.",
                country_name: undefined
            }
        });

    const page = args.object;
    const stackLayout = page.getViewById("thank-you-label-wrapper");
    stackLayout.opacity = 0;
    stackLayout.animate({
        opacity: 1,
        duration: 1000
    })
}