var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BestMarket_1 = __importDefault(require("../components/Market/BestMarket"));
const AllMarket_1 = __importDefault(require("../components/Market/AllMarket"));
const Header_1 = __importDefault(require("../components/Header"));
require("../style/market.css");
function MarketPage() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", { className: "market" },
            react_1.default.createElement(BestMarket_1.default, null),
            react_1.default.createElement(AllMarket_1.default, null))));
}
exports.default = MarketPage;
