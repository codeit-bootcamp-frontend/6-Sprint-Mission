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
exports.getProductCommentData = exports.getProductData = exports.getMarketData = void 0;
function getMarketData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ page = 1, size = 10, order = "recent" }) {
        const query = `page=${page}&pageSize=${size}&orderBy=${order}`;
        const res = yield fetch(`https://panda-market-api.vercel.app/products?${query}`);
        const body = yield res.json();
        return body;
    });
}
exports.getMarketData = getMarketData;
function getProductData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://panda-market-api.vercel.app/products/${id}`);
        const data = yield res.json();
        return data;
    });
}
exports.getProductData = getProductData;
function getProductCommentData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://panda-market-api.vercel.app/products/${id}/comments?limit=10`);
        const data = yield res.json();
        return data;
    });
}
exports.getProductCommentData = getProductCommentData;
