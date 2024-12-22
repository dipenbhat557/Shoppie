"use strict";
exports.__esModule = true;
exports.DesktopFooter = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var foot_png_1 = require("../../public/images/foot/foot.png");
var visa_png_1 = require("../../public/images/foot/visa.png");
var apay_png_1 = require("../../public/images/foot/apay.png");
var gpay_png_1 = require("../../public/images/foot/gpay.png");
var bs_1 = require("react-icons/bs");
var fa_1 = require("react-icons/fa");
exports.DesktopFooter = function () {
    return (react_1["default"].createElement("footer", { className: " w-full h-auto  hidden     md:flex md:flex-col  " },
        react_1["default"].createElement("div", { className: "w-full h-[120px]" }),
        react_1["default"].createElement("div", { className: " w-full  flex flex-col relative  justify-around gap-3 " },
            react_1["default"].createElement("div", { className: "bg-black w-[90%]  h-48  absolute -top-[20%]  right-[5%]  flex  justify-between   items-center       mx-auto text-white rounded-3xl py-6 px-8" },
                react_1["default"].createElement("h2", { className: "text-5xl font-sans w-[50%] font-bold" }, "STAY UP TO DATE ABOUT OUR LATEST OFFERS"),
                react_1["default"].createElement("div", { className: "flex  flex-col gap-5 items-center w-[40%] space-x-4" },
                    react_1["default"].createElement("input", { type: "email", placeholder: " Enter your email address", className: "py-3 px-2 placeholder:text-center  w-[50%] rounded-full text-black" }),
                    react_1["default"].createElement("button", { className: "bg-white text-black w-[50%]  py-3 px-2 rounded-full font-bold" }, "Subscribe to Newsletter"))),
            react_1["default"].createElement("div", { className: "   h-auto w-full  bg-gray-100" },
                react_1["default"].createElement("div", { className: "w-full  h-[200px] " }),
                react_1["default"].createElement("div", { className: "  grid grid-cols-1 w-[90%] mx-auto md:grid-cols-5 pb-5  gap-8" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h3", { className: "text-xl font-bold" }, "SHOP.CO"),
                        react_1["default"].createElement("p", { className: "text-gray-600 mt-4" }, "We have clothes that suit your style and which you`re proud to wear. From women to men."),
                        react_1["default"].createElement("div", { className: "flex space-x-4 mt-4" },
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsTwitter, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsFacebook, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(fa_1.FaInstagram, null)),
                            react_1["default"].createElement("a", { href: "#" },
                                react_1["default"].createElement(bs_1.BsPinterest, null)))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h4", { className: "text-lg font-bold" }, "COMPANY"),
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "About")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Features")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Works")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Career")))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h4", { className: "text-lg font-bold" }, "HELP"),
                        react_1["default"].createElement("ul", { className: " space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Customer Support")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Delivery Details")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Terms & Conditions")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Privacy Policy")))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h4", { className: "text-lg font-bold" }, "FAQ"),
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Account")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Manage Deliveries")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Orders")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Payments")))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h4", { className: "text-lg font-bold" }, "RESOURCES"),
                        react_1["default"].createElement("ul", { className: "space-y-2" },
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Free eBooks")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Development Tutorial")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "How to - Blog")),
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("a", { href: "#", className: "text-gray-600 hover:text-black" }, "Youtube Playlist"))))),
                react_1["default"].createElement("div", { className: " w-full border-b border-slate-400" }),
                react_1["default"].createElement("div", { className: " flex w-[90%] mx-auto py-10 justify-between items-center" },
                    react_1["default"].createElement("p", { className: "text-gray-600" }, "Shop.co \u00A9 2000-2023, All Rights Reserved"),
                    react_1["default"].createElement("div", { className: "flex space-x-4" },
                        react_1["default"].createElement(image_1["default"], { src: visa_png_1["default"], alt: "Visa" }),
                        react_1["default"].createElement(image_1["default"], { src: foot_png_1["default"], alt: "PayPal" }),
                        react_1["default"].createElement(image_1["default"], { src: apay_png_1["default"], alt: "Apple Pay" }),
                        react_1["default"].createElement(image_1["default"], { src: gpay_png_1["default"], alt: "Google Pay" })))))));
};