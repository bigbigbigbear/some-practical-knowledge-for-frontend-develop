// 求数组第k大值
function arrKNum(arr = [], k) {
    if(!Array.isArray(arr)) throw new Error('arguments is not a array')
    arr.sort((a,b) => b-a)
    let rank =1
    let num = 0
    let count = 0
    let len = arr.length

    for(let i = 0;i < len;i++) {
        let j = i+1
        if(rank > k) break
        if(rank === k) {
            num = arr[i]
            count++
        }
        if(j < len && arr[i] !== arr[j]) {
            rank++
        }
    }

    return `第${k}大值为${num}，出现${count}次`
}

let arr1 = [4,67,54,23,56,23,78,65,87,78]

// console.log(arrKNum(arr1, 2))
// console.log(arr1.sort((a, b) => b-a)[2-1])

// 判断数组B是否为A子集
function isChildCollection(A=[], B=[]) {
    let aLen = a.length
    let bLen = b.length
    let i = 0
    let j = 0
    if(alen < bLen) return false
    while(i < alen && j < bLen) {
        if(A[i] === B[j]) {
            i++
            j++
        }else if(A[i] < B[j]) {
            i++
        }else {
            return false
        }
    }
    return j === bLen
}

function isChildCollection2(A=[], B=[]) {
    let aSet = new Set(A)
    let bSet = new Set(B)
    if(aSet.size < bSet.size) return false
    for(const val of bSet) {
        if(!aSet.has(val)) return false
    }
    return true
}

// 例如：
const arr2 = [
    ['a', 'b', 'c'],
    ['a', 'd'],
    ['d', 'e'],
    ['f', 'g'],
    ['h', 'g'],
    ['i']
]
// 运行后的返回结果是：
// [
//     ['a', 'b', 'c', 'd', 'e'],
//     ['f', 'g', 'h'],
//     ['i']
// ]

const formate1 = function(arr) {
    let res = []
    const item = arr.reduce((pre, cur) => {
        if(cur.some(el => pre && pre.includes(el))) {
            pre = pre.concat(cur)
        } else {
            res.push(pre)
            pre = cur
        }

        return [...new Set(pre)]
    })

    res.push(item)

    return res
}

// console.log(formate1(arr2))

let arr3 =[2,1,3,'3',[1,2],7,[4,5,[8]],6,[4]]

// 多维数组扁平化，数组项数字字符串去重，升序排列
// res = [1,2,3,4,5,6,7,8]

const flat = function(arr) {
    return Array.from(new Set(arr.flat(Infinity).map(i => Number(i)))).sort((a, b) => a - b)
}

console.log((flat(arr3)))
