# Object相关

* Object.entries()

   ```javascript
    Object.entries()   // 返回一个给定对象自身可枚举属性的键值对数组

    const obj = { foo: 'bar', baz: 'abc' }; 
    console.log(Object.entries(obj));  // [['foo', 'bar'], ['baz', 'abc']]

    const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }]; 
    console.log(Object.entries(arr2));  // [['0', { a: 1 }], ['1', { b: 2 }], ['2', { c: 3 }]]

    // 遍历
    for (const [key, value] of Object.entries(todayILearn)) {
        console.log(key, value)
    }
   ```

* [Object.defineProperty()](https://www.jianshu.com/p/8fe1382ba135)

   ```javascript
    // Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
    Object.defineProperty(obj, prop, desc)

    // 通过Object.defineProperty()为对象定义属性，有两种形式，且不能混合使用，分别为数据描述符，存取描述符，下面分别描述下两者的区别：
    let Person = {}
    Object.defineProperty(Person, 'name', {
        value: 'jack',
        writable: true, // 是否可以写入，默认false
        configrable: true, // 是否可以删除、新增、覆盖
        enumerable: true // 是否可以枚举，是否会出现在for in 或者 Object.keys()的遍历中
    })
    Person.name = 'Rose'
    console.log(Person.name)   // 'Rose'

    // 说明一
    let Person = {}
    Person.name = 'Bear'
    // 等同于
    Object.defineProperty(Person, 'name', {
        value: 'Bear',
        configrable: true,
        writable: true,
        enumerable: true
    })

    // 说明二
    let Person = {}
    Object.defineProperty(Person, 'age', {
        value: 30
    })
    // 等同于
    Object.defineProperty(Person, 'age', {
        value: 30,
        configrable: false,
        writable: false,
        enumerable: false
    })
   ```
