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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AuthContext = (0, react_1.createContext)(null);
const BASE_URL = "https://panda-market-api.vercel.app";
function AuthProvider({ children }) {
    const [values, setValues] = (0, react_1.useState)({
        user: null,
        isPending: true,
    });
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    function getUser() {
        return __awaiter(this, arguments, void 0, function* (token = null) {
            let key;
            if (token)
                key = token;
            else
                key = accessToken;
            setValues((prev) => (Object.assign(Object.assign({}, prev), { isPending: true })));
            let nextUser = null;
            try {
                const response = yield fetch(`${BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${key}`,
                    },
                });
                if (response.ok) {
                    nextUser = yield response.json();
                }
                else if (response.status === 401) {
                    return;
                }
            }
            catch (error) {
                console.error("Failed to fetch user:", error);
            }
            finally {
                setValues((prev) => (Object.assign(Object.assign({}, prev), { user: nextUser, isPending: false })));
            }
        });
    }
    function login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/auth/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const { accessToken, refreshToken } = yield response.json();
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            yield getUser(accessToken);
        });
    }
    function logout() {
        // eslint-disable-next-line require-yield
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setValues((prev) => (Object.assign(Object.assign({}, prev), { user: null })));
        });
    }
    (0, react_1.useEffect)(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (react_1.default.createElement(AuthContext.Provider, { value: {
            user: values.user,
            isPending: values.isPending,
            login,
            logout,
            // updateUser,
        } }, children));
}
exports.AuthProvider = AuthProvider;
function useAuth(required = null) {
    const context = (0, react_1.useContext)(AuthContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    if (!context) {
        throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
    }
    (0, react_1.useEffect)(() => {
        if (required === null)
            return;
        if (required && !context.user && !context.isPending) {
            navigate("/signin");
        }
        else if (!required && context.user && !context.isPending) {
            navigate("/");
        }
    }, [context.user, context.isPending, required, navigate]);
    return context;
}
exports.useAuth = useAuth;
