var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const panda_logo_svg_1 = __importDefault(require("../assets/img/panda_logo.svg"));
require("../style/signup.css");
const SignupForm_1 = __importDefault(require("../components/Signup/SignupForm"));
const SocialLogin_1 = __importDefault(require("../components/SocialLogin"));
function Signup() {
    return (react_1.default.createElement("div", { className: "signin-container" },
        react_1.default.createElement("div", { className: "signin-logo" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                react_1.default.createElement("img", { src: panda_logo_svg_1.default, alt: "\uD310\uB2E4\uB9C8\uCF13", width: "396px" }))),
        react_1.default.createElement(SignupForm_1.default, null),
        react_1.default.createElement(SocialLogin_1.default, null),
        react_1.default.createElement("div", { className: "switch-signup" },
            "\uC774\uBBF8 \uD68C\uC6D0\uC774\uC2E0\uAC00\uC694? ",
            react_1.default.createElement(react_router_dom_1.Link, { to: "/signin" }, "\uB85C\uADF8\uC778"))));
}
exports.default = Signup;
