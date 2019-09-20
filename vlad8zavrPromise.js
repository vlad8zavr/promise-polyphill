

function Vlad8zavrPromise(callback) {

    this.resolve = function()  { console.log('resolve'); }
    this.reject = function()   { console.log('reject'); }

    callback(this.resolve, this.reject);

    this.then = function() {}
    this.catch = function() {}

}

let promise = new Vlad8zavrPromise((resolve, reject) => {
    console.log('----- promise -----');
    resolve();
    reject();
    console.log('-------------------');
})
