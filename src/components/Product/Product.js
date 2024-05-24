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
require("../../style/product.css");
const ic_heart_svg_1 = __importDefault(require("../../assets/icon/ic_heart.svg"));
const API_1 = require("../API/API");
const react_router_dom_1 = require("react-router-dom");
const img_inquiry_empty_svg_1 = __importDefault(require("../../assets/img/img_inquiry_empty.svg"));
const ic_back_svg_1 = __importDefault(require("../../assets/icon/ic_back.svg"));
const Commas_1 = __importDefault(require("../../util/Commas"));
const times_1 = __importDefault(require("../../util/times"));
function Product() {
    const [productData, setProductData] = (0, react_1.useState)(null);
    const [productCommentData, setProductCommentData] = (0, react_1.useState)(null);
    const [comment, setComment] = (0, react_1.useState)("");
    const [isFilled, setIsFilled] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, API_1.getProductData)(id);
                setProductData(data);
            }
            catch (e) {
                console.error(e);
            }
        });
        const fetchCommentData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const commentData = yield (0, API_1.getProductCommentData)(id);
                setProductCommentData(commentData);
            }
            catch (e) {
                console.error(e);
            }
        });
        fetchData();
        fetchCommentData();
    }, [id]);
    const handleCommentChange = (e) => {
        const text = e.target.value;
        setComment(text);
        setIsFilled(text.trim().length > 0);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, productData && (react_1.default.createElement("div", { className: "product-container" },
        react_1.default.createElement("div", { className: "product-header" },
            react_1.default.createElement("div", { className: "product-header-img" },
                react_1.default.createElement("img", { src: productData.images[0], alt: "Product" })),
            react_1.default.createElement("div", { className: "product-header-text" },
                react_1.default.createElement("p", { className: "product-header-name" }, productData.name),
                react_1.default.createElement("p", { className: "product-header-price" },
                    (0, Commas_1.default)(productData.price),
                    "\uC6D0"),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("p", { className: "product-header-des" },
                    "\uC0C1\uD488 \uC18C\uAC1C ",
                    react_1.default.createElement("br", null),
                    productData.description),
                react_1.default.createElement("p", { className: "product-header-tag" }, "\uC0C1\uD488 \uD0DC\uADF8"),
                react_1.default.createElement("div", { className: "product-header-tags" }, productData.tags.map((tag, index) => (react_1.default.createElement("span", { key: index, className: "tag" },
                    "#",
                    tag)))),
                react_1.default.createElement("div", { className: "like" },
                    react_1.default.createElement("div", { className: "like2" },
                        react_1.default.createElement("img", { src: ic_heart_svg_1.default, alt: "Heart" }),
                        react_1.default.createElement("p", null, productData.favoriteCount))))),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", { className: "add-comment-container" },
            react_1.default.createElement("p", null, "\uBB38\uC758\uD558\uAE30"),
            react_1.default.createElement("textarea", { className: "add-comment-des", placeholder: "\uAC1C\uC778\uC815\uBCF4\uB97C \uACE0\uC720 \uBC0F \uC694\uCCAD\uD558\uAC70\uB098, \uBA85\uC608 \uD6FC\uC190, \uBB34\uB2E8 \uAD11\uACE0, \uBD88\uBC95 \uC815\uBCF4 \uC720\uD3EC\uC2DC \uBAA8\uB2C8\uD130\uB9C1 \uD6C4 \uC0AD\uC81C\uB420 \uC218 \uC788\uC73C\uBA70, \uC774\uC5D0 \uB300\uD55C \uBBFC\uD615\uC0AC\uC0C1 \uCC45\uC784\uC740 \uAC8C\uC2DC\uC790\uC5D0\uAC8C \uC788\uC2B5\uB2C8\uB2E4.", value: comment, onChange: handleCommentChange }),
            react_1.default.createElement("button", { className: isFilled ? "filled" : "" }, "\uB4F1\uB85D")),
        react_1.default.createElement("div", { className: "comment-container" },
            productCommentData && productCommentData.list.length > 0 ? (react_1.default.createElement("div", null, productCommentData.list.map((comment) => (react_1.default.createElement("div", { key: comment.id, className: "comments" },
                react_1.default.createElement("p", { className: "comments-des" }, comment.content),
                react_1.default.createElement("div", { className: "comment-writer" },
                    react_1.default.createElement("img", { src: comment.writer.image, alt: "writer img" }),
                    react_1.default.createElement("div", { className: "comment-writer-nickname" },
                        react_1.default.createElement("p", { className: "comments-writer" }, comment.writer.nickname),
                        react_1.default.createElement("p", { className: "comments-times" }, (0, times_1.default)(comment.updatedAt)))),
                react_1.default.createElement("hr", null)))))) : (react_1.default.createElement("div", { className: "comment-empty-container" },
                react_1.default.createElement("img", { src: img_inquiry_empty_svg_1.default, alt: "no comment" }),
                react_1.default.createElement("p", null, "\uC544\uC9C1 \uBB38\uC758\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."))),
            react_1.default.createElement("div", { className: "back-container" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/items", className: "back-btn" }, "\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"),
                    react_1.default.createElement("img", { src: ic_back_svg_1.default, alt: "back to items", className: "back-img" }))))))));
}
exports.default = Product;
