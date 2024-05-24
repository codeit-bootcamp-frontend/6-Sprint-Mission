var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const BannerTop = () => {
    return (react_1.default.createElement("section", { className: "banner-top" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null,
                "\uC77C\uC0C1\uC758 \uBAA8\uB4E0 \uBB3C\uAC74\uC744 ",
                react_1.default.createElement("br", null),
                "\uAC70\uB798\uD574\uBCF4\uC138\uC694"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/items", className: "btn-items btn" }, "\uAD6C\uACBD\uD558\uB7EC\uAC00\uAE30"))));
};
exports.default = BannerTop;
