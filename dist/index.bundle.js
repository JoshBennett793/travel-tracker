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
/* harmony import */ var _partials_login_jet_wing_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _partials_header_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _partials_home_private_jet_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_partials_login_jet_wing_jpg__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_partials_header_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_partials_home_private_jet_jpg__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}\n\n#login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5%;\n  height: 100%;\n  width: 100%;\n}\n#login-form button {\n  color: #041f1e;\n  border: 2px solid #fab02b;\n  border-radius: 2px;\n  height: 2rem;\n  width: 6rem;\n  cursor: pointer;\n}\n#login-form > div {\n  position: relative;\n}\n#login-form > div label {\n  opacity: 0;\n  position: absolute;\n  top: 6px;\n  left: 10px;\n  color: #3f6064;\n}\n#login-form > div input[type=text] {\n  opacity: 0.7;\n  height: 2rem;\n  border: 2px solid #fab02b;\n  border-radius: 2px;\n  color: #041f1e;\n}\n#login-form > div input[type=text]:empty + label {\n  opacity: 1;\n}\n#login-form > div input[type=text]:focus + label {\n  opacity: 0;\n}\n#login-form > div input[type=text]:not(:focus):not(:placeholder-shown) + label {\n  opacity: 0;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 125px;\n  width: 100%;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0) 100%);\n}\nheader .logo-container {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") center center;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  position: absolute;\n  left: 10vw;\n  height: 150px;\n  width: 150px;\n}\n\n.header-nav-container {\n  width: 100%;\n}\n.header-nav-container nav ul {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 40px;\n  list-style: none;\n  height: 100px;\n  width: 100%;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  padding-inline-start: 0;\n}\n.header-nav-container nav ul li button {\n  cursor: pointer;\n  background: transparent;\n  border: none;\n}\n.header-nav-container nav ul li button:hover {\n  color: #fab02b;\n}\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n}\n.request-form-container #request-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 35vh;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n}\n.request-form-container #request-form #pax {\n  width: 100px;\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n}\n.dropdown-options p {\n  display: block;\n  color: #000000;\n  padding: 5px;\n  text-decoration: none;\n  padding: 20px 40px;\n  cursor: pointer;\n}\n.dropdown-options p:hover {\n  color: #0a0a23;\n  background-color: #ddd;\n  border-radius: 5px;\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n\n.form-element {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  align-items: start;\n}\n.form-element > label {\n  color: #e9e9e9;\n}\n.form-element > input {\n  color: #3f6064;\n}\n\n.form-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  padding: 30px;\n}\n.form-inputs input:valid {\n  border: 2px solid lightgreen;\n}\n.form-inputs input:focus:valid {\n  background-color: lightgreen;\n}\n.form-inputs #destination:focus:invalid {\n  background-color: lightcoral;\n}\n\n.button-container button {\n  width: 10rem;\n  height: 2rem;\n  background: rgba(0, 0, 0, 0.5);\n  border: 1px solid #fab02b;\n  border-radius: 1px;\n  color: #fab02b;\n  cursor: pointer;\n}\n\n.error-message {\n  color: red;\n}\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}\n\n.confirmation-page-container {\n  position: absolute;\n  top: 0;\n  height: fit-content;\n  width: 100%;\n  background: rgba(255, 255, 255, 0.9);\n}\n.confirmation-page-container.collapsed {\n  visibility: hidden;\n}\n.confirmation-page-container * {\n  color: #3f6064;\n}\n.confirmation-page-container button {\n  cursor: pointer;\n  border-radius: 3px;\n}\n\n.confirmation-page-top {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-content: space-around;\n  padding: 0 10%;\n}\n.confirmation-page-top h2 {\n  margin-left: auto;\n  margin-right: 4%;\n}\n.confirmation-page-top button {\n  background: lightgreen;\n}\n\n.confirmation-page-bottom {\n  height: fit-content;\n  width: 80vw;\n  margin: 0 auto;\n  padding: 2%;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 4px;\n  box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -webkit-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n}\n.confirmation-page-bottom .confirmation-page-detail {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-content: space-between;\n}\n.confirmation-page-bottom button {\n  margin-top: 4%;\n}", "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css","webpack://./src/stylesheets/index.scss","webpack://./src/stylesheets/modules/_typography.scss","webpack://./src/stylesheets/modules/_colors.scss","webpack://./src/stylesheets/partials/_base.scss","webpack://./src/stylesheets/partials/login/_login.scss","webpack://./src/stylesheets/modules/_util.scss","webpack://./src/stylesheets/partials/header/_header.scss","webpack://./src/stylesheets/partials/home/_form.scss","webpack://./src/stylesheets/partials/home/_home-base.scss"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n","/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(\"./jet-wing.jpg\") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}\n\n#login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5%;\n  height: 100%;\n  width: 100%;\n}\n#login-form button {\n  color: #041f1e;\n  border: 2px solid #fab02b;\n  border-radius: 2px;\n  height: 2rem;\n  width: 6rem;\n  cursor: pointer;\n}\n#login-form > div {\n  position: relative;\n}\n#login-form > div label {\n  opacity: 0;\n  position: absolute;\n  top: 6px;\n  left: 10px;\n  color: #3f6064;\n}\n#login-form > div input[type=text] {\n  opacity: 0.7;\n  height: 2rem;\n  border: 2px solid #fab02b;\n  border-radius: 2px;\n  color: #041f1e;\n}\n#login-form > div input[type=text]:empty + label {\n  opacity: 1;\n}\n#login-form > div input[type=text]:focus + label {\n  opacity: 0;\n}\n#login-form > div input[type=text]:not(:focus):not(:placeholder-shown) + label {\n  opacity: 0;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 125px;\n  width: 100%;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0) 100%);\n}\nheader .logo-container {\n  background: url(\"./logo.png\") center center;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  position: absolute;\n  left: 10vw;\n  height: 150px;\n  width: 150px;\n}\n\n.header-nav-container {\n  width: 100%;\n}\n.header-nav-container nav ul {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 40px;\n  list-style: none;\n  height: 100px;\n  width: 100%;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  padding-inline-start: 0;\n}\n.header-nav-container nav ul li button {\n  cursor: pointer;\n  background: transparent;\n  border: none;\n}\n.header-nav-container nav ul li button:hover {\n  color: #fab02b;\n}\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  color: #e9e9e9;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  font-size: 1.2rem;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n}\n.request-form-container #request-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 35vh;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n}\n.request-form-container #request-form #pax {\n  width: 100px;\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n}\n.dropdown-options p {\n  display: block;\n  color: #000000;\n  padding: 5px;\n  text-decoration: none;\n  padding: 20px 40px;\n  cursor: pointer;\n}\n.dropdown-options p:hover {\n  color: #0a0a23;\n  background-color: #ddd;\n  border-radius: 5px;\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n\n.form-element {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  align-items: start;\n}\n.form-element > label {\n  color: #e9e9e9;\n}\n.form-element > input {\n  color: #3f6064;\n}\n\n.form-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  padding: 30px;\n}\n.form-inputs input:valid {\n  border: 2px solid lightgreen;\n}\n.form-inputs input:focus:valid {\n  background-color: lightgreen;\n}\n.form-inputs #destination:focus:invalid {\n  background-color: lightcoral;\n}\n\n.button-container button {\n  width: 10rem;\n  height: 2rem;\n  background: rgba(0, 0, 0, 0.5);\n  border: 1px solid #fab02b;\n  border-radius: 1px;\n  color: #fab02b;\n  cursor: pointer;\n}\n\n.error-message {\n  color: red;\n}\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: url(\"./private-jet.jpg\") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  z-index: -1;\n}\n\n.confirmation-page-container {\n  position: absolute;\n  top: 0;\n  height: fit-content;\n  width: 100%;\n  background: rgba(255, 255, 255, 0.9);\n}\n.confirmation-page-container.collapsed {\n  visibility: hidden;\n}\n.confirmation-page-container * {\n  color: #3f6064;\n}\n.confirmation-page-container button {\n  cursor: pointer;\n  border-radius: 3px;\n}\n\n.confirmation-page-top {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-content: space-around;\n  padding: 0 10%;\n}\n.confirmation-page-top h2 {\n  margin-left: auto;\n  margin-right: 4%;\n}\n.confirmation-page-top button {\n  background: lightgreen;\n}\n\n.confirmation-page-bottom {\n  height: fit-content;\n  width: 80vw;\n  margin: 0 auto;\n  padding: 2%;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 4px;\n  box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -webkit-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n}\n.confirmation-page-bottom .confirmation-page-detail {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-content: space-between;\n}\n.confirmation-page-bottom button {\n  margin-top: 4%;\n}","@import './colors';\n\n// Base Font\n$base-font-family: Verdana, Geneva, Tahoma, sans-serif;\n\n// Font Sizes\n$base-font-size: 1.2rem;\n\n* {\n  color: $primary-font-color;\n  font: {\n    family: $base-font-family;\n    size: $base-font-size;\n  }\n}","// Font Colors\n\n$primary-font-color: #e9e9e9;\n$secondary-font-color: #fab02b;\n\n// Brand Colors\n\n$brand-color-1: #fab02b;\n$brand-color-2: #3f6064;\n$brand-color-3: #041f1e;\n$brand-color-4: #8d5b4c;\n$brand-color-5: #767979;\n","@import '../../../node_modules/normalize.css/normalize';\n\n@import '../modules/all';\n@import '../modules/typography';\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n}",".login-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  background: url('./jet-wing.jpg') no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n\n  z-index: -1;\n}\n\n#login-form {\n  @include vertical-centered-flex-container;\n  gap: 5%;\n  height: 100%;\n  width: 100%;\n\n  button {\n    color: $brand-color-3;\n    border: 2px solid $brand-color-1 {\n      radius: 2px;\n    };\n    height: 2rem;\n    width: 6rem;\n    cursor: pointer;\n  }\n\n  > div {\n    position: relative;\n\n    label {\n      opacity: 0;\n      position: absolute;\n      top: 6px;\n      left: 10px;\n      color: $brand-color-2;\n    }\n\n    input[type='text'] {\n      opacity: 0.7;\n      height: 2rem;\n      border: 2px solid $brand-color-1 {\n        radius: 2px;\n      };\n      color: $brand-color-3;\n\n      &:empty {\n        & + label {\n          opacity: 1;\n        }\n      }\n\n      &:focus {\n        & + label {\n          opacity: 0;\n        }\n      }\n\n      &:not(:focus):not(:placeholder-shown) {\n        & + label {\n          opacity: 0;\n        }\n      }\n    }\n  }\n}\n","@mixin centered-flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n@mixin vertical-centered-flex-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}","header {\n  @include centered-flex-container;\n  height: 125px;\n  width: 100%;\n\n  background: linear-gradient(\n    180deg,\n    rgba(0, 0, 0, 0.5) 0%,\n    rgba(0, 0, 0, 0.35) 50%,\n    rgba(0, 0, 0, 0) 100%\n  );\n\n  .logo-container {\n    background: url('./logo.png') center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n\n    position: absolute;\n    left: 10vw;\n    height: 150px;\n    width: 150px;\n  }\n}\n\n.header-nav-container {\n  width: 100%;\n\n  nav ul {\n    @include centered-flex-container;\n    gap: 40px;\n\n    list-style: none;\n    height: 100px;\n    width: 100%;\n\n    margin-block: {\n      start: 0;\n      end: 0;\n    }\n    padding-inline-start: 0;\n\n    li button {\n      cursor: pointer;\n      background: transparent;\n      border: none;\n\n      &:hover {\n        color: $brand-color-1;\n      }\n    }\n  }\n}\n","@import '../base';\n\n.request-form-container {\n  height: 80px;\n  width: 75%;\n  margin: 5vh auto;\n\n  #request-form {\n    @include vertical-centered-flex-container;\n    width: 100%;\n    height: 35vh;\n    background: rgba(0, 0, 0, 0.3);\n    border-radius: 4px;\n\n    #pax {\n      width: 100px;\n    }\n  }\n}\n\n.dropdown-container {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown-options {\n  display: none;\n  height: 400px;\n  position: absolute;\n  overflow: auto;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);\n\n  p {\n    display: block;\n    color: #000000;\n    padding: 5px;\n    text-decoration: none;\n    padding: 20px 40px;\n    cursor: pointer;\n\n    &:hover {\n      color: #0a0a23;\n      background-color: #ddd;\n      border-radius: 5px;\n    }\n  }\n}\n\n.dropdown-container:hover .dropdown-options {\n  display: block;\n}\n// use js to make dropdown display block when input is in focus\n\n.form-element {\n  @include vertical-centered-flex-container;\n  align-items: start;\n\n  & > label {\n    color: $primary-font-color;\n  }\n\n  & > input {\n    color: $brand-color-2;\n  }\n}\n\n.form-inputs {\n  @include centered-flex-container;\n  gap: 10px;\n  padding: 30px;\n\n  input {\n    &:valid {\n      border: 2px solid lightgreen;\n    }\n\n    &:focus:valid {\n      background-color: lightgreen;\n    }\n  }\n\n  #destination {\n    \n    &:focus:invalid {\n      background-color: lightcoral;\n    }\n  }\n}\n\n.button-container {\n  button {\n    width: 10rem;\n    height: 2rem;\n\n    background: rgba(0, 0, 0, 0.5);\n    border: 1px solid $brand-color-1 {\n      radius: 1px;\n    }\n    color: $brand-color-1;\n\n    cursor: pointer;\n  }\n}\n\n.error-message {\n  color: red;\n}\n","@import './form';\n\n.home-page-bg-img-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  background: url('./private-jet.jpg') no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n\n  z-index: -1;\n}\n\n.confirmation-page-container {\n  position: absolute;\n  top: 0;\n  height: fit-content;\n  width: 100%;\n\n  background: rgba(255, 255, 255, 0.9);\n\n  // overflow: hidden;\n\n  &.collapsed {\n    visibility: hidden;\n  }\n\n  * {\n    color: $brand-color-2;\n  }\n\n  button {\n    cursor: pointer;\n    border-radius: 3px;\n  }\n}\n\n.confirmation-page-top {\n  @include centered-flex-container;\n  justify-content: space-around;\n  padding: 0 10%;\n\n  h2 {\n    margin: {\n      left: auto;\n      right: 4%;\n    }\n  }\n\n  button {\n    background: lightgreen;\n  }\n}\n\n.confirmation-page-bottom {\n  height: fit-content;\n  width: 80vw;\n  margin: 0 auto;\n  padding: 2%;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 4px;\n  box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -webkit-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px -4px 28px 6px rgba(0, 0, 0, 0.75);\n\n  .confirmation-page-detail {\n    @include centered-flex-container;\n    justify-content: space-between;\n  }\n\n  button {\n    margin-top: 4%;\n  }\n}\n"],"sourceRoot":""}]);
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
/* 8 */,
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
        throw new Error('There has been a user error.');
      } else if (resp.status === 422 || resp.status === 404) {
        throw new Error(
          'The POST request is missing some information.',
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
    });
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/jet-wing.jpg");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/private-jet.jpg");

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
  const currentUserID = localStorage.getItem('currentUserID');
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getAPIData)(`http://localhost:3001/api/v1/travelers/${currentUserID}`)
    .then(user => {
      userStore.setKey('currentUser', user);
      userStore.setKey('currentUserID', parseInt(currentUserID));
    },
  );
}

const userStore = initUserStore();
setAndProcessUserData();

})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map