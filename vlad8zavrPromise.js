

function Vlad8zavrPromise(callback) {

    this.resolve = function() { console.log('resolve'); }
    this.reject  = function() { console.log('reject'); }

    //callback(this.resolve.bind(this), this.reject.bind(this));
    callback(this.resolve, this.reject);

    this.then = function(callbackThen) {

        callbackThen();
        return this;

    }
    
    this.catch = function() {}

}

let promise = new Vlad8zavrPromise((resolve, reject) => {
    console.log('----- promise -----');
    resolve(1);
    reject();
    console.log('-------------------');
})

promise
    .then(number => number + 2)
    .then(number => number + 2)
    .then(number => console.log(number))

// promise
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




