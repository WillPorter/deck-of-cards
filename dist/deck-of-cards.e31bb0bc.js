// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
window.addEventListener('load', function () {
  // create card object
  var suites = ['hearts', 'diamonds', 'spades', 'clubs'];
  var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var deckArr = [];
  var isDeckBuilt = false; //buttons

  var buildBtn = document.querySelector('.build-button');
  var shuffleBtn = document.querySelector('.shuffle-button');
  var cutBtn = document.querySelector('.cut-button');
  var dealBtn = document.querySelector('.deal-button');
  var randomDealBtn = document.querySelector('.random-deal-button');
  var bjBtn = document.querySelector('bj-button'); //deck display

  var cardDisplay = document.querySelector('.card-display');
  var dealDisplay = document.querySelector('.delt-cards'); //create deck by looping 52 times and return results to deck array

  var Deck = {
    build: function build() {
      //check to see if the deck is already built.  if it is, don't build again
      if (!isDeckBuilt) {
        //start with an empty deck
        deckArr = [];

        for (var i = 0; i < 4; i++) {
          var cardSuite = suites[i];

          for (var x = 0; x < 13; x++) {
            var card = {};
            var cardValue = values[x];
            card.value = cardValue;
            card.suite = cardSuite;
            card.img = "".concat(cardValue, "-").concat(cardSuite);
            deckArr.unshift(card);
          }

          ;
        }

        ;
      } //limit the ability of the user to deal a second deck to the array


      isDeckBuilt = true; //clear the dealt cards field

      dealDisplay.innerHTML = '';
      return deckArr;
    },
    shuffle: function shuffle(array) {
      var m = array.length,
          t,
          i; // While there remain elements to shuffle…

      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--); // And swap it with the current element.

        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    },
    //pull the value and the name out of the card object
    displayName: function displayName(item) {
      var deckDisplayName = [item.value, item.suite].join(' of ');
      var imgURL = "images/".concat(item.img, ".png");
      return "\n            <div class=\"card-block\">\n            <img src=\"".concat(imgURL, "\" />\n            <span>").concat(deckDisplayName, "</span>\n            </div>\n            ");
    },
    //loop through the above displayname to get all the card values
    display: function display() {
      cardNameDisplay = deckArr.map(Deck.displayName);
      cardDisplay.innerHTML = deckArr.map(Deck.displayName).join('');
    },
    //cut the deck in half display two arrays
    cut: function cut(arr) {
      var cut1 = arr.slice(0, 26);
      var cut2 = arr.slice(27, 51);
      var cut1Display = cut1.map(Deck.displayName);
      var cut2Display = cut2.map(Deck.displayName);
      cardDisplay.innerHTML = "<strong>Cut 1</strong><br>".concat(cut1Display, "<br><br>\n                <strong>Cut 2<br></strong>").concat(cut2Display);
    },
    deal: function deal(arr) {
      //take the first item in the card array, remove it, and display it
      var firstCard = arr.shift();
      var firstCardName = Deck.displayName(firstCard);
      dealDisplay.innerHTML = "<br><br>Delt card:<br>".concat(firstCardName);
    },
    dealRandom: function dealRandom(arr) {
      //find a random card in the deck and display it
      var randCard = arr[Math.floor(Math.random() * arr.length)];
      var randCardLocation = arr.indexOf(randCard);
      arr.splice(randCardLocation, 1);
      var randCardDisplay = Deck.displayName(randCard);
      dealDisplay.innerHTML = "<br><br>Randomly delt card:<br>".concat(randCardDisplay);
    }
  };

  if (buildBtn) {
    buildBtn.addEventListener('click', function (event) {
      event.preventDefault();
      Deck.build();
      Deck.display();
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', function (event) {
      event.preventDefault();
      Deck.build();
      Deck.shuffle(deckArr);
      Deck.display(); //give ability to build a new deck that is not shuffled

      isDeckBuilt = false;
    });
  }

  if (cutBtn) {
    cutBtn.addEventListener('click', function (event) {
      event.preventDefault();
      Deck.cut(deckArr); //give ability to create a fresh deck

      isDeckBuilt = false;
    });
  }

  if (dealBtn) {
    dealBtn.addEventListener('click', function (event) {
      event.preventDefault();
      Deck.deal(deckArr);
      Deck.display(deckArr); //give ability to create a fresh deck

      isDeckBuilt = false;
    });
  }

  if (randomDealBtn) {
    randomDealBtn.addEventListener('click', function (event) {
      event.preventDefault();
      Deck.dealRandom(deckArr);
      Deck.display(deckArr);
    });
  }

  function newFunction() {
    console.log(buildBtn);
  }
});
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49738" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/deck-of-cards.e31bb0bc.js.map