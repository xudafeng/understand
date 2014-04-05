/**
 * notify system
 */
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
