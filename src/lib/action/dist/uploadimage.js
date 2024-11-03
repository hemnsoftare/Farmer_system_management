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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getproductByCategory = exports.getProducts = exports.getFireBase = exports.uploadImage = void 0;
var storage_1 = require("firebase/storage");
var firestore_1 = require("firebase/firestore");
var firebaseConfig_1 = require("@/config/firebaseConfig");
var db = firestore_1.getFirestore(firebaseConfig_1.app);
// Function to upload the image
function uploadImage(file) {
    return __awaiter(this, void 0, Promise, function () {
        var storageRef, snapshot, downloadURL, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    storageRef = storage_1.ref(firebaseConfig_1.storage, "images/" + file.name);
                    // Upload the file
                    console.log("in handle upload image ");
                    return [4 /*yield*/, storage_1.uploadBytes(storageRef, file)];
                case 1:
                    snapshot = _a.sent();
                    return [4 /*yield*/, storage_1.getDownloadURL(snapshot.ref)];
                case 2:
                    downloadURL = _a.sent();
                    console.log("Image uploaded successfully:", downloadURL);
                    return [2 /*return*/, downloadURL];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error uploading image:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.uploadImage = uploadImage;
exports.getFireBase = function (dbName) { return __awaiter(void 0, void 0, Promise, function () {
    var q, catagory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firestore_1.getDocs(firestore_1.collection(db, dbName))];
            case 1:
                q = _a.sent();
                catagory = q.docs.map(function (item) { return item.data(); });
                return [2 /*return*/, catagory];
        }
    });
}); };
exports.getProducts = function (filter, categoroy) { return __awaiter(void 0, void 0, Promise, function () {
    var conditions, q, product, qsanpshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("in get products");
                console.log();
                conditions = [];
                // Add brand condition if filter.brand is provided and not empty
                if (filter.brand && filter.brand.length > 0) {
                    conditions.push(firestore_1.where("brand", "in", filter.brand));
                }
                // Add color condition if filter.color is provided and not empty
                if (filter.color && filter.color.length > 0) {
                    conditions.push(firestore_1.where("colorsName", "array-contains-any", filter.color));
                }
                // Add discount condition
                conditions.push(firestore_1.where("isDiscount", "==", filter.discount));
                // Add price conditions
                conditions.push(firestore_1.where("price", ">=", filter.price[0])); // Set minimum price
                conditions.push(firestore_1.where("price", "<=", filter.price[1])); // Set maximum price
                conditions.push(firestore_1.where("category", "==", categoroy));
                q = firestore_1.query.apply(void 0, __spreadArrays([firestore_1.collection(db, "Products")], conditions));
                product = [];
                return [4 /*yield*/, firestore_1.getDocs(q)];
            case 1:
                qsanpshot = _a.sent();
                console.log(qsanpshot);
                qsanpshot.forEach(function (item) {
                    console.log("object");
                    console.log(item);
                    product.push(__assign(__assign({}, item.data()), { id: item.id }));
                });
                console.log(product);
                return [2 /*return*/, product];
        }
    });
}); };
exports.getproductByCategory = function (category) { return __awaiter(void 0, void 0, Promise, function () {
    var q, products, qsanpshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                q = firestore_1.query(firestore_1.collection(db, "Products"), firestore_1.where("category", "==", category));
                products = [];
                return [4 /*yield*/, firestore_1.getDocs(q)];
            case 1:
                qsanpshot = _a.sent();
                qsanpshot.forEach(function (item) {
                    products.push(item.data());
                });
                return [2 /*return*/, products];
        }
    });
}); };
