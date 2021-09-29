(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App'\n});\n\n//# sourceURL=webpack:///./src/admin/App.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/AddFeature.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"AddFeature\",\n\n  data() {\n    return {\n      featureTitle: \"\",\n      featureDetails: \"\",\n      featureTag: \"\",\n      featureTags: [],\n      message: \"\",\n      error: \"\"\n    };\n  },\n\n  methods: {\n    addFeature() {\n      if (this.featureTags.length < 0) {\n        this.error = \"Must have add feature tags to create a new feature\";\n        return;\n      }\n\n      const formData = new FormData();\n      formData.append(\"action\", \"wpsfb_insert_feature_table\");\n      formData.append(\"title\", this.featureTitle);\n      formData.append(\"details\", this.featureDetails);\n      formData.append(\"tags\", this.featureTags);\n      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(ajax_url.ajaxurl, formData).then(res => {\n        this.message = res.data.data;\n        this.$fire({\n          title: \"\",\n          text: this.message,\n          type: \"success\"\n        }).then(okay => {\n          if (okay) {\n            this.$router.push(\"/\");\n          }\n        });\n      }).catch(err => this.$alert(\"Error occured while posting data\", \"\", \"error\"));\n    },\n\n    addTags() {\n      !this.featureTags.includes(this.featureTag) && this.featureTags.push(this.featureTag);\n      this.featureTag = \"\";\n    },\n\n    removeTag(index) {\n      // const selected = event.target.innerHTML;\n      this.featureTags.splice(index, 1);\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/EditFeature.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"EditFeature\",\n\n  data() {\n    return {\n      featureTag: \"\"\n    };\n  },\n\n  props: {\n    feature: Object\n  },\n  // computed: {\n  // featureTags: function() {\n  //   return this.feature.tags ? this.feature.tags.split(',') : [];\n  // }\n  // },\n  methods: {\n    editFeature(id) {\n      let formData = new FormData();\n      formData.append(\"action\", \"wpsfb_edit_feature\");\n      formData.append(\"id\", id);\n      formData.append(\"title\", this.feature.title);\n      formData.append(\"details\", this.feature.details);\n      formData.append(\"tags\", this.feature.tags);\n      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(ajax_url.ajaxurl, formData).then(res => {\n        this.message = res.data.data;\n        this.$fire({\n          title: \"\",\n          text: this.message,\n          type: \"success\"\n        }).then(okay => {\n          if (okay) {\n            this.$router.go(\"/\");\n          }\n        });\n      }).catch(err => this.$alert(\"Error occured while posting data\", \"\", \"error\"));\n    },\n\n    addTags() {\n      !this.feature.tags.includes(this.featureTag) && this.feature.tags.push(this.featureTag);\n      this.featureTag = \"\";\n    },\n\n    removeTag(index) {\n      this.feature.tags.splice(index, 1);\n      console.log(this.feature.tags);\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/FeatureLists.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _EditFeature_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditFeature.vue */ \"./src/admin/components/EditFeature.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"FeatureLists\",\n  components: {\n    EditFeature: _EditFeature_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n\n  data() {\n    return {\n      showEditModal: false,\n      error: \"\",\n      feature: {},\n      copyMessage: \"click to copy the text\"\n    };\n  },\n\n  props: {\n    featureList: Array\n  },\n  methods: {\n    getFeatureToEdit(id) {\n      this.showEditModal = true;\n      let formData = new FormData();\n      formData.append(\"action\", \"wpsfb_get_single_feature\");\n      formData.append(\"id\", id);\n      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(ajax_url.ajaxurl, formData).then(res => {\n        this.feature = res.data.data;\n        this.feature.tags = this.feature.tags ? this.feature.tags.split(\",\") : [];\n      }).catch(err => {\n        this.error = \"Error retriving data\";\n        console.log(err);\n      });\n    },\n\n    deleteFeature(id) {\n      this.$confirm(\"Are you want to delete the data?\").then(okay => {\n        if (okay) {\n          const formData = new FormData();\n          formData.append(\"action\", \"wpsfb_delete_feature\");\n          formData.append(\"id\", id);\n          axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(ajax_url.ajaxurl, formData).then(res => {\n            this.$alert(\"Successfully Deleted the data\");\n            console.log(res);\n          }).catch(err => this.$alert(\"Error occured while deleting data\", \"\", \"error\"));\n        }\n\n        this.$router.go(\"/\");\n      }).catch(err => this.$alert(\"Something error happened\"));\n    },\n\n    copyShortcode(index) {\n      const copy = this.$refs.copycode[index].value;\n      navigator.clipboard.writeText(copy);\n      this.copyMessage = \"text copied!\";\n    },\n\n    moveMove() {\n      this.copyMessage = \"click to copy the text\";\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Home.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/pages/Home.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_FeatureLists_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/FeatureLists.vue */ \"./src/admin/components/FeatureLists.vue\");\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Home',\n  components: {\n    FeatureLists: _components_FeatureLists_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n\n  data() {\n    return {\n      featureList: [],\n      error: \"\"\n    };\n  },\n\n  methods: {\n    getFeatureList() {\n      const formData = new FormData();\n      formData.append('action', 'wpsfb_get_features_list');\n      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(ajax_url.ajaxurl, formData).then(res => {\n        this.featureList = res.data.data;\n      }).catch(err => {\n        error = \"Error retriving data\";\n        console.log(err);\n      });\n    }\n\n  },\n\n  created() {\n    this.getFeatureList();\n  }\n\n});\n\n//# sourceURL=webpack:///./src/admin/pages/Home.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Settings.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/pages/Settings.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Settings',\n\n  data() {\n    return {};\n  }\n\n});\n\n//# sourceURL=webpack:///./src/admin/pages/Settings.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/App.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/admin/App.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?./node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=template&id=3a030f38&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/App.vue?vue&type=template&id=3a030f38& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"vue-backend-app\" } }, [_c(\"router-view\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/App.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"form\",\n    {\n      on: {\n        submit: function($event) {\n          $event.preventDefault()\n          return _vm.addFeature($event)\n        }\n      }\n    },\n    [\n      _c(\"h2\", { staticClass: \"show-error\" }, [_vm._v(_vm._s(this.error))]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-title\" } }, [\n          _vm._v(\"Feature Title\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim.lazy\",\n              value: _vm.featureTitle,\n              expression: \"featureTitle\",\n              modifiers: { trim: true, lazy: true }\n            }\n          ],\n          attrs: {\n            required: \"\",\n            id: \"feature-title\",\n            type: \"text\",\n            placeholder: \"Feature Title\"\n          },\n          domProps: { value: _vm.featureTitle },\n          on: {\n            change: function($event) {\n              _vm.featureTitle = $event.target.value.trim()\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-details\" } }, [\n          _vm._v(\"Feature Details\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"textarea\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim.lazy\",\n              value: _vm.featureDetails,\n              expression: \"featureDetails\",\n              modifiers: { trim: true, lazy: true }\n            }\n          ],\n          attrs: {\n            required: \"\",\n            id: \"feature-details\",\n            type: \"text\",\n            placeholder: \"Feature Details\",\n            cols: \"50\",\n            rows: \"5\"\n          },\n          domProps: { value: _vm.featureDetails },\n          on: {\n            change: function($event) {\n              _vm.featureDetails = $event.target.value.trim()\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-tags\" } }, [\n          _vm._v(\"Feature Tags\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim\",\n              value: _vm.featureTag,\n              expression: \"featureTag\",\n              modifiers: { trim: true }\n            }\n          ],\n          attrs: {\n            id: \"feature-tags\",\n            type: \"text\",\n            placeholder: \"Add tags by space\"\n          },\n          domProps: { value: _vm.featureTag },\n          on: {\n            keyup: function($event) {\n              if (\n                !$event.type.indexOf(\"key\") &&\n                _vm._k($event.keyCode, \"space\", 32, $event.key, [\n                  \" \",\n                  \"Spacebar\"\n                ])\n              ) {\n                return null\n              }\n              return _vm.addTags($event)\n            },\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.featureTag = $event.target.value.trim()\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\n        \"div\",\n        _vm._l(_vm.featureTags, function(tag, index) {\n          return _c(\"span\", { key: index + 1 }, [\n            _c(\n              \"span\",\n              {\n                staticClass: \"tag\",\n                on: {\n                  click: function() {\n                    return _vm.removeTag(index)\n                  }\n                }\n              },\n              [_vm._v(_vm._s(tag))]\n            )\n          ])\n        }),\n        0\n      ),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"btn-group\" }, [\n        _c(\"button\", { staticClass: \"btn\", attrs: { type: \"submit\" } }, [\n          _vm._v(\"Add Feature\")\n        ]),\n        _vm._v(\" \"),\n        _c(\n          \"button\",\n          {\n            staticClass: \"btn\",\n            on: {\n              click: function($event) {\n                return _vm.$router.push(\"/\")\n              }\n            }\n          },\n          [_vm._v(\"Back To List\")]\n        )\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"form\",\n    {\n      on: {\n        submit: function($event) {\n          $event.preventDefault()\n          return (function() {\n            return _vm.editFeature(_vm.feature.id)\n          })($event)\n        }\n      }\n    },\n    [\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-title\" } }, [\n          _vm._v(\"Feature Title\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim.lazy\",\n              value: _vm.feature.title,\n              expression: \"feature.title\",\n              modifiers: { trim: true, lazy: true }\n            }\n          ],\n          attrs: {\n            required: \"\",\n            id: \"feature-title\",\n            type: \"text\",\n            placeholder: \"Feature Title\"\n          },\n          domProps: { value: _vm.feature.title },\n          on: {\n            change: function($event) {\n              _vm.$set(_vm.feature, \"title\", $event.target.value.trim())\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-details\" } }, [\n          _vm._v(\"Feature Details\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"textarea\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim.lazy\",\n              value: _vm.feature.details,\n              expression: \"feature.details\",\n              modifiers: { trim: true, lazy: true }\n            }\n          ],\n          attrs: {\n            required: \"\",\n            id: \"feature-details\",\n            type: \"text\",\n            placeholder: \"Feature Details\",\n            cols: \"50\",\n            rows: \"5\"\n          },\n          domProps: { value: _vm.feature.details },\n          on: {\n            change: function($event) {\n              _vm.$set(_vm.feature, \"details\", $event.target.value.trim())\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"input-group\" }, [\n        _c(\"label\", { attrs: { for: \"feature-tags\" } }, [\n          _vm._v(\"Feature Tags\")\n        ]),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.trim\",\n              value: _vm.featureTag,\n              expression: \"featureTag\",\n              modifiers: { trim: true }\n            }\n          ],\n          attrs: {\n            id: \"feature-tags\",\n            type: \"text\",\n            placeholder: \"Add tags by space\"\n          },\n          domProps: { value: _vm.featureTag },\n          on: {\n            keyup: function($event) {\n              if (\n                !$event.type.indexOf(\"key\") &&\n                _vm._k($event.keyCode, \"space\", 32, $event.key, [\n                  \" \",\n                  \"Spacebar\"\n                ])\n              ) {\n                return null\n              }\n              return _vm.addTags($event)\n            },\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.featureTag = $event.target.value.trim()\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ]),\n      _vm._v(\" \"),\n      _c(\n        \"div\",\n        _vm._l(_vm.feature.tags, function(tag, index) {\n          return _c(\"span\", { key: index + 1 }, [\n            _c(\n              \"span\",\n              {\n                staticClass: \"tag\",\n                on: {\n                  click: function() {\n                    return _vm.removeTag(index)\n                  }\n                }\n              },\n              [_vm._v(_vm._s(tag))]\n            )\n          ])\n        }),\n        0\n      ),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"btn-group\" }, [\n        _c(\"button\", { staticClass: \"btn\", attrs: { type: \"submit\" } }, [\n          _vm._v(\"Edit Feature\")\n        ]),\n        _vm._v(\" \"),\n        _c(\n          \"button\",\n          {\n            staticClass: \"btn\",\n            on: {\n              click: function($event) {\n                return _vm.$emit(\"close\")\n              }\n            }\n          },\n          [_vm._v(\"Close\")]\n        )\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _vm.error ? _c(\"div\", [_vm._v(_vm._s(_vm.error))]) : _vm._e(),\n      _vm._v(\" \"),\n      !_vm.showEditModal\n        ? _c(\n            \"table\",\n            { attrs: { id: \"feature-table\" } },\n            [\n              _vm._m(0),\n              _vm._v(\" \"),\n              _vm._l(_vm.featureList, function(feature, index) {\n                return _c(\"tr\", { key: feature.id }, [\n                  _c(\"td\", [_vm._v(_vm._s(feature.title))]),\n                  _vm._v(\" \"),\n                  _c(\"td\", [_vm._v(_vm._s(feature.details))]),\n                  _vm._v(\" \"),\n                  _c(\"td\", [_vm._v(_vm._s(feature.tags))]),\n                  _vm._v(\" \"),\n                  _c(\"td\", [\n                    _c(\"div\", { staticClass: \"tooltip\" }, [\n                      _c(\"input\", {\n                        ref: \"copycode\",\n                        refInFor: true,\n                        staticClass: \"input-tooltip\",\n                        attrs: { readonly: \"\" },\n                        domProps: {\n                          value:\n                            \"[wpsfb-feature-shortcode id=\" + feature.id + \"]\"\n                        },\n                        on: {\n                          click: function($event) {\n                            return _vm.copyShortcode(index)\n                          },\n                          mouseleave: _vm.moveMove\n                        }\n                      }),\n                      _vm._v(\" \"),\n                      _c(\"span\", { staticClass: \"tooltip-text\" }, [\n                        _vm._v(_vm._s(_vm.copyMessage))\n                      ])\n                    ])\n                  ]),\n                  _vm._v(\" \"),\n                  _c(\"td\", [\n                    _c(\n                      \"button\",\n                      {\n                        staticClass: \"btn\",\n                        on: {\n                          click: function() {\n                            return _vm.deleteFeature(feature.id)\n                          }\n                        }\n                      },\n                      [_vm._v(\"\\n          Delete\\n        \")]\n                    ),\n                    _vm._v(\" \"),\n                    _c(\n                      \"button\",\n                      {\n                        staticClass: \"btn\",\n                        on: {\n                          click: function() {\n                            return _vm.getFeatureToEdit(feature.id)\n                          }\n                        }\n                      },\n                      [_vm._v(\"\\n          Edit\\n        \")]\n                    )\n                  ])\n                ])\n              })\n            ],\n            2\n          )\n        : _vm._e(),\n      _vm._v(\" \"),\n      _vm.showEditModal\n        ? _c(\"EditFeature\", {\n            attrs: { feature: _vm.feature },\n            on: {\n              close: function($event) {\n                _vm.showEditModal = false\n              }\n            }\n          })\n        : _vm._e()\n    ],\n    1\n  )\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"tr\", [\n      _c(\"th\", [_vm._v(\"Feature Title\")]),\n      _vm._v(\" \"),\n      _c(\"th\", [_vm._v(\"Feature Details\")]),\n      _vm._v(\" \"),\n      _c(\"th\", [_vm._v(\"Feature Tags\")]),\n      _vm._v(\" \"),\n      _c(\"th\", [_vm._v(\"Shortcode\")]),\n      _vm._v(\" \"),\n      _c(\"th\", [_vm._v(\"Actions\")])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"home\" },\n    [\n      _c(\n        \"button\",\n        {\n          staticClass: \"btn\",\n          on: {\n            click: function($event) {\n              return _vm.$router.push(\"add_new_feature\")\n            }\n          }\n        },\n        [_vm._v(\"Add a new feature\")]\n      ),\n      _vm._v(\" \"),\n      _c(\"FeatureLists\", {\n        attrs: { featureList: _vm.featureList, error: _vm.error }\n      })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/pages/Home.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"app-settings\" }, [\n    _vm._v(\"\\n  The Settings Page\\n\")\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/admin/pages/Settings.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/admin/App.vue":
/*!***************************!*\
  !*** ./src/admin/App.vue ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=3a030f38& */ \"./src/admin/App.vue?vue&type=template&id=3a030f38&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/admin/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ \"./src/admin/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/App.vue?");

/***/ }),

/***/ "./src/admin/App.vue?vue&type=script&lang=js&":
/*!****************************************************!*\
  !*** ./src/admin/App.vue?vue&type=script&lang=js& ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/App.vue?");

/***/ }),

/***/ "./src/admin/App.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************!*\
  !*** ./src/admin/App.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/admin/App.vue?");

/***/ }),

/***/ "./src/admin/App.vue?vue&type=template&id=3a030f38&":
/*!**********************************************************!*\
  !*** ./src/admin/App.vue?vue&type=template&id=3a030f38& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=3a030f38& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/App.vue?vue&type=template&id=3a030f38&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_3a030f38___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/App.vue?");

/***/ }),

/***/ "./src/admin/components/AddFeature.vue":
/*!*********************************************!*\
  !*** ./src/admin/components/AddFeature.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true& */ \"./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true&\");\n/* harmony import */ var _AddFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddFeature.vue?vue&type=script&lang=js& */ \"./src/admin/components/AddFeature.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css& */ \"./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _AddFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"372fc8c5\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/components/AddFeature.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?");

/***/ }),

/***/ "./src/admin/components/AddFeature.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./src/admin/components/AddFeature.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./AddFeature.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?");

/***/ }),

/***/ "./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css&":
/*!******************************************************************************************************!*\
  !*** ./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=style&index=0&id=372fc8c5&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_style_index_0_id_372fc8c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?");

/***/ }),

/***/ "./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/AddFeature.vue?vue&type=template&id=372fc8c5&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddFeature_vue_vue_type_template_id_372fc8c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/components/AddFeature.vue?");

/***/ }),

/***/ "./src/admin/components/EditFeature.vue":
/*!**********************************************!*\
  !*** ./src/admin/components/EditFeature.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true& */ \"./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true&\");\n/* harmony import */ var _EditFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditFeature.vue?vue&type=script&lang=js& */ \"./src/admin/components/EditFeature.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css& */ \"./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _EditFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"38f88f8c\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/components/EditFeature.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?");

/***/ }),

/***/ "./src/admin/components/EditFeature.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/admin/components/EditFeature.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./EditFeature.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?");

/***/ }),

/***/ "./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css&":
/*!*******************************************************************************************************!*\
  !*** ./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=style&index=0&id=38f88f8c&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_style_index_0_id_38f88f8c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?");

/***/ }),

/***/ "./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/EditFeature.vue?vue&type=template&id=38f88f8c&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditFeature_vue_vue_type_template_id_38f88f8c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/components/EditFeature.vue?");

/***/ }),

/***/ "./src/admin/components/FeatureLists.vue":
/*!***********************************************!*\
  !*** ./src/admin/components/FeatureLists.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true& */ \"./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true&\");\n/* harmony import */ var _FeatureLists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeatureLists.vue?vue&type=script&lang=js& */ \"./src/admin/components/FeatureLists.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css& */ \"./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _FeatureLists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"25e3acef\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/components/FeatureLists.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?");

/***/ }),

/***/ "./src/admin/components/FeatureLists.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./src/admin/components/FeatureLists.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureLists.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?");

/***/ }),

/***/ "./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--5-0!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=style&index=0&id=25e3acef&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_5_0_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_style_index_0_id_25e3acef_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?");

/***/ }),

/***/ "./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/components/FeatureLists.vue?vue&type=template&id=25e3acef&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureLists_vue_vue_type_template_id_25e3acef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/components/FeatureLists.vue?");

/***/ }),

/***/ "./src/admin/main.js":
/*!***************************!*\
  !*** ./src/admin/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./src/admin/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/admin/router/index.js\");\n/* harmony import */ var vue_simple_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-simple-alert */ \"./node_modules/vue-simple-alert/lib/index.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_simple_alert__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.productionTip = false;\n/* eslint-disable no-new */\n\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#wpsfb-admin-app',\n  router: _router__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  render: h => h(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n});\n\n//# sourceURL=webpack:///./src/admin/main.js?");

/***/ }),

/***/ "./src/admin/pages/Home.vue":
/*!**********************************!*\
  !*** ./src/admin/pages/Home.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=9e5983fa&scoped=true& */ \"./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true&\");\n/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ \"./src/admin/pages/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"9e5983fa\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/pages/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/pages/Home.vue?");

/***/ }),

/***/ "./src/admin/pages/Home.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/admin/pages/Home.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/pages/Home.vue?");

/***/ }),

/***/ "./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true&":
/*!*****************************************************************************!*\
  !*** ./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=9e5983fa&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Home.vue?vue&type=template&id=9e5983fa&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_9e5983fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/pages/Home.vue?");

/***/ }),

/***/ "./src/admin/pages/Settings.vue":
/*!**************************************!*\
  !*** ./src/admin/pages/Settings.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=e4dc4572&scoped=true& */ \"./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true&\");\n/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ \"./src/admin/pages/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"e4dc4572\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/admin/pages/Settings.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/admin/pages/Settings.vue?");

/***/ }),

/***/ "./src/admin/pages/Settings.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./src/admin/pages/Settings.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/admin/pages/Settings.vue?");

/***/ }),

/***/ "./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=e4dc4572&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/admin/pages/Settings.vue?vue&type=template&id=e4dc4572&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_e4dc4572_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/admin/pages/Settings.vue?");

/***/ }),

/***/ "./src/admin/router/index.js":
/*!***********************************!*\
  !*** ./src/admin/router/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var admin_pages_Home_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/pages/Home.vue */ \"./src/admin/pages/Home.vue\");\n/* harmony import */ var admin_pages_Settings_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/pages/Settings.vue */ \"./src/admin/pages/Settings.vue\");\n/* harmony import */ var admin_components_AddFeature_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/components/AddFeature.vue */ \"./src/admin/components/AddFeature.vue\");\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  routes: [{\n    path: '/',\n    name: 'Home',\n    component: admin_pages_Home_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }, {\n    path: '/settings',\n    name: 'Settings',\n    component: admin_pages_Settings_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }, {\n    path: '/add_new_feature',\n    name: 'AddFeature',\n    component: admin_components_AddFeature_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }]\n}));\n\n//# sourceURL=webpack:///./src/admin/router/index.js?");

/***/ })

},[["./src/admin/main.js","runtime","vendors"]]]);