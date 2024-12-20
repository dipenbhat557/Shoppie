"use client";
"use strict";
exports.__esModule = true;
exports.SearchBar = void 0;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
exports.SearchBar = function () {
    var _a = react_1.useState(""), inputValue = _a[0], setInputValue = _a[1];
    var handleInputChange = function (event) {
        setInputValue(event.target.value);
    };
    return (React.createElement("div", { className: "flex  items-center border border-black rounded-3xl px-4 py-2 w-full " },
        !inputValue && React.createElement(fa_1.FaSearch, { className: "text-gray-500 mr-2" }),
        React.createElement("input", { type: "text", value: inputValue, onChange: handleInputChange, placeholder: "Search here...", className: "flex-grow bg-transparent outline-none" })));
};
