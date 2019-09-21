

function Vlad8zavrPromise(callback) {

    this.thenChain = [];

    this.resolve = function(data) { 
        console.log('resolve'); console.log(data); console.log(this);

        this.thenChain.forEach(callbackItem => {
            data = callbackItem(data);
        })
    }
    this.reject  = function(error) { console.log('reject'); console.log(this); }

    // ------------------------
    function resolve(data) {
        this.thenChain.forEach(callbackItem => {
            data = callbackItem(data);
        })
    }
    function reject() {}
    // --------------------------

    callback(resolve.bind(this), reject.bind(this));

    //callback(this.resolve.bind(this), this.reject.bind(this));

    
    // пробрасывать данные
    this.then = function(callbackThen) {

        // выполняется сразу, не дожидается окончания предыдущего
        // нужно передать выполнение в resolve()
        //callbackThen();

        this.thenChain.push(callbackThen);

        return this;

    }
    
    this.catch = function() {}

}

const promise = new Vlad8zavrPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000)
})

promise
    .then(num => num += 2)
    .then(num => num += 2)
    .then(num => { console.log(num); })

// let promise1 = new Vlad8zavrPromise((resolve, reject) => {
//     console.log('----- promise -----');
//     resolve(1);
//     //reject();
//     console.log('-------------------');
// })

// promise1
//     .then(() => {
//         return new Vlad8zavrPromise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('THEN OPTION 1');
//             }, 1000)
//         })
//     })
//     .then(() => {
//         return new Vlad8zavrPromise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('THEN OPTION 2');
//             }, 500)
//         })
//     })




