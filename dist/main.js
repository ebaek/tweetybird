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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\n\nconst CONSTANTS = {\n    BIRD_WIDTH: 100,\n    BIRD_HEIGHT: 75,\n    GRAVITY: 0.3,\n    FLAP_VELOCITY: -6,\n    TERMINAL_VEL: 12,\n    SPRITE_WIDTH: 929,\n    SPRITE_HEIGHT: 635,\n};\n\nclass Bird {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.pos_x = this.dimensions.width / 3;\n        this.pos_y = this.dimensions.height / 2;\n        this.velocity = 0;\n\n        this.birdSprite = new Image();\n        this.birdSprite.src = \"./images/bird.png\";\n\n        this.animation = [{ sX: 0, sY: 0 }, { sX: 929, sY: 0 }, { sX: 1858, sY: 0},\n            { sX: 0, sY: 635 }, { sX: 929, sY: 635 }, { sX: 1858, sY: 635},\n            { sX: 0, sY: 1270 }, { sX: 929, sY: 1270}];        \n    }\n\n    drawBird(ctx, frame){\n        let bird = this.animation[frame];\n        ctx.save();\n        ctx.drawImage(this.birdSprite, bird[\"sX\"], bird[\"sY\"], CONSTANTS.SPRITE_WIDTH, CONSTANTS.SPRITE_HEIGHT, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n        ctx.restore();\n    }\n\n    move() {\n        // console.log('velocity: ', this.velocity);\n        // position of bird increases by current velocity\n        this.pos_y += this.velocity;\n\n        // increment velocity by gravity\n        this.velocity += CONSTANTS.GRAVITY;\n\n        // if bird moves too fast, reset velocity to the max\n        if (this.velocity > CONSTANTS.TERMINAL_VEL) this.velocity = CONSTANTS.TERMINAL_VEL;\n    }\n\n    flap() {\n        this.velocity = CONSTANTS.FLAP_VELOCITY;\n    }\n\n    getBounds() {\n        //calibrate boundaries to irregular shape of bird\n        const topRight = [this.pos_x + CONSTANTS.BIRD_WIDTH - 10, this.pos_y + 2];\n        const bottomMid = [this.pos_x + CONSTANTS.BIRD_WIDTH - 10, this.pos_y + CONSTANTS.BIRD_HEIGHT - 15];\n\n        return [topRight, bottomMid];\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TweetyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\n\nclass TweetyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n\n    this.currentScore = 0;\n\n    this.frame = 0\n    this.frames = 0;\n\n    this.restartButton = { x: 200, y: 250, width: 90, height: 50 }\n    this.canvas = canvas;\n\n    this.restart();\n    this.clickListener();\n  }\n\n  gameOver() {\n    if (this.level.gameOver(this.bird.getBounds())){\n      this.running = false;\n      this.currentScore = 0;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  click() {\n    this.bird.flap(); \n  }\n\n  getMousePos(event) {\n    var rect = this.ctx.canvas.getBoundingClientRect();\n    return {\n      x: event.clientX - rect.left,\n      y: event.clientY - rect.top\n    };\n  }\n\n  isInside(pos, rect) {\n    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;\n  }\n\n  clickListener() {\n    // debugger\n    this.ctx.canvas.addEventListener('click', (evt) => {\n      const mousePos = this.getMousePos(evt);\n\n      if (this.isInside(mousePos, this.restartButton) && this.gameOver()) {\n        this.restart();\n      } else {\n        this.click();\n      }\n    }, false);\n\n  }\n\n  draw(){\n    this.level.drawBackground(this.ctx);\n    this.level.drawPipes(this.ctx);\n    this.bird.drawBird(this.ctx, this.frame);\n    this.drawScore(this.ctx, this.currentScore);\n  }\n\n  drawScore(ctx, score) {\n    ctx.font = '58px Bungee Shade';\n    ctx.fillText(score, this.dimensions.width/2 - 20, 100);\n  }\n\n  update(){\n    this.level.movePipes();\n    this.birdUpdate();\n    this.scoreUpdate();\n  }\n\n  birdUpdate() {\n    this.frame += this.frames % 5 === 0 ? 1 : 0;\n    this.frame = this.frame % this.bird.animation.length;\n\n    this.bird.move();\n  }\n\n  scoreUpdate() {\n    let birdPos = this.bird.getBounds()[0][0];\n\n    //update the score when the bird flies a bit past the start of the pipe\n    let firstPipeEnd = this.level.pipes[0][\"pos\"] + 40;\n    if(birdPos === firstPipeEnd ){\n      this.currentScore++;\n    }\n  }\n\n  loop(){\n    if(!this.gameOver()){\n      this.update();\n      this.draw();\n      this.frames++;\n    } else {\n      this.drawGameOver();\n    }\n    this.animation = requestAnimationFrame(this.loop.bind(this));\n  }\n\n  drawGameOver() {\n    //white background, blue border box\n    this.ctx.strokeStyle = \"#71C5CF\";\n    this.ctx.fillStyle = 'white';\n    this.ctx.lineWidth = 10;\n    this.ctx.rect(37, 50, this.dimensions.width - 60, this.dimensions.height/2 - 50);\n    this.ctx.stroke();\n    this.ctx.fill();\n\n    //game over\n    this.ctx.font = '58px Bungee Shade';\n    this.ctx.fillStyle = 'black';\n    this.ctx.fillText(\"Game Over\", 45, 175);\n\n    //restart button\n    const restartButton = new Image();\n    restartButton.src = \"./images/button.png\"\n    this.ctx.drawImage(restartButton, this.restartButton[\"x\"], this.restartButton[\"y\"], this.restartButton[\"width\"], this.restartButton[\"height\"]);\n  }\n\n  // fix restart after game over \n  restart() {\n    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n    this.running = true;\n\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n\n    cancelAnimationFrame(this.animation)\n\n    this.loop();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  DISTANCE: 220,\n  GAP: 175,\n  PIPE_WIDTH: 80,\n  PLAYABLE: 640,\n  MIN_PIPE_HEIGHT: 50,\n  PIPE_BETWEEN_DIST: 220,\n  PIPE_SPEED: 2.5,\n  INITIAL_PIPE_POS: 500, \n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    // set the initial distance between pipes\n    let firstPipePos = CONSTANTS.INITIAL_PIPE_POS;\n    let secondPipePos = firstPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    let thirdPipePos = secondPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n\n    // set of pipes\n    this.pipes = [{pos: firstPipePos, height: this.setPipeHeight()}, \n      {pos: secondPipePos, height: this.setPipeHeight()}, \n      {pos: thirdPipePos, height: this.setPipeHeight()}]\n  }\n\n  drawPipePair(ctx, pipePos, height) {    \n    const pipe1 = new Image();\n    pipe1.src = \"./images/pipe-green2.png\";\n\n    const pipe2 = new Image();\n    pipe2.src = \"./images/pipe-green1.png\";\n\n    //draw top pipe\n    ctx.drawImage(pipe1, pipePos, 0, CONSTANTS.PIPE_WIDTH, height);\n    \n    //draw bottom pipe\n    const secondPipePosition = CONSTANTS.GAP + height;\n    // ctx.drawImage(pipe2, 0, 0, 52, 320, secondPipePosition, this.dimensions.height - height, CONSTANTS.PIPE_WIDTH, height);\n\n    //NOTE: fix pipe dimension (cropped)\n    ctx.drawImage(pipe2, pipePos, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PLAYABLE - secondPipePosition);\n  }\n\n  drawPipes(ctx){\n    this.pipes.forEach( (pipe) => {\n        this.drawPipePair(ctx, pipe[\"pos\"], pipe[\"height\"]);\n    })\n  }\n\n  movePipes(){\n    this.pipes.forEach( (pipe) => {\n      pipe[\"pos\"] -= CONSTANTS.PIPE_SPEED;\n\n      //rotate pipe once moves off the screen\n      if( pipe[\"pos\"] + CONSTANTS.PIPE_WIDTH === 0) {\n        this.pipes.shift();\n        this.generatePipe();\n      }\n    })\n  }\n\n  generatePipe(){\n    const lastPipe = this.pipes[this.pipes.length - 1];\n    const newPipePos = lastPipe[\"pos\"] + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    const newPipeHeight = this.setPipeHeight();\n    this.pipes.push({pos: newPipePos, height: newPipeHeight});\n  }\n\n  setPipeHeight(){\n    let height = Math.random(0,1) * CONSTANTS.PLAYABLE;\n\n    if(height < CONSTANTS.MIN_PIPE_HEIGHT) {\n      height = CONSTANTS.MIN_PIPE_HEIGHT;\n    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP)){\n      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP;\n    } \n\n    return height;\n  }\n\n  drawBackground(ctx) {\n    const background = new Image();\n    background.src = \"./images/background-night.png\";\n    ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  collideWith(birdBounds) {\n    for(let i = 0; i < this.pipes.length; i++) {\n      if(this.collideWithPipe(birdBounds, i)) return true;\n    }\n    return false;\n  }\n\n  collideWithPipe(birdBounds, i) {\n    const birdTopLeft = birdBounds[0];\n    const birdBottomRight = birdBounds[1];\n\n    const topPipeHeightBounds = [0, this.pipes[i][\"height\"]];\n    const pipeWidthBounds = [this.pipes[i][\"pos\"], this.pipes[i][\"pos\"] + CONSTANTS.PIPE_WIDTH];\n    const bottomHeightBounds = [this.pipes[i][\"height\"] + CONSTANTS.GAP, this.dimensions.height];\n\n    if (birdTopLeft[0] >= pipeWidthBounds[0] && birdTopLeft[0] <= pipeWidthBounds[1]) {\n      if (birdTopLeft[1] <= topPipeHeightBounds[1] || birdBottomRight[1] >= bottomHeightBounds[0]) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  pastPipe(birdBounds) {\n    const birdXCoord = birdBounds[0][0];\n\n    if(!this.collideWithPipe(birdBounds, 0) && birdXCoord > this.pipes[0][\"pos\"]) {\n      return true; \n    } else {\n      return false;\n    }\n  }\n\n  gameOver(birdBounds) {\n    const birdTopRight = birdBounds[0];\n    const birdBottomMid = birdBounds[1];\n\n    if (this.collideWith(birdBounds) || birdTopRight[1] <= 0 || birdBottomMid[1] >= this.dimensions.height) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });