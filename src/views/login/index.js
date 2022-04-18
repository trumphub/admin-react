import React from "react"
import { useImmer } from 'use-immer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

import { login } from '@/store/userSlice'

export default function Login() {

    const { token } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useImmer({ username: 'admin', password: '123456' })
    const [loading, setLoading] = useImmer(false)

    if (token && !loading) {
        return <Navigate to="/" replace />
    }

    function handleChange(event) {
        const { name, value } = event.target
        setUser(draft => {
            draft[name] = value
        })
    }

    async function onSubmit(event) {
        event.preventDefault()
        try {
            setLoading(true)
            await dispatch(login(user))
            let from
            if (location.state) {
                from = location.state.from.pathname
            } else {
                from = "/"
            }
            navigate(from, { replace: true })
        } catch (e) {
            setLoading(false)
            console.log(e.message)
        }
    }

    return <>
        <h1>LoginPage</h1>
        <form onSubmit={onSubmit}>
            <label>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </label>
            <button>submit</button>
        </form>
    </>
}
