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
var react_1 = require("react");
var switch_1 = require("@/components/ui/switch");
var InputCheckout_1 = require("@/components/Cart/InputCheckout");
var image_1 = require("next/image");
var ImageSmallInput_1 = require("../_components/ImageSmallInput");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var firestore_1 = require("firebase/firestore");
var firebaseConfig_1 = require("../../../../config/firebaseConfig");
var uploadimage_1 = require("@/lib/action/uploadimage");
var io_1 = require("react-icons/io");
var Page = function () {
    var _a = react_1.useState([]), selectedcolor = _a[0], setselectedcolor = _a[1];
    var _b = react_1.useState(false), discount = _b[0], setdiscount = _b[1];
    var _c = react_1.useState(), values = _c[0], setvalues = _c[1];
    var _d = react_1.useState(""), maiinImageNmae = _d[0], setmaiinImageNmae = _d[1];
    var _e = react_1.useState(""), selectedImage = _e[0], setSelectedImage = _e[1];
    var _f = react_1.useState([
        undefined,
        undefined,
        undefined,
        undefined,
    ]), smallImageFile = _f[0], setsmallImageFile = _f[1];
    var _g = react_1.useState([
        "",
        "",
        "",
        "",
    ]), smallImageName = _g[0], setsmallImageName = _g[1];
    var _h = react_1.useState([]), Details = _h[0], setDetails = _h[1];
    var _j = react_1.useState([]), imageSmallUrl = _j[0], setimageSmallUrl = _j[1];
    var _k = react_1.useState(), catagory = _k[0], setcatagory = _k[1];
    var _l = react_1.useState(), selectedCategoryy = _l[0], setselectedCategoryy = _l[1];
    var db = firestore_1.getFirestore(firebaseConfig_1.app);
    // Handle form submission
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    formData = new FormData(e.currentTarget);
                    data = {
                        name: (_a = formData.get("name")) === null || _a === void 0 ? void 0 : _a.toString().trim(),
                        price: parseFloat(formData.get("price")),
                        brand: formData.get("brand"),
                        colors: selectedcolor,
                        category: formData.get("category"),
                        Bigimage: maiinImageNmae,
                        colorsName: selectedcolor.map(function (item) { return item.name; }),
                        bigimageUrl: selectedImage,
                        smallimageUrl: imageSmallUrl,
                        imageSmall: smallImageName,
                        details: Details,
                        numberFavorite: 0,
                        numberSale: 0,
                        date: new Date(),
                        isDiscount: formData.get("discount") ? true : false,
                        discount: formData.get("discount")
                            ? parseFloat(formData.get("discount"))
                            : 0
                    };
                    console.log(data);
                    return [4 /*yield*/, firestore_1.setDoc(firestore_1.doc(db, "Products", data.name), data)
                            .then(function (res) {
                            console.log("save data");
                            window.location.href = "/dashboard/Products";
                        })["catch"](function (error) { var _a; return console.error("Error response:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // Handle large image change
    var handleImageChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, linkimage, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    (file === null || file === void 0 ? void 0 : file.name) && setmaiinImageNmae(file === null || file === void 0 ? void 0 : file.name);
                    if (!file) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, uploadimage_1.uploadImage(file)];
                case 2:
                    linkimage = _b.sent();
                    setSelectedImage(linkimage); // Update state with the image URL
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error uploading main image:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Handle small image change
    var handleSmallImageChange = function (index, e) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedImages, file, linkimageurl_1, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("handleSmallImageChange");
                    updatedImages = __spreadArrays(smallImageFile);
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    console.log(file);
                    if (!file) return [3 /*break*/, 4];
                    console.log(" in if ");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, uploadimage_1.uploadImage(file)];
                case 2:
                    linkimageurl_1 = _b.sent();
                    setimageSmallUrl(function (prev) { return __spreadArrays(prev, [linkimageurl_1]); }); // Store URL in state
                    updatedImages[index] = file; // Update file state
                    setsmallImageFile(updatedImages);
                    setsmallImageName(function (prevNames) {
                        var updatedNames = __spreadArrays(prevNames);
                        updatedNames[index] = file.name; // Store file name
                        return updatedNames;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error("Error uploading small image:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Handle adding product details
    var titleRef = react_1.useRef(null);
    var descriptionRef = react_1.useRef(null);
    var handleAdddetail = function () {
        var _a, _b;
        var titleValue = (_a = titleRef.current) === null || _a === void 0 ? void 0 : _a.value;
        var descriptionValue = (_b = descriptionRef.current) === null || _b === void 0 ? void 0 : _b.value;
        if (titleValue && descriptionValue) {
            setDetails(function (prevDetails) { return __spreadArrays(prevDetails, [
                {
                    title: titleValue,
                    description: descriptionValue
                },
            ]); });
            if (titleRef.current)
                titleRef.current.value = "";
            if (descriptionRef.current)
                descriptionRef.current.value = "";
        }
    };
    var getdata = function () { return __awaiter(void 0, void 0, void 0, function () {
        var cate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uploadimage_1.getFireBase("category")];
                case 1:
                    cate = _a.sent();
                    setselectedCategoryy(cate[0].name || "");
                    setcatagory(cate); // Ensure state is updated with correct type
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getdata();
    }, []);
    return (react_1["default"].createElement("div", { className: "flex 0 flex-col py-9 h-screen lg:w-full xl:max-w-[900px] bg-red-50 " },
        react_1["default"].createElement("h2", { className: "text-29 font-semibold px-7" }, "Add Product"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "flex  items-start gap-3 px-4 justify-start w-full py-4" },
            react_1["default"].createElement("div", { className: "flex px-3 flex-col gap-3 items-center justify-normal" },
                react_1["default"].createElement("input", { type: "file", id: "imageBig", name: "Bigimage", onChange: handleImageChange, className: "rounded-md size-[100px] hidden" }),
                react_1["default"].createElement("label", { htmlFor: "imageBig", className: "flex items-center bg-neutral-300 justify-center text-center text-[150px] rounded-md size-[300px]" }, selectedImage ? (react_1["default"].createElement(image_1["default"], { src: selectedImage, alt: "Selected Image", width: 300, height: 300, className: "size-[300px]" })) : ("+")),
                react_1["default"].createElement("div", { className: "flex items-center w-[300px] gap-4 justify-between" }, smallImageFile.map(function (image, index) { return (react_1["default"].createElement(ImageSmallInput_1["default"], { key: index, name: "imageSmall" + index, image: image, onImageChange: function (e) { return handleSmallImageChange(index, e); } })); }))),
            react_1["default"].createElement("div", { className: "flex gap-3 items-start w-full  justify-center flex-col" },
                react_1["default"].createElement("div", { className: "w-full gap-3 flex items-start h-[70px] justify-between" },
                    react_1["default"].createElement(InputCheckout_1["default"], { label: "Product Name", name: "name", placeholder: "Product name", error: "" }),
                    react_1["default"].createElement(InputCheckout_1["default"], { label: "Product Price", name: "price", placeholder: "Product price", error: "" })),
                react_1["default"].createElement("div", { className: "w-full mt-3 items-start flex-col justify-start gap-6 flex" },
                    react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2" },
                        react_1["default"].createElement("h2", { className: "font-semibold" }, "Category:"),
                        react_1["default"].createElement("select", { name: "category", className: "py-1 px-3 bg-neutral-300 w-[130px] rounded-md outline-none border-none", onChange: function (e) { return setselectedCategoryy(e.target.value); } }, catagory &&
                            catagory.map(function (item) { return (react_1["default"].createElement("option", { key: item.name, value: item.name }, item.name)); }))),
                    react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2" },
                        react_1["default"].createElement("h2", { className: "font-semibold" }, "Brand:"),
                        react_1["default"].createElement("select", { name: "brand", className: "py-1 px-3 bg-neutral-300 w-[130px] rounded-md outline-none border-none" }, catagory === null || catagory === void 0 ? void 0 : catagory.map(function (item) {
                            if (item.name === selectedCategoryy) {
                                return item.brands.map(function (brand) { return (react_1["default"].createElement("option", { key: brand, value: brand }, brand)); });
                            }
                        }))),
                    react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2" },
                        react_1["default"].createElement("h2", { className: "font-semibold" }, "Colors:"),
                        react_1["default"].createElement("div", { className: "flex items-center gap-5" }, catagory === null || catagory === void 0 ? void 0 : catagory.filter(function (item) { return item.name === selectedCategoryy; }).map(function (filteredItem) { return (react_1["default"].createElement("div", { key: filteredItem.name, className: " flex items-center justify-start gap-3" }, filteredItem.colors.map(function (color) { return (react_1["default"].createElement("div", { key: color.name, className: "flex gap-1 items-center", onClick: function () {
                                setselectedcolor(function (prevSelected) {
                                    var _a;
                                    // Check if the selected color already exists
                                    var colorExists = prevSelected.some(function (item) { return item.color === color.color; });
                                    if (!colorExists) {
                                        // Find the color's name from available colors
                                        var colorName = (_a = filteredItem.colors.find(function (item) { return item.color === color.color; })) === null || _a === void 0 ? void 0 : _a.name;
                                        // Update the selected colors array by adding the new color
                                        return __spreadArrays(prevSelected, [
                                            { name: colorName || "", color: color.color },
                                        ]);
                                    }
                                    // If color already exists, return the current state (no change)
                                    return prevSelected;
                                });
                                // Optional: Handle setColors if you want to update a different state as well
                                setselectedcolor(function (prevColors) {
                                    var _a;
                                    var colorExists = prevColors.some(function (item) { return item.color === color.color; });
                                    if (!colorExists) {
                                        var colorName = (_a = filteredItem.colors.find(function (item) { return item.color === color.color; })) === null || _a === void 0 ? void 0 : _a.name;
                                        // Add the color to the color state if it doesn't exist
                                        return __spreadArrays(prevColors, [
                                            { name: colorName || "", color: color.color },
                                        ]);
                                    }
                                    return prevColors;
                                });
                            } },
                            react_1["default"].createElement("input", { type: "checkbox", value: color.name, name: "colors", id: color.name }),
                            react_1["default"].createElement("label", { htmlFor: color.name }, color.name))); }))); })))),
                react_1["default"].createElement("div", { className: "flex h-[60px] items-center py-2 w-full justify-between" },
                    react_1["default"].createElement("div", { className: "w-[49%] flex items-center justify-between" },
                        react_1["default"].createElement("label", { htmlFor: "discount" }, "Discount"),
                        react_1["default"].createElement(switch_1.Switch, { id: "discount", onCheckedChange: function (e) { return setdiscount(e); } })),
                    discount && (react_1["default"].createElement("div", { className: "w-1/2" },
                        react_1["default"].createElement(InputCheckout_1["default"], { label: "Discount", name: "discount", placeholder: "Product discount", error: "", type: "number" })))),
                react_1["default"].createElement("div", { className: " py-1 w-full  cursor-pointer rounded-md flex-col items-center justify-center flex gap-2" },
                    react_1["default"].createElement("div", { className: "flex justify-between w-full items-center" },
                        react_1["default"].createElement("h2", null, "product details"),
                        react_1["default"].createElement(dropdown_menu_1.DropdownMenu, null,
                            react_1["default"].createElement(dropdown_menu_1.DropdownMenuTrigger, { className: "flex items-center w-[70%]  justify-center gap-2" },
                                "Detials ",
                                react_1["default"].createElement(io_1.IoMdArrowDropdown, null)),
                            react_1["default"].createElement(dropdown_menu_1.DropdownMenuContent, { className: "bg-white min-w-[400px]" }, Details.map(function (item, index) { return (react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { key: item.description, className: " " + (index % 2 === 0 ? "bg-neutral-50" : "bg-neutral-200") + " flex items-center justify-between  px-4" },
                                react_1["default"].createElement("span", { className: "text-neutral-600" }, item.title),
                                " ",
                                react_1["default"].createElement("span", { className: "text-neutral-500" }, item.description))); })))),
                    react_1["default"].createElement("div", { className: "flex items-center gap-2 w-full justify-between" },
                        react_1["default"].createElement(InputCheckout_1["default"], { label: "Title Detials", name: "titleDetial", placeholder: " enter the title details", ref: titleRef }),
                        react_1["default"].createElement(InputCheckout_1["default"], { label: "description  Detials", name: "descriptionDetial", placeholder: "description details", ref: descriptionRef }),
                        react_1["default"].createElement("button", { type: "button", onClick: handleAdddetail, className: "px-5 py-2 bg-black text-white rounded-lg " }, "add"))),
                react_1["default"].createElement("div", { className: "flex justify-end items-center w-full gap-4 " },
                    react_1["default"].createElement("button", { type: "button", className: "px-5 py-2 rounded-lg border border-black hover:bg-neutral-200 duration-300 transition-all" }, "Back"),
                    react_1["default"].createElement("button", { className: " px-5 py-2  border border-black text-white bg-black rounded-lg hover:bg-neutral-200 hover:text-black duration-300 transition-all " }, "Add Product"))))));
};
exports["default"] = Page;
