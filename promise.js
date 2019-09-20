let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('[СЕРВЕР] запрос на базу данных')
        console.log('...')
        resolve()
    }, 500)
})

function promiseBodyDB(resolve, reject) {
    setTimeout(() => {
        const data = [
            {id: 'hsl12w1', item: 'La Tour E`ffele'},
            {id: '3jgfdp2', item: 'Tadge Mahal'}
        ]
        console.log('[БД] формирование списка')
        console.log('...')
        resolve(data)
    }, 500)
}

function promiseBodyServer(resolve, reject, info) {
    setTimeout(() => {
        console.log('[СЕРВЕР] отправка данных клиенту')
        console.log('...')
        const transformedInfo = info.map(instance => {
            return {
                uniqueID: instance.id,
                place: instance.item,
                timeStamp: Date.now()
            }
        })
        resolve(transformedInfo)
    }, 1000)
}

function promiseBodyClient(resolve, reject, places) {
    setTimeout(() => {
        console.log('[КЛИЕНТ] получение данных')
        console.log(places)
    }, 400)
}

console.log('[КЛИЕНТ] запрос на сервер')
console.log('...')

// когда внутри промиса выполнится resolve(), вызовется метод then()
// внутри then() асинхронных код также можно (нужно ?) обернуть в promise для лучшего управления
// чтобы была последовательная цепочка then(), нужно внутри каждого then() возвращать следующий promise
// передача данных - через resolve(<dataToSend>) <-> then(<dataToReceive>)
// catch() - обработка ошибки, возникшей на любом этапе
promise1
    .then(() => {
        return new Promise((resolve, reject) => {
            promiseBodyDB(resolve, reject)
        })
    })
    .then(info => {
        return new Promise((resolve, reject) => {
            promiseBodyServer(resolve, reject, info)
        })
    })
    .then(places => {
        return new Promise((resolve, reject) => {
            promiseBodyClient(resolve, reject, places)
        })
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('FINALLY');
    })

