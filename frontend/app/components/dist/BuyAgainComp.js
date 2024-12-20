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
    var _b = react_1.useState(true), showRightButton = _b[0], setShowRightButton = _b[1];
    react_1.useEffect(function () {
        var _a;
        var handleScroll = function () {
            if (scrollref.current) {
                setShowLeftButton(scrollref.current.scrollLeft > 0);
                setShowRightButton(scrollref.current.scrollLeft <
                    scrollref.current.scrollWidth - scrollref.current.clientWidth);
            }
        };
        (_a = scrollref.current) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', handleScroll);
        return function () { var _a; return (_a = scrollref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', handleScroll); };
    }, []);
    var scroll = function (direction) {
        if (scrollref.current) {
            var scrollAmount = direction === 'left' ? -200 : 200;
            scrollref.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return (React.createElement("div", { className: "max-w-screen-sm sm:max-w-[95%] md:max-w-[90%] mx-auto py-2 sm:py-4 md:py-8 px-1 sm:px-2" },
        React.createElement("h1", { className: "text-xl sm:text-2xl md:text-3xl font-bold py-2" }, "Buy Again"),
        React.createElement("div", { className: "relative" },
            React.createElement("div", { ref: scrollref, className: "flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-3 md:space-x-4 pb-4" }, exports.featuredProducts.map(function (item, index) { return (React.createElement("div", { key: index, className: "min-w-[20%] xs:min-w-[20%] sm:min-w-[25%] md:min-w-[22%] lg:min-w-[18%]" },
                React.createElement(BuyAgainCard_1.BuyAgainCard, { name: item.name, imageSrc: item.imageSrc, altText: item.altText, rating: item.rating, price: item.price, discount: item.discount }))); })),
            showLeftButton && (React.createElement("button", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 sm:p-2 shadow-md", onClick: function () { return scroll('left'); } },
                React.createElement(sl_1.SlArrowLeft, { className: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" }))),
            showRightButton && (React.createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 sm:p-2 shadow-md", onClick: function () { return scroll('right'); } },
                React.createElement(sl_1.SlArrowRight, { className: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" }))))));
};
