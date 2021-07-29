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