var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const react_1 = __importDefault(require("react"));
const App_js_1 = __importDefault(require("./App.js"));
const react_router_dom_1 = require("react-router-dom");
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = client_1.default.createRoot(rootElement);
    root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_js_1.default, null)));
}
else {
    console.error("Root element not found");
}
