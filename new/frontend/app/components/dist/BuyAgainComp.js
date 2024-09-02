"use client";
"use strict";
exports.__esModule = true;
exports.BuyAgainComp = exports.featuredProducts = void 0;
var react_1 = require("react");
var airpods_png_1 = require("../../public/images/topDeals/airpods.png");
var boat_png_1 = require("../../public/images/topDeals/boat.png");
var headphone_png_1 = require("../../public/images/topDeals/headphone.png");
var phone_png_1 = require("../../public/images/topDeals/phone.png");
var BuyAgainCard_1 = require("./BuyAgainCard");
var sl_1 = require("react-icons/sl");
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
    var scrollref = react_1.useRef(null);
    var _a = react_1.useState(false), showLeftButton = _a[0], setShowLeftButton = _a[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (scrollref.current) {
                setShowLeftButton(scrollref.current.scrollLeft > 0);
            }
        };
        if (scrollref.current) {
            scrollref.current.addEventListener("scroll", handleScroll);
        }
        return function () {
            if (scrollref.current) {
                scrollref.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
    return (React.createElement("div", { className: " flex flex-col max-w-[90%] mx-auto py-8 px-2" },
        React.createElement("h1", { className: "text-3xl font-bold py-2" }, "Buy Again"),
        React.createElement("div", { className: "relative" },
            React.createElement("div", { ref: scrollref, className: "flex overflow-x-auto scrollbar-hide space-x-4" }, exports.featuredProducts.map(function (item, index) {
                return (React.createElement("div", { key: index, className: " md:min-w-[19%] sm:min-w-[18%]" },
                    React.createElement(BuyAgainCard_1.BuyAgainCard, { key: index, name: item.name, imageSrc: item.imageSrc, altText: item.altText, rating: item.rating, price: item.price, discount: item.discount })));
            })),
            showLeftButton && (React.createElement("button", { className: "absolute md:-left-0 lg:-left-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                    if (scrollref.current) {
                        scrollref.current.scrollBy({
                            left: -400,
                            behavior: "smooth"
                        });
                    }
                } },
                React.createElement(sl_1.SlArrowLeft, { size: 22 }))),
            React.createElement("button", { className: "absolute md:-right-0 lg:-right-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                    if (scrollref.current) {
                        scrollref.current.scrollBy({
                            left: 400,
                            behavior: "smooth"
                        });
                    }
                } },
                React.createElement(sl_1.SlArrowRight, { size: 22 })))));
};
