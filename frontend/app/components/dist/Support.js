"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var SupportBar = function (_a) {
    var deliver = _a.deliver, service = _a.service, support = _a.support;
    return (react_1["default"].createElement("div", { className: "support-bar  max-w-screen-sm md:max-w-full flex justify-evenly py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-5 w-full sm:w-[95%] md:w-[90%] mx-auto" },
        react_1["default"].createElement(SupportItem, { image: deliver, alt: "Fast Delivery", title: "FREE AND FAST DELIVERY", description: "Free Delivery All Over Kathmandu" }),
        react_1["default"].createElement(SupportItem, { image: service, alt: "Customer Service", title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support" }),
        react_1["default"].createElement(SupportItem, { image: support, alt: "Money Back Guarantee", title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" })));
};
var SupportItem = function (_a) {
    var image = _a.image, alt = _a.alt, title = _a.title, description = _a.description;
    return (react_1["default"].createElement("div", { className: "support-icon flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-0" },
        react_1["default"].createElement("div", { className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative" },
            react_1["default"].createElement(image_1["default"], { src: image, alt: alt, layout: "fill", objectFit: "contain" })),
        react_1["default"].createElement("div", { className: "flex flex-col gap-1 sm:gap-2 md:gap-3 items-center " },
            react_1["default"].createElement("p", { className: "support-text text-[8px] sm:text-sm md:text-xl lg:text-2xl font-semibold text-left sm:text-center" }, title),
            react_1["default"].createElement("p", { className: "support-text  text-[6px] sm:text-sm md:text-base text-left sm:text-center" }, description))));
};
exports["default"] = SupportBar;
