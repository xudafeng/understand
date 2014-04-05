/**
 * create class
 * param o is the proto of object
 */
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
