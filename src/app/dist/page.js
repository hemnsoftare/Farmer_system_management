"use client";
"use strict";
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
var Banner_1 = require("@/components/home/Banner");
var Brand_1 = require("@/components/home/Brand");
var Catagory_1 = require("@/components/home/Catagory");
var ForProducts_1 = require("@/components/home/ForProducts");
var Hero_1 = require("@/components/home/Hero");
var Reklam_1 = require("@/components/home/Reklam");
var Sales_1 = require("@/components/home/Sales");
var Servies_1 = require("@/components/home/Servies");
var firebaseConfig_1 = require("@/config/firebaseConfig");
var firestore_1 = require("firebase/firestore");
var link_1 = require("next/link");
var react_1 = require("react");
var md_1 = require("react-icons/md");
function Home() {
    var _this = this;
    var _a = react_1.useState([]), productNew = _a[0], setproductNew = _a[1];
    var _b = react_1.useState([]), productSale = _b[0], setproductSale = _b[1];
    var db = firestore_1.getFirestore(firebaseConfig_1.app);
    react_1.useEffect(function () {
        console.log("in effect");
        var getdata = function (col) { return __awaiter(_this, void 0, void 0, function () {
            var q, qsanpshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firestore_1.query(firestore_1.collection(db, "Products"), firestore_1.orderBy(col, "desc"))];
                    case 1:
                        q = _a.sent();
                        return [4 /*yield*/, firestore_1.getDocs(q)];
                    case 2:
                        qsanpshot = _a.sent();
                        qsanpshot.forEach(function (item) {
                            if (col === "date") {
                                setproductNew(function (pre) { return __spreadArrays(pre, [item.data()]); });
                            }
                            else {
                                setproductSale(function (pre) { return __spreadArrays(pre, [item.data()]); });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        getdata("numberSale");
        getdata("date");
    }, []);
    return (React.createElement("div", { className: "flex md:bg-slate-50 sm:bg-red-100 lg:bg-white flex-col gap-12" },
        React.createElement(Hero_1["default"], null),
        React.createElement(Catagory_1["default"], null),
        React.createElement(Sales_1["default"], null),
        React.createElement("div", { className: "flex flex-col w-full items-center justify-center" },
            React.createElement("div", { id: "newProducts", className: "flex transition-all duration-300  justify-between w-full border-b-4 pb-4 border-neutral-400" },
                React.createElement("h3", { className: "text-[32px] text-black" }, "New products"),
                React.createElement(link_1["default"], { href: "/viewAll?type=New", className: "text-[16px] flex gap-2" },
                    "view all ",
                    React.createElement(md_1.MdNavigateNext, null))),
            React.createElement(ForProducts_1["default"], { products: productNew })),
        React.createElement(Reklam_1["default"], null),
        React.createElement("div", { className: "flex flex-col w-full items-center justify-center" },
            React.createElement("div", { className: "flex justify-between border-b-4 w-full pb-4 border-neutral-400" },
                React.createElement("h3", { className: "text-[32px] text-black" }, "best salery"),
                React.createElement(link_1["default"], { href: "/viewAll?type=numberSale ", className: "text-[16px] flex gap-2" },
                    "view all ",
                    React.createElement(md_1.MdNavigateNext, null))),
            React.createElement(ForProducts_1["default"], { products: productSale })),
        React.createElement(Brand_1["default"], null),
        React.createElement(Banner_1["default"], null),
        React.createElement(Servies_1["default"], null)));
}
exports["default"] = Home;
