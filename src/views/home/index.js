import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import { resetToken } from '@/store/userSlice'

export default function HomePage() {

    const { name, avatar } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    function logout() {
        dispatch(resetToken())
    }

    return <div>
        <h1>{name}</h1>
        <img src={avatar} alt="" />
        <button onClick={logout}>logout</button>
    </div>
}
