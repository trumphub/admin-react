import { useMemo } from 'react'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

export default function Sider() {

    const { menus } = useSelector(({ user }) => user)
    const location = useLocation()

    const defaultOpenKeys = useMemo(() => {
        const arr = location.pathname.split('/').map(item => `/${item}`)
        if (arr.length === 2) {
            return []
        } else {
            return arr.slice(1, arr.length - 1)
        }
    }, [location.pathname])

    function generateMenus(menus, parentPath) {
        return menus.map(menu => {
            if (menu.children) {
                return (
                    <SubMenu key={menu.path} title={menu.title}>
                        {
                            generateMenus(menu.children, menu.path)
                        }
                    </SubMenu>
                )
            } else {
                let path
                if (parentPath) {
                    path = parentPath + menu.path
                } else {
                    path = menu.path
                }
                return <Menu.Item key={path}>
                    <Link to={path}> {menu.title}</Link>
                </Menu.Item>
            }
        })
    }

    return (
        <Menu
            style={{ width: 256, borderRightColor: '#fff' }}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
        >
            {
                generateMenus(menus)
            }
        </Menu>
    )
}
