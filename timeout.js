
// client -> server -> database -> server -> client

console.log('[КЛИЕНТ] запрос на сервер')
console.log('...')

setTimeout(() => {
    console.log('[СЕРВЕР] запрос на базу данных')
    console.log('...')

    setTimeout(() => {
        console.log('[БД] формирование списка')
        console.log('...')
    
        setTimeout(() => {
            console.log('[СЕРВЕР] отправка данных клиенту')
            console.log('...')
        
            setTimeout(() => {
                console.log('[КЛИЕНТ] получение данных')
                console.log('...')            
            }, 1000)
        
        }, 1000)
    
    }, 500)

}, 500)
