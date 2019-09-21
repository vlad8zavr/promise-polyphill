

function Vlad8zavrPromise(callback) {

    this.thenChain = [];

    function resolve(data) {
        this.thenChain.forEach(callbackItem => {
            data = callbackItem(data);
        })
    }
    function reject(error) { console.log('reject'); console.log(error); }

    callback(resolve.bind(this), reject.bind(this));

    this.then = function(callbackThen) {

        // передача выполнения callbackThen в resolve()
        this.thenChain.push(callbackThen);

        // then returns promise
        return this;

    }
    
    this.catch = function() {}

}

const promise = new Vlad8zavrPromise((resolve, reject) => {
    setTimeout(() => {
        let isSuccess = Math.floor(Math.random() * 10) > 4;
        if (isSuccess) resolve(2);
        else reject('error message');
        //resolve(2);
    }, 1000)
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
//     .then((num) => {
//         return new Vlad8zavrPromise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('----1----');
//                 console.log(`THEN OPTION ${num}`);
//                 resolve(num++);
//             }, 1000)
//         })
//     })
//     .then((num) => {
//         return new Vlad8zavrPromise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('----2----');
//                 console.log(`THEN OPTION ${num}`);
//                 resolve(num++);
//             }, 500)
//         })
//     })




