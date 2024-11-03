"use strict";
exports.__esModule = true;
var react_1 = require("react");
var InputCheckout_1 = require("./InputCheckout");
var react_dialog_1 = require("@radix-ui/react-dialog");
var io_1 = require("react-icons/io");
var FormCheckout = function (_a) {
    var handleSubmit = _a.handleSubmit, errors = _a.errors;
    return (react_1["default"].createElement("form", { onSubmit: function (e) { return handleSubmit(e); }, className: "w-full flex gap-4 flex-col items-start px-1" },
        react_1["default"].createElement(InputCheckout_1["default"], { label: "full name", name: "fullName", placeholder: "hemn software" }),
        react_1["default"].createElement(InputCheckout_1["default"], { label: "phone number ", name: "phoneNumber", placeholder: "+964 750 226 7967" }),
        react_1["default"].createElement(InputCheckout_1["default"], { label: "street name ", name: "streetName", placeholder: "enter your street" }),
        react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2" },
            " ",
            react_1["default"].createElement(InputCheckout_1["default"], { label: "city", name: "city", placeholder: "erbile" }),
            react_1["default"].createElement(InputCheckout_1["default"], { label: "Select region", name: "Select_region", placeholder: "Select region" })),
        react_1["default"].createElement("div", { className: "relative w-full group flex items-start  flex-col" },
            react_1["default"].createElement("span", { className: "absolute text-16 px-1 opacity-0 group-focus-within:opacity-100 duration-200 transition-all bg-white text-blue-400 -top-3 left-5 rounded-lg" }, "note"),
            react_1["default"].createElement("textarea", { 
                // disabled={!isdisabled}
                // type={type ? type : "text"}
                // ref={ref}
                name: "note", placeholder: "note", className: (false ? "border-neutral-300" : "border-neutral-400") + " outline-none placeholder:text-neutral-300 group-focus-within:placeholder:text-blue-500 focus:border-blue-600 shadow-inner border-2  rounded-lg text-blue-500 px-5 py-2 w-full focus:shadow-blue-100 shadow-neutral-100" }),
            react_1["default"].createElement(io_1.IoIosCloseCircleOutline, { className: "absolute scale-[1.05] right-5 top-[15px]" }),
            react_1["default"].createElement("p", { className: "text-red-700 ml-2 text-12 text-shadow-lg" })),
        react_1["default"].createElement("p", { className: "flex px-4 items-center gap-3" },
            react_1["default"].createElement("input", { type: "checkbox", id: "accept", name: "accept" }),
            " ",
            react_1["default"].createElement("label", { htmlFor: "accept" }, "I am the recipient of my order")),
        react_1["default"].createElement("div", { className: "flex w-full items-center gap-3" },
            react_1["default"].createElement(react_dialog_1.DialogTrigger, null,
                " ",
                react_1["default"].createElement("button", { type: "button", className: "border-blue-500 w-full text-blue-500 px-4 py-2 font-semibold border rounded-lg" }, "back")),
            react_1["default"].createElement("button", { type: "submit", className: "bg-blue-500 w-full text-white px-4 py-2 font-semibold rounded-lg" }, "submit"))));
};
exports["default"] = FormCheckout;
