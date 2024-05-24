var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ic_facebook_svg_1 = __importDefault(require("../../assets/icon/ic_facebook.svg"));
const ic_twitter_svg_1 = __importDefault(require("../../assets/icon/ic_twitter.svg"));
const ic_youtube_svg_1 = __importDefault(require("../../assets/icon/ic_youtube.svg"));
const ic_instagram_svg_1 = __importDefault(require("../../assets/icon/ic_instagram.svg"));
const Footer = () => {
    return (react_1.default.createElement("footer", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", { className: "codeit" }, "@codeit - 2024")),
        react_1.default.createElement("div", { className: "FAQ" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/privacy" }, "Privacy Policy"),
            "\u2003",
            react_1.default.createElement(react_router_dom_1.Link, { to: "/faq" }, "FAQ")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://www.facebook.com" },
                react_1.default.createElement("img", { src: ic_facebook_svg_1.default, alt: "facebook" })),
            react_1.default.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://www.twitter.com" },
                react_1.default.createElement("img", { src: ic_twitter_svg_1.default, alt: "twitter" })),
            react_1.default.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://www.youtube.com" },
                react_1.default.createElement("img", { src: ic_youtube_svg_1.default, alt: "youtube" })),
            react_1.default.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://www.instagram.com/" },
                react_1.default.createElement("img", { src: ic_instagram_svg_1.default, alt: "instagram" })))));
};
exports.default = Footer;
