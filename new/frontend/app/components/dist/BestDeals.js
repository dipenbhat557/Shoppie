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
    return (React.createElement("div", { className: "flex max-w-[90%] mx-auto py-4" },
        React.createElement("div", { className: "w-1/4  bg-gray-100  flex justify-center items-center" },
            React.createElement(BestDealsAdd_1.BestDealsAdd, null)),
        React.createElement("div", { className: "flex-1" },
            React.createElement("h2", { className: "text-4xl font-bold pb-2 pl-4 " }, "Best Deals on Appliances"),
            React.createElement("div", { className: "relative" },
                React.createElement("div", { ref: scrollref, className: "flex overflow-x-auto scrollbar-hide space-x-2" }, exports.featuredProducts.map(function (product, index) { return (React.createElement("div", { key: index, className: "lg:max-w-[50%] md:max-w-[60%] sm:max-w-[90%]  md:min-w-[22%] sm:min-w-[20%] lg:min-w-[24%] " },
                    React.createElement(BestDealsProductCard_1.BestDealsProductCard, { imageSrc: product.imageSrc, name: product.name, price: product.price, altText: product.altText }))); })),
                showLeftButton && (React.createElement("button", { className: "absolute md:-left-2 lg:-left-5 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
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
                    React.createElement(sl_1.SlArrowRight, { size: 22 }))))));
};
