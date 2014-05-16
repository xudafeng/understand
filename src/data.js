/**
 * data bind system
 */

    function __attr(id) {
        return id ? this.__dataHash[id]:this.__dataHash;
    }
    function __setAttr(key, value) {
        this.__dataHash[key] = value;
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
                delete __attr.call(this,key);
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
            return this.has(i) ? __attr.call(this,i) : null;
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
        remove : function(i) {
            if (__typeOf(i) === 'function') {
                var __dm =  this.__dataHash;
                for (var key in __dm) {
                    __removeAttr.call(this, __dm[key]['id']);
                }
                return this;
            }
            if (__typeOf(i) === 'undefined') {
                this.__dataHash = {};
                this.emit('change delete');
            } else {
                __removeAttr.call(this, i);
            }
            return this;
        },
        all : function() {
            return __clone( __attr.call(this) );
        },
        has : function(k) {
            return !(__typeOf(__attr.call(this,k)) == "undefined");
        },
        size : function() {
            var size = 0;
            var attr = __attr.call(this);
            for (var key in attr) {
                size++;
            }
            return size;
        },
        filter : function(fn) {
            var r = [];
            var a = __attr.call(this);
            for (var key in a) {
                if ( fn.call(this, a[key], key)) {
                    r.push( a[key] );
                }
            }
            return r;
        },
        update : function(k, fn) {
            if (!fn) {
                for (var key in this.__dataHash) {
                    __setAttr.call(this, key, k.call(this, this.__dataHash[key]) );
                }
            } else {
                __setAttr.call(this, k, fn.call(this, this.get(k), k));
            }
            return this;
        }
    };
