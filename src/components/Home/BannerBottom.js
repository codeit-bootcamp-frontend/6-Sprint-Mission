var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BannerBottom = () => {
    return (react_1.default.createElement("section", { className: "banner-bottom" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null,
                "\uBBFF\uC744 \uC218 \uC788\uB294",
                react_1.default.createElement("br", null),
                "\uD310\uB2E4\uB9C8\uCF13 \uC911\uACE0\uAC70\uB798"))));
};
exports.default = BannerBottom;
