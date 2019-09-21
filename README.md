# promise-polyphill

**Что сделано**

Реализована функиция, имитирующая действия промисов для простых случаев.

1. Цепочка промисов, в ходе которой изначальное число удваивается несколько раз

```javascript
const promise = new Vlad8zavrPromise(function(resolve, reject) {
    setTimeout(function() {

        // set a 50% chance of success
        let isSuccess = Math.floor(Math.random() * 10) > 4;
        if (isSuccess) resolve(2);
        else reject('error message in 1-st promise');

    }, 1000) 
})

promise
    .then(function(num) { console.log(num); return num * 2; })
    .then(function(num) { console.log(num); return num * 2; })
    .then(function(num) { console.log(num); })
    .catch(function() {console.log('ERROR HAPPEND')})

```

2. Данный случай показывает, что `resolve()` не будет выполняться после того, как выполнился `reject()`. Верно и обратное.

```javascript
const promise = new Vlad8zavrPromise(function(resolve, reject) {
    setTimeout(function() {

        setTimeout(function() { resolve(2); }, 1000);
        setTimeout(function() { reject('error message'); }, 500);

    }, 1000) 
})

promise
    .then(function(num) { console.log(num); return num + 2; })
    .then(function(num) { console.log(num); return num + 2; })
    .then(function(num) { console.log(num); })
    .catch(function() {console.log('ERROR HAPPEND')})

```

**Что не удалось сделать**

1. Данная реализация не отработает, если в одном из вызовов метода `then()` в колбэке вернуть новый промис вместо примитива.

```javascript
    .then(function(num) { 
        return new Vlad8zavrPromise(function (resolve, reject) { resolve(5) })
    })
```

2. Метод `catch()` не отлавливает ошибки `throw new Error()`