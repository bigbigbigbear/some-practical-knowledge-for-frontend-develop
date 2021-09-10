const P = 'pending'
const F = 'fulfiled'
const R = 'rejected'

class MyPromise {
    constructor(exe) {
        this.status = P
        this.val = undefined
        this.reason = undefined
        this.onFulCallbacks = []
        this.onRejectCallbacks = []

        let resolve = (value) => {
            this.status = F
            this.val = value
            this.onFulCallbacks.forEach(fn => fn())
        }

        let reject = (reason) => {
            this.status = R
            this.reason = reason
            this.onRejectCallbacks.forEach(fn => fn())
        }

        try {
            exe(resolve, reject)
        } catch (err) {
            reject(err)
        }

    }

    then(onFul, onRe) {
        if(this.status === P) {
            this.onFulCallbacks.push(() => {
                onFul(this.val)
            })

            this.onRejectCallbacks.push(() => {
                onRe(this.reason)
            })
        }

        if(this.status === F) {
            onFul(this.val)
        }

        if(this.status === R) {
            onRe(this.reason)
        }
    }
}

const bear = new MyPromise((resolve, reject) => {
    resolve(1)
})

bear.then(data => {
    console.log(data)
})