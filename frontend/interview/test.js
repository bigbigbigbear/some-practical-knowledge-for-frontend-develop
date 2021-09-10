// const getArr = function(n){
//     const arr = []
//     for(let i = 1;i < n;i++) {
//         arr.push(i)
//     }

//     return arr
// }

// const arr1 = getArr(55)

// // console.log(arr1)

// const randomPick = function(arr) {
//     const res = []
//     const len = arr.length
//     for(let i = len;i > 0;) {
//         const rand = Math.floor(Math.random()*i)
//         res.push(arr[rand])
//         arr[rand] = arr[--i]
//     }

//     return res
// }

// const randomPick2 = function(arr) {
//     const res = []
//     let rand
//     while(arr.length > 0) {
//         rand = Math.floor(Math.random()*(arr.length))
//         res.push(arr[rand])
//         arr.splice(rand, 1)
//     }

//     return res
// }

// const randomSort = function(arr) {
//     return arr.sort((a, b) => Math.random() - 0.5)
// }

// const randomSwap = function(arr) {
//     console.log(arr)
//     let len = arr.length
//     let rand,temp
//     while (len > 0) {
//         rand = Math.floor(Math.random() * len)
//         len--
//         temp = arr[len]
//         arr[len] = arr[rand]
//         arr[rand] = temp
//     }

//     return arr
// }

// console.log(randomPick2(arr1))
// console.log(randomSort(arr1))
// console.log(randomSwap(arr1))

// var a = function(n, val) {
//     console.log(n,val)
//     return {
//         fn: function(m) {
//             // console.log(m,n)
//             return a(m, n)
//         }
//     }
// }
// var b = a(0)
// console.log(b)   初次调用外层
// console.log(b.fn(1))  二次调用外层
// console.log(b.fn(2))  二次调用外层
// console.log(b.fn(3))  二次调用外层

// var d = a(0).fn(1)
// console.log(d)
// d.fn(2)
// d.fn(3)

// var c = a(0).fn(1).fn(2).fn(3)
// console.log(c)  // 初次调用外层-二次调用外层-三次调用外层-四次调用外层

// const numbers = [1,2,3]
// numbers[10] = 11
// // console.log(numbers)

// const { name: myName } = { name: 'bear' }
// console.log(myName)

// function Father() {
//     this.property = true
// }
// Father.prototype.getFatherValue = function() {
//     return this.property
// }

// function Son() {
//     this.sonProperty = false
// }

// // 继承
// Son.prototype = new Father()
// Son.prototype.getSonValue = function() {
//     return this.soneProperty
// }
// var instance = new Son()
// console.log(instance.getSonValue())

// function F() {}
// F.prototype.arr = [1]
// F.prototype.b = 1

// let obj1 = new F()
// obj1.arr.push(2)
// obj1.b = 2

// let obj2 = new F()
// console.log(obj2.arr, obj2.b)

// setTimeout(function() {
//     console.log(1)
//   }, 0)

//   new Promise(function (resolve) {
//     console.log(2)
//     for(var i = 0; i < 10000; i++) {
//       i == 9999 && resolve()
//     }
//     console.log(3)
//   }).then(function () {
//     console.log(4)
//   })
//   console.log(5)

// var a = 99
// var obj = {
//   a: 1024,
//   say: () => console.log(this.a)
// }

// obj.say() // 打印的是？

// obj.say.apply({a: 8989}) // 打印的是 ？


// var obj = {a:1}

// var foo = {}
// foo[obj] = true

// console.log(Object.keys(foo)) // 返回的是什么？['object Object']

// 第k大值
// const findKNum = function(arr, k) {

//     function quickSort(arr, left, right, k) {
//         let index
//         if(left < right) {
//             index = findIndex(arr, left, right)

//             if(k === index) {
//                 return arr[index]
//             } else if(k < index) {
//                 return quickSort(arr, left, index - 1, k)
//             } else {
//                 return quickSort(arr, index + 1, right, k)
//             }
//         }

//         return arr[left]
//     }

//     function findIndex(arr, left, right) {
//         let mid = arr[Math.floor(Math.random() * (right - left + 1)) + left], i = left, j = right
//         while(i < j) {
//             while(i < mid) {
//                 i++
//             }
//             while(j > mid) {
//                 j--
//             }
//             if(i < j) swap(arr, i , j)
//             if(arr[i] === arr[j] && i !== j) i++
//         }

//         return i
//     }

//     function swap(arr, i, j) {
//         [arr[i], arr[j]] = [arr[j], arr[i]]
//     }


//     return quickSort(arr, 0, arr.length -1, k)

// }
// let arr1 = [3,4,6,5,34,4,32,3425,32,34,34,3454,23]
// console.log(findKNum(arr1, 1))

const myInstanceOf = function(l, r) {
    r = r.prototype
    while(true) {
        if(l === null) return false
        if(l = r) return true
        l = l.__proto__
    }
}

// console.log(myInstanceOf('444', Object))

const myNew = function(fn) {
    let obj = new Object()
    let con = [].shift.call(arguments)
    obj.__proto__ = con.prototype
    let res = con.apply(obj, arguments)

    return typeof res === 'object' ? res : obj
}

function Bear(name) {
    this.name = name
}

// console.log(myNew(Bear, 'xiong'))
// console.log(new Bear('xiong'))

Function.prototype.myBind = function(context = window) {
    if(typeof this !== 'function') throw Error('not a function')
    var args = [...arguments].slice(1)
    var fn = this
    return function newFn(...newArgs) {
        if(this instanceof newFn) {
            return new fn(...args, ...newArgs)
        }
        return fn.apply(context, [...args, ...newArgs])
    }
}

Function.prototype.myCall = function(context) {
    if(typeof this !== 'function') throw Error('not a function')
    context = context || window
    const fn = Symbol()
    context[fn] = this
    const args = [...arguments].slice(1)
    const res = context.fn(...args)
    delete context.fn
    return res
}

Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') throw Error('not a function')
    context = context || window
    const fn = Symbol()
    context[fn] = this
    let res
    if(arguments[1]) {
        context.fn(...arguments[1])
    }else {
        context.fn()
    }

    delete context.fn
    return res

}

let A = (a) => {
    console.log(a)
}

// let AA = new A()  // TypeError: A is not a constructor
