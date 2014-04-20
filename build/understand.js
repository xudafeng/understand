/* ================================================================
 * understand.js v1.0.3
 *
 * MV* framework you could understand for a moment
 * Latest build : 2014-04-20 23:44:51
 *
 * 
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

;(function(root,factory){
    'use strict';
    /* amd like aml https://github.com/xudafeng/aml.git */
    if(typeof define === 'function' && define.amd) {
        return define(['exports'], factory);
    }else if(typeof exports !== 'undefined') {
        return factory(exports);
    }else{
    /* browser */
        factory(root['understand'] || (root['understand'] = {}));
    }
})(this,function(exports,moudle){
    'use strict';

var EMPTY = '';
    var guid = 0;
    var slice = Array.prototype.slice;

function __create(o) {
    if (Object.create) {
        return Object.create(o);
    } else {
        var F = function(){};
        F.prototype = o;
        return new F();
    }
}
/**
 * subclass factory
 * param f is constructor of a class
 */
function __factory(f){
    f = f || function(){};
    f.superclass = f.superclass || __Base;
    var superclass = f.superclass.prototype;
    function constructor() {
        if (!(this instanceof constructor)) {
            throw new Error('use new to create a class');
        }
        this.__id = __guid();
        __dataHash[this.__id] = {};
        __notifyHash[this.__id] = {};
        f.apply(this, arguments);
    }
    __extend(superclass, __notify);
    constructor.prototype = __create(superclass);
    constructor.prototype.constructor = constructor;
    __extend(constructor, {
        class : function(f) {
            f = f || function(){};
            f.superclass = this;
            return __factory(f);
        },
        extend : function() {
            return __extendThis.apply(this, arguments);
        },
        parent : superclass,
        augment : function() {
            return __extendThis.apply(this.prototype, arguments);
        }
    });
    return constructor;
}

var __notifyHash = {
};
function __emit(type, data) {
    var handlers = slice.call(__notifyHash[this.__id][type]);
    for (var i = 0, l = handlers.length; i < l; i++) {
        var e = __extend({}, handlers[i]);
        var scope = (e.scope) ? e.scope : this;
        e.scope = scope;
        e.handler.call(e.scope, data, e);
    }
};
function __detach(type) {
    var handlers = __notifyHash[this.__id];
    if (type) {
        delete handlers[type];
    } else {
        __notifyHash[this.__id] = {};
    }
};
function __bind(map, scope) {
    for (var e in map) {
        var handler = map[e];
        var events = e.split(" ");
        for (var i = 0, l = events.length; i < l; i++) {
            var t = events[i];
            if (!__notifyHash[this.__id][t]) {
                __notifyHash[this.__id][t] = [];
            }
            __notifyHash[this.__id][t].push({
                "id" : this.__id,
                "handler" : handler,
                "scope" : scope,
                "type" : t
            });
        }
    }
};
var __notify = {
    on : function() {
        __bind.apply(this, arguments);
    },
    emit : function(types, data) {
        var items = types.split(" ");
        for (var i = 0, l = items.length; i < l; i++) {
            var type = items[i];
            if (__notifyHash[this.__id][type]) {
                __emit.call(this, type, __typeOf(data) === "undefined" ? null : data);
            }
        }
    },
    detach : function() {
        __detach.apply(this, arguments);
    }
};

var __dataHash = {};
function __attr(id) {
    return __dataHash[id];
}
function __setAttr(key, value) {
    __dataHash[this.__id][key] = value;
    this.emit('change', key);
    this.emit('change:' + key, value);
    var __event = this.has(key) ? 'update' : 'create';
    this.emit(__event, key);
    this.emit(__event + ':' + key, value);
}
function __removeAttr(keys) {
    var a = __trim(keys).split(" ");
    for (var i = 0, l = a.length; i < l; i++) {
        var key = __trim(a[i]);
        if (key) {
            delete __attr(this.__id)[key];
            this.emit('change', key);
            this.emit('change:' + key);
            this.emit('delete', key);
            this.emit('delete:' + key);
        }
    }
}

function __Base() {
};
__Base.prototype = {
    get : function(i) {
        return this.has(i) ? __attr(this.__id)[i] : null;
    },
    set : function(k, v) {
        if (__typeOf(k) === "object") {
            for (var key in k) {
                __setAttr.call(this, key, k[key]);
            }
        } else {
            __setAttr.call(this, k, v);
        }
        return this;
    },
    delete : function(i) {
        if (__typeOf(i) === 'function') {
            var __dm =  __dataHash[this.__id];
            for (var key in __dm) {
               __removeAttr.call(this, __dm[key]['id']);
            }
            return this;
        }
        if (__typeOf(i) === 'undefined') {
            __dataHash[this.__id] = {};
            this.emit('change delete');
        } else {
            __removeAttr.call(this, i);
        }
        return this;
    },
    all : function() {
        return __clone( __attr(this.__id) );
    },
    has : function(k) {
        return !(__typeOf(__attr(this.__id)[k]) == "undefined");
    },
    size : function() {
        var size = 0;
        var attr = __attr(this.__id);
        for (var key in attr) {
            size++;
        }
        return size;
    },
    filter : function(fn) {
        var r = [];
        var a = __attr(this.__id);
        for (var key in a) {
            if ( fn.call(this, a[key], key)) {
                r.push( a[key] );
            }
        }
        return r;
    },
    update : function(k, fn) {
        if (!fn) {
            for (var key in __dataHash[this.__id]) {
               __setAttr.call(this, key, k.call(this, __dataHash[this.__id][key]) );
            }
        } else {
            __setAttr.call(this, k, fn.call(this, this.get(k), k));
        }
        return this;
    }
};

function __typeOf(c){
        if (c === null || typeof c === "undefined") {
            return String(c);
        } else {
            return Object.prototype.toString.call(c).replace(/\[object |\]/g, EMPTY).toLowerCase();
        }
    }
    function __extend(){
        var args = slice.call(arguments);
        var object = args.shift();
        for (var i = 0, l = args.length; i < l; i++) {
            var props = args[i];
            for (var key in props) {
                object[key] = props[key];
            }
        }
        return object;
    }
    function __trim(str){
        return str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
    }
    function __clone(o){
        var type = __typeOf(o);
        if (type === 'object') {
            return __extend({}, o);
        }
        if (type === 'array') {
            return o.slice(0);
        }
    }
    function __extendThis() {
        var args = slice.call(arguments);
        args.unshift(this);
        return __extend.apply(this, args);
    }
    function __timestamp() {
        var _time = +new Date;
        return 'understand-'+ _time;
    }
    function __guid(){
        return guid ++;
    }

exports._ = {
        clone : __clone,
        extend : __extend,
        trim : __trim,
        typeOf : __typeOf,
        guid:__guid
    };
    /**
     * exports api
     */
    exports.extend = function(){
        return __extendThis.apply(__Base.prototype, arguments);
    }
    exports.class = function(c) {
        return __factory(c);
    }
    exports.version = "1.0.3";
});
/* vim: set sw=4 ts=4 et tw=80 : */
