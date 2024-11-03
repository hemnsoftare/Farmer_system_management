"use client";
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
exports.__esModule = true;
var react_1 = require("react");
var md_1 = require("react-icons/md");
var HeaderProductIMage_1 = require("./HeaderProductIMage");
var HeaderproductInfo_1 = require("./HeaderproductInfo");
var nextjs_1 = require("@clerk/nextjs");
var react_redux_1 = require("react-redux");
var Order_1 = require("@/lib/action/Order");
var navigation_1 = require("next/navigation");
var HeaderProduct = function (_a) {
    var item = _a.item;
    var cartItems = react_redux_1.useSelector(function (state) { return state.cart || []; });
    // Find existing items in the cart and initialize color-based quantities
    var initialQuantities = cartItems.reduce(function (acc, cartItem) {
        if (cartItem.name === item.name) {
            acc[cartItem.colors.name] = cartItem.quantity;
        }
        return acc;
    }, {});
    var _b = react_1.useState(initialQuantities), quantities = _b[0], setQuantities = _b[1];
    var _c = react_1.useState(item.colors[0] || { name: "", color: "" }), selectedColor = _c[0], setSelectedColor = _c[1];
    var user = nextjs_1.useUser().user;
    var dispatch = react_redux_1.useDispatch();
    var router = navigation_1.useRouter();
    // Update quantity for the selected color
    var handleQuantityChange = function (type) {
        setQuantities(function (prevQuantities) {
            var _a;
            return (__assign(__assign({}, prevQuantities), (_a = {}, _a[selectedColor.name] = Math.max(1, (prevQuantities[selectedColor.name] || 1) +
                (type === "increase" ? 1 : -1)), _a)));
        });
    };
    var handleAddToCart = function () {
        dispatch(Order_1.addToCart({
            colors: selectedColor,
            image: item.bigimageUrl,
            name: item.name,
            price: item.price,
            discount: item.discount ? item.discount : 0,
            quantity: quantities[selectedColor.name] || 1
        }));
        router.push("/products/" + item.category);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "flex w-full flex-col gap-2 items-center justify-center" },
            react_1["default"].createElement(HeaderProductIMage_1["default"], { mainImage: item.bigimageUrl, childImage: item.smallimageUrl })),
        react_1["default"].createElement("div", { className: "flex lg:w-full shadow-md hover:bg-gray-50 hover:shadow-sm transition-all duration-300 p-2 h-full md:w-[80%] items-center gap-6 flex-col justify-center" },
            react_1["default"].createElement(HeaderproductInfo_1["default"], { productinfos: {
                    colors: item.colors,
                    infos: item.details,
                    name: item.name,
                    price: item.price,
                    brand: item.brand,
                    discount: item.discount
                }, onQuantity: handleQuantityChange, quantity: quantities[selectedColor.name] || 1, onSelectedColor: function (color) { return setSelectedColor(color); }, selectedColor: selectedColor.name }),
            react_1["default"].createElement("button", { disabled: !user, onClick: handleAddToCart, className: (user ? "bg-primary hover:bg-blue-700 " : "bg-primary-75") + " flex items-center mb-2 lg:w-[79%] self-center md:w-full py-2 rounded-lg duration-300 justify-center gap-2 text-white" },
                react_1["default"].createElement(md_1.MdOutlineShoppingCart, null),
                react_1["default"].createElement("span", null, "Add to Cart")))));
};
exports["default"] = HeaderProduct;
