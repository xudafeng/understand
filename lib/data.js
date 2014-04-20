/**
 * data bind system
 */
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
