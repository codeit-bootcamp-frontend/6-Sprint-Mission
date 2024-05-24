var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const img_home_01_svg_1 = __importDefault(require("../../assets/img/img_home_01.svg"));
const img_home_02_svg_1 = __importDefault(require("../../assets/img/img_home_02.svg"));
const img_home_03_svg_1 = __importDefault(require("../../assets/img/img_home_03.svg"));
const BannerMiddle = () => {
    return (react_1.default.createElement("section", { className: "banner-middle" },
        react_1.default.createElement("div", { className: "item" },
            react_1.default.createElement("img", { src: img_home_01_svg_1.default, alt: "\uC544\uC774\uD15C1" }),
            react_1.default.createElement("div", { className: "item-text" },
                react_1.default.createElement("h2", { className: "title" }, "Hot Item"),
                react_1.default.createElement("h3", { className: "subtitle" },
                    "\uC778\uAE30 \uC0C1\uD488\uC744 ",
                    react_1.default.createElement("span", { className: "break-on-desktop" },
                        react_1.default.createElement("br", null)),
                    "\uD655\uC778\uD574\uBCF4\uC138\uC694"),
                react_1.default.createElement("p", { className: "description" },
                    "\uAC00\uC7A5 HOT\uD55C \uC911\uACE0\uAC70\uB798 \uBB3C\uD488\uC744",
                    react_1.default.createElement("br", null),
                    "\uD310\uB2E4 \uB9C8\uCF13\uC5D0\uC11C \uD655\uC778\uD574 \uBCF4\uC138\uC694"))),
        react_1.default.createElement("div", { className: "item" },
            react_1.default.createElement("img", { src: img_home_02_svg_1.default, alt: "\uC544\uC774\uD15C2" }),
            react_1.default.createElement("div", { className: "item-text right" },
                react_1.default.createElement("h2", { className: "title" }, "Search"),
                react_1.default.createElement("h3", { className: "subtitle" },
                    "\uAD6C\uB9E4\uB97C \uC6D0\uD558\uB294 ",
                    react_1.default.createElement("span", { className: "break-on-desktop" },
                        react_1.default.createElement("br", null)),
                    "\uC0C1\uD488\uC744 \uAC80\uC0C9\uD558\uC138\uC694"),
                react_1.default.createElement("p", { className: "description" },
                    "\uAD6C\uB9E4\uD558\uACE0 \uC2F6\uC740 \uBB3C\uD488\uC740 \uAC80\uC0C9\uD574\uC11C",
                    react_1.default.createElement("br", null),
                    "\uC27D\uAC8C \uCC3E\uC544\uBCF4\uC138\uC694"))),
        react_1.default.createElement("div", { className: "item" },
            react_1.default.createElement("img", { src: img_home_03_svg_1.default, alt: "\uC544\uC774\uD15C3" }),
            react_1.default.createElement("div", { className: "item-text" },
                react_1.default.createElement("h2", { className: "title" }, "Register"),
                react_1.default.createElement("h3", { className: "subtitle" },
                    "\uD310\uB9E4\uB97C \uC6D0\uD558\uB294 ",
                    react_1.default.createElement("span", { className: "break-on-desktop" },
                        react_1.default.createElement("br", null)),
                    "\uC0C1\uD488\uC744 \uB4F1\uB85D\uD558\uC138\uC694"),
                react_1.default.createElement("p", { className: "description" },
                    "\uC5B4\uB5A4 \uBB3C\uAC74\uC774\uB4E0 \uD310\uB9E4\uD558\uACE0 \uC2F6\uC740 \uC0C1\uD488\uC744",
                    react_1.default.createElement("br", null),
                    "\uC27D\uAC8C \uB4F1\uB85D\uD558\uC138\uC694")))));
};
exports.default = BannerMiddle;
