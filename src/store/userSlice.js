import { createSlice } from "@reduxjs/toolkit"

import { reqLogin, reqUserInfo } from '@/api/user'
import routes from "@/router"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token'),
        name: null,
        avatar: null,
        role: null,
        menus: []
    },
    reducers: {
        setToken(state, { payload }) {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        setUser(state, { payload }) {
            state.name = payload.name
            state.avatar = payload.avatar
            state.role = payload.role
        },
        setMenus(state, { payload }) {
            state.menus = payload
        },
        resetToken(state) {
            state.token = null
            state.name = null
            state.avatar = null
            state.role = null
            state.menus = []
        }
    }
})

export const { setToken, resetToken: _resetToken, setUser, setMenus } = userSlice.actions

export const login = user => async dispatch => {
    try {
        const token = await reqLogin(user)
        dispatch(setToken(token))
    } catch (e) {
        throw e
    }
}

export const userInfo = () => async dispatch => {
    try {
        const user = await reqUserInfo()
        const menus = generateMenus(routes, user.role)
        dispatch(setUser(user))
        dispatch(setMenus(menus))
    } catch (e) {
        throw e
    }
}

export const resetToken = () => dispatch => {
    dispatch(_resetToken())
    localStorage.removeItem('token')
}

function generateMenus(routes, role) {
    const menu = []
    routes.forEach(route => {
        if (!route.hidden && hasPermission(route, role)) {
            const tmp = {}
            if (route.children) {
                tmp.children = generateMenus(route.children, role)
                if (tmp.children.length === 0) {
                    return
                }
            }
            tmp.path = '/' + route.path
            tmp.title = route.meta.title
            menu.push(tmp)
        }
    })
    return menu
}

function hasPermission(route, role) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}

export default userSlice.reducer
