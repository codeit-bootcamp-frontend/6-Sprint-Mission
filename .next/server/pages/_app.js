/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/Container.module.css":
/*!*****************************************!*\
  !*** ./components/Container.module.css ***!
  \*****************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"container\": \"Container_container__pBLEY\",\n\t\"page\": \"Container_page__fwuj3\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0NvbnRhaW5lci5tb2R1bGUuY3NzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZS13ZWVrbHktbWlzc2lvbi8uL2NvbXBvbmVudHMvQ29udGFpbmVyLm1vZHVsZS5jc3M/ZDAyZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjb250YWluZXJcIjogXCJDb250YWluZXJfY29udGFpbmVyX19wQkxFWVwiLFxuXHRcInBhZ2VcIjogXCJDb250YWluZXJfcGFnZV9fZnd1ajNcIlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Container.module.css\n");

/***/ }),

/***/ "./components/Header.module.css":
/*!**************************************!*\
  !*** ./components/Header.module.css ***!
  \**************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"header\": \"Header_header__KwdYD\",\n\t\"container\": \"Header_container__vrI8C\",\n\t\"leftNav\": \"Header_leftNav__6BKAu\",\n\t\"rightNav\": \"Header_rightNav__puKho\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWRlci5tb2R1bGUuY3NzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmUtd2Vla2x5LW1pc3Npb24vLi9jb21wb25lbnRzL0hlYWRlci5tb2R1bGUuY3NzP2VhODQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiaGVhZGVyXCI6IFwiSGVhZGVyX2hlYWRlcl9fS3dkWURcIixcblx0XCJjb250YWluZXJcIjogXCJIZWFkZXJfY29udGFpbmVyX192ckk4Q1wiLFxuXHRcImxlZnROYXZcIjogXCJIZWFkZXJfbGVmdE5hdl9fNkJLQXVcIixcblx0XCJyaWdodE5hdlwiOiBcIkhlYWRlcl9yaWdodE5hdl9fcHVLaG9cIlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Header.module.css\n");

/***/ }),

/***/ "./components/Container.tsx":
/*!**********************************!*\
  !*** ./components/Container.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Container_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Container.module.css */ \"./components/Container.module.css\");\n/* harmony import */ var _components_Container_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_Container_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst Container = ({ className = \"\", page = false, children })=>{\n    const classNames = `${(_components_Container_module_css__WEBPACK_IMPORTED_MODULE_2___default().container)} ${page ? (_components_Container_module_css__WEBPACK_IMPORTED_MODULE_2___default().page) : \"\"} ${className}`;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: classNames,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Container.tsx\",\n        lineNumber: 19,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0NvbnRhaW5lci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBdUQ7QUFDN0I7QUFRMUIsTUFBTUUsWUFBc0MsQ0FBQyxFQUMzQ0MsWUFBWSxFQUFFLEVBQ2RDLE9BQU8sS0FBSyxFQUNaQyxRQUFRLEVBQ1Q7SUFDQyxNQUFNQyxhQUFhLENBQUMsRUFBRU4sbUZBQWdCLENBQUMsQ0FBQyxFQUN0Q0ksT0FBT0osOEVBQVcsR0FBRyxHQUN0QixDQUFDLEVBQUVHLFVBQVUsQ0FBQztJQUVmLHFCQUFPLDhEQUFDSztRQUFJTCxXQUFXRztrQkFBYUQ7Ozs7OztBQUN0QztBQUNBLGlFQUFlSCxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmUtd2Vla2x5LW1pc3Npb24vLi9jb21wb25lbnRzL0NvbnRhaW5lci50c3g/OTMxZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVzIGZyb20gXCJAL2NvbXBvbmVudHMvQ29udGFpbmVyLm1vZHVsZS5jc3NcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW50ZXJmYWNlIENvbnRhaW5lclByb3BzIHtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFnZT86IGJvb2xlYW47XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufVxyXG5cclxuY29uc3QgQ29udGFpbmVyOiBSZWFjdC5GQzxDb250YWluZXJQcm9wcz4gPSAoe1xyXG4gIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgcGFnZSA9IGZhbHNlLFxyXG4gIGNoaWxkcmVuLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgY2xhc3NOYW1lcyA9IGAke3N0eWxlcy5jb250YWluZXJ9ICR7XHJcbiAgICBwYWdlID8gc3R5bGVzLnBhZ2UgOiBcIlwiXHJcbiAgfSAke2NsYXNzTmFtZX1gO1xyXG5cclxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9PntjaGlsZHJlbn08L2Rpdj47XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIl0sIm5hbWVzIjpbInN0eWxlcyIsIlJlYWN0IiwiQ29udGFpbmVyIiwiY2xhc3NOYW1lIiwicGFnZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lcyIsImNvbnRhaW5lciIsImRpdiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Container.tsx\n");

/***/ }),

/***/ "./components/Header.tsx":
/*!*******************************!*\
  !*** ./components/Header.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header.module.css */ \"./components/Header.module.css\");\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container */ \"./components/Container.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction Header() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_4___default().header),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Container__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_4___default().leftNav),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                src: \"/icon/header-logoIcon.png\",\n                                alt: \"Home Logo\",\n                                width: 153,\n                                height: 51,\n                                priority: true\n                            }, void 0, false, {\n                                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                                lineNumber: 12,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                            lineNumber: 11,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/boards\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: \"자유게시판\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                                lineNumber: 21,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                            lineNumber: 20,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/market\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: \"중고마켓\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                                lineNumber: 24,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                    lineNumber: 10,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_4___default().rightNav),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/join\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                src: \"/icon/profile-login-icon.png\",\n                                alt: \"user profile\",\n                                width: 40,\n                                height: 40\n                            }, void 0, false, {\n                                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                                lineNumber: 29,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                            lineNumber: 28,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/setting\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: \"설정\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                            lineNumber: 36,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n                    lineNumber: 27,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\components\\\\Header.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNkI7QUFDWTtBQUNMO0FBQ0w7QUFFaEIsU0FBU0k7SUFDdEIscUJBQ0UsOERBQUNDO1FBQU9DLFdBQVdMLGtFQUFhO2tCQUM5Qiw0RUFBQ0Msa0RBQVNBO1lBQUNJLFdBQVdMLHFFQUFnQjs7OEJBQ3BDLDhEQUFDTztvQkFBSUYsV0FBV0wsbUVBQWM7O3NDQUM1Qiw4REFBQ0Qsa0RBQUlBOzRCQUFDVSxNQUFLO3NDQUNULDRFQUFDUCxtREFBS0E7Z0NBQ0pRLEtBQUk7Z0NBQ0pDLEtBQUk7Z0NBQ0pDLE9BQU87Z0NBQ1BDLFFBQVE7Z0NBQ1JDLFFBQVE7Ozs7Ozs7Ozs7O3NDQUdaLDhEQUFDZixrREFBSUE7NEJBQUNVLE1BQUs7c0NBQ1QsNEVBQUNGOzBDQUFJOzs7Ozs7Ozs7OztzQ0FFUCw4REFBQ1Isa0RBQUlBOzRCQUFDVSxNQUFLO3NDQUNULDRFQUFDRjswQ0FBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBR1QsOERBQUNBO29CQUFJRixXQUFXTCxvRUFBZTs7c0NBQzdCLDhEQUFDRCxrREFBSUE7NEJBQUNVLE1BQUs7c0NBQ1QsNEVBQUNQLG1EQUFLQTtnQ0FDSlEsS0FBSTtnQ0FDSkMsS0FBSTtnQ0FDSkMsT0FBTztnQ0FDUEMsUUFBUTs7Ozs7Ozs7Ozs7c0NBR1osOERBQUNkLGtEQUFJQTs0QkFBQ1UsTUFBSztzQ0FDVCw0RUFBQ0Y7MENBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZS13ZWVrbHktbWlzc2lvbi8uL2NvbXBvbmVudHMvSGVhZGVyLnRzeD8wMzY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9IZWFkZXIubW9kdWxlLmNzc1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlcigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxyXG4gICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sZWZ0TmF2fT5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XHJcbiAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgIHNyYz1cIi9pY29uL2hlYWRlci1sb2dvSWNvbi5wbmdcIlxyXG4gICAgICAgICAgICAgIGFsdD1cIkhvbWUgTG9nb1wiXHJcbiAgICAgICAgICAgICAgd2lkdGg9ezE1M31cclxuICAgICAgICAgICAgICBoZWlnaHQ9ezUxfVxyXG4gICAgICAgICAgICAgIHByaW9yaXR5XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL2JvYXJkc1wiPlxyXG4gICAgICAgICAgICA8ZGl2PuyekOycoOqyjOyLnO2MkDwvZGl2PlxyXG4gICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9tYXJrZXRcIj5cclxuICAgICAgICAgICAgPGRpdj7spJHqs6Drp4jsvJM8L2Rpdj5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJpZ2h0TmF2fT5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvam9pblwiPlxyXG4gICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICBzcmM9XCIvaWNvbi9wcm9maWxlLWxvZ2luLWljb24ucG5nXCJcclxuICAgICAgICAgICAgICBhbHQ9XCJ1c2VyIHByb2ZpbGVcIlxyXG4gICAgICAgICAgICAgIHdpZHRoPXs0MH1cclxuICAgICAgICAgICAgICBoZWlnaHQ9ezQwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9zZXR0aW5nXCI+XHJcbiAgICAgICAgICAgIDxkaXY+7ISk7KCVPC9kaXY+XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiTGluayIsInN0eWxlcyIsIkNvbnRhaW5lciIsIkltYWdlIiwiSGVhZGVyIiwiaGVhZGVyIiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiZGl2IiwibGVmdE5hdiIsImhyZWYiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsInByaW9yaXR5IiwicmlnaHROYXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Header.tsx\n");

/***/ }),

/***/ "./lib/ThemeContext.js":
/*!*****************************!*\
  !*** ./lib/ThemeContext.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeContext: () => (/* binding */ ThemeContext),\n/* harmony export */   \"default\": () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"white\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        document.body.classList.add(theme);\n        return ()=>{\n            document.body.classList.remove(theme);\n        };\n    }, [\n        theme\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            setTheme\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\lib\\\\ThemeContext.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this);\n}\nfunction useTheme() {\n    const themeContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n    if (!themeContext) {\n        throw new Error(\"ThemeContext 안에서 써야 합니다.\");\n    }\n    return themeContext;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvVGhlbWVDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXVFO0FBRWhFLE1BQU1JLDZCQUFlSixvREFBYUEsR0FBRztBQUU3QixTQUFTSyxjQUFjLEVBQUVDLFFBQVEsRUFBRTtJQUNoRCxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR0wsK0NBQVFBLENBQUM7SUFDbkNELGdEQUFTQSxDQUFDO1FBQ1JPLFNBQVNDLElBQUksQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUNMO1FBQzVCLE9BQU87WUFDTEUsU0FBU0MsSUFBSSxDQUFDQyxTQUFTLENBQUNFLE1BQU0sQ0FBQ047UUFDakM7SUFDRixHQUFHO1FBQUNBO0tBQU07SUFFVixxQkFDRSw4REFBQ0gsYUFBYVUsUUFBUTtRQUFDQyxPQUFPO1lBQUVSO1lBQU9DO1FBQVM7a0JBQzdDRjs7Ozs7O0FBR1A7QUFFTyxTQUFTVTtJQUNkLE1BQU1DLGVBQWVoQixpREFBVUEsQ0FBQ0c7SUFDaEMsSUFBSSxDQUFDYSxjQUFjO1FBQ2pCLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZS13ZWVrbHktbWlzc2lvbi8uL2xpYi9UaGVtZUNvbnRleHQuanM/OWE5YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgVGhlbWVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGhlbWVQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zdCBbdGhlbWUsIHNldFRoZW1lXSA9IHVzZVN0YXRlKFwid2hpdGVcIik7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGVtZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpO1xyXG4gICAgfTtcclxuICB9LCBbdGhlbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdGhlbWUsIHNldFRoZW1lIH19PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlVGhlbWUoKSB7XHJcbiAgY29uc3QgdGhlbWVDb250ZXh0ID0gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xyXG4gIGlmICghdGhlbWVDb250ZXh0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVtZUNvbnRleHQg7JWI7JeQ7IScIOyNqOyVvCDtlanri4jri6QuXCIpO1xyXG4gIH1cclxuICByZXR1cm4gdGhlbWVDb250ZXh0O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiVGhlbWVDb250ZXh0IiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwidGhlbWUiLCJzZXRUaGVtZSIsImRvY3VtZW50IiwiYm9keSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VUaGVtZSIsInRoZW1lQ29udGV4dCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/ThemeContext.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Container */ \"./components/Container.tsx\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Header */ \"./components/Header.tsx\");\n/* harmony import */ var _lib_ThemeContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/ThemeContext */ \"./lib/ThemeContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_ThemeContext__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\pages\\\\_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Container__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                page: true,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\pages\\\\_app.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\pages\\\\_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\codeit\\\\6-Sprint-Mission\\\\pages\\\\_app.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0M7QUFDTjtBQUNNO0FBRWpCO0FBR2YsU0FBU0csSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxxQkFDRSw4REFBQ0gseURBQWFBOzswQkFDWiw4REFBQ0QsMERBQU1BOzs7OzswQkFDUCw4REFBQ0QsNkRBQVNBO2dCQUFDTSxNQUFNOzBCQUNmLDRFQUFDRjtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZlLXdlZWtseS1taXNzaW9uLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gXCJAL2NvbXBvbmVudHMvQ29udGFpbmVyXCI7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIkAvY29tcG9uZW50cy9IZWFkZXJcIjtcclxuaW1wb3J0IFRoZW1lUHJvdmlkZXIgZnJvbSBcIkAvbGliL1RoZW1lQ29udGV4dFwiO1xyXG5cclxuaW1wb3J0IFwiQC9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lUHJvdmlkZXI+XHJcbiAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgPENvbnRhaW5lciBwYWdlPXt0cnVlfT5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgPC9UaGVtZVByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNvbnRhaW5lciIsIkhlYWRlciIsIlRoZW1lUHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJwYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();