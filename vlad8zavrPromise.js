

function Vlad8zavrPromise(callback) {

    this.resolve = function() { console.log('resolve'); }
    this.reject  = function() { console.log('reject'); }

    callback(this.resolve, this.reject);

    this.then = function(callbackThen) {

        callbackThen();
        return this;
        
        // return new Vlad8zavrPromise((resolve, reject) => {
        //     callbackThen();
        // })
    }
    this.catch = function() {}

}

let promise = new Vlad8zavrPromise((resolve, reject) => {
    console.log('----- promise -----');
    resolve();
    reject();
    console.log('-------------------');
})

promise
    .then(() => {
        return new Vlad8zavrPromise((resolve, reject) => {
            setTimeout(() => {
                console.log('THEN OPTION 1');
            }, 1000)
        })
    })
    .then(() => {
        return new Vlad8zavrPromise((resolve, reject) => {
            setTimeout(() => {
                console.log('THEN OPTION 2');
            }, 500)
        })
    })


// promise
//     .then(() => {
//         return new Vlad8zavrPromise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('THEN OPTION 1');
//             }, 1000)
//         })
//     })

