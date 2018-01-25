const frameModule = require("ui/frame");
const httpModule = require("http");
var application = require('application');

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
    const stackLayout = page.getViewById("info-label-wrapper");
    if (stackLayout) {
        if (application.android) {
            stackLayout.opacity = 0;
            stackLayout.scaleY = 0
            stackLayout.animate({
                opacity: 1,
                scale: {x: 1, y: 1},
                duration: 1500
            })
        }
        if (application.ios) {
            stackLayout.translateX = -400;
            stackLayout.animate({
                translate: { x: 0, y: 0 },
                duration: 1500
            })
        }
    }
}