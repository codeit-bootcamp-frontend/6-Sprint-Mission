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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../../style/bestMarket.css");
const ic_heart_svg_1 = __importDefault(require("../../assets/icon/ic_heart.svg"));
const API_1 = require("../API/API");
const react_responsive_1 = require("react-responsive");
const Commas_1 = __importDefault(require("../../util/Commas"));
function BestMarket() {
    const [bestData, setBestData] = (0, react_1.useState)([]);
    const isMobile = (0, react_responsive_1.useMediaQuery)({
        query: "(max-width: 767px)",
    });
    const isTablet = (0, react_responsive_1.useMediaQuery)({
        query: "(min-width: 768px) and (max-width: 1279px)",
    });
    (0, react_1.useEffect)(() => {
        const fetchBestData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let size = 4; // 기본적으로 4개의 데이터를 가져옴
                if (isMobile)
                    size = 1; // 모바일일 때는 1개의 데이터만 가져옴
                else if (isTablet)
                    size = 2; // 태블릿일 때는 2개의 데이터를 가져옴
                const data = yield (0, API_1.getMarketData)({ page: 1, size, order: "favorite" });
                setBestData(data.list);
            }
            catch (error) {
                console.error(error);
            }
        });
        fetchBestData();
    }, [isMobile, isTablet]);
    return (react_1.default.createElement("div", { className: "best-market" },
        react_1.default.createElement("h1", { className: "best-title" }, "\uBCA0\uC2A4\uD2B8 \uC0C1\uD488"),
        react_1.default.createElement("div", { className: "cards" }, bestData.map((item) => (react_1.default.createElement(react_router_dom_1.Link, { to: `/items/${item.id}`, key: item.id },
            react_1.default.createElement("div", { className: "card" },
                react_1.default.createElement("img", { className: "best-img", src: item.images[0], alt: item.name }),
                react_1.default.createElement("p", { className: "best-name" }, item.name),
                react_1.default.createElement("p", { className: "best-price" },
                    (0, Commas_1.default)(item.price),
                    "\uC6D0"),
                react_1.default.createElement("div", { className: "like" },
                    react_1.default.createElement("img", { src: ic_heart_svg_1.default, alt: "Heart" }),
                    react_1.default.createElement("p", null, item.favoriteCount)))))))));
}
exports.default = BestMarket;
