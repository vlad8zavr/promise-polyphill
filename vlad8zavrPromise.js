

function Vlad8zavrPromise(callback) {

    this.thenChain = [];
    this.isActiveProcess = false;
    this.currentResult = null;

    function resolve(data) {
        console.log('[RESOLVE]');
        console.log(data);
        console.log('----------')
        if (!this.isActiveProcess) {
            this.isActiveProcess = true;

            console.log('length', this.thenChain.length);

            this.currentResult = null;
            if (!this.thenChain.length) this.currentResult = data;

            this.thenChain.forEach(function(callbackItem) {
                console.log('DATA');
                data = callbackItem(data);
            })
        }
    }
    function reject(error) { 
        if (!this.isActiveProcess) {
            this.isActiveProcess = true;
            console.error('[reject]', error); 
        }
    }

    console.log('callback', callback);
    callback(resolve.bind(this), reject.bind(this));

    this.then = function(callbackThen) {

        console.log('[THEN]');
        console.log(callbackThen);


        // передача выполнения callbackThen в resolve()
        this.thenChain.push(callbackThen);

        // then returns promise
        return this;

    }
    
    this.catch = function() {}

    //console.log( 'callback result', callback(resolve.bind(this), reject.bind(this)) );
    if (this.currentResult) {
        console.log('this.currentResult', this.currentResult);
        return this.currentResult;
    }
}

const promise = new Vlad8zavrPromise(function(resolve, reject) {
    setTimeout(function() {

        let isSuccess = Math.floor(Math.random() * 10) > 4;
        if (isSuccess) resolve(2);
        else reject('error message in 1-st promise');

        // setTimeout(function() { resolve(2); }, 1000);
        // setTimeout(function() { reject('error message'); }, 500);

    }, 1000)
})

// promise
//     .then(function(num) { console.log(num); return num + 2; })
//     .then(function(num) { console.log(num); return num + 2; })
//     .then(function(num) { console.log(num); })


promise
    .then(function(num) {return num + 2; })
    .then(function(num) { 
        //return num + 2;
        let prm = new Vlad8zavrPromise(function (resolve, reject) { resolve(137) })
        console.log('prm', prm);
        console.log('prm()', new Vlad8zavrPromise(function (resolve, reject) { resolve(137) }));
        return prm;
        //return new Vlad8zavrPromise(function (resolve, reject) { resolve(137) })
    })
    .then(function(num) { return num + 2; })
    .then(function(num) { console.log('res', num); })
 




