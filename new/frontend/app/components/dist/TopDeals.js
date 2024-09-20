"use client";
"use strict";
exports.__esModule = true;
exports.TopDeals = exports.featuredProducts = void 0;
var react_1 = require("react");
var ProductCard_1 = require("./ProductCard");
var airpods_png_1 = require("../../public/images/topDeals/airpods.png");
var boat_png_1 = require("../../public/images/topDeals/boat.png");
var headphone_png_1 = require("../../public/images/topDeals/headphone.png");
var phone_png_1 = require("../../public/images/topDeals/phone.png");
var image_1 = require("next/image");
var customad_png_1 = require("../../public/images/customad.png");
var sl_1 = require("react-icons/sl");
var styles_1 = require("../utils/styles");
exports.featuredProducts = [
    {
        imageSrc: boat_png_1["default"],
        name: "Boats Airpods",
        price: 899,
        altText: "Boats Airpods"
    },
    {
        imageSrc: phone_png_1["default"],
        name: "Apple Mobiles",
        price: 899,
        altText: "Apple Mobiles"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: 899,
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: 899,
        altText: "Headset"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: 899,
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: 899,
        altText: "Headset"
    },
];
exports.TopDeals = function () {
    var scrollContainerRef = react_1.useRef(null);
    var _a = react_1.useState(false), showLeftButton = _a[0], setShowLeftButton = _a[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (scrollContainerRef.current) {
                setShowLeftButton(scrollContainerRef.current.scrollLeft > 0);
            }
        };
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener("scroll", handleScroll);
        }
        return function () {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "sm:flex hidden py-8 " + styles_1.styles.maxScreenWidth + " " + styles_1.styles.screenMarginAuto },
            react_1["default"].createElement("div", { className: "flex-1" },
                react_1["default"].createElement("h2", { className: "text-2xl font-bold pb-2" }, "Top Deals"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("div", { ref: scrollContainerRef, className: "flex overflow-x-auto scrollbar-hide space-x-4" }, exports.featuredProducts.map(function (product, index) { return (react_1["default"].createElement("div", { key: index, className: "max-w-[50%] min-w-[19%]" },
                        react_1["default"].createElement(ProductCard_1["default"], { imageSrc: product.imageSrc, altText: product.altText }))); })),
                    showLeftButton && (react_1["default"].createElement("button", { className: "absolute md:-left-0 lg:-left-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollBy({
                                    left: -400,
                                    behavior: "smooth"
                                });
                            }
                        } },
                        react_1["default"].createElement(sl_1.SlArrowLeft, { size: 22 }))),
                    react_1["default"].createElement("button", { className: "absolute md:-right-0 lg:-right-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollBy({
                                    left: 400,
                                    behavior: "smooth"
                                });
                            }
                        } },
                        react_1["default"].createElement(sl_1.SlArrowRight, { size: 22 })))),
            react_1["default"].createElement("div", { className: "w-1/6 ml-4 bg-gray-100 pb-4 flex justify-center items-center" },
                react_1["default"].createElement("div", { className: "text-center" },
                    react_1["default"].createElement(image_1["default"], { src: customad_png_1["default"], alt: "Ad", className: "mb-2" }),
                    react_1["default"].createElement("p", { className: "font-bold text-red-500" }, "Flat 40% off in H&M Brand"),
                    react_1["default"].createElement("p", null,
                        "From Rs",
                        react_1["default"].createElement("span", null, "5000"),
                        " ")))),
        react_1["default"].createElement("div", { className: "flex max-w-screen-sm   sm:hidden py-8  " },
            react_1["default"].createElement("div", { className: " " },
                react_1["default"].createElement("h2", { className: "text-xl font-bold text-black  " }, "Top Deals"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("div", { ref: scrollContainerRef, className: "flex overflow-x-auto scrollbar-hide space-x-2" }, exports.featuredProducts.map(function (product, index) { return (react_1["default"].createElement("div", { key: index, className: "max-w-full min-w-[19%]" },
                        react_1["default"].createElement(ProductCard_1["default"], { imageSrc: product.imageSrc, altText: product.altText }))); })),
                    showLeftButton && (react_1["default"].createElement("button", { className: "absolute md:-left-0 lg:-left-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollBy({
                                    left: -400,
                                    behavior: "smooth"
                                });
                            }
                        } },
                        react_1["default"].createElement(sl_1.SlArrowLeft, { size: 22 }))),
                    react_1["default"].createElement("button", { className: "absolute md:-right-0 lg:-right-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollBy({
                                    left: 400,
                                    behavior: "smooth"
                                });
                            }
                        } },
                        react_1["default"].createElement(sl_1.SlArrowRight, { size: 22 })))))));
};
exports["default"] = exports.TopDeals;
