/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_use_3_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_use_3_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_use_3_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _partials_header_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _partials_home_jet_sideview_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_partials_header_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_partials_home_jet_sideview_jpg__WEBPACK_IMPORTED_MODULE_4__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-btn {\n  height: 100px;\n  width: 300px;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 125px;\n  width: 100%;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0) 100%);\n}\nheader .logo-container {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") center center;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  position: absolute;\n  left: 10vw;\n  height: 150px;\n  width: 150px;\n}\n\n.header-nav-container {\n  width: 100%;\n}\n.header-nav-container nav ul {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 40px;\n  list-style: none;\n  height: 100px;\n  width: 100%;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  padding-inline-start: 0;\n}\n.header-nav-container nav ul li button {\n  cursor: pointer;\n  background: transparent;\n  border: none;\n}\n.header-nav-container nav ul li button:hover {\n  color: #fab02b;\n}\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n}\n.request-form-container #request-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n.request-form-container #request-form #pax {\n  width: 100px;\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n}\n.dropdown-options p {\n  display: block;\n  color: #000000;\n  padding: 5px;\n  text-decoration: none;\n  padding: 20px 40px;\n  cursor: pointer;\n}\n.dropdown-options p:hover {\n  color: #0a0a23;\n  background-color: #ddd;\n  border-radius: 5px;\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n\n.form-element {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  align-items: start;\n}\n.form-element > label {\n  color: #767979;\n}\n.form-element > input {\n  color: #3f6064;\n}\n\n.form-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  padding: 30px;\n}\n.form-inputs input:valid {\n  border: 2px solid lightgreen;\n}\n.form-inputs input:focus:valid {\n  background-color: lightgreen;\n}\n.form-inputs #destination:focus:invalid {\n  background-color: lightcoral;\n}\n\n.button-container button {\n  width: 10rem;\n  height: 2rem;\n  background: rgba(0, 0, 0, 0.5);\n  border: 1px solid #fab02b;\n  border-radius: 1px;\n  color: #fab02b;\n  cursor: pointer;\n}\n\n.error-message {\n  color: red;\n}\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}", "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css","webpack://./src/stylesheets/index.scss","webpack://./src/stylesheets/modules/_typography.scss","webpack://./src/stylesheets/modules/_colors.scss","webpack://./src/stylesheets/partials/_base.scss","webpack://./src/stylesheets/partials/_login.scss","webpack://./src/stylesheets/partials/header/_header.scss","webpack://./src/stylesheets/modules/_util.scss","webpack://./src/stylesheets/partials/home/_form.scss","webpack://./src/stylesheets/partials/home/_home-base.scss"],"names":[],"mappings":"AAAA,2EAAA;AAEA;+EAAA;AAGA;;;EAAA;AAKA;EACE,iBAAA,EAAA,MAAA;EACA,8BAAA,EAAA,MAAA;ACFF;;ADKA;+EAAA;AAGA;;EAAA;AAIA;EACE,SAAA;ACJF;;ADOA;;EAAA;AAIA;EACE,cAAA;ACLF;;ADQA;;;EAAA;AAKA;EACE,cAAA;EACA,gBAAA;ACNF;;ADSA;+EAAA;AAGA;;;EAAA;AAKA;EACE,uBAAA,EAAA,MAAA;EACA,SAAA,EAAA,MAAA;EACA,iBAAA,EAAA,MAAA;ACRF;;ADWA;;;EAAA;AAKA;EACE,iCAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;ACTF;;ADYA;+EAAA;AAGA;;EAAA;AAIA;EACE,6BAAA;ACXF;;ADcA;;;EAAA;AAKA;EACE,mBAAA,EAAA,MAAA;EACA,0BAAA,EAAA,MAAA;EACA,iCAAA,EAAA,MAAA;ACZF;;ADeA;;EAAA;AAIA;;EAEE,mBAAA;ACbF;;ADgBA;;;EAAA;AAKA;;;EAGE,iCAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;ACdF;;ADiBA;;EAAA;AAIA;EACE,cAAA;ACfF;;ADkBA;;;EAAA;AAKA;;EAEE,cAAA;EACA,cAAA;EACA,kBAAA;EACA,wBAAA;AChBF;;ADmBA;EACE,eAAA;AChBF;;ADmBA;EACE,WAAA;AChBF;;ADmBA;+EAAA;AAGA;;EAAA;AAIA;EACE,kBAAA;AClBF;;ADqBA;+EAAA;AAGA;;;EAAA;AAKA;;;;;EAKE,oBAAA,EAAA,MAAA;EACA,eAAA,EAAA,MAAA;EACA,iBAAA,EAAA,MAAA;EACA,SAAA,EAAA,MAAA;ACpBF;;ADuBA;;;EAAA;AAKA;QACQ,MAAA;EACN,iBAAA;ACrBF;;ADwBA;;;EAAA;AAKA;SACS,MAAA;EACP,oBAAA;ACtBF;;ADyBA;;EAAA;AAIA;;;;EAIE,0BAAA;ACvBF;;AD0BA;;EAAA;AAIA;;;;EAIE,kBAAA;EACA,UAAA;ACxBF;;AD2BA;;EAAA;AAIA;;;;EAIE,8BAAA;ACzBF;;AD4BA;;EAAA;AAIA;EACE,8BAAA;AC1BF;;AD6BA;;;;;EAAA;AAOA;EACE,sBAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;EACA,eAAA,EAAA,MAAA;EACA,UAAA,EAAA,MAAA;EACA,mBAAA,EAAA,MAAA;AC3BF;;AD8BA;;EAAA;AAIA;EACE,wBAAA;AC5BF;;AD+BA;;EAAA;AAIA;EACE,cAAA;AC7BF;;ADgCA;;;EAAA;AAKA;;EAEE,sBAAA,EAAA,MAAA;EACA,UAAA,EAAA,MAAA;AC9BF;;ADiCA;;EAAA;AAIA;;EAEE,YAAA;AC/BF;;ADkCA;;;EAAA;AAKA;EACE,6BAAA,EAAA,MAAA;EACA,oBAAA,EAAA,MAAA;AChCF;;ADmCA;;EAAA;AAIA;EACE,wBAAA;ACjCF;;ADoCA;;;EAAA;AAKA;EACE,0BAAA,EAAA,MAAA;EACA,aAAA,EAAA,MAAA;AClCF;;ADqCA;+EAAA;AAGA;;EAAA;AAIA;EACE,cAAA;ACpCF;;ADuCA;;EAAA;AAIA;EACE,kBAAA;ACrCF;;ADwCA;+EAAA;AAGA;;EAAA;AAIA;EACE,aAAA;ACvCF;;AD0CA;;EAAA;AAIA;EACE,aAAA;ACxCF;;AC3SA;EACE,cCPmB;EDSjB,gDARe;EASf,iBANa;ADmTjB;;AGpTA;EACE,sBAAA;AHuTF;;AGpTA;EACE,aAAA;EACA,YAAA;AHuTF;;AIlUA;EACE,aAAA;EACA,YAAA;AJqUF;;AKvUA;ECCE,aAAA;EACA,uBAAA;EACA,mBAAA;EDDA,aAAA;EACA,WAAA;EAEA,0GAAA;AL2UF;AKpUE;EACE,iEAAA;EACA,8BAAA;EACA,2BAAA;EACA,yBAAA;EACA,sBAAA;EAEA,kBAAA;EACA,UAAA;EACA,aAAA;EACA,YAAA;ALqUJ;;AKjUA;EACE,WAAA;ALoUF;AKlUE;EC5BA,aAAA;EACA,uBAAA;EACA,mBAAA;ED4BE,SAAA;EAEA,gBAAA;EACA,aAAA;EACA,WAAA;EAGE,qBAAA;EACA,mBAAA;EAEF,uBAAA;ALkUJ;AKhUI;EACE,eAAA;EACA,uBAAA;EACA,YAAA;ALkUN;AKhUM;EACE,cH1CQ;AF4WhB;;ADnXA,2EAAA;AAEA;+EAAA;AAGA;;;EAAA;AAKA;EACE,iBAAA,EAAA,MAAA;EACA,8BAAA,EAAA,MAAA;ACmXF;;ADhXA;+EAAA;AAGA;;EAAA;AAIA;EACE,SAAA;ACiXF;;AD9WA;;EAAA;AAIA;EACE,cAAA;ACgXF;;AD7WA;;;EAAA;AAKA;EACE,cAAA;EACA,gBAAA;AC+WF;;AD5WA;+EAAA;AAGA;;;EAAA;AAKA;EACE,uBAAA,EAAA,MAAA;EACA,SAAA,EAAA,MAAA;EACA,iBAAA,EAAA,MAAA;AC6WF;;AD1WA;;;EAAA;AAKA;EACE,iCAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;AC4WF;;ADzWA;+EAAA;AAGA;;EAAA;AAIA;EACE,6BAAA;AC0WF;;ADvWA;;;EAAA;AAKA;EACE,mBAAA,EAAA,MAAA;EACA,0BAAA,EAAA,MAAA;EACA,iCAAA,EAAA,MAAA;ACyWF;;ADtWA;;EAAA;AAIA;;EAEE,mBAAA;ACwWF;;ADrWA;;;EAAA;AAKA;;;EAGE,iCAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;ACuWF;;ADpWA;;EAAA;AAIA;EACE,cAAA;ACsWF;;ADnWA;;;EAAA;AAKA;;EAEE,cAAA;EACA,cAAA;EACA,kBAAA;EACA,wBAAA;ACqWF;;ADlWA;EACE,eAAA;ACqWF;;ADlWA;EACE,WAAA;ACqWF;;ADlWA;+EAAA;AAGA;;EAAA;AAIA;EACE,kBAAA;ACmWF;;ADhWA;+EAAA;AAGA;;;EAAA;AAKA;;;;;EAKE,oBAAA,EAAA,MAAA;EACA,eAAA,EAAA,MAAA;EACA,iBAAA,EAAA,MAAA;EACA,SAAA,EAAA,MAAA;ACiWF;;AD9VA;;;EAAA;AAKA;QACQ,MAAA;EACN,iBAAA;ACgWF;;AD7VA;;;EAAA;AAKA;SACS,MAAA;EACP,oBAAA;AC+VF;;AD5VA;;EAAA;AAIA;;;;EAIE,0BAAA;AC8VF;;AD3VA;;EAAA;AAIA;;;;EAIE,kBAAA;EACA,UAAA;AC6VF;;AD1VA;;EAAA;AAIA;;;;EAIE,8BAAA;AC4VF;;ADzVA;;EAAA;AAIA;EACE,8BAAA;AC2VF;;ADxVA;;;;;EAAA;AAOA;EACE,sBAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;EACA,cAAA,EAAA,MAAA;EACA,eAAA,EAAA,MAAA;EACA,UAAA,EAAA,MAAA;EACA,mBAAA,EAAA,MAAA;AC0VF;;ADvVA;;EAAA;AAIA;EACE,wBAAA;ACyVF;;ADtVA;;EAAA;AAIA;EACE,cAAA;ACwVF;;ADrVA;;;EAAA;AAKA;;EAEE,sBAAA,EAAA,MAAA;EACA,UAAA,EAAA,MAAA;ACuVF;;ADpVA;;EAAA;AAIA;;EAEE,YAAA;ACsVF;;ADnVA;;;EAAA;AAKA;EACE,6BAAA,EAAA,MAAA;EACA,oBAAA,EAAA,MAAA;ACqVF;;ADlVA;;EAAA;AAIA;EACE,wBAAA;ACoVF;;ADjVA;;;EAAA;AAKA;EACE,0BAAA,EAAA,MAAA;EACA,aAAA,EAAA,MAAA;ACmVF;;ADhVA;+EAAA;AAGA;;EAAA;AAIA;EACE,cAAA;ACiVF;;AD9UA;;EAAA;AAIA;EACE,kBAAA;ACgVF;;AD7UA;+EAAA;AAGA;;EAAA;AAIA;EACE,aAAA;AC8UF;;AD3UA;;EAAA;AAIA;EACE,aAAA;AC6UF;;AChqBA;EACE,cCPmB;EDSjB,gDARe;EASf,iBANa;ADwqBjB;;AGzqBA;EACE,sBAAA;AH4qBF;;AGzqBA;EACE,aAAA;EACA,YAAA;AH4qBF;;AOrrBA;EACE,YAAA;EACA,UAAA;EACA,gBAAA;APwrBF;AOtrBE;EDAA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;ECDE,WAAA;AP2rBJ;AOzrBI;EACE,YAAA;AP2rBN;;AOtrBA;EACE,qBAAA;EACA,kBAAA;APyrBF;;AOtrBA;EACE,aAAA;EACA,aAAA;EACA,kBAAA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,gDAAA;APyrBF;AOvrBE;EACE,cAAA;EACA,cAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EACA,eAAA;APyrBJ;AOvrBI;EACE,cAAA;EACA,sBAAA;EACA,kBAAA;APyrBN;;AOprBA;EACE,cAAA;APurBF;;AOnrBA;ED7CE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EC4CA,kBAAA;APyrBF;AOvrBE;EACE,cL9CY;AFuuBhB;AOtrBE;EACE,cLrDY;AF6uBhB;;AOprBA;EDhEE,aAAA;EACA,uBAAA;EACA,mBAAA;ECgEA,SAAA;EACA,aAAA;APyrBF;AOtrBI;EACE,4BAAA;APwrBN;AOrrBI;EACE,4BAAA;APurBN;AOjrBI;EACE,4BAAA;APmrBN;;AO7qBE;EACE,YAAA;EACA,YAAA;EAEA,8BAAA;EACA,yBAAA;EACE,kBAAA;EAEF,cL1FY;EK4FZ,eAAA;AP6qBJ;;AOzqBA;EACE,UAAA;AP4qBF;;AQlxBA;EACE,eAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,WAAA;EAEA,iFAAA;EACA,8BAAA;EACA,2BAAA;EACA,yBAAA;EACA,sBAAA;EAEA,WAAA;ARmxBF","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n","/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-btn {\n  height: 100px;\n  width: 300px;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 125px;\n  width: 100%;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0) 100%);\n}\nheader .logo-container {\n  background: url(\"./logo.png\") center center;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  position: absolute;\n  left: 10vw;\n  height: 150px;\n  width: 150px;\n}\n\n.header-nav-container {\n  width: 100%;\n}\n.header-nav-container nav ul {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 40px;\n  list-style: none;\n  height: 100px;\n  width: 100%;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  padding-inline-start: 0;\n}\n.header-nav-container nav ul li button {\n  cursor: pointer;\n  background: transparent;\n  border: none;\n}\n.header-nav-container nav ul li button:hover {\n  color: #fab02b;\n}\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n}\n.request-form-container #request-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n.request-form-container #request-form #pax {\n  width: 100px;\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n}\n.dropdown-options p {\n  display: block;\n  color: #000000;\n  padding: 5px;\n  text-decoration: none;\n  padding: 20px 40px;\n  cursor: pointer;\n}\n.dropdown-options p:hover {\n  color: #0a0a23;\n  background-color: #ddd;\n  border-radius: 5px;\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n\n.form-element {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  align-items: start;\n}\n.form-element > label {\n  color: #767979;\n}\n.form-element > input {\n  color: #3f6064;\n}\n\n.form-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  padding: 30px;\n}\n.form-inputs input:valid {\n  border: 2px solid lightgreen;\n}\n.form-inputs input:focus:valid {\n  background-color: lightgreen;\n}\n.form-inputs #destination:focus:invalid {\n  background-color: lightcoral;\n}\n\n.button-container button {\n  width: 10rem;\n  height: 2rem;\n  background: rgba(0, 0, 0, 0.5);\n  border: 1px solid #fab02b;\n  border-radius: 1px;\n  color: #fab02b;\n  cursor: pointer;\n}\n\n.error-message {\n  color: red;\n}\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(\"./jet-sideview.jpg\") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}","@import './colors';\n\n// Base Font\n$base-font-family: Verdana, Geneva, Tahoma, sans-serif;\n\n// Font Sizes\n$base-font-size: 1.2rem;\n\n* {\n  color: $primary-font-color;\n  font: {\n    family: $base-font-family;\n    size: $base-font-size;\n  }\n}","// Font Colors\n\n$primary-font-color: #e9e9e9;\n$secondary-font-color: #fab02b;\n\n// Brand Colors\n\n$brand-color-1: #fab02b;\n$brand-color-2: #3f6064;\n$brand-color-3: #041f1e;\n$brand-color-4: #8d5b4c;\n$brand-color-5: #767979;\n","@import '../../../node_modules/normalize.css/normalize';\n\n@import '../modules/all';\n@import '../modules/typography';\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}",".login-btn {\n  height: 100px;\n  width: 300px;\n}\n","header {\n  @include centered-flex-container;\n  height: 125px;\n  width: 100%;\n\n  background: linear-gradient(\n    180deg,\n    rgba(0, 0, 0, 0.5) 0%,\n    rgba(0, 0, 0, 0.35) 50%,\n    rgba(0, 0, 0, 0) 100%\n  );\n\n  .logo-container {\n    background: url('./logo.png') center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n\n    position: absolute;\n    left: 10vw;\n    height: 150px;\n    width: 150px;\n  }\n}\n\n.header-nav-container {\n  width: 100%;\n\n  nav ul {\n    @include centered-flex-container;\n    gap: 40px;\n\n    list-style: none;\n    height: 100px;\n    width: 100%;\n\n    margin-block: {\n      start: 0;\n      end: 0;\n    }\n    padding-inline-start: 0;\n\n    li button {\n      cursor: pointer;\n      background: transparent;\n      border: none;\n\n      &:hover {\n        color: $brand-color-1;\n      }\n    }\n  }\n}\n","@mixin centered-flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n@mixin vertical-centered-flex-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}","@import '../base';\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n\n  #request-form {\n    @include vertical-centered-flex-container;\n    width: 100%;\n\n    #pax {\n      width: 100px;\n    }\n  }\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n\n  p {\n    display: block;\n    color: #000000;\n    padding: 5px;\n    text-decoration: none;\n    padding: 20px 40px;\n    cursor: pointer;\n\n    &:hover {\n      color: #0a0a23;\n      background-color: #ddd;\n      border-radius: 5px;\n    }\n  }\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n// use js to make dropdown display block when input is in focus\n\n.form-element {\n  @include vertical-centered-flex-container;\n  align-items: start;\n\n  & > label {\n    color: $brand-color-5;\n  }\n\n  & > input {\n    color: $brand-color-2;\n  }\n}\n\n.form-inputs {\n  @include centered-flex-container;\n  gap: 10px;\n  padding: 30px;\n\n  input {\n    &:valid {\n      border: 2px solid lightgreen;\n    }\n\n    &:focus:valid {\n      background-color: lightgreen;\n    }\n  }\n\n  #destination {\n    \n    &:focus:invalid {\n      background-color: lightcoral;\n    }\n  }\n}\n\n.button-container {\n  button {\n    width: 10rem;\n    height: 2rem;\n\n    background: rgba(0, 0, 0, 0.5);\n    border: 1px solid $brand-color-1 {\n      radius: 1px;\n    }\n    color: $brand-color-1;\n\n    cursor: pointer;\n  }\n}\n\n.error-message {\n  color: red;\n}\n","@import './form';\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  background: url('./jet-sideview.jpg') no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n\n  z-index: -1;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/jet-sideview.jpg");

/***/ }),
/* 9 */
/***/ (() => {

// Query Selectors

// Nav
const navBtns = document.querySelectorAll('.site-nav-list-item button');

// Event Listeners

navBtns.forEach(btn => {
  btn.onclick = e => {
    window.location.href = `${e.target.id}.html`;
  };
  
  btn.onkeypress = e => {
    if (e.key === 'Enter') {
      e.target.click();
    }
  }
});


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAPIData: () => (/* binding */ getAPIData),
/* harmony export */   postFlightRequest: () => (/* binding */ postFlightRequest)
/* harmony export */ });
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


function getAPIData(url) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status >= 500) {
        throw new Error("There's been a network error: ");
      }
    })
    .then(data => data)
    .catch(err => console.log(err));
}

function postFlightRequest(
  url,
  previousTripID,
  userID,
  destinationID,
  travelers,
  date,
  duration,
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: previousTripID + 1,
      userID,
      destinationID,
      travelers,
      date,
      duration,
      status: 'pending',
      suggestedActivities: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }

      if (resp.status === 400) {
        throw new Error('There has been a user error');
      } else if (resp.status === 422 || resp.status === 404) {
        throw new Error(
          'The destination you wish to travel to is not within our travel network. Please select from our dropdown list of destinations.',
        );
      } else if (resp.status >= 500) {
        throw new Error(
          `There has been a network error: ${resp.status} ${resp.statusText}. Please refresh the page or try again later.`,
        );
      } else {
        throw new Error(
          `There has been an error: ${resp.status} ${resp.statusText}.`,
        );
      }
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.displayError)(err);
    });
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcTimeDifference: () => (/* binding */ calcTimeDifference),
/* harmony export */   calcTotalCostOfTrip: () => (/* binding */ calcTotalCostOfTrip),
/* harmony export */   calcTotalSpentByYear: () => (/* binding */ calcTotalSpentByYear),
/* harmony export */   filterTrips: () => (/* binding */ filterTrips),
/* harmony export */   findDestinationByID: () => (/* binding */ findDestinationByID),
/* harmony export */   findIDByDestination: () => (/* binding */ findIDByDestination),
/* harmony export */   getAllAPIData: () => (/* binding */ getAllAPIData),
/* harmony export */   getDestinationNames: () => (/* binding */ getDestinationNames),
/* harmony export */   getRandomTraveler: () => (/* binding */ getRandomTraveler)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


/* -------------- Util -------------- */

function filterTrips(tripData, criteria, travelerID, year = '2023') {
  const date = new Date();
  const yyyy = date.toLocaleString('default', { year: 'numeric' });
  const mm = date.toLocaleString('default', { month: '2-digit' });
  const dd = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${yyyy}/${mm}/${dd}`;

  tripData = tripData.filter(trip => trip.userID === travelerID);

  switch (criteria) {
    case 'byYear':
      return tripData.filter(
        trip => trip.date.slice(0, 4) === year && trip.status !== 'pending',
      );
    case 'past':
      return tripData.filter(
        trip => trip.date < currentDate && trip.status !== 'pending',
      );
    case 'upcoming':
      return tripData.filter(
        trip => trip.date > currentDate && trip.status === 'approved',
      );
    case 'pending':
      return tripData.filter(trip => trip.status === 'pending');
    default:
      return tripData;
  }
}

/* -------------- Generic Fetch Call -------------- */
function getAllAPIData() {
  return Promise.all([
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getAPIData)('http://localhost:3001/api/v1/travelers'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getAPIData)('http://localhost:3001/api/v1/trips'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getAPIData)('http://localhost:3001/api/v1/destinations'),
  ]).then(values => values);
}

/* -------------- Travelers -------------- */

function getRandomTraveler(travelers) {
  return travelers[Math.floor(Math.random() * travelers.length)];
}

/* -------------- Calculation -------------- */

function calcTotalSpentByYear(userID, trips, destinations, year) {
  return filterTrips(trips, 'byYear', userID, year).reduce((acc, trip) => {
    const destination = findDestinationByID(destinations, trip.destinationID);
    const total = calcTotalCostOfTrip(trip, destination);

    acc += total;

    return acc;
  }, 0);
}

function calcTotalCostOfTrip(trip, destination) {
  const flightCost =
    trip.travelers * (destination.estimatedFlightCostPerPerson * 2);

  const lodgingCost =
    trip.duration * destination.estimatedLodgingCostPerDay * trip.travelers;
  const subTotal = flightCost + lodgingCost;
  const agentFee = subTotal * 0.1;

  return subTotal + agentFee;
}

function calcTimeDifference(date1, date2) {
  const splitDate1 = date1.split('-');
  const splitDate2 = date2.split('-');
  date1 = new Date(`${splitDate1[1]}/${splitDate1[2]}/${splitDate1[0]}`);
  date2 = new Date(`${splitDate2[1]}/${splitDate2[2]}/${splitDate2[0]}`);

  const diffInMs = Math.abs(date1 - date2);

  return diffInMs / (1000 * 60 * 60 * 24);
}

/* -------------- Trips -------------- */

function findDestinationByID(destinations, destID) {
  return destinations.find(dest => dest.id === destID);
}

function findIDByDestination(destinations, destName) {
  const destinationNames = getDestinationNames(destinations);
  if (!destinationNames.includes(destName)) {
    return false;
  }
  
  return destinations.find(dest => dest.destination === destName).id;
}

function getDestinationNames(destinations) {
  return destinations.map(({ destination }) => destination);
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputValidator: () => (/* binding */ InputValidator),
/* harmony export */   displayError: () => (/* binding */ displayError),
/* harmony export */   displayFilteredTrips: () => (/* binding */ displayFilteredTrips),
/* harmony export */   displaySelectedFilterOption: () => (/* binding */ displaySelectedFilterOption),
/* harmony export */   displayTotalSpent: () => (/* binding */ displayTotalSpent),
/* harmony export */   handleFormKeyboardInput: () => (/* binding */ handleFormKeyboardInput),
/* harmony export */   navigateToPending: () => (/* binding */ navigateToPending),
/* harmony export */   renderAllDestinationOptions: () => (/* binding */ renderAllDestinationOptions),
/* harmony export */   setMinDateOption: () => (/* binding */ setMinDateOption)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);



function displayFilteredTrips(tripData) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.trips.forEach(trip => {
    const destination = (0,_model__WEBPACK_IMPORTED_MODULE_0__.findDestinationByID)(
      tripData.destinations,
      trip.destinationID,
    );
    resultsEl.appendChild(new _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__.TripCard(trip, destination));
  });
}

function displaySelectedFilterOption(criteria) {
  const btns = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => {
    if (btn.id === criteria) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function displayTotalSpent(total) {
  const totalSpentContainer = document.querySelector('.total-spent');
  const totalSpentEl = document.querySelector('.total-spent-value');
  totalSpentEl.innerText = total.toLocaleString('en-US');
  totalSpentContainer.setAttribute('tabindex', 0);
}

// Trip Request Form Inputs
const requestFormDestinationInput = document.querySelector('#destination');
const dropdownOpts = document.querySelector('.dropdown-options');
const dateInputs = document.querySelectorAll('input[type="date"]');

function renderAllDestinationOptions(destinations) {
  dropdownOpts.innerHTML = '';
  if (requestFormDestinationInput.value) {
    destinations = destinations.filter(dest =>
      dest.destination.includes(requestFormDestinationInput.value),
    );
  }

  destinations.forEach(dest => {
    dropdownOpts.appendChild(new FormOption(dest));
  });
}

function FormOption(destination) {
  const destOption = document.createElement('p');
  destOption.innerText = destination.destination;
  destOption.setAttribute('tabindex', 0);

  destOption.onclick = () => {
    requestFormDestinationInput.value = destOption.innerText;
  };

  destOption.onkeypress = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.target.click();
      dateInputs[0].focus();
      dropdownOpts.style.display = 'none';
    }
  };

  return destOption;
}
function handleFormKeyboardInput() {
  requestFormDestinationInput.onkeypress = e => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      dropdownOpts.style.display = 'block';
    } else {
      requestFormDestinationInput.value += e.key;
    }
  };
}

function setMinDateOption() {
  dateInputs.forEach(input => {
    input.min = new Date().toISOString().split('T')[0];
  });
}

function displayError(err) {
  const errMsg = document.querySelector('.error-message');
  errMsg.innerText = err;
}

// validate for if input is present in destinations array

// export function validateDestinationInput(destinations, value) {
//   const destinationNames = getDestinationNames(destinations);
//   if (
//     destinationNames.includes(dest =>
//       dest.every(letter => letter === value[dest.indexOf(letter)]),
//     )
//   ) {
//     console.log("it's valid");
//     requestFormDestinationInput.setCustomValidity('Valid field.');
//   } else {
//     console.log("it's invalid");
//     requestFormDestinationInput.setCustomValidity('Invalid field.');
//     console.log('valid? ', requestFormDestinationInput.validity.valid);
//   }
// }

function InputValidator(destinations) {
  const destinationNames = (0,_model__WEBPACK_IMPORTED_MODULE_0__.getDestinationNames)(destinations);

  return {
    validateDestinationInput(value) {
      if (destinationNames.includes(value)) {
        // set field to valid
        requestFormDestinationInput.setCustomValidity('');
      } else {
        // set field to invalid
        requestFormDestinationInput.setCustomValidity('Invalid field.');
      }
    },
  };
}

function navigateToPending() {
  window.location.href = 'trips.html';
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TripCard: () => (/* binding */ TripCard)
/* harmony export */ });
function TripCard(trip, destination) {
  const card = document.createElement('article');
  card.id = trip.id;
  card.classList.add('trip-card');
  card.setAttribute('tabindex', 0);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const destinationImg = document.createElement('img');
  destinationImg.src = destination.image;
  destinationImg.alt = destination.alt;
  imgContainer.appendChild(destinationImg);
  destinationImg.setAttribute('tabindex', 0);

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('card-data-container');
  card.appendChild(dataContainer);
  
  const destinationTitle = document.createElement('h2');
  destinationTitle.innerText = destination.destination;
  dataContainer.appendChild(destinationTitle);
  destinationTitle.setAttribute('tabindex', 0);

  const lastVisitDate = document.createElement('p');
  lastVisitDate.innerText = `Last visited: ${trip.date}`;
  dataContainer.append(lastVisitDate);
  lastVisitDate.setAttribute('tabindex', 0);
  
  return card;
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAndProcessUserData: () => (/* binding */ setAndProcessUserData),
/* harmony export */   userStore: () => (/* binding */ userStore)
/* harmony export */ });
/* harmony import */ var _stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_header_header__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);






// Query Selectors

// Nav
const navBtns = document.querySelectorAll('.site-nav-list-item');

// Event Listeners

navBtns.forEach(btn => {
  btn.onclick = e => {
    window.location.href = `${e.target.id}.html`;
  };
});

// Functions

function initUserStore() {
  const store = {};

  return {
    getKey(key) {
      return store[key];
    },

    setKey(key, value) {
      store[key] = value;
    },
  };
}

function setAndProcessUserData() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getAPIData)('http://localhost:3001/api/v1/travelers').then(data => {
    userStore.setKey('currentUser', (0,_model__WEBPACK_IMPORTED_MODULE_3__.getRandomTraveler)(data.travelers));
  });
}

const userStore = initUserStore();
setAndProcessUserData();
})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map