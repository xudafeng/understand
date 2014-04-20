# UnderStand.js
### MV* framework you could understand in a moment

### 抽象模型：
- 1.基类扩展

```javascript
    understand.extend({
        fun1:function(){
            console.log('基类扩展)
        }
    });
    var Module = U.class();
    var i = new Module();
    i.fun1();
```

- 2.创建模型

```javascript
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
    c.fun3();
```

- 3.子类继承
- 4.静态属性、方法

### 数据绑定：

```javascript
   var Module = U.class();
```
0. get

```javascript
   Module.get(key);
```
0. set

```javascript
   Module.get(key, value);
```
0. filter

```javascript
   Module.filter(fn);
```

0. delete

```javascript
   Module.delete([key | fn]);
```

0. all

```javascript
   Module.all(); // return attributes
```

0. size

```javascript
   Module.size(); // return attributes size
```

0. has

```javascript
   Module.has(key);//return boolean
```


0. update

```javascript
   Module.update([key,]fn);
```

### 消息分发：
0. on
0. emit
0. detach


### 通用工具类：
0. each
0. extend
0. clone
0. trim
0. typeof
