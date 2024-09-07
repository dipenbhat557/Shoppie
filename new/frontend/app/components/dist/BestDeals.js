"use client";
"use strict";
exports.__esModule = true;
exports.BestDeals = exports.featuredProducts = void 0;
var fridge_png_1 = require("../../public/images/appliance/fridge.png");
var wash_png_1 = require("../../public/images/appliance/wash.png");
var tv_png_1 = require("../../public/images/appliance/tv.png");
var BestDealsProductCard_1 = require("./BestDealsProductCard");
var BestDealsAdd_1 = require("./BestDealsAdd");
var react_1 = require("react");
var sl_1 = require("react-icons/sl");
exports.featuredProducts = [
    {
        imageSrc: fridge_png_1["default"],
        name: "Fridges",
        price: "From Rs 90,000",
        altText: "Apple Mobiles"
    },
    {
        imageSrc: tv_png_1["default"],
        name: "Televisions",
        price: "From Rs 899",
        altText: "Boats Airpods"
    },
    {
        imageSrc: wash_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: wash_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: wash_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: tv_png_1["default"],
        name: "Televisions",
        price: "From Rs 899",
        altText: "Boats Airpods"
    },
    {
        imageSrc: fridge_png_1["default"],
        name: "Fridges",
        price: "From Rs 90,000",
        altText: "Apple Mobiles"
    },
    {
        imageSrc: tv_png_1["default"],
        name: "Televisions",
        price: "From Rs 899",
        altText: "Boats Airpods"
    },
    {
        imageSrc: fridge_png_1["default"],
        name: "Fridges",
        price: "From Rs 90,000",
        altText: "Apple Mobiles"
    },
];
exports.BestDeals = function () {
    var scrollRef = react_1.useRef(null);
    var _a = react_1.useState(false), showLeftButton = _a[0], setShowLeftButton = _a[1];
    var _b = react_1.useState(true), showRightButton = _b[0], setShowRightButton = _b[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (scrollRef.current) {
                var _a = scrollRef.current, scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
                setShowLeftButton(scrollLeft > 0);
                setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
            }
        };
        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", handleScroll);
        }
        return function () {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
    var scroll = function (direction) {
        if (scrollRef.current) {
            var scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "hidden sm:flex  mx-auto py-8 px-4 lg:px-8  w-[90%]" },
            React.createElement("div", { className: "w-1/4 bg-gray-100 flex justify-center items-center rounded-lg mr-4" },
                React.createElement(BestDealsAdd_1.BestDealsAdd, null)),
            React.createElement("div", { className: "flex-1" },
                React.createElement("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold pb-4 pl-4" }, "Best Deals on Appliances"),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { ref: scrollRef, className: "flex overflow-x-auto scrollbar-hide space-x-4" }, exports.featuredProducts.map(function (product, index) { return (React.createElement("div", { key: index, className: "flex-shrink-0 sm:w-[45%] md:w-[30%] lg:w-[23%]" },
                        React.createElement(BestDealsProductCard_1.BestDealsProductCard, { imageSrc: product.imageSrc, name: product.name, price: product.price, altText: product.altText }))); })),
                    showLeftButton && (React.createElement("button", { className: "absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () { return scroll('left'); }, "aria-label": "Scroll left" },
                        React.createElement(sl_1.SlArrowLeft, { size: 24 }))),
                    showRightButton && (React.createElement("button", { className: "absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () { return scroll('right'); }, "aria-label": "Scroll right" },
                        React.createElement(sl_1.SlArrowRight, { size: 24 })))))),
        React.createElement("div", { className: "sm:hidden max-w-screen-sm py-4" },
            React.createElement("div", { className: "flex-1" },
                React.createElement("h2", { className: "text-xl font-bold pb-4" }, "Best Deals on Appliances"),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { ref: scrollRef, className: "flex overflow-x-auto scrollbar-hide space-x-2 pb-4" }, exports.featuredProducts.map(function (product, index) { return (React.createElement("div", { key: index, className: "flex-shrink-0 w-[25%]" },
                        React.createElement(BestDealsProductCard_1.BestDealsProductCard, { imageSrc: product.imageSrc, name: product.name, price: product.price, altText: product.altText }))); })),
                    showLeftButton && (React.createElement("button", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () { return scroll('left'); }, "aria-label": "Scroll left" },
                        React.createElement(sl_1.SlArrowLeft, { size: 18 }))),
                    showRightButton && (React.createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () { return scroll('right'); }, "aria-label": "Scroll right" },
                        React.createElement(sl_1.SlArrowRight, { size: 18 }))))))));
};
