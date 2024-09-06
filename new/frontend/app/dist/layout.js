"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google");
require("./globals.css");
var Navbar_1 = require("./components/Navbar");
var Topbar_1 = require("./components/Topbar");
var CategoryNav_1 = require("./components/CategoryNav");
var Footer_1 = require("./components/Footer");
var inter = google_1.Inter({ subsets: ["latin"] });
exports.metadata = {
    title: "Kinam Na",
    description: "Get all your necessities in one place",
    icons: {
        icon: "/icon.svg"
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement("div", { className: "flex flex-col min-h-screen w-full  justify-between items-center " },
                React.createElement("div", { className: "w-full flex flex-col gap-5  " },
                    React.createElement(Topbar_1.Topbar, null),
                    React.createElement(Navbar_1["default"], null),
                    React.createElement(CategoryNav_1.CategoryNav, null)),
                children,
                React.createElement(Footer_1.Footer, null)))));
}
exports["default"] = RootLayout;
