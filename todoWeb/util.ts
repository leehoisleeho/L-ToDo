import {http} from './http/index'
export const timeConversion = function (e: any): string {
    // 时间戳转换成 2023-09-12
    const date = new Date(e)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthStr = month < 10 ? `0${month}` : month
    const day = date.getDate()
    const dayStr = day < 10 ? `0${day}` : day
    return `${year}-${monthStr}-${dayStr}`
}
