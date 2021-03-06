;(function(global,U){
    'use strict';
    var _ = U._;
    var Controller = U.create(function() {
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
                    this.model.remove(id);
                },
                'todocompleted todouncompleted': function(id, e) {
                    this.model.update(id, function(item) {
                        item.completed = (e.type === 'todocompleted');
                        return item;
                    });
                },
                'todoedit': function(data) {
                    if (data.title === "") {
                        this.model.remove(data.id);
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
            this.view.showClearCompleted( this.model.getComplete().length );
        }
    });
    new Controller();
})(this,understand);
