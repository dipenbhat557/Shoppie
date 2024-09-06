"use strict";
exports.__esModule = true;
exports.Support = void 0;
var react_1 = require("react");
var service_png_1 = require("../../public/images/service.png");
var delivery_png_1 = require("../../public/images/delivery.png");
var support_png_1 = require("../../public/images/support.png");
var image_1 = require("next/image");
exports.Support = function () {
    return (react_1["default"].createElement("div", { className: "support-bar flex justify-evenly sm:py-10 md:py-16  px-5 w-[90] mx-auto" },
        react_1["default"].createElement("div", { className: "support-icon flex flex-col gap-8 items-center" },
            react_1["default"].createElement(image_1["default"], { src: delivery_png_1["default"], alt: "Fast Delivery" }),
            react_1["default"].createElement("div", { className: "flex flex-col gap-3 items-center" },
                react_1["default"].createElement("p", { className: "support-text  text-2xl font-semibold " }, "FREE AND FAST DELIVERY"),
                react_1["default"].createElement("p", { className: "support-text" }, "Free Delivery All Over Kathmandu"))),
        react_1["default"].createElement("div", { className: "support-icon flex flex-col gap-8 items-center " },
            react_1["default"].createElement(image_1["default"], { src: service_png_1["default"], alt: "Cheap Prices" }),
            react_1["default"].createElement("div", { className: "flex flex-col gap-3 items-center" },
                react_1["default"].createElement("p", { className: "support-text text-2xl font-semibold" }, "24/7 CUSTOMER SERVICE"),
                react_1["default"].createElement("p", { className: "support-text" }, "Friendly 24/7 customer support"))),
        react_1["default"].createElement("div", { className: "support-icon flex flex-col gap-8 items-center " },
            react_1["default"].createElement(image_1["default"], { src: support_png_1["default"], alt: "Easy Returns" }),
            react_1["default"].createElement("div", { className: "flex flex-col gap-3 items-center" },
                react_1["default"].createElement("p", { className: "support-text text-2xl font-semibold" }, "MONEY BACK GUARANTEE"),
                react_1["default"].createElement("p", { className: "support-text" }, "We reurn money within 30 days")))));
};
