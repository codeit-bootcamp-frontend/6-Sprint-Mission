var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const google_logo_png_1 = __importDefault(require("../assets/icon/google-logo.png"));
const kakao_logo_png_1 = __importDefault(require("../assets/icon/kakao-logo.png"));
function SocialLogin() {
    return (react_1.default.createElement("div", { className: "social-login" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", null, "\uAC04\uD3B8 \uB85C\uADF8\uC778\uD558\uAE30")),
        react_1.default.createElement("div", { className: "social-login-img" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("a", { href: "https://www.google.com", target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement("img", { src: google_logo_png_1.default, alt: "\uAD6C\uAE00\uB85C\uADF8\uC778", width: "42px" }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("a", { href: "https://www.kakaocorp.com/page", target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement("img", { src: kakao_logo_png_1.default, alt: "\uCE74\uCE74\uC624\uB85C\uADF8\uC778", width: "42px" }))))));
}
exports.default = SocialLogin;
