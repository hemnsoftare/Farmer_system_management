"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CartItem_1 = require("@/components/home/header/CartItem");
var react_dialog_1 = require("@radix-ui/react-dialog");
var dialog_1 = require("@/components/ui/dialog");
var zod_1 = require("zod");
var NotSuccess_1 = require("@/components/Cart/NotSuccess");
var success_1 = require("@/components/Cart/success");
var FormCheckout_1 = require("@/components/Cart/FormCheckout");
var react_redux_1 = require("react-redux");
var Page = function () {
    var cartItems = react_redux_1.useSelector(function (state) { return state.cart || []; });
    var _a = react_1.useState({
        discount: 0,
        totalPrice: 0
    }), totalPrice = _a[0], settotalPrice = _a[1];
    var totalItems = cartItems.length;
    var _b = react_1.useState(false), showSuccess = _b[0], setShowSuccess = _b[1];
    var _c = react_1.useState(false), showNotSuccess = _c[0], setShowNotSuccess = _c[1];
    var _d = react_1.useState({
        fullName: "",
        phoneNumber: "",
        streetName: "",
        city: "",
        recipientName: "",
        phoneNumberAnother: ""
    }), error = _d[0], seterror = _d[1];
    console.log(error);
    var formSchema = zod_1.z.object({
        fullName: zod_1.z.string().min(1, "Full name is required"),
        phoneNumber: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
        streetName: zod_1.z.string().min(1, "Street name is required"),
        city: zod_1.z.string().min(1, "City is required"),
        recipientName: zod_1.z.string().optional(),
        phoneNumberAnother: zod_1.z.string().optional()
    });
    var handleSubmit = function (e) {
        e.preventDefault();
        var datafrom = new FormData(e.currentTarget);
        var data = Object.fromEntries(datafrom.entries());
        console.log(data);
        var validate = formSchema.safeParse(data);
        if (validate.success) {
            setShowSuccess(true);
            // Clear errors if validation is successful
            seterror({
                fullName: "",
                phoneNumber: "",
                streetName: "",
                city: "",
                recipientName: "",
                phoneNumberAnother: ""
            });
        }
        else {
            // Initialize an empty error object with all properties as empty strings
            setShowNotSuccess(true);
            var errors_1 = {
                fullName: "",
                phoneNumber: "",
                streetName: "",
                city: "",
                recipientName: "",
                phoneNumberAnother: ""
            };
            validate.error.errors.forEach(function (error) {
                var fieldName = error.path[0];
                errors_1[fieldName] = error.message;
            });
            seterror(errors_1);
        }
    };
    react_1.useEffect(function () {
        var totalPriceitem = cartItems.reduce(function (accumulator, item) { return accumulator + item.price * item.quantity; }, 0);
        var totalDiscount = cartItems.reduce(function (accumulator, item) {
            return accumulator +
                (item.discount
                    ? item.price * item.quantity * (0.01 * item.discount)
                    : 0);
        }, 0);
        settotalPrice({ totalPrice: totalPriceitem, discount: totalDiscount });
    }, [cartItems]);
    return (react_1["default"].createElement("div", { className: "fled py-8 flex-col  justify-center px-2 items-center" },
        react_1["default"].createElement("div", { className: "m-3text-18" },
            react_1["default"].createElement("span", null, "Home >"),
            " ",
            react_1["default"].createElement("span", { className: "underline underline-offset-4 text-primary" }, " Cart")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("h2", null,
            "total price ", totalPrice === null || totalPrice === void 0 ? void 0 :
            totalPrice.totalPrice),
        react_1["default"].createElement("main", { className: "flex  items-start justify-between" },
            react_1["default"].createElement("div", { className: "w-[55%] flex flex-col gap-3" }, cartItems.map(function (cart, index) { return (react_1["default"].createElement(CartItem_1["default"], { key: index, item: cart })); })),
            react_1["default"].createElement("div", { className: "flex flex-col gap-3 border-neutral-300 shadow-md w-[35%] p-3 border-2 rounded-md items-start" },
                react_1["default"].createElement("h2", { className: "font-semibold" }, "Payment Details"),
                react_1["default"].createElement("ul", { className: "w-full text-12" },
                    react_1["default"].createElement("li", { className: "w-full capitalize flex items-center justify-between text-neutral-500" },
                        react_1["default"].createElement("span", null, "Subtotal"),
                        react_1["default"].createElement("span", null,
                            "$", totalPrice === null || totalPrice === void 0 ? void 0 :
                            totalPrice.totalPrice)),
                    react_1["default"].createElement("li", { className: "w-full capitalize flex items-center justify-between text-neutral-500" },
                        react_1["default"].createElement("span", null, "Discount"),
                        react_1["default"].createElement("span", null,
                            "-$", totalPrice === null || totalPrice === void 0 ? void 0 :
                            totalPrice.discount))),
                react_1["default"].createElement("div", { className: "bg-neutral-400 w-full h-[1px]" }),
                react_1["default"].createElement("p", { className: "flex items-center justify-between w-full" },
                    react_1["default"].createElement("span", { className: "font-semibold" }, "Grand Total"),
                    react_1["default"].createElement("span", { className: "font-semibold" },
                        "$",
                        ((totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice.totalPrice) - (totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice.discount)).toFixed(2))),
                react_1["default"].createElement("div", { className: "w-full text-center" },
                    react_1["default"].createElement(react_dialog_1.Dialog, null,
                        react_1["default"].createElement(dialog_1.DialogTrigger, { className: "w-full py-2 px-6 hover:bg-blue-700 duration-300 transition-all bg-primary text-white rounded-lg" }, "Proceed to checkout"),
                        react_1["default"].createElement(dialog_1.DialogContent, { className: "md:scale-[0.8] h-fit lg:scale-[0.8]" },
                            react_1["default"].createElement(dialog_1.DialogHeader, { className: "flex flex-col gap-3" },
                                !showSuccess && !showNotSuccess && (react_1["default"].createElement(dialog_1.DialogTitle, null, "Address details")),
                                showNotSuccess && (react_1["default"].createElement(NotSuccess_1["default"], { onClose: function () { return setShowNotSuccess(false); } })),
                                showSuccess && !showNotSuccess && (react_1["default"].createElement(success_1["default"], { onClose: function () { return setShowSuccess(false); } })),
                                !showSuccess && !showNotSuccess && (react_1["default"].createElement(FormCheckout_1["default"], { errors: error, handleSubmit: handleSubmit }))))))))));
};
exports["default"] = Page;
