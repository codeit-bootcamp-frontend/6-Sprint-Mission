var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../../style/SelectBtn.css");
const ic_arrow_down_svg_1 = __importDefault(require("../../assets/icon/ic_arrow_down.svg"));
const ic_sort_svg_1 = __importDefault(require("../../assets/icon/ic_sort.svg"));
const react_responsive_1 = require("react-responsive");
const SelectBtn = ({ onChange }) => {
    const [isDropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [order, setOrder] = (0, react_1.useState)("recent");
    const ORDER_KR = {
        recent: "최신순",
        favorite: "좋아요순",
    };
    const isMobile = (0, react_responsive_1.useMediaQuery)({
        query: "(max-width: 767px)",
    });
    const handleMobileChange = () => {
        if (isMobile)
            return react_1.default.createElement("img", { className: "img-arrow", src: ic_sort_svg_1.default, alt: "arrow-down" });
        else
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, ORDER_KR[order]),
                react_1.default.createElement("img", { src: ic_arrow_down_svg_1.default, alt: "arrow-down" })));
    };
    const dropdownRef = (0, react_1.useRef)(null);
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    // 정렬 옵션 선택시 호출되는 함수
    const handleOrderChange = (order) => {
        setOrder(order); // 상태 업데이트
        onChange(order); // 부모 컴포넌트로 선택된 정렬 순서 전달
        setDropdownOpen(false); // 드롭다운 닫기
    };
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (react_1.default.createElement("div", { className: "dropdown", ref: dropdownRef },
        react_1.default.createElement("div", { className: "dropdown_button", onClick: toggleDropdown },
            react_1.default.createElement("div", { className: "select" }, handleMobileChange())),
        isDropdownOpen && (react_1.default.createElement("ul", { className: "dropdown_contents" },
            react_1.default.createElement("li", { onClick: () => handleOrderChange("recent") }, "\uCD5C\uC2E0\uC21C"),
            react_1.default.createElement("li", { onClick: () => handleOrderChange("favorite") }, "\uC88B\uC544\uC694\uC21C")))));
};
exports.default = SelectBtn;
