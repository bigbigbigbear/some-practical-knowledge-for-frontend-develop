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
    function deepClone(obj, map) {
        if(typeof obj !== 'object') return
        let newObj = obj instanceof Array ? [] : {}
        for(let k in obj) {
            if(obj.hasOwnProperty(k)) {
                newObj[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
            }
        }
        return newObj
    }
  ```

  一维数据结构的深拷贝方法建议使用：Object.assign()；

  二维数据结构及以上的深拷贝方法建议使用：JSON.parse(JSON.stringify())；

  特别复杂的数据结构的深拷贝方法建议使用：Loadsh.cloneDeep()；
