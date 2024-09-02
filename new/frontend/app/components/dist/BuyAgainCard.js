"use strict";
exports.__esModule = true;
exports.BuyAgainCard = void 0;
var image_1 = require("next/image");
var fa_1 = require("react-icons/fa");
exports.BuyAgainCard = function (_a) {
    var name = _a.name, imageSrc = _a.imageSrc, price = _a.price, discount = _a.discount, altText = _a.altText, rating = _a.rating;
    return (React.createElement("div", { className: "flex flex-col w-[20%]  " },
        React.createElement(image_1["default"], { src: imageSrc, alt: altText }),
        React.createElement("div", { className: "flex flex-col justify-between gap-2  h-[60%] items-center w-full" },
            React.createElement("p", { className: " text-[20px] font-semibold" },
                " ",
                name),
            React.createElement("div", { className: "w-full flex pb-4  justify-center gap-3" },
                React.createElement("div", { className: " flex  gap-2" }, Array.from({ length: 5 }, function (_, i) { return (React.createElement(fa_1.FaStar, { className: "" + (i < rating ? "text-[#FFC633]" : "text-slate-200"), key: i })); })),
                React.createElement("div", null,
                    rating,
                    " / 5")),
            React.createElement("div", { className: " relative    w-[90%]  " },
                React.createElement("div", { className: "flex  gap-3 font-semibold " },
                    React.createElement("p", { className: " line-through text-slate-400 text-[16px]" },
                        " ",
                        "Rs. ",
                        price),
                    React.createElement("p", { className: "text-[18px]" },
                        "Rs. ",
                        price - discount)),
                React.createElement("div", { className: " text-[12px] absolute -top-4 right-10 py-1 px-3 bg-red-300  bg-opacity-35  border rounded-lg   text-red-500" },
                    "-Rs ",
                    discount)),
            React.createElement("div", { className: "flex items-center justify-center w-full" },
                React.createElement("button", { className: "bg-[#FFC633] font-medium  w-[80%]  p-2" }, "Buy now")))));
};
