/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mailgen":
/*!**************************!*\
  !*** external "mailgen" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mailgen");

/***/ }),

/***/ "mongodb-memory-server":
/*!****************************************!*\
  !*** external "mongodb-memory-server" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("mongodb-memory-server");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "otp-generator":
/*!********************************!*\
  !*** external "otp-generator" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("otp-generator");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  JWT_SECRET: \"<secret>\",\n  EMAIL: \"modesto.armstrong73@ethereal.email\",\n  PASSWORD: \"7P2BGPBQNDHmgs7mwB\",\n  ATLAS_URI: \"mongodb://localhost:27017\"\n});\n\n//# sourceURL=webpack://server/./config.js?");

/***/ }),

/***/ "./controllers/appController.js":
/*!**************************************!*\
  !*** ./controllers/appController.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createResetSession: () => (/* binding */ createResetSession),\n/* harmony export */   generateOTP: () => (/* binding */ generateOTP),\n/* harmony export */   getUser: () => (/* binding */ getUser),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   register: () => (/* binding */ register),\n/* harmony export */   resetPassword: () => (/* binding */ resetPassword),\n/* harmony export */   updateUser: () => (/* binding */ updateUser),\n/* harmony export */   verifyOTP: () => (/* binding */ verifyOTP),\n/* harmony export */   verifyUser: () => (/* binding */ verifyUser)\n/* harmony export */ });\n/* harmony import */ var _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/User.model.js */ \"./model/User.model.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config.js */ \"./config.js\");\n/* harmony import */ var otp_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! otp-generator */ \"otp-generator\");\n\n\n\n\n\n\n/** middleware for verify user */\nasync function verifyUser(req, res, next) {\n  try {\n    const {\n      username\n    } = req.method == \"GET\" ? req.query : req.body;\n\n    // check the user existance\n    let exist = await _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      username\n    });\n    if (!exist) return res.status(404).send({\n      error: \"Can't find User!\"\n    });\n    next();\n  } catch (error) {\n    return res.status(404).send({\n      error: \"Authentication Error\"\n    });\n  }\n}\n\n/** POST: http://localhost:8080/api/register \r\n * @param : {\r\n  \"username\" : \"example123\",\r\n  \"password\" : \"admin123\",\r\n  \"email\": \"example@gmail.com\",\r\n  \"firstName\" : \"bill\",\r\n  \"lastName\": \"william\",\r\n  \"mobile\": 8009860560,\r\n  \"address\" : \"Apt. 556, Kulas Light, Gwenborough\",\r\n  \"profile\": \"\"\r\n}\r\n*/\nasync function register(req, res) {\n  try {\n    const {\n      username,\n      password,\n      profile,\n      email\n    } = req.body;\n\n    // check the existing user\n    const existUsername = new Promise((resolve, reject) => {\n      _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n        username\n      }, function (err, user) {\n        if (err) reject(new Error(err));\n        if (user) reject({\n          error: \"Please use unique username\"\n        });\n        resolve();\n      });\n    });\n\n    // check for existing email\n    const existEmail = new Promise((resolve, reject) => {\n      _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n        email\n      }, function (err, email) {\n        if (err) reject(new Error(err));\n        if (email) reject({\n          error: \"Please use unique Email\"\n        });\n        resolve();\n      });\n    });\n    Promise.all([existUsername, existEmail]).then(() => {\n      if (password) {\n        bcrypt__WEBPACK_IMPORTED_MODULE_1__.hash(password, 10).then(hashedPassword => {\n          const user = new _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            username,\n            password: hashedPassword,\n            profile: profile || '',\n            email\n          });\n\n          // return save result as a response\n          user.save().then(result => res.status(201).send({\n            msg: \"User Register Successfully\"\n          })).catch(error => res.status(500).send({\n            error\n          }));\n        }).catch(error => {\n          return res.status(500).send({\n            error: \"Enable to hashed password\"\n          });\n        });\n      }\n    }).catch(error => {\n      return res.status(500).send({\n        error\n      });\n    });\n  } catch (error) {\n    return res.status(500).send(error);\n  }\n}\n\n/** POST: http://localhost:/api/login \r\n * @param: {\r\n  \"username\" : \"example123\",\r\n  \"password\" : \"admin123\"\r\n}\r\n*/\nasync function login(req, res) {\n  const {\n    username,\n    password\n  } = req.body;\n  try {\n    _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      username\n    }).then(user => {\n      bcrypt__WEBPACK_IMPORTED_MODULE_1__.compare(password, user.password).then(passwordCheck => {\n        if (!passwordCheck) return res.status(400).send({\n          error: \"Don't have Password\"\n        });\n\n        // create jwt token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__.sign({\n          userId: user._id,\n          username: user.username\n        }, _config_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].JWT_SECRET, {\n          expiresIn: \"24h\"\n        });\n        return res.status(200).send({\n          msg: \"Login Successful...!\",\n          username: user.username,\n          token\n        });\n      }).catch(error => {\n        return res.status(400).send({\n          error: \"Password does not Match\"\n        });\n      });\n    }).catch(error => {\n      return res.status(404).send({\n        error: \"Username not Found\"\n      });\n    });\n  } catch (error) {\n    return res.status(500).send({\n      error\n    });\n  }\n}\n\n/** GET: http://localhost:8080/api/user/example123 */\nasync function getUser(req, res) {\n  const {\n    username\n  } = req.params;\n  try {\n    if (!username) return res.status(501).send({\n      error: \"Invalid Username\"\n    });\n    _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      username\n    }, function (err, user) {\n      if (err) return res.status(500).send({\n        err\n      });\n      if (!user) return res.status(501).send({\n        error: \"Couldn't Find the User\"\n      });\n\n      /** remove password from user */\n      // mongoose return unnecessary data with object so convert it into json\n      const {\n        password,\n        ...rest\n      } = Object.assign({}, user.toJSON());\n      return res.status(201).send(rest);\n    });\n  } catch (error) {\n    return res.status(404).send({\n      error: \"Cannot Find User Data\"\n    });\n  }\n}\n\n/** PUT: http://localhost:/api/updateuser \r\n * @param: {\r\n  \"header\" : \"<token>\"\r\n}\r\nbody: {\r\n    firstName: '',\r\n    address : '',\r\n    profile : ''\r\n}\r\n*/\nasync function updateUser(req, res) {\n  try {\n    // const id = req.query.id;\n    const {\n      userId\n    } = req.user;\n    if (userId) {\n      const body = req.body;\n\n      // update the data\n      _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateOne({\n        _id: userId\n      }, body, function (err, data) {\n        if (err) throw err;\n        return res.status(201).send({\n          msg: \"Record Updated...!\"\n        });\n      });\n    } else {\n      return res.status(401).send({\n        error: \"User Not Found...!\"\n      });\n    }\n  } catch (error) {\n    return res.status(401).send({\n      error\n    });\n  }\n}\n\n/** GET: http://localhost:8080/api/generateOTP */\nasync function generateOTP(req, res) {\n  req.app.locals.OTP = await otp_generator__WEBPACK_IMPORTED_MODULE_4__.generate(6, {\n    lowerCaseAlphabets: false,\n    upperCaseAlphabets: false,\n    specialChars: false\n  });\n  res.status(201).send({\n    code: req.app.locals.OTP\n  });\n}\n\n/** GET: http://localhost:8080/api/verifyOTP */\nasync function verifyOTP(req, res) {\n  const {\n    code\n  } = req.query;\n  if (parseInt(req.app.locals.OTP) === parseInt(code)) {\n    req.app.locals.OTP = null; // reset the OTP value\n    req.app.locals.resetSession = true; // start session for reset password\n    return res.status(201).send({\n      msg: 'Verify Successsfully!'\n    });\n  }\n  return res.status(400).send({\n    error: \"Invalid OTP\"\n  });\n}\n\n// successfully redirect user when OTP is valid\n/** GET: http://localhost:8080/api/createResetSession */\nasync function createResetSession(req, res) {\n  if (req.app.locals.resetSession) {\n    return res.status(201).send({\n      flag: req.app.locals.resetSession\n    });\n  }\n  return res.status(440).send({\n    error: \"Session expired!\"\n  });\n}\n\n// update the password when we have valid session\n/** PUT: http://localhost:8080/api/resetPassword */\nasync function resetPassword(req, res) {\n  try {\n    if (!req.app.locals.resetSession) return res.status(440).send({\n      error: \"Session expired!\"\n    });\n    const {\n      username,\n      password\n    } = req.body;\n    try {\n      _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n        username\n      }).then(user => {\n        bcrypt__WEBPACK_IMPORTED_MODULE_1__.hash(password, 10).then(hashedPassword => {\n          _model_User_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateOne({\n            username: user.username\n          }, {\n            password: hashedPassword\n          }, function (err, data) {\n            if (err) throw err;\n            req.app.locals.resetSession = false; // reset session\n            return res.status(201).send({\n              msg: \"Record Updated...!\"\n            });\n          });\n        }).catch(e => {\n          return res.status(500).send({\n            error: \"Enable to hashed password\"\n          });\n        });\n      }).catch(error => {\n        return res.status(404).send({\n          error: \"Username not Found\"\n        });\n      });\n    } catch (error) {\n      return res.status(500).send({\n        error\n      });\n    }\n  } catch (error) {\n    return res.status(401).send({\n      error\n    });\n  }\n}\n\n//# sourceURL=webpack://server/./controllers/appController.js?");

/***/ }),

/***/ "./controllers/mailer.js":
/*!*******************************!*\
  !*** ./controllers/mailer.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   registerMail: () => (/* binding */ registerMail)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var mailgen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mailgen */ \"mailgen\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ \"./config.js\");\n\n\n\n\n// https://ethereal.email/create\nlet nodeConfig = {\n  host: \"smtp.ethereal.email\",\n  port: 587,\n  secure: false,\n  // true for 465, false for other ports\n  auth: {\n    user: _config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].EMAIL,\n    pass: _config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PASSWORD\n  }\n};\nlet transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n  host: \"smtp.ethereal.email\",\n  port: 587,\n  secure: false,\n  auth: {\n    user: _config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].EMAIL,\n    pass: _config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PASSWORD\n  },\n  tls: {\n    rejectUnauthorized: false\n  }\n});\nlet MailGenerator = new mailgen__WEBPACK_IMPORTED_MODULE_1__({\n  theme: \"default\",\n  product: {\n    name: \"Mailgen\",\n    link: 'https://mailgen.js/'\n  }\n});\n\n/** POST: http://localhost:8080/api/registerMail \r\n * @param: {\r\n  \"username\" : \"example123\",\r\n  \"userEmail\" : \"admin123\",\r\n  \"text\" : \"\",\r\n  \"subject\" : \"\",\r\n}\r\n*/\nconst registerMail = async (req, res) => {\n  const {\n    username,\n    userEmail,\n    text,\n    subject\n  } = req.body;\n\n  // body of the email\n  var email = {\n    body: {\n      name: username,\n      intro: text || 'Welcome to Daily Tuition! We\\'re very excited to have you on board.',\n      outro: 'Need help, or have questions? Just reply to this email, we\\'d love to help.'\n    }\n  };\n  var emailBody = MailGenerator.generate(email);\n  let message = {\n    from: _config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].EMAIL,\n    to: userEmail,\n    subject: subject || \"Signup Successful\",\n    html: emailBody\n  };\n  // send mail\n  transporter.sendMail(message).then(() => {\n    return res.status(200).send({\n      msg: \"You should receive an email from us.\"\n    });\n  }).catch(error => {\n    console.log(error);\n    res.status(500).send({\n      error\n    });\n  });\n  console.log(\"sent email\");\n};\n\n//# sourceURL=webpack://server/./controllers/mailer.js?");

/***/ }),

/***/ "./database/conn.js":
/*!**************************!*\
  !*** ./database/conn.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongodb_memory_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb-memory-server */ \"mongodb-memory-server\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ \"./config.js\");\n\n\n\nasync function connect() {\n  const mongod = await mongodb_memory_server__WEBPACK_IMPORTED_MODULE_1__.MongoMemoryServer.create();\n  const getUri = mongod.getUri();\n  mongoose__WEBPACK_IMPORTED_MODULE_0__.set('strictQuery', true);\n  // const db = await mongoose.connect(getUri);\n  const db = await mongoose__WEBPACK_IMPORTED_MODULE_0__.connect(_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ATLAS_URI);\n  console.log(\"Database Connected\");\n  return db;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connect);\n\n//# sourceURL=webpack://server/./database/conn.js?");

/***/ }),

/***/ "./middleware/auth.js":
/*!****************************!*\
  !*** ./middleware/auth.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Auth),\n/* harmony export */   localVariables: () => (/* binding */ localVariables)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ \"./config.js\");\n\n\n\n/** auth middleware */\nasync function Auth(req, res, next) {\n  try {\n    // access authorize header to validate request\n    const token = req.headers.authorization.split(\" \")[1];\n\n    // retrive the user details fo the logged in user\n    const decodedToken = await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.verify(token, _config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].JWT_SECRET);\n    req.user = decodedToken;\n    next();\n  } catch (error) {\n    res.status(401).json({\n      error: \"Authentication Failed!\"\n    });\n  }\n}\nfunction localVariables(req, res, next) {\n  req.app.locals = {\n    OTP: null,\n    resetSession: false\n  };\n  next();\n}\n\n//# sourceURL=webpack://server/./middleware/auth.js?");

/***/ }),

/***/ "./model/User.model.js":
/*!*****************************!*\
  !*** ./model/User.model.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserSchema: () => (/* binding */ UserSchema),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  username: {\n    type: String,\n    required: [true, \"Please provide unique Username\"],\n    unique: [true, \"Username Exist\"]\n  },\n  password: {\n    type: String,\n    required: [true, \"Please provide a password\"],\n    unique: false\n  },\n  email: {\n    type: String,\n    required: [true, \"Please provide a unique email\"],\n    unique: true\n  },\n  firstName: {\n    type: String\n  },\n  lastName: {\n    type: String\n  },\n  mobile: {\n    type: Number\n  },\n  address: {\n    type: String\n  },\n  profile: {\n    type: String\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0__.model.Users || mongoose__WEBPACK_IMPORTED_MODULE_0__.model('User', UserSchema));\n\n//# sourceURL=webpack://server/./model/User.model.js?");

/***/ }),

/***/ "./router/route.js":
/*!*************************!*\
  !*** ./router/route.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/appController.js */ \"./controllers/appController.js\");\n/* harmony import */ var _controllers_mailer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/mailer.js */ \"./controllers/mailer.js\");\n/* harmony import */ var _middleware_auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middleware/auth.js */ \"./middleware/auth.js\");\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\n/** import all controllers */\n\n\n\n\n/** POST Methods */\nrouter.route('/register').post(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.register); // register user\nrouter.route('/registerMail').post(_controllers_mailer_js__WEBPACK_IMPORTED_MODULE_2__.registerMail); // send the email\nrouter.route('/authenticate').post(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyUser, (req, res) => res.end()); // authenticate user\nrouter.route('/login').post(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyUser, _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.login); // login in app\n\n/** GET Methods */\nrouter.route('/user/:username').get(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.getUser); // user with username\nrouter.route('/generateOTP').get(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyUser, _middleware_auth_js__WEBPACK_IMPORTED_MODULE_3__.localVariables, _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.generateOTP); // generate random OTP\nrouter.route('/verifyOTP').get(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyUser, _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyOTP); // verify generated OTP\nrouter.route('/createResetSession').get(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.createResetSession); // reset all the variables\n\n/** PUT Methods */\nrouter.route('/updateuser').put(_middleware_auth_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.updateUser); // is use to update the user profile\nrouter.route('/resetPassword').put(_controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.verifyUser, _controllers_appController_js__WEBPACK_IMPORTED_MODULE_1__.resetPassword); // use to reset password\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./router/route.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var _database_conn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./database/conn.js */ \"./database/conn.js\");\n/* harmony import */ var _router_route_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router/route.js */ \"./router/route.js\");\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\n\n/** middlewares */\napp.use(express__WEBPACK_IMPORTED_MODULE_0__.json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_1__());\napp.use(morgan__WEBPACK_IMPORTED_MODULE_2__('tiny'));\napp.disable('x-powered-by'); // less hackers know about our stack\n\nconst port = 4589;\n\n/** HTTP GET Request */\napp.get('/', (req, res) => {\n  res.status(201).json(\"Home GET Request\");\n});\n\n/** api routes */\napp.use('/api', _router_route_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n/** start server only when we have valid connection */\n(0,_database_conn_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])().then(() => {\n  try {\n    app.listen(port, () => {\n      console.log(`Server connected to http://localhost:${port}`);\n    });\n  } catch (error) {\n    console.log('Cannot connect to the server');\n  }\n}).catch(error => {\n  console.log(\"Invalid database connection...!\");\n});\n\n//# sourceURL=webpack://server/./server.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;