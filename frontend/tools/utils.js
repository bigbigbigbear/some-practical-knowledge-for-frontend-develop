// 防抖：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
// 搜索输入框联想
function debounce(callback, delay=300, immediate=false) {
    var timer
    return function() {
        var context = this
        var args = arguments

        if(timer) clearTimeout(timer)

        if(immediate) {
            timer = setTimeout(function() {
                timer = null
            }, delay)
            if(!timer) callback.apply(context, args)
        }else {
            timer = setTimeout(function() {
                callback.apply(context, args)
            }, delay)
        }
    }
}

// 节流：如果你持续触发事件，每隔一段时间，只执行一次事件。根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。我们用 immediate 代表首次立即执行，trailing 代表结束后是否再执行一次
// 提交按钮、秒杀、切换、轮播及动画
function throttle(callback, delay=300, {immediate = false, trailing = false} = {}) {
    var timer,context,args,result
    var previous = 0

    var later = function() {
        previous = immediate === false ? 0 : +new Date()
        timer = null
        callback.apply(context, args)
        if(!timer) context = args = null
    }

    var throttled = function() {
        var now = +new Date()
        if(!previous && immediate === false) previous = now
        var remain = delay - (now - previous)
        context = this
        args = arguments
        if(remain <= 0 || remain > delay) {
            if(timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            callback.apply(context, args)
            if(!timer) context = args = null
        }else if(!timer && trailing === true) {
            timer = setTimeout(later, remain)
        }
    }

    return throttled
}

const simpleThrottle = function(callback, delay) {
    let timer, last
    var flag = false
    return function() {
        let context = this
        let args = arguments
        let now = +new Date()

        // if(now - last > delay) {
        //     last = now
        //     callback.apply(context, args)
        // }
        if(flag) return
        flag = true
        timer = setTimeout(function() {
            flag = false
            callback.apply(context, args)
        }, delay)
    }
}

// 数组转树形
function arrayToTree(list) {
    let res = []
    let map = {}
    list.forEach((item, index) => {
        if(map.hasOwnProperty(item["pId"])) {
            map[item["pId"]].push(item)
        }else {
            map[item["pId"]] = [item]
        }
    })
    // console.log(map)
    res = findNodes(map["0"],map)
    function findNodes(arr,map) {
        arr.map((val,index) => {
            if(map[val["id"]]) {
                val["children"] = map[val["id"]]
                findNodes(val["children"],map)
            }
        })

        return arr
    }

    console.log(JSON.parse(JSON.stringify(res)))
}

const arrayToTree2 = (list, rootId, { idName='id', pIdName='pId', childName='children' } = {}) => {
    if(!Array.isArray(list)) {
        new Error('not Array')
        return
    }

    const resultMap = {}
    const result = []

    for(const item of list) {
        const id = item[idName]
        const pId = item[pIdName]
        item[childName] = []

        resultMap[id] = !resultMap[id] ? item : { ...item, ...resultMap[id] }

        const treeItem = resultMap[id]
        if(pId !== rootId) {
            if(!resultMap[pId]) {
                resultMap[pId] = {}
            }

            if(!resultMap[pId][childName]) {
                resultMap[pId][childName] = []
            }
            resultMap[pId][childName].push(treeItem)
        }else {
            result.push(treeItem)
        }

        // console.log("===》》》 " + JSON.stringify(resultMap))
    }
    // console.log(list)
    console.log(JSON.stringify(result))
}

const arrayToTree3 = function(list) {
    list.filter(item => {
        item.children = list.filter(item1 => {
            return item1.pId === item.id
        })

        return item.pId === 0
    })
}

let data =[
    {id:1,name:'部门A',pId:0},
    {id:2,name:'部门B',pId:0},
    {id:3,name:'部门C',pId:1},
    {id:4,name:'部门D',pId:1},
    {id:5,name:'部门E',pId:2},
    {id:6,name:'部门F',pId:3},
    {id:7,name:'部门G',pId:2},
    {id:8,name:'部门H',pId:4}
]

// arrayToTree(data)
const deepClone = function(obj = {}) {
    const map = new WeakMap()
    function isObject(obj) {
        return obj !== null && (typeof obj === 'function' || typeof obj === 'object')
    }
    function clone(obj) {
        if(!isObject(obj)) return obj
        let newObj = Array.isArray(obj) ? [] : {}
        if(map.get(obj)) return map.get(obj)
        map.set(obj, newObj)
        for(const key in obj) {
            newObj[key] = clone(obj[key])
        }

        return newObj
    }

    return clone(obj)
}


const promiseAll = function(list) {
    if(!Array.isArray(list)) throw new Error('arguments must be array')
    return new Promise((resolve, reject) => {
        let result = []
        let count = 0
        for(const [i, k] of list) {
            resolve(k).then(res => {
                count++
                result[i] = res
                if(count === list.length) {
                    resolve(result)
                }
            }, err => {
                reject(err)
            })
        }
    })
}

const instanceOf = function(l, r) {
    l = l.__proto__
    let rp = r.prototype

    while(true) {
        if(l === null || l === undefined) return false
        if(l === r) return true
        l = l.__proto__
    }
}

// console.log(instanceOf("666",Array))

Array.prototype.myReduce = function(cb, initVal) {
    if(!typeof cb === 'function') throw new Error('cb is not a function')

    let res = initVal === undefined ? this[0] : initVal
    // console.log(this)
    let index = initVal === undefined ? 1 : 0
    for(let i = index;i < this.length;i++) {
        res = cb(res, this[i], i, this)
    }

    return res
}

let arr = [1,6,9]
const result = arr.myReduce((pre, cur) => cur+pre, 2)
// console.log(result)

// 跨域
const jsonp = function(url ,cb, success) {
    let script = document.createElement('script')
    script.src = url
    script.async = true
    script.type = 'text/javascript'
    window[cb] = function(data) {
        success && success(data)
    }

    document.body.appendChild(script)
}

// object.create
Object.myCreate = function(obj, properties) {
    function F() {}
    F.prototype = obj
    if(properties) {
        Object.defineProperties(F, properties)
    }
    return new F()
}

// console.log(createObj(null))
let newObj = Object.myCreate({name: 'bear'})
// console.log('fff ===>>> ', newObj)

let strReverse = function(arr = []) {
    return arr.reduce((res, cur) => (res.unshift(cur), res), [])
}

// console.log(strReverse([1, 2, 3, 4, 5]))

function Reverse(arr = []) {
    return arr.reduceRight((t, v) => (t.push(v), t), []);
}
// console.log(Reverse([1, 2, 3, 4, 5])) // [5, 4, 3, 2, 1]

const createNew = function() {
    let obj = new Object()
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let ret = Con.apply(obj,arguments)
    return typeof ret === 'object' ? ret : obj
}

let arr2 = []
for(let i = 1; i <= 100; i++) {
    arr2.push(i)
}
let arr3 = Array.from(new Array(100).keys())
// console.log(arr2)
// console.log(arr3)

// let arr5 = [...Array(10)]
// console.log(arr5)

let arr4 = arr2.reduce((pre, cur) => (pre[pre.length - 1].length === 4 ? pre.push([cur]) : pre[pre.length - 1].push(cur), pre), [[]])

// console.log(arr4)

function fib0(n) {
    const map = new Map()
    function f(n) {
        if(n < 2) return n
        if(map.get(n)) return map.get(n)
        let res = f(n - 2) + f(n -1)
        map.set(n, res)
        return res
    }

    return f(n)
}

function fib(n) {
    if(n < 2) return n
    let arr = []
    arr[0] = 0
    arr[1] = 1
    for(let i = 2; i <= n; i++) {
        arr[i] = arr[i-2] + arr[i-1]
    }

    return arr[n]
}

function fib1(n) {
    let cur = 0
    let next = 1
    for(let i = 0; i < n; i++) {
        [cur, next] = [next, cur + next]
    }
    return cur
}

function fib2(n) {
    let cur = 0
    let next = 1
    while(n --> 0) {
        [cur, next] = [next, cur + next]
    }
    return cur
}

function fib3(n) {
    let cur = 1
    return [...Array(n)].reduce(p => {
        let next = p + cur
        cur = p
        return next
    }, 0)
}

console.log(fib0(9))
console.log(fib(9))
console.log(fib1(9))
console.log(fib2(9))
console.log(fib3(9))