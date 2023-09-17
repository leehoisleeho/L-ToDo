export const _fetch = function (obj) {
    return useAsyncData(obj.name, () => $fetch(`http://todo.hellochange.online:9999${obj.url}`, {
            method: obj.method,
            body: obj.body,
            params: obj.params,
            onRequest(context) {
                console.log('请求了')
                context.options.headers = {}
            },
            onRequestError(context) {
                console.log('请求前错误')
            },
            onResponse(context) {
                console.log('响应了')
            },
            onResponseError(context) {
                console.log('响应了错误')
                console.log(context.response.status)
            },
        }))
}