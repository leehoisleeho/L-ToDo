import request from "./request";
import config from "~/config";

export const http = {
    get(url:string) {
        return new Promise((resolve, reject) => {
            request.get(config.BASE_URL + url)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url: string, data=undefined) {
        return new Promise((resolve, reject) => {
            request.post(config.BASE_URL + url, data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    remove(url:string) {
        return new Promise((resolve, reject) => {
            request.delete(config.BASE_URL + url)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    update(url: string, data=undefined) {
        return new Promise((resolve, reject) => {
            request.put(config.BASE_URL + url, data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}