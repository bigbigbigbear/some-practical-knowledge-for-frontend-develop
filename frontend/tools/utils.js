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

arrayToTree(data)
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