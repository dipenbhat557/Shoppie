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
exports.featuredProducts = [
    {
        imageSrc: boat_png_1["default"],
        name: "Boats Airpods",
        price: "From Rs 899",
        altText: "Boats Airpods"
    },
    {
        imageSrc: phone_png_1["default"],
        name: "Apple Mobiles",
        price: "From Rs 90,000",
        altText: "Apple Mobiles"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: "From Rs 5000",
        altText: "Headset"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: "From Rs 5000",
        altText: "Headset"
    },
];
exports.TopDeals = function () {
    return (react_1["default"].createElement("div", { className: "flex max-w-[90%] mx-auto py-8" },
        react_1["default"].createElement("div", { className: "flex-1" },
            react_1["default"].createElement("h2", { className: "text-2xl font-bold pb-2" }, "Top Deals"),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement("div", { className: "flex overflow-x-auto scrollbar-hide space-x-4" }, exports.featuredProducts.map(function (product, index) { return (react_1["default"].createElement("div", { key: index, className: "max-w-[50%] min-w-[19%]" },
                    react_1["default"].createElement(ProductCard_1["default"], { imageSrc: product.imageSrc, name: product.name, price: product.price, altText: product.altText }))); })),
                react_1["default"].createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                        var container = document.querySelector(".overflow-x-auto");
                        container.scrollBy({ left: 400, behavior: "smooth" });
                    } }, ">"))),
        react_1["default"].createElement("div", { className: "w-1/6 ml-4 bg-gray-100 pb-4 flex justify-center items-center" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(image_1["default"], { src: customad_png_1["default"], alt: "Ad", className: "mb-2" }),
                react_1["default"].createElement("p", { className: "font-bold text-red-500" }, "Flat 40% off in H&M Brand"),
                react_1["default"].createElement("p", null, "From Rs 5000")))));
};
exports["default"] = exports.TopDeals;
