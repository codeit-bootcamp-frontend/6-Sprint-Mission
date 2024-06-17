var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = __importDefault(require("../components/Header"));
const react_1 = __importDefault(require("react"));
const Product_1 = __importDefault(require("../components/Product/Product"));
function ProductPage() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", { className: "ProductPage" },
            react_1.default.createElement(Product_1.default, null))));
}
exports.default = ProductPage;
