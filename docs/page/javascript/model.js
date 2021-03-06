;(function(global,U){
    'use strict';
    function __timestamp() {
        var _time = +new Date;
        return 'understand-'+ _time;
    }
    var Model = U.create(function(todos) {
        this.set(todos);
    });
    Model.augment({
        addTodo: function(title) {
            this.set(__timestamp(),{
                'completed' : false,
                'title' : title
            });
        },
        clearCompleted: function() {
            this.remove(function(item) {
                return item.completed === true;
            });
        },
        getItemsByState : function(state) {
            state = state || "all";
            switch(state){
                case 'all':
                    var all = [];
                    this.filter(function(i,k){
                        i['id'] = k;
                        all.push(i);
                    });
                    return all;
                break;
                case 'doing':
                    return this.getLeft();
                break;
                case 'done':
                    return this.getComplete();
                break;
            }
        },
        getComplete: function() {
            return this.filter(function(item) {
                return item.completed === true;
            });
        },
        getLeft: function() {
            return this.filter(function(item) {
                return item.completed === false;
            });
        }
    });
    var Store = U.create(function() {
        if (!'localStorage' in global) {
            U.util.log('not support localStorage');
        }
    });
    Store.augment({
        load: function() {
            var result = global.localStorage['understand-what-todo'];
            return result ? JSON.parse(result) : {};
        },
        save: function(data) {
            global.localStorage['understand-what-todo'] = JSON.stringify(data);
        }
    });
    global.Model = Model;
    global.Store = Store;
})(this,understand);
