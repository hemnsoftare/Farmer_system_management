"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAllCategories = exports.deleteBlog = exports.getProductsBYDiscountAndCategoryAndSale = exports.getOrder = exports.getUserById = exports.getAllUser = exports.getAllFavorite = exports.getAllProducts = exports.getAllTeam = exports.getAllOrder = exports.getAllBlogs = exports.getAllUsers = void 0;
var firebaseConfig_1 = require("@/config/firebaseConfig");
var firestore_1 = require("firebase/firestore");
function getAllUsers() {
    return __awaiter(this, void 0, Promise, function () {
        var usersRef, usersSnapshot, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersRef = firestore_1.collection(firebaseConfig_1.db, "user");
                    return [4 /*yield*/, firestore_1.getDocs(usersRef)];
                case 1:
                    usersSnapshot = _a.sent();
                    users = usersSnapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                    return [2 /*return*/, users];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching users:", error_1);
                    throw new Error("Failed to fetch users");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
exports.getAllBlogs = function () { return __awaiter(void 0, void 0, Promise, function () {
    var data, blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "blogs"))];
            case 1:
                data = _a.sent();
                blogs = data.docs.map(function (doc) { return (__assign(__assign({}, doc.data()), { id: doc.id, date: doc.data().date ? doc.data().date.toDate() : new Date() })); });
                return [2 /*return*/, blogs];
        }
    });
}); };
exports.getAllOrder = function () { return __awaiter(void 0, void 0, Promise, function () {
    var getorder, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "order"))];
            case 1:
                getorder = _a.sent();
                data = [];
                getorder.forEach(function (item) {
                    return data.push(__assign(__assign({}, item.data()), { id: item.id }));
                });
                return [2 /*return*/, data];
        }
    });
}); };
exports.getAllTeam = function () { return __awaiter(void 0, void 0, Promise, function () {
    var data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "team"))];
            case 1:
                data = _a.sent();
                result = [];
                data.forEach(function (item) {
                    return result.push(__assign(__assign({}, item.data()), { id: item.id }));
                });
                return [2 /*return*/, result];
        }
    });
}); };
// get all products
exports.getAllProducts = function () { return __awaiter(void 0, void 0, Promise, function () {
    var querySnapshot, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "Products"))];
            case 1:
                querySnapshot = _a.sent();
                products = querySnapshot.docs.map(function (doc) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                    var data = doc.data(); // Firestore document data
                    return {
                        id: doc.id,
                        name: (_a = data.name) !== null && _a !== void 0 ? _a : "",
                        price: (_b = data.price) !== null && _b !== void 0 ? _b : 0,
                        brand: (_c = data.brand) !== null && _c !== void 0 ? _c : "",
                        colors: (_d = data.colors) !== null && _d !== void 0 ? _d : [],
                        category: (_e = data.category) !== null && _e !== void 0 ? _e : "",
                        Bigimage: (_f = data.Bigimage) !== null && _f !== void 0 ? _f : null,
                        iniPrice: (_g = data.iniPrice) !== null && _g !== void 0 ? _g : 0,
                        isev: (_h = data.isev) !== null && _h !== void 0 ? _h : false,
                        stock: (_j = data.stock) !== null && _j !== void 0 ? _j : 0,
                        imageSmall: (_k = data.imageSmall) !== null && _k !== void 0 ? _k : [],
                        discount: (_l = data.discount) !== null && _l !== void 0 ? _l : 0,
                        details: (_m = data.details) !== null && _m !== void 0 ? _m : [],
                        numberFavorite: (_o = data.numberFavorite) !== null && _o !== void 0 ? _o : 0,
                        numberSale: (_p = data.numberSale) !== null && _p !== void 0 ? _p : 0,
                        date: data.date ? new Date(data.date) : new Date(),
                        colorsName: (_q = data.colorsName) !== null && _q !== void 0 ? _q : [],
                        isDiscount: (_r = data.isDiscount) !== null && _r !== void 0 ? _r : false,
                        bigimageUrl: (_s = data.bigimageUrl) !== null && _s !== void 0 ? _s : "",
                        numSearch: (_t = data.numSearch) !== null && _t !== void 0 ? _t : 0,
                        smallimageUrl: (_u = data.smallimageUrl) !== null && _u !== void 0 ? _u : []
                    };
                });
                return [2 /*return*/, products];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching products:", error_2);
                throw new Error("Failed to fetch products");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllFavorite = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userDocs, allFavorites, _i, _a, userDoc, itemsCollectionRef, itemsSnapshot, userFavorites;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "favorite"))];
            case 1:
                userDocs = _b.sent();
                allFavorites = [];
                if (userDocs.empty) {
                    return [2 /*return*/, []];
                }
                _i = 0, _a = userDocs.docs;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                userDoc = _a[_i];
                itemsCollectionRef = firestore_1.collection(firebaseConfig_1.db, "favorite", userDoc.id, "items");
                return [4 /*yield*/, firestore_1.getDocs(itemsCollectionRef)];
            case 3:
                itemsSnapshot = _b.sent();
                if (itemsSnapshot.empty) {
                    return [3 /*break*/, 4];
                }
                userFavorites = itemsSnapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                allFavorites.push.apply(allFavorites, userFavorites);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, allFavorites];
        }
    });
}); };
exports.getAllUser = function () { return __awaiter(void 0, void 0, Promise, function () {
    var usersRef, usersSnapshot, users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                usersRef = firestore_1.collection(firebaseConfig_1.db, "user");
                return [4 /*yield*/, firestore_1.getDocs(usersRef)];
            case 1:
                usersSnapshot = _a.sent();
                users = usersSnapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                return [2 /*return*/, users];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching users:", error_3);
                throw new Error("Failed to fetch users");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (userId) { return __awaiter(void 0, void 0, Promise, function () {
    var usersRef, usersSnapshot, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                usersRef = firestore_1.doc(firebaseConfig_1.db, "user", userId);
                return [4 /*yield*/, firestore_1.getDoc(usersRef)];
            case 1:
                usersSnapshot = _a.sent();
                user = usersSnapshot.data();
                return [2 /*return*/, user];
            case 2:
                error_4 = _a.sent();
                console.error("Error fetching user:", error_4);
                throw new Error("Failed to fetch user");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = function (userid) { return __awaiter(void 0, void 0, Promise, function () {
    var q, querySnapshot, newProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                q = firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "order"), firestore_1.where("userId", "==", userid));
                return [4 /*yield*/, firestore_1.getDocs(q)];
            case 1:
                querySnapshot = _a.sent();
                newProducts = [];
                querySnapshot.forEach(function (doc) {
                    newProducts.push(__assign(__assign({}, doc.data()), { id: doc.id }));
                });
                return [2 /*return*/, newProducts];
        }
    });
}); };
exports.getProductsBYDiscountAndCategoryAndSale = function (_a) {
    var col = _a.col, category = _a.category;
    return __awaiter(void 0, void 0, Promise, function () {
        var q, snapshot;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (col === "date") {
                        q =
                            category !== ""
                                ? firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.where("category", "==", category), // ✅ Correct placement
                                firestore_1.orderBy(col, "desc"))
                                : firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.orderBy(col, "asc"));
                    }
                    else if (col !== "discount") {
                        q =
                            category !== ""
                                ? firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.where("category", "==", category), // ✅ Correct placement
                                firestore_1.orderBy(col, "desc"))
                                : firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.orderBy(col, "desc"));
                    }
                    else {
                        q =
                            category !== ""
                                ? firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.where("category", "==", category), // ✅ Correct placement
                                firestore_1.where("isDiscount", "==", true))
                                : firestore_1.query(firestore_1.collection(firebaseConfig_1.db, "Products"), firestore_1.where("isDiscount", "==", true));
                    }
                    return [4 /*yield*/, firestore_1.getDocs(q)];
                case 1:
                    snapshot = _b.sent();
                    return [2 /*return*/, snapshot.docs.map(function (doc) { return (__assign(__assign({}, doc.data()), { id: doc.id })); })];
            }
        });
    });
};
exports.deleteBlog = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore_1.deleteDoc(firestore_1.doc(firebaseConfig_1.db, "blogs", id)).then(function () { })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCategories = function () { return __awaiter(void 0, void 0, Promise, function () {
    var cate, cateData_1, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(firebaseConfig_1.db, "category"))];
            case 1:
                cate = _a.sent();
                cateData_1 = [];
                cate.forEach(function (doc) { return cateData_1.push(doc.data()); });
                return [2 /*return*/, cateData_1];
            case 2:
                error_6 = _a.sent();
                console.error("Error fetching categories:", error_6);
                throw new Error("Failed to fetch categories");
            case 3: return [2 /*return*/];
        }
    });
}); };
