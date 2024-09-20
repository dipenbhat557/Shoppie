"use client";
"use strict";
exports.__esModule = true;
exports.CarouselComponent = void 0;
var c1_png_1 = require("../../public/images/crousel/c1.png");
var image_1 = require("next/image");
var embla_carousel_autoplay_1 = require("embla-carousel-autoplay");
var carousel_1 = require("@/components/ui/carousel");
var styles_1 = require("../utils/styles");
exports.CarouselComponent = function () {
    return (React.createElement("div", { className: "  w-[90%]  overflow-hidden " + styles_1.styles.screenMarginAuto + " flex items-center justify-center pt-10" },
        React.createElement(carousel_1.Carousel, { plugins: [
                embla_carousel_autoplay_1["default"]({
                    delay: 4000
                }),
            ] },
            React.createElement(carousel_1.CarouselContent, { className: "relative  w-screen h-full" },
                React.createElement(carousel_1.CarouselItem, { className: "relative w-full h-full flex items-center justify-center" },
                    React.createElement(image_1["default"], { src: c1_png_1["default"], height: 800, width: 1750, alt: "c1" })),
                React.createElement(carousel_1.CarouselItem, { className: "relative  w-full h-full flex items-center justify-center" },
                    React.createElement(image_1["default"], { src: c1_png_1["default"], height: 800, width: 1750, alt: "c2" }))))));
};
