"use client";
"use strict";
exports.__esModule = true;
exports.RecentItem = exports.featuredProducts = void 0;
var react_1 = require("react");
var ProductCard_1 = require("./ProductCard");
var airpods_png_1 = require("../../public/images/topDeals/airpods.png");
var boat_png_1 = require("../../public/images/topDeals/boat.png");
var headphone_png_1 = require("../../public/images/topDeals/headphone.png");
var phone_png_1 = require("../../public/images/topDeals/phone.png");
var sl_1 = require("react-icons/sl");
var styles_1 = require("../utils/styles");
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
];
exports.RecentItem = function () {
    var scrollContainerRef = react_1.useRef(null);
    var _a = react_1.useState(false), showLeftButton = _a[0], setShowLeftButton = _a[1];
    var _b = react_1.useState(true), showRightButton = _b[0], setShowRightButton = _b[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (scrollContainerRef.current) {
                var _a = scrollContainerRef.current, scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
                setShowLeftButton(scrollLeft > 0);
                setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
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
    var scroll = function (direction) {
        if (scrollContainerRef.current) {
            var scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };
    return (react_1["default"].createElement("div", { className: "py-4 sm:py-8 " + styles_1.styles.maxScreenWidth + " mx-auto px-4 sm:px-6 lg:px-8" },
        react_1["default"].createElement("div", { className: "flex-1" },
            react_1["default"].createElement("h2", { className: "text-2xl sm:text-3xl font-bold font-sans pb-2 sm:pb-4" }, "Recently Viewed Items"),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement("div", { ref: scrollContainerRef, className: "flex overflow-x-auto scrollbar-hide -mx-2 sm:mx-0", onScroll: function () {
                        if (scrollContainerRef.current) {
                            var _a = scrollContainerRef.current, scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
                            setShowLeftButton(scrollLeft > 0);
                            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
                        }
                    } }, exports.featuredProducts.map(function (product, index) { return (react_1["default"].createElement("div", { key: index, className: "w-1/3 sm:w-1/4 md:w-1/4 lg:w-1/5 flex-shrink-0 px-2" },
                    react_1["default"].createElement(ProductCard_1["default"], { imageSrc: product.imageSrc, altText: product.altText }))); })),
                showLeftButton && (react_1["default"].createElement("button", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hidden sm:block", onClick: function () { return scroll('left'); } },
                    react_1["default"].createElement(sl_1.SlArrowLeft, { size: 22 }))),
                showRightButton && (react_1["default"].createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hidden sm:block", onClick: function () { return scroll('right'); } },
                    react_1["default"].createElement(sl_1.SlArrowRight, { size: 22 })))))));
};
exports["default"] = exports.RecentItem;
