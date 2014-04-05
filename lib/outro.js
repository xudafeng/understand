    /**
     * exports public class
     */
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
