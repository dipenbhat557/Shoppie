"use client";
"use strict";
exports.__esModule = true;
exports.MobileFooter = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var foot_png_1 = require("../../public/images/foot/foot.png");
var visa_png_1 = require("../../public/images/foot/visa.png");
var apay_png_1 = require("../../public/images/foot/apay.png");
var gpay_png_1 = require("../../public/images/foot/gpay.png");
var bs_1 = require("react-icons/bs");
var fa_1 = require("react-icons/fa");
var lucide_react_1 = require("lucide-react");
exports.MobileFooter = function () {
    return (react_1["default"].createElement("footer", { className: "w-full flex flex-col md:hidden gap-1" },
        react_1["default"].createElement("div", { className: "bg-black w-full flex flex-col text-white rounded-2xl py-2 px-4" },
            react_1["default"].createElement("h2", { className: "text-sm font-sans font-bold p-2 text-center" }, "STAY UP TO DATE ABOUT OUR LATEST OFFERS"),
            react_1["default"].createElement("div", { className: "flex flex-col gap-3 items-center w-full" },
                react_1["default"].createElement("input", { type: "email", placeholder: "Enter your email address", className: "py-3 px-2 placeholder:text-center placeholder:text-xs w-[90%] rounded-full text-black" }),
                react_1["default"].createElement("button", { className: "bg-white text-black w-[50%] text-sm py-2 px-1 rounded-full font-bold" }, "Subscribe to Newsletters"))),
        react_1["default"].createElement("div", { className: "w-full flex flex-col relative justify-around gap-3" },
            react_1["default"].createElement("div", { className: "h-auto w-full bg-gray-100 pt-4" },
                react_1["default"].createElement("div", { className: "w-[90%] mx-auto pb-5" },
                    react_1["default"].createElement("div", { className: "p-2" },
                        react_1["default"].createElement("h3", { className: "text-xl font-bold" }, "SHOP.CO"),
                        react_1["default"].createElement("p", { className: "text-gray-600 mt-4" }, "We have clothes that suit your style and which youre proud to wear. From women to men."),
                        react_1["default"].createElement("div", { className: "flex space-x-4 mt-4" },
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsTwitter, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsFacebook, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(fa_1.FaInstagram, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsPinterest, null)))),
                    react_1["default"].createElement(CollapsibleSection, { title: "COMPANY" },
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "About")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Features")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Works")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Career")))),
                    react_1["default"].createElement(CollapsibleSection, { title: "HELP" },
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Customer Support")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Delivery Details")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Terms & Conditions")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Privacy Policy")))),
                    react_1["default"].createElement(CollapsibleSection, { title: "FAQ" },
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Account")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Manage Deliveries")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Orders")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Payments")))),
                    react_1["default"].createElement(CollapsibleSection, { title: "RESOURCES" },
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Free eBooks")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Development Tutorial")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "How to - Blog")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Youtube Playlist"))))),
                react_1["default"].createElement("div", { className: "w-full border-b border-slate-400" }),
                react_1["default"].createElement("div", { className: "flex w-[90%] mx-auto py-10 justify-between items-center flex-col sm:flex-row" },
                    react_1["default"].createElement("p", { className: "text-gray-600 text-center sm:text-left mb-4 sm:mb-0" }, "Shop.co \u00A9 2000-2023, All Rights Reserved"),
                    react_1["default"].createElement("div", { className: "flex space-x-4" },
                        react_1["default"].createElement(image_1["default"], { src: visa_png_1["default"], alt: "Visa", width: 40, height: 25 }),
                        react_1["default"].createElement(image_1["default"], { src: foot_png_1["default"], alt: "PayPal", width: 40, height: 25 }),
                        react_1["default"].createElement(image_1["default"], { src: apay_png_1["default"], alt: "Apple Pay", width: 40, height: 25 }),
                        react_1["default"].createElement(image_1["default"], { src: gpay_png_1["default"], alt: "Google Pay", width: 40, height: 25 })))))));
};
var CollapsibleSection = function (_a) {
    var title = _a.title, children = _a.children;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    return (react_1["default"].createElement("div", { className: "border-b border-gray-200 py-2" },
        react_1["default"].createElement("div", { className: "flex justify-between items-center cursor-pointer", onClick: function () { return setIsOpen(!isOpen); } },
            react_1["default"].createElement("h4", { className: "text-lg font-bold" }, title),
            isOpen ? react_1["default"].createElement(lucide_react_1.ChevronUp, { size: 20 }) : react_1["default"].createElement(lucide_react_1.ChevronDown, { size: 20 })),
        isOpen && react_1["default"].createElement("div", { className: "mt-2" }, children)));
};
