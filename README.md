# UnderStand.js
### MV* framework you could understand in a moment

抽象模型：
1.基类扩展
    understand.extend({
        fun1:function(){
            console.log('基类扩展)
        }
    });
    var Module = U.class();
    var i = new Module();
    i.fun1();
2.创建模型
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
           // this.fun2();
        }
    });
    var p = new Parent('parent');
    p.fun1();
    //p.fun2();
    var c = new Child('child');
    c.fun3();*/
 
3.子类继承
4.静态属性、方法

数据绑定：
1.get
2.set
3.filter
4.delete
5.all
6.size
7.has
消息分发：
1.on
2.emit
3.detach
通用工具类：
1.each
2.extend
3.clone
4.trim
5.typeof
