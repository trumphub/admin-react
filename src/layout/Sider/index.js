import { useState, useEffect } from 'react'
import { Menu, Layout } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Scrollbar } from "react-scrollbars-custom"
import throttle from 'lodash/throttle'

import * as icons from '@ant-design/icons'

import './index.scss'

const { SubMenu } = Menu

export default function Sider() {

    const { menus } = useSelector(({ user }) => user)
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        const resize = throttle(() => {
            const width = document.documentElement.clientWidth
            setCollapsed(width < 768)
        }, 100)
        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const getOpenKeys = () => {
        const arr = location.pathname.split('/').map(item => `/${item}`)
        if (arr.length === 2) {
            return []
        } else {
            return arr.slice(1, arr.length - 1)
        }
    }

    function icon(iconName) {
        const Icon = icons[iconName]
        return <Icon />
    }

    function generateMenus(menus, parentPath) {
        return menus.map(menu => {
            if (menu.children) {
                return (
                    <SubMenu key={menu.path} title={menu.title} icon={
                        menu.icon && icon(menu.icon)
                    }>
                        {
                            generateMenus(menu.children, parentPath ? parentPath + menu.path : menu.path)
                        }
                    </SubMenu>
                )
            } else {
                let path = parentPath ? parentPath + menu.path : menu.path
                return <Menu.Item key={path} icon={menu.icon && icon(menu.icon)}>
                    <Link to={path}> {menu.title}</Link>
                </Menu.Item>
            }
        })
    }

    return (
        <Layout.Sider collapsed={collapsed}>
            <div className="logo" />
            <Scrollbar style={{ height: 'calc(100vh - 112px)' }}>
                <Menu
                    theme='dark'
                    defaultOpenKeys={getOpenKeys()}
                    selectedKeys={[location.pathname]}
                    mode="inline"
                >
                    {
                        generateMenus(menus)
                    }
                </Menu>
            </Scrollbar>
        </Layout.Sider>
    )
}
