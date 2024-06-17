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
require("../../style/allMarket.css");
const ic_heart_svg_1 = __importDefault(require("../../assets/icon/ic_heart.svg"));
const ic_arrow_left_svg_1 = __importDefault(require("../../assets/icon/ic_arrow_left.svg"));
const ic_arrow_right_svg_1 = __importDefault(require("../../assets/icon/ic_arrow_right.svg"));
const react_router_dom_1 = require("react-router-dom");
const SelectBtn_1 = __importDefault(require("./SelectBtn"));
const API_1 = require("../API/API");
const react_responsive_1 = require("react-responsive");
const SearchInput_1 = require("./SearchInput");
const Commas_1 = __importDefault(require("../../util/Commas"));
const Button_1 = __importDefault(require("../../common/Button"));
function AllMarket() {
    const [data, setData] = (0, react_1.useState)([]);
    const [order, setOrder] = (0, react_1.useState)("recent");
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalPages, setTotalPages] = (0, react_1.useState)(1);
    const isMobile = (0, react_responsive_1.useMediaQuery)({
        query: "(max-width: 767px)",
    });
    const isTablet = (0, react_responsive_1.useMediaQuery)({
        query: "(min-width: 768px) and (max-width: 1279px)",
    });
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let pageSize = 10;
                if (isMobile)
                    pageSize = 4;
                else if (isTablet)
                    pageSize = 6;
                const { list, totalCount } = yield (0, API_1.getMarketData)({
                    page: currentPage,
                    size: pageSize,
                    order,
                });
                setData(list);
                setTotalPages(Math.ceil(totalCount / pageSize));
            }
            catch (error) {
                console.error(error);
            }
        });
        fetchData();
    }, [currentPage, order, isMobile, isTablet]);
    const handleSortOrderChange = (selectedOrder) => {
        setOrder(selectedOrder);
    };
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleHeaderChange = () => {
        if (isMobile) {
            return (react_1.default.createElement("div", { className: "all-header" },
                react_1.default.createElement("div", { className: "all-header-top" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h1", { className: "all-title" }, "\uD310\uB9E4 \uC911\uC778 \uC0C1\uD488")),
                    react_1.default.createElement("div", { className: "button" },
                        react_1.default.createElement(Button_1.default, { to: "/additem" }, "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30"))),
                react_1.default.createElement("div", { className: "all-search-input" },
                    react_1.default.createElement("div", { className: "searchInput" },
                        react_1.default.createElement(SearchInput_1.SearchInput, null)),
                    react_1.default.createElement("div", { className: "selectInput" },
                        react_1.default.createElement(SelectBtn_1.default, { onChange: handleSortOrderChange })))));
        }
        else {
            return (react_1.default.createElement("div", { className: "all-header" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h1", { className: "all-title" }, isTablet ? "판매 중인 상품" : "전체 상품")),
                react_1.default.createElement("div", { className: "all-search-input" },
                    react_1.default.createElement("div", { className: "searchInput" },
                        react_1.default.createElement(SearchInput_1.SearchInput, null)),
                    react_1.default.createElement("div", { className: "button" },
                        react_1.default.createElement(Button_1.default, { to: "/additem" }, "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30")),
                    react_1.default.createElement("div", { className: "selectInput" },
                        react_1.default.createElement(SelectBtn_1.default, { onChange: handleSortOrderChange })))));
        }
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(react_1.default.createElement("div", { key: i, onClick: () => handlePageChange(i), className: "pageBtn " + (currentPage === i ? "active" : "") }, i));
        }
        return pageNumbers;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "all-market" },
            handleHeaderChange(),
            data.length > 0 && (react_1.default.createElement("div", { className: "cards" }, data.map((item) => (react_1.default.createElement(react_router_dom_1.Link, { to: `/items/${item.id}`, key: item.id },
                react_1.default.createElement("div", { className: "card" },
                    react_1.default.createElement("img", { className: "all-img", src: item.images[0], alt: item.name }),
                    react_1.default.createElement("p", { className: "all-name" }, item.name),
                    react_1.default.createElement("p", { className: "all-price" },
                        (0, Commas_1.default)(item.price),
                        "\uC6D0"),
                    react_1.default.createElement("div", { className: "like" },
                        react_1.default.createElement("img", { src: ic_heart_svg_1.default, alt: "Heart" }),
                        react_1.default.createElement("p", null, item.favoriteCount))))))))),
        react_1.default.createElement("div", { className: "pagination" },
            react_1.default.createElement("div", { className: "pageBtn" },
                react_1.default.createElement("img", { src: ic_arrow_left_svg_1.default, onClick: () => handlePageChange(currentPage - 1), alt: "arrow_left" })),
            renderPageNumbers(),
            react_1.default.createElement("div", { className: "pageBtn" },
                react_1.default.createElement("img", { src: ic_arrow_right_svg_1.default, onClick: () => handlePageChange(currentPage + 1), alt: "arrow_right" })))));
}
exports.default = AllMarket;
