var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../style/header.css");
function LinkButton({ children, to = "/" }) {
    return (react_1.default.createElement(react_router_dom_1.Link, { to: to },
        react_1.default.createElement("div", { className: "button" }, children)));
}
exports.default = LinkButton;
