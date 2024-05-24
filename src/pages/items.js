var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("../components/Header"));
require("../style/additem.css");
const AddItem_1 = __importDefault(require("../components/AddItems/AddItem"));
function ItemPage() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", { className: "item-container" },
            react_1.default.createElement(AddItem_1.default, null))));
}
exports.default = ItemPage;
