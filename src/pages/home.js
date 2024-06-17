var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BannerBottom_1 = __importDefault(require("../components/Home/BannerBottom"));
const BannerMiddle_1 = __importDefault(require("../components/Home/BannerMiddle"));
const BannerTop_1 = __importDefault(require("../components/Home/BannerTop"));
const Footer_1 = __importDefault(require("../components/Home/Footer"));
require("../style/home.css");
const Header_1 = __importDefault(require("../components/Header"));
function HomePage() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement(BannerTop_1.default, null),
            react_1.default.createElement(BannerMiddle_1.default, null),
            react_1.default.createElement(BannerBottom_1.default, null)),
        react_1.default.createElement(Footer_1.default, null)));
}
exports.default = HomePage;
