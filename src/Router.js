var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
const home_1 = __importDefault(require("./pages/home"));
const faq_1 = __importDefault(require("./pages/faq"));
const market_1 = __importDefault(require("./pages/market"));
const product_1 = __importDefault(require("./pages/product"));
const items_1 = __importDefault(require("./pages/items"));
const signin_1 = __importDefault(require("./pages/signin"));
const signup_1 = __importDefault(require("./pages/signup"));
const privacy_1 = __importDefault(require("./pages/privacy"));
const AuthProvider_1 = require("./context/AuthProvider");
function Router() {
    return (react_1.default.createElement(AuthProvider_1.AuthProvider, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(home_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "items", element: react_1.default.createElement(market_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "items/:id", element: react_1.default.createElement(product_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "additem", element: react_1.default.createElement(items_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "signin", element: react_1.default.createElement(signin_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "signup", element: react_1.default.createElement(signup_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "privacy", element: react_1.default.createElement(privacy_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "faq", element: react_1.default.createElement(faq_1.default, null) }))));
}
exports.default = Router;
