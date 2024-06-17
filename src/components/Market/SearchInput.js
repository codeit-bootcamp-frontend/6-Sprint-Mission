var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const react_1 = __importDefault(require("react"));
const ic_search_svg_1 = __importDefault(require("../../assets/icon/ic_search.svg"));
require("../../style/SearchInput.css");
function SearchInput() {
    return (react_1.default.createElement("div", { className: "search" },
        react_1.default.createElement("img", { src: ic_search_svg_1.default, alt: "\uAC80\uC0C9" }),
        react_1.default.createElement("input", { placeholder: "\uAC80\uC0C9\uD560 \uC0C1\uD488\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." })));
}
exports.SearchInput = SearchInput;
