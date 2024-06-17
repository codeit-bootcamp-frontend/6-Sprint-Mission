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
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const yup = __importStar(require("yup"));
const eye_invisible_svg_1 = __importDefault(require("../../assets/icon/eye-invisible.svg"));
const eye_visible_svg_1 = __importDefault(require("../../assets/icon/eye-visible.svg"));
const API_1 = require("../API/API");
const AuthProvider_1 = require("../../context/AuthProvider");
const schema = yup.object({
    email: yup.string().email("올바른 이메일 형식이 아닙니다.").required("이메일을 입력하세요."),
    nickname: yup.string().required("닉네임을 입력하세요."),
    password: yup
        .string()
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
        .required("비밀번호를 입력하세요."),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력하세요."),
}).required();
function SignupForm() {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(schema),
        mode: "onChange",
    });
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user } = (0, AuthProvider_1.useAuth)();
    (0, react_1.useEffect)(() => {
        if (user)
            navigate("/");
    }, [user, navigate]);
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, API_1.postSignup)(data);
            alert("회원가입이 완료되었습니다.");
            navigate("/signin");
        }
        catch (error) {
            console.error(error);
            alert("회원가입에 실패했습니다.");
        }
    });
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }
    function togglePasswordConfirmVisibility() {
        setShowPasswordConfirm(!showPasswordConfirm);
    }
    return (react_1.default.createElement("form", { id: "signupForm", className: "signin-form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "email", className: "signin-label" }, "\uC774\uBA54\uC77C"),
            react_1.default.createElement("input", Object.assign({ id: "email", type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input" }, register("email"), { style: { border: errors.email ? "1px solid #f74747" : "none" } })),
            errors.email && (react_1.default.createElement("span", { id: "email-Error", className: "Error-message" }, errors.email.message))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "nickname", className: "signin-label" }, "\uB2C9\uB124\uC784"),
            react_1.default.createElement("input", Object.assign({ id: "nickname", type: "text", placeholder: "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input" }, register("nickname"), { style: { border: errors.nickname ? "1px solid #f74747" : "none" } })),
            errors.nickname && (react_1.default.createElement("span", { id: "nickname-Error", className: "Error-message" }, errors.nickname.message))),
        react_1.default.createElement("div", { className: "signin-pwd" },
            react_1.default.createElement("label", { htmlFor: "password", className: "signin-label" }, "\uBE44\uBC00\uBC88\uD638"),
            react_1.default.createElement("input", Object.assign({ id: "password", type: showPassword ? "text" : "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input" }, register("password"), { style: { border: errors.password ? "1px solid #f74747" : "none" } })),
            react_1.default.createElement("img", { id: "password-toggle", src: showPassword ? eye_visible_svg_1.default : eye_invisible_svg_1.default, className: "pwd-toggle", alt: "\uBE44\uBC00\uBC88\uD638 \uD1A0\uAE00", onClick: togglePasswordVisibility }),
            errors.password && (react_1.default.createElement("span", { id: "password-Error", className: "Error-message" }, errors.password.message))),
        react_1.default.createElement("div", { className: "signin-pwd" },
            react_1.default.createElement("label", { htmlFor: "passwordConfirmation", className: "signin-label" }, "\uBE44\uBC00\uBC88\uD638 \uD655\uC778"),
            react_1.default.createElement("input", Object.assign({ id: "passwordConfirmation", type: showPasswordConfirm ? "text" : "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uD55C \uBC88 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input" }, register("passwordConfirmation"), { style: { border: errors.passwordConfirmation ? "1px solid #f74747" : "none" } })),
            react_1.default.createElement("img", { id: "passwordConfirmation-toggle", src: showPasswordConfirm ? eye_visible_svg_1.default : eye_invisible_svg_1.default, className: "pwd-toggle", alt: "\uBE44\uBC00\uBC88\uD638 \uD1A0\uAE00", onClick: togglePasswordConfirmVisibility }),
            errors.passwordConfirmation && (react_1.default.createElement("span", { id: "passwordConfirmation-Error", className: "Error-message" }, errors.passwordConfirmation.message))),
        react_1.default.createElement("button", { type: "submit", className: "signin-btn btn" }, "\uD68C\uC6D0\uAC00\uC785")));
}
exports.default = SignupForm;
