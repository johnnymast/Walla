webpackJsonp([0],{

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * InputManager
 * @namespace Core Managers
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(66), __webpack_require__(545), __webpack_require__(549), __webpack_require__(575)], __WEBPACK_AMD_DEFINE_RESULT__ = function (PIXI, GameObject, KeyboardInput, GamePadInput) {
  /**
   * @classdesc InputManager
   * @exports  core/managers/InputManager
   * @class
   */
  let InputManager = function (options) {
    GameObject.call(this, options);

    this.keys = {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
      Alt: 'Alt',
      Control: 'Control',
      Space: ' ',
      Enter: 'Enter',
      Escape: 'Escape'
    };

    this.gamepads = [];
    this.buttons = {};
    this.map = [];

    /**
     *
     * @type {GamePadInput}
     */
    this.gamepadController = new GamePadInput();
    this.gamepadController.on('gamepad_connected', this.gamepadConnected.bind(this));
    this.gamepadController.on('gamepad_disconnected', this.gamepadDisconnected.bind(this));
  };

  extend(InputManager, GameObject);

  InputManager.prototype.addButton = function (name = '', index = 0) {
    this.buttons[name] = { name: name, index: index };
  };

  /**
   * Return the registered buttons.
   *
   * @returns {{}}
   */
  InputManager.prototype.getButtons = function () {
    return this.buttons;
  };

  /**
   * Return the registered keys.
   *
   * @returns {{}}
   */
  InputManager.prototype.getKeys = function () {
    return this.keys;
  };

  /**
   * Add a key binding to action names.
   *
   * @param {array|KeyboardInput|string} input - a key string or an KeyboardInput instance
   * @param {array} actions - an array with strings identifying the actions this key(s) is|are used for
   */
  InputManager.prototype.mapInput = function (input = '', actions = []) {

    if (!(input instanceof Array)) {
      input = new Array(input);
    }

    let index = 0;

    for (let name of input) {

      if (Object.keys(this.buttons).indexOf(name) !== -1) {
        let info = this.buttons[name];

        for (let gamepad of this.gamepads) {
          if (gamepad.buttons[info.index] !== 'undefined') {

            gamepad.buttons[info.index].on('GamePad.button.pressed', event => {
              this.emit('InputManager.GamepadButtonPressed', event);
            });

            input[index] = gamepad.buttons[info.index];
            index++;
          }
        }
      } else {

        let key = new KeyboardInput(name);

        key.info.down = function (event) {
          parent.emit('InputManager.keyDown', event);
        };

        key.info.up = function (event) {
          parent.emit('InputManager.keyUp', event);
        };

        input[index] = key;
        index++;
      }
    }

    if (!(actions instanceof Array)) {
      throw new Error('InputManager: To is not an array.');
    }

    for (let i = 0; i < actions.length; i++) {
      let name = actions[i];

      if (typeof this.map[name] === 'undefined') {
        this.map[name] = [];
      }

      for (let j = 0; j < input.length; j++) {
        this.map[name].push(input[j]);
      }
    }
  };

  /**
   * Check to see if the mapping with the given name is down.
   *
   * @param {string} name - the mapping name
   * @return {boolean}
   */
  InputManager.prototype.isDown = function (name) {

    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping');
    }

    for (let i = 0; i < this.map[name].length; i++) {
      if (!(this.map[name][i] instanceof KeyboardInput)) {
        //    continue
      }

      if (this.map[name][i].isDown() === true) {
        return true;
      }
    }
    return false;
  };

  /**
   * Check to see if the mapping with the given name is up.
   *
   * @param {string} name - the mapping name
   * @return {boolean}
   */
  InputManager.prototype.isUp = function (name) {
    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping');
    }

    for (let i = 0; i < this.map[name].length; i++) {
      if (!(this.map[name][i] instanceof KeyboardInput)) {
        continue;
      }

      if (this.map[name][i].isUp() === true) {
        return true;
      }
    }
    return false;
  };

  /**
   * Check to see if there are any gamepads connected.
   *
   * @returns {boolean|*}
   */
  InputManager.prototype.haveGamePads = function () {
    return this.gamepadController.isConnected();
  };

  InputManager.prototype.getGamePad = function (index) {
    return this.gamepadController.getGamepad(index);
  };
  /**
   * Gamepad connected handler
   *
   * @param {Gamepad} gamepad - The connected gamepad
   */
  InputManager.prototype.gamepadConnected = function (gamepad) {
    this.gamepads[gamepad.index] = gamepad;

    this.emit('gamepad_connected', gamepad);

    for (let button of gamepad.buttons) {
      this.addButton('Button' + button.index, button.index);
    }
  };

  /**
   * Gamepad disconnected handler.
   *
   * @param {Gamepad} gamepad - The disconnected gamepad
   */
  InputManager.prototype.gamepadDisconnected = function (gamepad) {

    this.emit('gamepad_disconnected', gamepad);

    if (typeof this.gamepads[gamepad.index] !== 'undefined') {
      delete this.gamepads[gamepad.index];
    }
  };

  return InputManager;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * PluginManager
 * @namespace Core Managers
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
  /**
   * @classdesc PluginManager
   * @exports  core/managers/PluginManager
   * @class
   */
  let PluginManager = function (GameEngine) {
    this.GameEngine = GameEngine;
    this.plugins = [];
  };

  /**
   * Load a plugin into the game engine.
   *
   * @param {string} name - The folder name of the plugin
   * @param {string} alias - register the plugin under this alias.
   * @returns {object}
   */
  PluginManager.prototype.loadPlugin = function (name = '', alias = '') {
    if (!name.length) {
      throw new Error('loadPlugin: Empty plugin name.');
    }

    let plugin = __webpack_require__(617)("./" + name + '/index');

    if (!alias) {
      alias = name;
    }

    this.plugins[alias] = plugin;

    return plugin;
  };

  /**
   * Load a plugin into the game engine.
   *
   * @param {string} alias - Alias of the plugin
   * @returns {object}
   */
  PluginManager.prototype.getPlugin = function (alias) {
    if (!alias.length) {
      throw new Error('getPlugin: Empty plugin alias.');
    }

    if (!this.plugins[alias]) {
      throw new Error('getPlugin: Plugin not found.');
    }

    return this.plugins[alias];
  };

  return PluginManager;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * SceneManager
 * @namespace Core Managers
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(66), __webpack_require__(223)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GameEngine) {
  let ResizeManager = function (application, options) {

    this.application = application;

    this.resolution = window.devicePixelRatio;
    this.ratio = window.devicePixelRatio / this.resolution;

    this.setupListeners();
    this.onResize();
  };

  ResizeManager.prototype.setupListeners = function () {
    window.addEventListener('resize', this.onResize.bind(this));
  };

  ResizeManager.prototype.onResize = function (e) {
    this.resize();
  };

  ResizeManager.prototype.resize = function () {
    this.application.renderer.resize(window.innerWidth * this.ratio | 0, window.innerHeight * this.ratio | 0);
  };

  return ResizeManager;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;const LocalStorage = __webpack_require__(606);

/**
 * StateManager
 * @namespace Core Managers
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
  /**
   * @classdesc StateManager
   * @exports  core/managers/StateManager
   * @class
   */
  let StateManager = function () {
    this.adapter = new LocalStorage();
    if (typeof this.adapter.set !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the set method.');
    }

    if (typeof this.adapter.get !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the get method.');
    }

    if (typeof this.adapter.unset !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the unset method.');
    }
  };

  /**
   * Return a state by key.
   *
   * @param {string} key - State key
   * @returns {*}
   */
  StateManager.prototype.get = function (key) {
    return this.adapter.get(key);
  };

  /**
   *
   * @param {string} key - State key
   * @param {string} val = The value for this state
   */
  StateManager.prototype.set = function (key, val) {
    return this.adapter.set(key, val);
  };

  /**
   * Delete state with a given key from the StateManager.
   *
   * @param {string} key - Delete the value of this key
   */
  StateManager.prototype.unset = function (key) {
    return this.adapter.unset(key);
  };

  return StateManager;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(545);

class DebugDialog extends GameObject {

  /**
   * @classdesc DebugDialog
   * @exports  plugins/debug/manager/DebugDialog
   * @class
   */
  constructor() {
    super();
    this.init();
  }

  /**
   * Return a static instance of the DebugDialog.
   *
   * @returns {DebugDialog}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new DebugDialog();
    }
    return this.instance;
  }

  /**
   * Initialize the DebugDialog.
   */
  init() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0x5b635e, 0.5);
    graphics.drawRect(0, 0, this.app.screen.width, 30);
    graphics.endFill();

    let obj = {
      ' ': 32,
      'Enter': 18,
      backspace: 8,
      tab: 9,
      enter: 13,
      shiftleft: 16,
      shiftright: 16,
      ctrlleft: 17,
      ctrlrigght: 17,
      altleft: 18,
      altright: 18,
      pause: 19,
      capslock: 20,
      escape: 27,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      arrowleft: 37,
      arrowup: 38,
      arrowright: 39,
      arrowdown: 40,
      insert: 45,
      delete: 46,
      0: 48,
      1: 49,
      2: 50,
      3: 51,
      4: 52,
      5: 53,
      6: 54,
      7: 55,
      8: 56,
      9: 57,
      a: 65,
      b: 66,
      c: 67,
      d: 68,
      e: 69,
      f: 70,
      g: 71,
      h: 72,
      i: 73,
      j: 74,
      k: 75,
      l: 76,
      m: 77,
      n: 78,
      o: 79,
      p: 80,
      q: 81,
      r: 82,
      s: 83,
      t: 84,
      u: 85,
      v: 86,
      w: 87,
      x: 88,
      y: 89,
      z: 90,
      metaleft: 91,
      metaright: 92,
      select: 93,
      numpad0: 96,
      numpad1: 97,
      numpad2: 98,
      numpad3: 99,
      numpad4: 100,
      numpad5: 101,
      numpad6: 102,
      numpad7: 103,
      numpad8: 104,
      numpad9: 105,
      numpadmultiply: 106,
      numpadadd: 107,
      numpadsubtract: 109,
      numpaddecimal: 110,
      numpaddivide: 111,
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      f5: 116,
      f6: 117,
      f7: 118,
      f8: 119,
      f9: 120,
      f10: 121,
      f11: 122,
      f12: 123,
      numlock: 144,
      scrolllock: 145,
      semicolon: 186,
      equalsign: 187,
      comma: 188,
      minus: 189,
      period: 190,
      slash: 191,
      backquote: 192,
      bracketleft: 219,
      backslash: 220,
      braketright: 221,
      quote: 222
    };

    Object.keys(obj).forEach(name => {
      this.InputManager.mapInput([name]);
    });

    // this.InputManager.on('InputManager.keyDown', this.onKeyDown.bind(this))
    this.InputManager.on('InputManager.keyUp', this.onKeyUp.bind(this));

    let inputRow = new PIXI.Container();
    let prompt = new PIXI.Text('>', { fill: 0xFFFFFF, fontSize: 25 });
    this.promptText = new PIXI.Text('', { fill: 0xFFFFFF, fontSize: 25 });
    // let
    prompt.x = 5;
    this.promptText.x = prompt.x + prompt.width + 10;

    inputRow.addChild(prompt);
    inputRow.addChild(this.promptText);

    this.addChild(inputRow);
    this.addChild(graphics);
  }

  /**
   * React to the keyup event for when typing in the active
   * Scene.
   *
   * @param event
   */
  onKeyUp(event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See InputManager.mapInput
     * for more information.
     */
    this._updateDialogPromptText(event.key);
  }

  /**
   * Update the dialog after typing a character.
   *
   * @param char
   * @private
   */
  _updateDialogPromptText(char) {
    if (char === 'Enter') {
      let command = this.promptText.text.toLowerCase().trim();
      this.executeCommand(command);
    } else {
      this.promptText.text += char;
    }
  }

  /**
   * Execute a typed command.
   *
   * @param command
   */
  executeCommand(command) {
    if (this.DebugManager.haveCommand(command)) {
      console.log('have command');
    } else {
      console.log('command not found');
    }
  }
}

if (true) {
  module.exports = DebugDialog;
}

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

const pkg = __webpack_require__(563);

module.exports = {
  DebugManager: __webpack_require__(593)

  // pkg.moduleExists('pixi' /* take care of absolute paths */)
  //   .then(() => {
  //
  //     const PhysicsManager = require('./PhysicsManager')
  //
  //     module.exports = {
  //       PhysicsManager
  //     };
  //
  //     console.log('did export')
  //   })
  //   .catch(() => { throw Error('Plugins: Module matter-js was not found'); });

};

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

const PIXI = __webpack_require__(66);
const Plugin = __webpack_require__(594);

class DebugManager extends PIXI.utils.EventEmitter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Initialize the DebugManager
   */
  init() {

    this.commands = [];
    this.debugScene = new Plugin();
  }

  /**
   * Add a new command.
   *
   * @param {string} command - The command name.
   * @param {callback} callback - The callback to execute.
   */
  addCommand(command, callback) {
    this.commands[command] = callback;
  }

  /**
   * Check if a given command exists.
   *
   * @deprecated
   * @param {string} command - The command to check on.
   */
  haveCommand(command) {
    for (let name in Object.keys(this.commands)) {
      console.log(name);
    }
  }

  /**
   * Add a new command to handle.
   *
   * @param {[]} commands - The list of commands.
   */
  addCommands(commands) {
    if (!commands instanceof Array) {
      throw new Error('addCommand: parameter commands is no Array');
    }

    if (commands.length > 0) {
      commands.forEach((command, callback) => {
        this.addCommand(command, callback);
      });
    }
  }

  /**
   * Return a list of all commands.
   *
   * @returns {[]|Array}
   */
  getCommands() {
    return this.commands;
  }
}

if (true) {
  module.exports = DebugManager;
}

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

const ScenePlugin = __webpack_require__(573);
const DebugDialog = __webpack_require__(591);

class Plugin extends ScenePlugin {
  constructor() {
    super();
    this.setPostUpdateMode();
    this.runsPostStart();
    this.init();
  }

  /**
   * Initialize the object
   */
  init() {
    this.dialog = DebugDialog.getInstance();
    this.SceneManager.registerPlugin('debug-dialog', this);
  }

  /**
   * Start callback
   */
  start() {
    if (this.dialog.parent) {
      this.dialog.parent.removeChild(this.dialog);
    }
    this.app.stage.addChild(this.dialog);
  }
}

if (true) {
  module.exports = Plugin;
}

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware__ = __webpack_require__(598);


// PIXI.loaders.Loader.addPixiMiddleware(Middleware);
// PIXI.loader.use(Middleware.call(PIXI.loader));

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_TiledMap__ = __webpack_require__(600);



function Middleware() {

  return (resource, next) => {
    console.log('hi', resource);
    if (resource.children.length > 0) {

      if (!resource.data || resource.type !== PIXI.loaders.Resource.TYPE.XML) {
        return next();
      }

      const route = __WEBPACK_IMPORTED_MODULE_0_path___default.a.dirname(resource.url.replace(this.baseUrl, ''));
      console.log(resource.data);
      let map = new __WEBPACK_IMPORTED_MODULE_1__src_TiledMap__["a" /* TiledMap */](resource.data, route);
      map.parse();
      resource.data = map;
    }
  };
}

/***/ }),

/***/ 599:
/***/ (function(module, exports) {

class TileLayer {
  constructor() {
    // <layer name="Ground" width="10" height="10">
    //     <data encoding="base64" compression="zlib">
    //     eJxjYCAeCDAwHGAF0tgwUC4Bpg7IT2AE0tgwUG7BcFMH9PsCVkjYYGABIsMWBgD+UQ0d
    //     </data>
    //     </layer>
    this.name = data.name;
    this.width = data.width;
    this.height = data.height;
  }

}

module.exports = TileLayer;

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileLayer__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileLayer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TileLayer__);


class TiledMap {
  constructor(data = null, path = '') {

    if (!data instanceof Object || !path.length) throw new Error('Error initializing TiledMap instance.');

    /**
     * Container for the layers
     *
     * @type {Array}
     * @private
     */
    this._layers = [];

    /**
     * Container for the tilesets
     * @type {Array}
     * @private
     */
    this._tilesets = [];

    /**
     *
     * @type {string}
     * @private
     */
    this._path = path;

    /**
     *
     * @type {Object}
     * @private
     */
    this._data = data;
  }

  /**
   * Parse the tiled map.
   */
  parse() {

    this._data.layers.forEach(layerData => {

      let layer = new __WEBPACK_IMPORTED_MODULE_0__TileLayer___default.a(layerData);
      if (layer.encoding === 'base64') {
        layer.data = atob(layer.data);
        //
        if (typeof layerData.compression !== 'undefined') {
          if (layerData.compression === 'zlib' || layerData.compression === 'gzip') {
            var data = pako.inflate(layer.data);
            layer.data = [];
            for (var i = 0; i < data.length; i += 4) {
              layer.data.push(data[i]);
            }
          }
        }

        this._layers.push(layer);
      }
    });

    console.log(this.layers);
    // for (let layer of this._data.layers) {
    //   if (layer.encoding === 'base64') {
    //     layer.data = atob(layer.data)
    //
    //     if (typeof layer.compression !== 'undefined') {
    //       if (layer.compression == 'zlib' || layer.compression == 'gzip') {
    //         var data = pako.inflate(layer.data)
    //         layer.data = []
    //         for (var i = 0; i < data.length; i += 4) {
    //           layer.data.push(data[i])
    //         }
    //       }
    //     }
    //   }
    //   this.layers.push(layer)
    // }
  }

  /**
   *
   * @returns {string}
   */
  get path() {
    return this._path;
  }

  /**
   *
   * @returns {Array}
   */
  get tilesets() {
    return this._tilesets;
  }

  /**
   *
   * @returns {Array}
   */
  get layers() {
    return this._layers;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TiledMap;


/***/ }),

/***/ 606:
/***/ (function(module, exports) {

class LocalStorage {
  constructor() {
    if (typeof Storage === 'undefined') {
      throw new Error('LocalStorage: localStorage is not suppored by this browser.');
    }
  }

  get(key = '') {
    return localStorage.getItem(key);
  }

  set(key = '', value = '') {
    return localStorage.setItem(key, value);
  }

  unset(key = '') {
    return localStorage.removeItem(key);
  }
}

module.exports = LocalStorage;

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./debug/index": 592,
	"./matterjs/index": 564,
	"./tiledmap/index": 597
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 617;

/***/ })

});
//# sourceMappingURL=0.js.map