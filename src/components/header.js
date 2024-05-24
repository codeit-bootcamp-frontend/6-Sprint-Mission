var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const main_logo_svg_1 = __importDefault(require("../assets/icon/main_logo.svg"));
const main_logo_small_svg_1 = __importDefault(require("../assets/icon/main_logo_small.svg"));
const react_router_dom_1 = require("react-router-dom");
require("../style/header.css");
const Button_1 = __importDefault(require("../common/Button"));
function NavBar() {
    const location = (0, react_router_dom_1.useLocation)();
    return (react_1.default.createElement("nav", { className: "navvar" },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
            react_1.default.createElement("img", { className: "mainlogo", src: main_logo_svg_1.default, alt: "\uB85C\uACE0" }),
            react_1.default.createElement("img", { className: "mainlogo", src: main_logo_small_svg_1.default, alt: "\uB85C\uACE0" })),
        react_1.default.createElement("div", { className: "menus" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                react_1.default.createElement("span", null, "\uC790\uC720\uAC8C\uC2DC\uD310")),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/items", className: location.pathname.startsWith("/items") ||
                    location.pathname === "/additem"
                    ? "focus"
                    : "" },
                react_1.default.createElement("span", null, "\uC911\uACE0\uB9C8\uCF13"))),
        react_1.default.createElement(Button_1.default, { to: "/signin" }, "\uB85C\uADF8\uC778")));
}
exports.default = NavBar;
