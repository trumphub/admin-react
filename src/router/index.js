import React, { Suspense } from "react"
import { Navigate, Outlet } from 'react-router-dom'

import Loading from "@/components/Loading"

export function lazy(factory) {
    const LazyComponent = React.lazy(factory)
    return <Suspense fallback={<Loading />}>
        <LazyComponent />
    </Suspense>
}

const routes = [
    {
        index: true,
        element: <Navigate to='home' />,
        hidden: true
    },
    {
        path: 'home',
        element: lazy(() => import('@/views/home')),
        meta: { roles: ['admin', 'editor'], title: '首页' }
    },
    {
        path: 'profile',
        element: lazy(() => import('@/views/profile')),
        meta: { roles: ['admin', 'editor'], title: '个人' }
    },
    {
        path: 'other',
        element: <Outlet />,
        meta: { title: '其他' },
        children: [
            {
                index: true,
                element: <Navigate to='table' />,
                hidden: true
            },
            {
                path: 'table',
                element: lazy(() => import('@/views/other/table')),
                meta: { roles: ['admin'], title: '表格' }
            },
            {
                path: 'chart',
                element: lazy(() => import('@/views/other/chart')),
                meta: { roles: ['admin'], title: '图表' }
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/404' />,
        hidden: true
    }
]

export default routes
