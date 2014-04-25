;(function(global,U,$){
    'use strict';
    var grace = global.grace;
    var View = U.create(function() {
        this.bindEventHandlers();
        this.loadTemplates();
    });
    View.augment({
        ENTER_KEY_KEYCODE : 13,
        bindEventHandlers: function() {
            var that = this;
            $('#new-todo').on('keyup', function(e) {
                var todoVal = $.trim($(e.target).val());
                if (e.which === that.ENTER_KEY_KEYCODE && todoVal !== '') {
                    e.preventDefault();
                    that.emit('todoadd', todoVal);
                }
            });
            $('#todo-list').on('click', '.destroy', function(e) {
                that.emit('tododelete', $(e.target).parents('li').data('id'));
            });
            $('#todo-list').on('click', 'input.toggle', function(e) {
                var event = $(e.target).is(':checked') ? 'todocompleted' : 'todouncompleted';
                that.emit(event, $(e.target).parents('li').data('id'));
            });
            $('#todo-list').on('dblclick', 'li', function(e) {
                that.emit('edittodo', $(e.target).closest('li').data('id'));
            });
            $('#todo-list').on('keyup focusout', 'input.edit', function(e) {
                if (e.type === 'keyup') {
                    if (e.which === that.ENTER_KEY_KEYCODE) {
                        e.preventDefault();
                    } else {
                        return false;
                    }
                }
                var $li = $(e.target).closest('li');
                that.emit('todoedit', {
                    id : $li.data('id'),
                    title : $.trim($li.find('.edit').val())
                });
            });
            $('#clear-completed').on('click', function() {
                that.emit('clearcompleted');
            });
            $('#toggle-all').on('click', function(e) {
                var isChecked = $(e.target).is(':checked');
                that.emit( isChecked ? 'completedall' : 'uncompletedall', isChecked);
            });
            global.onhashchange = function() {
                that.emit('statechange', that.getState());
            }
        },
        clearInput: function() {
            $('#new-todo').val('');
        },
        getState: function() {
            return global.location.hash.replace('#/', '') || 'all';
        },
        hide: function() {
            $('#main, #footer').hide();
        },
        loadTemplates : function() {
            this.template = $('#grace-template').html();
        },
        makeEditable : function(id) {
            var $item = $('#todo-list li[data-id=' + id + ']');
            $item.addClass('editing').find('input.edit').focus();
        },
        render: function(todos) {
            var html = grace.compile(this.template)({'todos' : todos});
            $('#todo-list').html(html);
        },
        setActiveRoute: function(route) {
            
            $('#filters a').removeClass('selected').filter('[href="#/' + route + '"]').addClass('selected');
        },
        show: function() {
            $('#main, footer').show();
        },
        showClearCompleted: function(completed) {
            var bool = completed > 0;
            $('#clear-completed').toggle(bool);
            $('#clear-completed').html('Clear (' + completed + ')');
        },
        showLeft: function(left) {
            $('#todo-count').html('<strong>' + left + '</strong> ');
            $("#toggle-all").get(0).checked = (left === 0);
        }
    });
    global.View = View;
})(this,understand,jQuery);
