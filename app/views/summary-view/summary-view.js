const application = require('application');
const SummaryViewModel = require('../../shared/view-models/summary-view-model');

let vm = new SummaryViewModel();
animateLabel = function (label) {
    label.animate({
        opacity: 1,
        duration: 1000
    })
}

applyAnimations = function (page) {
    const stackLayout = page.getViewById("info-label-wrapper");
    const infoLabel = page.getViewById("info-label");
    if (stackLayout && infoLabel) {
        infoLabel.opacity = 0;
        if (application.android) {
            stackLayout.scaleX = 0
            stackLayout.animate({
                scale: { x: 1, y: 1 },
                duration: 1500
            }).then(() => animateLabel(infoLabel))
        }
        if (application.ios) {
            stackLayout.translateX = -400;
            stackLayout.animate({
                translate: { x: 0, y: 0 },
                duration: 1500
            }).then(() => animateLabel(infoLabel))
        }
    }

}
exports.loaded = function (args) {
    const page = args.object;
    vm.getLocation();
    page.bindingContext = vm;

    applyAnimations(page);
}