"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var tb_1 = require("react-icons/tb");
var md_1 = require("react-icons/md");
var go_1 = require("react-icons/go");
var react_redux_1 = require("react-redux");
var Order_1 = require("@/lib/action/Order");
var CartItem = function (_a) {
    var item = _a.item, type = _a.type;
    var dispatch = react_redux_1.useDispatch();
    return (react_1["default"].createElement("div", { className: " " + (type === "headerItem"
            ? "items-center min-w-[500px]"
            : "  w-full items-center") + " shadow-md p-2   flex gap-2 rounded-md group duration-300 hover:shadow-lg " },
        react_1["default"].createElement(image_1["default"], { src: item.image, alt: "image ", width: 174, height: 140, className: " " + (type === "headerItem" ? "w-[154px] h-[100px]" : " w-[200px] h-[150px]") + "  group-hover:scale-[1.1] duration-300 transition-all " }),
        react_1["default"].createElement("div", { className: "flex flex-col h-full  items-start bg-white   shadow-neutral-50    w-full justify-between py-3 gap-2" },
            react_1["default"].createElement("h2", { className: "lg:text-16 md:text-14 w-full font-semibold text-neutral-900 text-wrap" }, item.name),
            react_1["default"].createElement("p", { className: "text-10 flex items-center gap-2 text-neutral-600" },
                react_1["default"].createElement("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.colors.color } }),
                react_1["default"].createElement("span", null, item.colors.name)),
            react_1["default"].createElement("p", { className: " " + (type === "headerItem" && "hidden") + " flex  gap-2 md:text-12 lg:text-14 items-center" },
                react_1["default"].createElement(tb_1.TbTruckDelivery, { className: "text-blue-500 w-4 h-4" }),
                react_1["default"].createElement("span", null, "free")),
            react_1["default"].createElement("p", { className: " " + (type === "headerItem" && "hidden") + " flex  gap-2 md:text-12 lg:text-14 items-center" },
                react_1["default"].createElement(md_1.MdOutlineVerified, { className: "text-blue-500 w-4 h-4" }),
                react_1["default"].createElement("span", null, "guarantee")),
            react_1["default"].createElement("div", { className: "flex items-center  w-full gap-6 justify-between " },
                react_1["default"].createElement("p", { className: "text-12 text-neutral-900" },
                    "$ ",
                    item.price * item.quantity),
                react_1["default"].createElement("div", { className: "flex  items-center  px-5 gap-2" },
                    react_1["default"].createElement(go_1.GoTrash, { color: "red" }),
                    react_1["default"].createElement("button", { onClick: function () {
                            return dispatch(Order_1.updateItem({
                                name: item.name,
                                type: "increase",
                                color: item.colors.color
                            }));
                        }, className: "p-1 hover:bg-purple-50" }, "+"),
                    react_1["default"].createElement("span", { className: "border-b-2  border-neutral-300" }, " " + item.quantity + " "),
                    react_1["default"].createElement("button", { 
                        // disabled={item.quantity === 1}
                        onClick: function () {
                            return dispatch(Order_1.updateItem({
                                name: item.name,
                                type: "decrease",
                                color: item.colors.color
                            }));
                        }, className: "p-1 hover:bg-purple-50" }, "-"))))));
};
exports["default"] = CartItem;
