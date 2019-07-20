/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\n\nconst CONSTANTS = {\n    BIRD_WIDTH: 50,\n    BIRD_HEIGHT: 20,\n    GRAVITY: 0.3,\n    FLAP_VELOCITY: -8,\n    TERMINAL_VEL: 12,\n};\n\nclass Bird {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.pos_x = this.dimensions.width / 3;\n        this.pos_y = this.dimensions.height / 2;\n        this.velocity = 0;\n    }\n\n    drawBird(ctx) {\n        ctx.fillStyle = \"yellow\";\n        ctx.fillRect(this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n    }\n\n    animate(ctx) {\n        this.move();\n        this.drawBird(ctx);\n    }\n\n    move() {\n        // position of bird increases by current velocity\n        this.pos_y += this.velocity;\n\n        // increment velocity by gravity\n        this.velocity += CONSTANTS.GRAVITY;\n\n        // if bird moves too fast, reset velocity to the max\n        if (this.velocity > CONSTANTS.TERMINAL_VEL) this.velocity = CONSTANTS.TERMINAL_VEL;\n\n    }\n\n    flap() {\n        this.velocity = CONSTANTS.FLAP_VELOCITY;\n    }\n\n    getBounds() {\n        const topLeft = [this.pos_x, this.pos_y];\n        const bottomRight = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y + CONSTANTS.BIRD_HEIGHT];\n\n        return [topLeft, bottomRight];\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass FlappyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.clickListener();\n    this.restart();\n  }\n\n  gameOver() {\n    // return this.level.collide(this.bird)\n  }\n\n  click() {\n    // if the game hasn't started yet, play\n    if (!this.running) {\n      this.play(); \n    }\n    \n    this.bird.flap();\n  }\n\n  clickListener() {\n    this.ctx.canvas.addEventListener(\"mousedown\", this.click.bind(this));\n  }\n\n  sleep(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n  }\n\n  async animate() {\n    this.level.animate(this.ctx);\n    this.bird.animate(this.ctx);\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  restart() {\n    this.running = false;\n\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n\n    this.animate();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\n\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  DISTANCE: 220,\n  GAP: 150,\n  PIPE_WIDTH: 80,\n  PLAYABLE: 640,\n  CANVAS_WIDTH: 480,\n  MIN_PIPE_HEIGHT: 50,\n  PIPE_BETWEEN_DIST: 220,\n  PIPE_SPEED: 2,\n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    // set the initial distance between pipes\n    let firstPipePos = 0;\n    let secondPipePos = firstPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    let thirdPipePos = secondPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n\n    // set of pipes\n    this.pipes = [{pos: firstPipePos, height: this.setPipeHeight()}, \n      {pos: secondPipePos, height: this.setPipeHeight()}, \n      {pos: thirdPipePos, height: this.setPipeHeight()}]\n  }\n\n  drawPipePair(ctx, pipePos, height) {\n    ctx.fillStyle = \"green\";\n    \n    //draw top pipe\n    ctx.fillRect(pipePos, 0, CONSTANTS.PIPE_WIDTH, height);\n    \n    //draw bottom pipe\n    const secondPipePosition = CONSTANTS.GAP + height;\n    ctx.fillRect(pipePos, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PLAYABLE - secondPipePosition);\n  }\n\n  drawPipes(ctx){\n    debugger\n    this.pipes.forEach( (pipe) => {\n        this.drawPipePair(ctx, pipe[\"pos\"], pipe[\"height\"]);\n    })\n  }\n\n  movePipes(){\n    this.pipes.forEach( (pipe) => {\n      pipe[\"pos\"] -= CONSTANTS.PIPE_SPEED;\n      if(pipe[\"pos\"] === 0) {\n        this.pipes.unshift();\n        this.generatePipe();\n      }\n    })\n  }\n\n  generatePipe(){\n    const lastPipe = this.pipes[this.pipes.length - 1];\n    const newPipePos = lastPipe[\"pos\"] + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    const newPipeHeight = this.setPipeHeight();\n    this.pipes.push({pos: newPipePos, height: newPipeHeight});\n  }\n\n  setPipeHeight(){\n    let height = Math.random(0,1) * CONSTANTS.PLAYABLE;\n\n    if(height < CONSTANTS.MIN_PIPE_HEIGHT) {\n      height = CONSTANTS.MIN_PIPE_HEIGHT;\n    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP)){\n      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP;\n    } \n\n    return height;\n  }\n\n  drawBackground(ctx) {\n    // ctx.fillStyle = \"skyblue\";\n\n    // const background = new Image();\n    // background.src = \"./images/background-night.png\";\n    ctx.drawImage(background,0,0);\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n    this.drawPipes(ctx);\n    this.movePipes();\n    debugger\n  }\n\n  collideWith(bird) {\n\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });