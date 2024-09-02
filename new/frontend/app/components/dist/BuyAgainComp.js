"use strict";
exports.__esModule = true;
exports.BuyAgainComp = exports.featuredProducts = void 0;
var airpods_png_1 = require("../../public/images/topDeals/airpods.png");
var boat_png_1 = require("../../public/images/topDeals/boat.png");
var headphone_png_1 = require("../../public/images/topDeals/headphone.png");
var phone_png_1 = require("../../public/images/topDeals/phone.png");
var BuyAgainCard_1 = require("./BuyAgainCard");
exports.featuredProducts = [
    {
        imageSrc: boat_png_1["default"],
        rating: 4,
        discount: 100,
        price: 1000,
        name: "Boats Airpods",
        altText: "Boats Airpods"
    },
    {
        imageSrc: phone_png_1["default"],
        rating: 4,
        discount: 100,
        price: 1000,
        name: "Apple Mobiles",
        altText: "Apple Mobiles"
    },
    {
        imageSrc: airpods_png_1["default"],
        rating: 4,
        discount: 100,
        price: 1000,
        name: "Apple Airpods",
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        rating: 4,
        discount: 100,
        price: 1000,
        name: "Headset",
        altText: "Headset"
    },
    {
        imageSrc: airpods_png_1["default"],
        rating: 4,
        discount: 100,
        price: 1000,
        name: "Apple Airpods",
        altText: "Apple Airpods"
    },
];
exports.BuyAgainComp = function () {
    return (React.createElement("div", { className: " flex max-w-[90%] mx-auto py-8" }, exports.featuredProducts.map(function (item, index) {
        return (React.createElement(BuyAgainCard_1.BuyAgainCard, { name: item.name, imageSrc: item.imageSrc, altText: item.altText, rating: item.rating, price: item.price, discount: item.discount }));
    })));
};
