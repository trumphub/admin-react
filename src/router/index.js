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
        meta: { roles: ['admin', 'editor'], title: '首页', icon: 'FolderOutlined' }
    },
    {
        path: 'profile',
        element: lazy(() => import('@/views/profile')),
        meta: { roles: ['admin', 'editor'], title: '个人', icon: 'FolderOutlined' }
    },
    {
        path: 'other',
        element: <Outlet />,
        meta: { title: '其他', icon: 'FolderOutlined' },
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
                element: <Outlet />,
                meta: { title: '图表' },
                children: [
                    {
                        index: true,
                        element: <Navigate to='line' />,
                        hidden: true
                    },
                    {
                        path: 'line',
                        element: lazy(() => import('@/views/other/chart/line')),
                        meta: { roles: ['admin'], title: '折线图' }
                    },
                    {
                        path: 'column',
                        element: lazy(() => import('@/views/other/chart/column')),
                        meta: { roles: ['editor'], title: '柱状图' }
                    }
                ]
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
