import request from '@/util/request'

export function reqLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function reqUserInfo() {
    return request({
        url: '/user/info',
        method: 'post',
    })
}
