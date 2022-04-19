import { Layout } from 'antd'
import { useSelector } from 'react-redux'
import { useRoutes, Navigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'

import routes from '@/router'
import Sider from './Sider'
import Header from './Header'

export default function MyLayout() {

    const { role } = useSelector(({ user }) => user)

    function generateRoutes(routes, role) {
        const res = []
        routes.forEach(route => {
            const tmp = { ...route }
            if (hasPermission(tmp, role)) {
                if (tmp.children) {
                    tmp.children = generateRoutes(tmp.children, role)
                    if (tmp.children.length === 1) {
                        return
                    }
                }
                res.push(tmp)
            }
        })
        return res
    }

    function hasPermission(route, role) {
        if (route.meta && route.meta.roles) {
            return route.meta.roles.includes(role)
        } else {
            return true
        }
    }

    function setDefaultPage(routes) {
        routes.forEach((route) => {
            if (route.children) {
                setDefaultPage(route.children)
            }
            if (route.index) {
                route.element = <Navigate to={routes[1].path} />
            }
        })
        return routes
    }

    return (<Layout style={{ height: '100%' }}>
        <Sider />
        <Layout>
            <Header />
            <Scrollbar>
                <Layout.Content style={{ padding: 20 }}>
                    {useRoutes(setDefaultPage(generateRoutes(routes, role)))}
                </Layout.Content>
            </Scrollbar>
        </Layout>
    </Layout>)
}
