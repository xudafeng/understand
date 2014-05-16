    /**
     * util classes
     */
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
