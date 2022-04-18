import { useSelector } from 'react-redux'
import { useRoutes, Navigate } from 'react-router-dom'

import routes from '@/router'
import Sider from './Sider'
import Header from './Header'

import './index.scss'

export default function Layout() {

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

    return (<>
        <div className='left'><Sider /></div>
        <div className='right'>
            <Header />
            {useRoutes(setDefaultPage(generateRoutes(routes, role)))}
        </div>
    </>)
}
