;(function(global,U){
    'use strict';
    function __timestamp() {
        var _time = +new Date;
        return 'understand-'+ _time;
    }
    var Model = U.class(function(todos) {
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
            this.delete(function(item) {
                return item.completed === true;
            });
        },
        getItemsByState : function(state) {
            state = state || "all";
            if (state === 'all') {
                var all = [];
                this.filter(function(i,k){
                    i['id'] = k;
                    all.push(i);
                });
                return all;
            } else if (state === 'doing') {
                return this.getLeft();
            } else if (state === 'done') {
                return this.getComplete();
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
    var Store = U.class(function() {
        if (!'localStorage' in global) {
            alert("Saving is not supcompletedallported in your browser :(");
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
