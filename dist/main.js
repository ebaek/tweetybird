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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\n\nconst CONSTANTS = {\n    BIRD_WIDTH: 90,\n    BIRD_HEIGHT: 70,\n    GRAVITY: 0.37,\n    FLAP_VELOCITY: -6,\n    TERMINAL_VEL: 12,\n    SPRITE_WIDTH: 929,\n    SPRITE_HEIGHT: 635,\n};\n\nclass Bird {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.pos_x = this.dimensions.width * (0.25);\n        this.pos_y = this.dimensions.height * (0.38);\n        this.velocity = 0;\n\n        this.birdSprite = new Image();\n        this.birdSprite.src = \"./images/bird.png\";\n\n        this.animation = [{ sX: 0, sY: 0 }, { sX: 929, sY: 0 }, { sX: 1858, sY: 0},\n            { sX: 0, sY: 635 }, { sX: 929, sY: 635 }, { sX: 1858, sY: 635},\n            { sX: 0, sY: 1270 }, { sX: 929, sY: 1270}];        \n    }\n\n    drawBird(ctx, frame){\n        ctx.save();\n        let bird = this.animation[frame];\n        \n        ctx.drawImage(this.birdSprite, bird[\"sX\"], bird[\"sY\"], CONSTANTS.SPRITE_WIDTH, CONSTANTS.SPRITE_HEIGHT, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n        ctx.restore();\n    }\n\n    move() {\n        // position of bird increases by current velocity\n        this.pos_y += this.velocity;\n\n        // increment velocity by gravity\n        this.velocity += CONSTANTS.GRAVITY;\n\n        // if bird moves too fast, reset velocity to the max\n        if (this.velocity > CONSTANTS.TERMINAL_VEL) this.velocity = CONSTANTS.TERMINAL_VEL;\n    }\n\n    flap() {\n        this.velocity = CONSTANTS.FLAP_VELOCITY;\n    }\n\n    getBounds() {\n        const topRight = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y];\n        const bottomRight = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y + CONSTANTS.BIRD_HEIGHT];\n\n        //add the beak?\n        const beak = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y * (0.5)];\n\n        // const topRight = [this.pos_x + (CONSTANTS.BIRD_WIDTH * 0.8), this.pos_y];\n        // const bottomRight = [this.pos_x + (CONSTANTS.BIRD_WIDTH * 0.8), this.pos_y + CONSTANTS.BIRD_HEIGHT];\n\n        const topLeft = [this.pos_x, this.pos_y + CONSTANTS.BIRD_HEIGHT];\n        const bottomLeft = [this.pos_x, this.pos_y + CONSTANTS.BIRD_HEIGHT];\n\n        return [topRight, bottomRight];\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TweetyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nconst CONSTANTS = {\n  RST_WIDTH: 90,\n  RST_HEIGHT: 50,\n}\n\n\nclass TweetyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height - 100 };\n\n    this.currentScore = 0;\n\n    this.frame = 0\n    this.frames = 0;\n\n    this.initialGame = true;\n\n    this.restartButton = { x: this.dimensions[\"width\"]/2 - CONSTANTS.RST_WIDTH/2, y: this.dimensions.height * (0.43), width: CONSTANTS.RST_WIDTH, height: CONSTANTS.RST_HEIGHT }\n    this.canvas = canvas;\n\n    this.restart();\n    this.clickListener();\n  }\n\n  gameOver() {\n    return this.level.gameOver(this.bird.getBounds()) ? true : false;\n  }\n\n  click() {\n    this.bird.flap(); \n  }\n\n  getMousePos(event) {\n    var rect = this.ctx.canvas.getBoundingClientRect();\n    return {\n      x: event.clientX - rect.left,\n      y: event.clientY - rect.top\n    };\n  }\n\n  isInside(pos, rect) {\n    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;\n  }\n\n  clickListener() {\n    this.ctx.canvas.addEventListener('click', (evt) => {\n      const mousePos = this.getMousePos(evt);\n\n      if (this.isInside(mousePos, this.restartButton) && this.gameOver()) {\n        this.restart();\n      } else {\n        if (this.initialGame === true) this.initialGame = false;\n        this.click();\n      }\n    }, false);\n  }\n\n  draw(){\n    this.level.drawPipes(this.ctx);\n    this.bird.drawBird(this.ctx, this.frame);\n    this.level.drawBases(this.ctx);\n    this.drawScore(this.ctx, this.currentScore);\n  }\n\n  drawScore(ctx, score) {\n    ctx.font = '58px Bungee Shade';\n    ctx.fillText(score, this.dimensions.width/2 - 20, 100);\n  }\n\n  update(){\n    this.level.movePipes();\n    this.level.moveBases();\n    this.birdUpdate();\n    this.bird.move();\n    this.scoreUpdate();\n  }\n\n  birdUpdate() {\n    this.frame += this.frames % 5 === 0 ? 1 : 0;\n    this.frame = this.frame % this.bird.animation.length;\n  }\n\n  scoreUpdate() {\n    let birdPos = this.bird.getBounds()[0][0];\n\n    //update the score when the bird flies a bit past the start of the pipe\n    let firstPipeEnd = this.level.pipes[0][\"pos\"] + 40;\n    if(birdPos === firstPipeEnd ){\n      this.currentScore++;\n    }\n  }\n\n  loop(){\n    // draw background \n    this.level.drawBackground(this.ctx);\n\n    if(!this.gameOver()){\n      if (!this.initialGame){\n        this.update();\n        this.draw();\n      } else {\n        this.initialGameLoop();\n      }\n      this.frames++;\n    } else {\n      this.level.moveBases();\n      this.level.drawBases(this.ctx);\n      this.drawGameOver();\n    } \n    this.animation = requestAnimationFrame(this.loop.bind(this));\n  }\n\n  initialGameLoop(){\n    this.drawScore(this.ctx, this.currentScore);\n    this.bird.drawBird(this.ctx, this.frame);\n\n    this.level.moveBases();\n    this.level.drawBases(this.ctx);\n\n    this.birdUpdate();\n  }\n\n  drawGameOver() {\n    //white background, blue border box\n    this.ctx.strokeStyle = \"#71C5CF\";\n    this.ctx.fillStyle = 'white';\n    this.ctx.lineWidth = 10;\n    this.ctx.rect(37, 70, this.dimensions.width - 60, this.dimensions.height/2 - 50);\n    this.ctx.stroke();\n    this.ctx.fill();\n\n\n    this.ctx.moveTo(this.dimensions.width / 2, 20);\n    this.ctx.textAlign = \"center\";\n\n    //game over\n    this.ctx.font = '58px Bungee Shade';\n    this.ctx.fillStyle = 'black';\n    this.ctx.fillText(\"Game Over\", this.dimensions.width / 2, 120);\n\n\n    //restart button\n    const restartButton = new Image();\n    restartButton.src = \"./images/button.png\";\n    this.ctx.drawImage(restartButton, this.restartButton[\"x\"], this.restartButton[\"y\"], this.restartButton[\"width\"], this.restartButton[\"height\"]);\n\n    //draw final score\n    this.ctx.font = '58px Bungee Shade';\n    \n    // this.ctx.fillText(this.currentScore, this.dimensions.width / 2 - 20, 200);\n    this.ctx.fillText(this.currentScore, this.dimensions.width/2, 200);\n  }\n\n  restart() {\n    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n    // this.running = true;\n\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n\n    cancelAnimationFrame(this.animation)\n    this.currentScore = 0;\n\n    this.loop();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  DISTANCE: 220,\n  GAP: 175,\n  PIPE_WIDTH: 80,\n  PIPE_HEIGHT: 400,\n  PLAYABLE: 550,\n  MIN_PIPE_HEIGHT: 120,\n  PIPE_BETWEEN_DIST: 220,\n  PIPE_SPEED: 2.5,\n  INITIAL_PIPE_POS: 700,\n  BASE_HEIGHT: 100,\n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    // set the initial distance between pipes\n    let firstPipePos = CONSTANTS.INITIAL_PIPE_POS;\n    let secondPipePos = firstPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    let thirdPipePos = secondPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n\n    // set of pipes\n    this.pipes = [{pos: firstPipePos, height: this.setPipeHeight()}, \n      {pos: secondPipePos, height: this.setPipeHeight()}, \n      {pos: thirdPipePos, height: this.setPipeHeight()}]\n    \n    // set of base \n    this.bases = [0, this.dimensions.width, this.dimensions.width * 2];\n  }\n\n  drawPipePair(ctx, pipePos, height) {    \n    const pipe1 = new Image();\n    pipe1.src = \"./images/pipe-green2.png\";\n\n    const pipe2 = new Image();\n    pipe2.src = \"./images/pipe-green1.png\";\n\n    ctx.drawImage(pipe1, pipePos, height - CONSTANTS.PIPE_HEIGHT, CONSTANTS.PIPE_WIDTH, CONSTANTS.PIPE_HEIGHT);\n    \n    //draw bottom pipe\n    const secondPipePosition = height + CONSTANTS.GAP;\n\n    ctx.drawImage(pipe2, pipePos, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PIPE_HEIGHT);\n  }\n\n  drawPipes(ctx){\n    this.pipes.forEach( (pipe) => {\n        this.drawPipePair(ctx, pipe[\"pos\"], pipe[\"height\"]);\n    })\n  }\n\n  movePipes(){\n    this.pipes.forEach( (pipe) => {\n      pipe[\"pos\"] -= CONSTANTS.PIPE_SPEED;\n\n      //rotate pipe once moves off the screen\n      if( pipe[\"pos\"] + CONSTANTS.PIPE_WIDTH === 0) {\n        this.pipes.shift();\n        this.generatePipe();\n      }\n    })\n  }\n\n  generatePipe(){\n    const lastPipe = this.pipes[this.pipes.length - 1];\n    const newPipePos = lastPipe[\"pos\"] + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;\n    const newPipeHeight = this.setPipeHeight();\n    this.pipes.push({pos: newPipePos, height: newPipeHeight});\n  }\n\n  setPipeHeight(){\n    let height = Math.random(0,1) * CONSTANTS.PLAYABLE;\n\n    // generate for playable - gap instead of below\n    if(height < CONSTANTS.MIN_PIPE_HEIGHT) {\n      height = CONSTANTS.MIN_PIPE_HEIGHT;\n    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP)){\n      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP;\n    } \n\n    return height;\n  }\n\n  moveBases() {\n    for(let i = 0; i < this.bases.length; i++) {\n      this.bases[i] -= CONSTANTS.PIPE_SPEED;\n\n      if(this.bases[i] + this.dimensions.width === 0) {\n        this.bases.shift();\n        this.bases.push(this.bases[this.bases.length - 1] + this.dimensions.width);\n      }\n    }\n  }\n\n  drawBases(ctx) {\n    const base = new Image();\n    base.src = \"./images/base.png\"\n\n    this.bases.forEach( (basePos) => {\n      ctx.drawImage(base, basePos, this.dimensions.height, this.dimensions.width, CONSTANTS.BASE_HEIGHT);\n    })\n  }\n\n  drawBackground(ctx) {\n    const background = new Image();\n    background.src = \"./images/background-night.png\";\n    \n    ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  collideWith(birdBounds) {\n    for(let i = 0; i < this.pipes.length; i++) {\n      if(this.collideWithPipe(birdBounds, i)) return true;\n    }\n    return false;\n  }\n\n  collideWithPipe(birdBounds, i) {\n    const birdTopRight = birdBounds[0];\n    const birdBottomRight = birdBounds[1];\n\n    const topPipeHeightBounds = [0, this.pipes[i][\"height\"]];\n    const pipeWidthBounds = [this.pipes[i][\"pos\"], this.pipes[i][\"pos\"] + CONSTANTS.PIPE_WIDTH];\n    const bottomHeightBounds = [this.pipes[i][\"height\"] + CONSTANTS.GAP, this.dimensions.height];\n\n\n    //NOTE: FIX THE BOUNDS\n    if (this.between(birdTopRight[0], pipeWidthBounds) && this.between(birdBottomRight[0], pipeWidthBounds)) {\n      if (birdTopRight[1] <= topPipeHeightBounds[1] || birdBottomRight[1] >= bottomHeightBounds[0]) {\n        // if(this.between(birdTopRight[1], topPipeHeightBounds) || this.between(birdBottomRight[1], bottomHeightBounds)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  between(pos, bounds){\n    return pos >= bounds[0] && pos <= bounds[1];\n  }\n\n  pastPipe(birdBounds) {\n    const birdXCoord = birdBounds[0][0];\n\n    if(!this.collideWithPipe(birdBounds, 0) && birdXCoord > this.pipes[0][\"pos\"]) {\n      return true; \n    } else {\n      return false;\n    }\n  }\n\n  gameOver(birdBounds) {\n    const birdTopRight = birdBounds[0];\n    const birdBottomMid = birdBounds[1];\n\n    if (this.collideWith(birdBounds) || birdTopRight[1] <= 0 || birdBottomMid[1] >= this.dimensions.height) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });