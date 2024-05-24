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
require("../../style/additem.css");
const react_1 = __importStar(require("react"));
const ic_x_gray_svg_1 = __importDefault(require("../../assets/icon/ic_x_gray.svg"));
const ic_x_blue_svg_1 = __importDefault(require("../../assets/icon/ic_x_blue.svg"));
function AddItem() {
    const [imageSrc, setImageSrc] = (0, react_1.useState)("");
    const [isAllInputFilled, setIsAllInputFilled] = (0, react_1.useState)(false);
    const [inputPrice, setInputPrice] = (0, react_1.useState)("");
    const [inputName, setInputName] = (0, react_1.useState)("");
    const [inputDes, setInputDes] = (0, react_1.useState)("");
    const [tags, setTags] = (0, react_1.useState)([]);
    const [inputTag, setInputTag] = (0, react_1.useState)("");
    const [imageHovered, setImageHovered] = (0, react_1.useState)(false);
    const [tagHovered, setTagHovered] = (0, react_1.useState)(Array(10).fill(false));
    const handleImageChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                var _a;
                const result = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                if (result) {
                    setImageSrc(result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };
    function Commas(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handlePriceChange = (e) => {
        const price = e.target.value.replace(/\D/g, "");
        const formattedPrice = Commas(price);
        setInputPrice(formattedPrice);
        handleInputChange();
    };
    const handleInputChange = (0, react_1.useCallback)(() => {
        const isFilled = inputName.trim() !== "" &&
            inputDes.trim() !== "" &&
            inputPrice.trim() !== "" &&
            tags.length > 0;
        setIsAllInputFilled(isFilled);
    }, [inputName, inputDes, inputPrice, tags]);
    (0, react_1.useEffect)(() => {
        handleInputChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);
    const handleNameChange = (e) => {
        setInputName(e.target.value);
        handleInputChange();
    };
    const handleDesChange = (e) => {
        setInputDes(e.target.value);
        handleInputChange();
    };
    const handleTagInputKeyDown = (e) => {
        if (e.key === "Enter" && inputTag.trim() !== "") {
            const newTag = inputTag.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputTag("");
                handleInputChange();
            }
            else {
                alert("이미 추가된 태그입니다.");
            }
        }
    };
    const handleTagDelete = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
        handleInputChange();
    };
    const handleImageDelete = () => {
        setImageSrc("");
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "add-header flexrow margin-bottom10" },
            react_1.default.createElement("p", null, "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30"),
            react_1.default.createElement("button", { className: isAllInputFilled ? "filled" : "" }, "\uB4F1\uB85D")),
        react_1.default.createElement("div", { className: "flexcolumn margin-bottom10" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, "\uC0C1\uD488 \uC774\uBBF8\uC9C0"),
                react_1.default.createElement("div", { className: "flexrow" },
                    react_1.default.createElement("div", { className: "add-img" },
                        react_1.default.createElement("label", { className: "input-img-btn", htmlFor: "imageInput" },
                            react_1.default.createElement("span", { className: "input-img-text" }, "+"),
                            react_1.default.createElement("br", null),
                            react_1.default.createElement("span", null, "\uC774\uBBF8\uC9C0 \uB4F1\uB85D"),
                            react_1.default.createElement("input", { id: "imageInput", type: "file", accept: "image/*", style: { display: "none" }, onChange: handleImageChange }))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: "input-img-btn" }, imageSrc && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("img", { src: imageSrc, className: "handleImage", alt: "add img" }),
                            react_1.default.createElement("img", { src: imageHovered ? ic_x_blue_svg_1.default : ic_x_gray_svg_1.default, alt: "delete img", className: "delete-btn-img", onClick: handleImageDelete, onMouseEnter: () => setImageHovered(true), onMouseLeave: () => setImageHovered(false) })))))))),
        react_1.default.createElement("div", { className: "add-name flexcolumn margin-bottom10" },
            react_1.default.createElement("p", null, "\uC0C1\uD488\uBA85"),
            react_1.default.createElement("input", { type: "text", value: inputName, placeholder: "\uC0C1\uD488\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", onChange: handleNameChange })),
        react_1.default.createElement("div", { className: "add-text flexcolumn margin-bottom10" },
            react_1.default.createElement("p", null, "\uC0C1\uD488 \uC18C\uAC1C"),
            react_1.default.createElement("textarea", { className: "add-des", value: inputDes, placeholder: "\uC0C1\uD488 \uC18C\uAC1C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", onChange: handleDesChange })),
        react_1.default.createElement("div", { className: "add-price flexcolumn margin-bottom10" },
            react_1.default.createElement("p", null, "\uD310\uB9E4\uAC00\uACA9"),
            react_1.default.createElement("input", { value: inputPrice, placeholder: "\uD310\uB9E4 \uAC00\uACA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", onChange: handlePriceChange })),
        react_1.default.createElement("div", { className: "add-tag flexcolumn margin-bottom10" },
            react_1.default.createElement("p", null, "\uD0DC\uADF8"),
            react_1.default.createElement("input", { placeholder: "\uD0DC\uADF8\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", value: inputTag, onChange: (e) => setInputTag(e.target.value), onKeyDown: handleTagInputKeyDown })),
        react_1.default.createElement("div", { className: "tags flexrow" }, tags.map((tag, index) => (react_1.default.createElement("div", { key: index, className: "tag" },
            react_1.default.createElement("p", null, tag),
            react_1.default.createElement("img", { src: tagHovered[index] ? ic_x_blue_svg_1.default : ic_x_gray_svg_1.default, alt: "delete img", className: "delete-btn-tag", onClick: () => handleTagDelete(index), onMouseEnter: () => {
                    let newTagHovered = [...tagHovered];
                    newTagHovered[index] = true;
                    setTagHovered(newTagHovered);
                }, onMouseLeave: () => {
                    let newTagHovered = [...tagHovered];
                    newTagHovered[index] = false;
                    setTagHovered(newTagHovered);
                } })))))));
}
exports.default = AddItem;
