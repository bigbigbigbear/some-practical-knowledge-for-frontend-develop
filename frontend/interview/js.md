# javascript

## 数组

* Array.from(arrayLike[, mapFunction[, thisArg]])
  * 数组去重：Array.from(new Set(arr)) 或者 [...new Set(arr)]
  * 将类数组对象转换成数组: Array.from('Hey')
  * 克隆一个数组，浅拷贝：const numbers = [3, 6, 9];  const numbersCopy = Array.from(numbers);
  * 使用值填充数组

    ```javascript
    const length = 3;
    const init   = 0;
    const result = Array.from({ length }, () => init);
    result; // => [0, 0, 0]
    ```

* Array.reduce()
  接受两个参数：一个是对数组每个元素执行的回调方法，一个是初始值。
  * 求和：

    ```javascript
    var total = [1, 2, 3].reduce(function (sum, current) {
        return sum + current
    }, 0)
    ```

  * 组合多个数组方法：

    ```javascript
    var hufflepuff = wizards.reduce(function (newArr, wizard) {
        if (wizard.house === 'Hufflepuff') {
            newArr.push(wizard.name)
        }
        return newArr
    }, [])
    ```

  * 从数组生成 HTML 标签：

    ```javascript
    var hufflepuffList = wizards.reduce(function (html, wizard) {
        if (wizard.house === 'Hufflepuff') {
            html += '<li>' + wizard.name + '</li>'
        }
        return html
    }, '')
    ```

  * 数组元素分组
  * 合并数据到单个数组
  * 数组分割

    ```javascript
    function Chunk(arr = [], size = 1) {
        return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];
    }
    const arr = [1, 2, 3, 4, 5];
    Chunk(arr, 2); // [[1, 2], [3, 4], [5]]
    ```

## 深拷贝与浅拷贝

* 深拷贝

  ```javascript
    function deepClone(obj, map = new Map()) {
        if(typeof obj !== 'object') return
        let newObj = obj instanceof Array ? [] : {}
        if(map.get(obj)) {
          return map.get(obj)
        }
        map.set(obj, newObj)
        for(let k in obj) {
            if(obj.hasOwnProperty(k)) {
                newObj[k] = typeof obj[k] === 'object' ? deepClone(obj[k], map) : obj[k]
            }
        }
        return newObj
    }
  ```

  一维数据结构的深拷贝方法建议使用：Object.assign()；

  二维数据结构及以上的深拷贝方法建议使用：JSON.parse(JSON.stringify())；

  特别复杂的数据结构的深拷贝方法建议使用：Loadsh.cloneDeep()；

## == && ===

   "==="叫做严格运算符，严格运算符的运算规则如下：
    (1)不同类型值
    如果两个值的类型不同，直接返回false。
    (2)同一类的原始类型值
    同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，值不同就返回false。
    (3)同一类的复合类型值
    两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个对象。
    (4)undefined和null
    undefined 和 null 与自身严格相等

```javascript
  null === null  //true
  undefined === undefined  //true
```

## 手写promise

   ```javascript
   const PENDING = 'pending'
   const FULLFILLED = 'fulfilled'
   const REJECTED = 'rejected'

   function myPromise(fn) {
     const that = this
     that.state = PENDING
     that.value = null
     that.resolvedCallbacks = []
     that.rejectedCallbacks = []

     try {
       fn(resolve, reject)
     } catch (e) {
       reject(e)
     }
   }

   function resolve(value) {
     if(that.state = PENDING) {
       that.state = FULFILLED
       that.value = value
       that.resolvedCallbacks.map(cb => cb(that.value))
     }
   }

   function reject(value) {
     if(that.state = PENDING) {
       that.state = REJECTED
       that.value = value
       that.rejectedCallbacks.map(cb => cb(that.value))
     }
   }

   myPromise.prototype.then = function(onFulFilled, onRejected) {
     const that = this
     onFulFilled = typeof onFulfilled === 'function' ? onFulFilled : v => v
     onRejected = typeof onRejected === 'function' ? onRejected : r => throw r

     if(that.state === PENDING) {
       that.resolvedCallbacks.push(onFulFilled)
       that.rejectedCallbacks.push(onRejected)
     }

     if(that.state === FULFILLED) {
       onFulFilled(that.value)
     }

     if(that.state === REJECTED) {
       onRejected(that.value)
     }
   }
   ```

## Event Loop

   它是一个程序结构，用于等待和发生消息事件，是一种解决javascript单线程运行时不会阻塞的一种机制。在程序中设置两个线程：一个负责程序本身的运行，称为主线程；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为Event Loop线程（消息线程）。
   事件循环，是运行在浏览器环境/node环境中的一种消息通信机制，它是主线程之外的独立线程。当主线程内需要执行某些可能导致线程阻塞的耗时操作时（比如请求发送与接收响应、文件I/O、数据计算）主线程会注册一个回调函数并抛给Event Loop线程进行监听，自己则继续往下执行，一旦有消息返回并且主线程空闲的情况下，Event Loop会及时通知主线程，执行对应的回调函数获取信息，以此达到非阻塞的目的。

## call、apply

   ```javascript
    Function.prototype.myCall = function(context) {
      if(typeof this !== 'function') throw new TypeError('not function')

      context = context || window
      let fn = Symbol('fn')
      context[fn] = this
      const args = [...arguments].slice(1)
      const result = context.fn(..args)
      delete context[fn]

      return result
    }

    Function.prototype.myApply = function(context) {
      if(typeof this !== 'function') throw new TypeError('not function')

      context = context || window
      let fn = Symbol('fn')
      let result
      context[fn] = this
      if(arguments[1]) {
        result = context.fn(...arguments[1])
      }else {
        result context.fn()
      }
      delete context[fn]

      return result
    }
   ```

## 原型链

  在 JavaScript 中，如果想访问某个属性，首先会在实例对象（cat）的内部寻找，如果没找到，就会在该对象的原型（cat.__proto__，即 Cat.prototype）上找，我们知道，对象的原型也是对象，它也有原型，如果在对象的原型上也没有找到目标属性，则会在对象的原型的原型（Cat.prototype.__proto__）上寻找，以此内推，直到找到这个属性或者到达了最顶层。在原型上一层一层寻找，这便就是原型链了。
