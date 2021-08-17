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
