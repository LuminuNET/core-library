/* @luminu/core | version 0.3.0 | author Keimeno */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Redis = _interopDefault(require('ioredis'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var redis;
var baseKey;
/**
 *
 * @param scope
 * @param port
 * @param ip
 * @param connectionTimeout
 */
var createRedisConnection = function (scope, port, ip, connectionTimeout) {
    redis = new Redis(port, ip, {
        connectTimeout: connectionTimeout
    });
    // sets the base scoped key for redis
    baseKey = "lm:web:" + scope + ":";
};
/**
 *
 * @param channel
 * @param identifier
 * @param _buffer
 * @param cb
 */
var publishBinary = function (channel, identifier, buffer, cb) { return __awaiter(void 0, void 0, Promise, function () {
    var encodedBuffer;
    return __generator(this, function (_a) {
        encodedBuffer = buffer.toString('base64');
        redis.publish(channel, "b" + identifier + "|" + encodedBuffer, cb);
        return [2 /*return*/];
    });
}); };
/**
 * publishes a message to a channel
 * can get a callback
 *
 * @param channel
 * @param message
 * @param cb
 */
var publish = function (channel, message, cb) {
    redis.publish(channel, message, cb);
};
/**
 *
 * @param channels
 */
var subscribe = function (channels) { return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, redis.subscribe.apply(redis, channels)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Sets a value, depending on it's use and scope
 *
 * @param use
 * @param scoped
 * @param value
 */
var setValue = function (use, value, expires, scoped) { return __awaiter(void 0, void 0, Promise, function () {
    var key;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (scoped) {
                    key = baseKey + use + ':' + scoped;
                }
                else {
                    key = baseKey + use;
                }
                if (!expires) return [3 /*break*/, 2];
                return [4 /*yield*/, redis.set(key, value, 'EX', expires)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, redis.set(key, value)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Gets a value, depending on it's use and scope
 *
 * @param use
 * @param scoped
 */
var getValue = function (use, scoped) { return __awaiter(void 0, void 0, Promise, function () {
    var key;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (scoped) {
                    key = baseKey + use + ':' + scoped;
                }
                else {
                    key = baseKey + use;
                }
                return [4 /*yield*/, redis.get(key)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Delete a value, depending on it's use and scope
 *
 * @param use
 * @param scoped
 */
var delValue = function (use, scoped) { return __awaiter(void 0, void 0, Promise, function () {
    var key;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (scoped) {
                    key = baseKey + use + ':' + scoped;
                }
                else {
                    key = baseKey + use;
                }
                return [4 /*yield*/, redis.del(key)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Increment user's usage in redis
 * creates a new string if it doesn't exist
 *
 * @param use
 * @param ip
 */
var incrUser = function (use, ip) { return __awaiter(void 0, void 0, Promise, function () {
    var key, currentEntry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = baseKey + use + ':' + ip;
                return [4 /*yield*/, redis.get(key)];
            case 1:
                currentEntry = _a.sent();
                if (currentEntry) {
                    // increments the value
                    redis.incr(key);
                }
                else {
                    // creates a new key for the user with tries set to 1
                    // lets the key expire after 5 minutes
                    redis.set(key, 1, 'EX', 60 * 5);
                }
                return [4 /*yield*/, redis.get(key)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Deletes the user count entry before it expires
 *
 * @param use
 * @param ip
 */
var delUser = function (use, ip) { return __awaiter(void 0, void 0, Promise, function () {
    var key;
    return __generator(this, function (_a) {
        key = baseKey + use + ':' + ip;
        // removes the key
        redis.del(key);
        return [2 /*return*/];
    });
}); };

var redis_service = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createRedisConnection: createRedisConnection,
    publishBinary: publishBinary,
    subscribe: subscribe,
    publish: publish,
    setValue: setValue,
    getValue: getValue,
    delValue: delValue,
    incrUser: incrUser,
    delUser: delUser,
    get baseKey () { return baseKey; },
    'default': createRedisConnection
});

var LOCALE_KEY = 'lm:locale';
var getLocale = function () {
    return window.localStorage.getItem(LOCALE_KEY);
};
var toggleLocale = function () {
    window.localStorage.setItem(LOCALE_KEY, getLocale() === 'en' ? 'de' : 'en');
};

var locale_service = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getLocale: getLocale,
    toggleLocale: toggleLocale
});

var LuminuBuffer = /** @class */ (function () {
    function LuminuBuffer() {
        this._buffer = Buffer.from('');
    }
    LuminuBuffer.prototype.writeInt = function (number) {
        var _buffer = Buffer.alloc(4);
        _buffer.writeUInt32BE(number, 0);
        this._buffer = Buffer.concat([this._buffer, _buffer]);
    };
    LuminuBuffer.prototype.writeString = function (string) {
        var buffer = Buffer.alloc(string.length);
        this.writeInt(string.length);
        buffer.write(string, 0);
        this._buffer = Buffer.concat([this._buffer, buffer]);
    };
    Object.defineProperty(LuminuBuffer.prototype, "buffer", {
        get: function () {
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    return LuminuBuffer;
}());
var buffer_service = new LuminuBuffer();

exports.Buffer = buffer_service;
exports.Locale = locale_service;
exports.Redis = redis_service;
