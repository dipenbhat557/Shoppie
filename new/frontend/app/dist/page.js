"use strict";
exports.__esModule = true;
var AdBanner1_1 = require("./components/AdBanner1");
var BestDeals_1 = require("./components/BestDeals");
var BuyAgainComp_1 = require("./components/BuyAgainComp");
var CarouselComponent_1 = require("./components/CarouselComponent");
var HomeDecor_1 = require("./components/HomeDecor");
var RecentItem_1 = require("./components/RecentItem");
var Support_1 = require("./components/Support");
var TopDeals_1 = require("./components/TopDeals");
function Home() {
    return (React.createElement("div", null,
        React.createElement(CarouselComponent_1.CarouselComponent, null),
        React.createElement(TopDeals_1["default"], null),
        React.createElement(BestDeals_1.BestDeals, null),
        React.createElement(HomeDecor_1.HomeDecor, null),
        React.createElement(RecentItem_1.RecentItem, null),
        React.createElement(AdBanner1_1.AdBanner1, null),
        React.createElement(BuyAgainComp_1.BuyAgainComp, null),
        React.createElement(Support_1.Support, null)));
}
exports["default"] = Home;
