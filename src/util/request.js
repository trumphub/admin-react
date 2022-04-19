import axios from "axios"
import { message } from 'antd'

import store from '@/store'
import { resetToken } from '@/store/userSlice'

const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API
})

service.interceptors.request.use(config => {
    const token = store.getState().user.token
    if (!!token) {
        config.headers.token = token
    }
    return config
})

// {code:200,data:{...}} {code:200,data:"..."} {code:403,message:"..."}
service.interceptors.response.use(response => {
    const res = response.data
    if (res.code === 200) {
        return res.data
    } else {
        message.error(res.message)
        if (res.code === 403) {
            store.dispatch(resetToken())
        }
        return Promise.reject(new Error(res.message))
    }
})

export default service
