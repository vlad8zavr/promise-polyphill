

function Vlad8zavrPromise(callback) {

    this.thenChain = [];
    this.caught = null;
    this.isActiveProcess = false;

    function resolve(data) {

        if (!this.isActiveProcess) {
            this.isActiveProcess = true;

            this.thenChain.forEach(function(callbackItem) {
                data = callbackItem(data);
            })
        }
    }
    function reject(error) { 
        if (!this.isActiveProcess && this.caught) {
            this.isActiveProcess = true;
            console.log('[reject]', error);
            this.caught(error);
        }
    }

    callback(resolve.bind(this), reject.bind(this));

    this.then = function(callbackThen) {

        // передача выполнения callbackThen в resolve()
        this.thenChain.push(callbackThen);

        // then returns promise
        return this;
    }
    
    this.catch = function(callBackCatch) {
        this.caught = callBackCatch;
    }

}

const promise = new Vlad8zavrPromise(function(resolve, reject) {
    setTimeout(function() {

        // let isSuccess = Math.floor(Math.random() * 10) > 4;
        // if (isSuccess) resolve(2);
        // else reject('error message in 1-st promise');

        setTimeout(function() { resolve(2); }, 1000);
        setTimeout(function() { reject('error message'); }, 500);

    }, 1000) 
})

promise
    .then(function(num) { console.log(num); return num + 2; })
    .then(function(num) { console.log(num); return num + 2; })
    .then(function(num) { console.log(num); })
    .catch(function() {console.log('ERROR HAPPEND')})


// promise
//     .then(function(num) {return num + 2; })
//     .then(function(num) { 
//         //return num + 2;
//         let prm = new Vlad8zavrPromise(function (resolve, reject) { resolve(137) })
//         console.log('prm', prm);
//         return prm;
//         //return new Vlad8zavrPromise(function (resolve, reject) { resolve(137) })
//     })
//     .then(function(num) { return num + 2; })
//     .then(function(num) { console.log('res', num); })
 




