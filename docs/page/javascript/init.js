;(function(global,U){
    'use strict';
    var _ = U._;
    var Controller = U.class(function() {
        this.view = new global.View();
        this.store = new global.Store();
        this.model = new global.Model(this.store.load());
        this.bind();
        this.set('state', this.view.getState());
    });
    Controller.augment({
        bind: function() {
            this.on({
                'change:state': function(state) {
                    this.view.setActiveRoute(state);
                    this.renderView();
                }
            });
            this.model.on({
                'change' : function() {
                    this.renderView();
                },
                'change ready': function() {
                    this.view.showClearCompleted( this.model.getComplete().length );
                }
            }, this);
            this.view.on({
                'clearcompleted': function() {
                    this.model.clearCompleted();
                },
                'edittodo': function(id) {
                    this.view.makeEditable(id);
                },
                'statechange': function(state) {
                    this.set('state', state);
                },
                'todoadd': function(todo) {
                    this.model.addTodo(todo);
                    this.view.clearInput();
                },
                'tododelete': function(id) {
                    this.model.delete(id);
                },
                'todocompleted todouncompleted': function(id, e) {
                    this.model.update(id, function(item) {
                        item.completed = (e.type === 'todocompleted');
                        return item;
                    });
                },
                'todoedit': function(data) {
                    if (data.title === "") {
                        this.model.delete(data.id);
                    } else {
                        this.model.update(data.id, function(item) {
                            item.title = data.title;
                            return item;
                        });
                    }
                },
                'completedall uncompletedall': function(completedall, e) {
                    this.model.update(function(item) {
                        item.completed = completedall;
                        return item;
                    });
                }
            }, this);
        },
        renderView: function() {
            this.store.save( this.model.all() );
            this.view.render( this.model.getItemsByState( this.get('state') ) );
            this.view.showLeft( this.model.getLeft().length );
            if ( this.model.size() > 0 ) {
                this.view.show();
            } else {
                this.view.hide();
            }
        }
    });
    new Controller();
    /*
    U.extend({
        fun1:function(){
            console.log('func1 from base class');
        }
    })
    var Parent = U.class(function(name){
        console.log(name + ' born');
    });
    Parent.augment({
        fun2:function(){
            console.log('fun2 from method prototype');
        }
    });
    var Child = Parent.class(function(name){
        console.log(name + ' born');
        this.fun2();
    });
    Child.augment({
        fun3:function(){
            this.fun1();
            this.fun2();
        }
    });
    var sChild = Child.class();
    var p = new Parent('parent');
    p.fun1();
    //p.fun2();
    var c = new Child('child');
    c.fun3();
    var d = new sChild();
    console.log('---')
    d.fun3();
    */
})(this,understand);
