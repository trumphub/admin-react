import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom"

import { lazy } from '@/router'
import { userInfo } from '@/store/userSlice'

export default function App() {

    const { token, role } = useSelector(({ user }) => user)

    const dispatch = useDispatch()

    return (
        <Routes>
            <Route path="/login" element={lazy(() => import('@/views/login'))} />
            <Route path="/404" element={lazy(() => import('@/views/not-found'))} />
            <Route path="/*" element={lazy(() => {
                return new Promise(resolve => {
                    if (!token) {
                        import('@/router/redirect').then(resolve)
                    } else {
                        if (role) {
                            import('@/layout').then(resolve)
                        } else {
                            dispatch(userInfo()).then(() => {
                                import('@/layout').then(resolve)
                            }).catch(() => { })
                        }
                    }
                })
            })} />
        </Routes>
    )
}
