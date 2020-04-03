#### Object相关
   ```
    Object.entries()   // 返回一个给定对象自身可枚举属性的键值对数组

    const obj = { foo: 'bar', baz: 'abc' }; 
    console.log(Object.entries(obj));  // [['foo', 'bar'], ['baz', 'abc']]

    const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }]; 
    console.log(Object.entries(arr2));  // [['0', { a: 1 }], ['1', { b: 2 }], ['2', { c: 3 }]]

    遍历
    for (const [key, value] of Object.entries(todayILearn)) {
        console.log(key, value)
    }
   ```