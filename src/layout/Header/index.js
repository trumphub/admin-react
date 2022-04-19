import { Layout, Breadcrumb, Row, Col, Avatar, Button, Typography, Modal, Affix } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

import { resetToken } from '@/store/userSlice'

export default function Header() {

    const { name, avatar, menus } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const location = useLocation()

    function generateBreadcrumb() {
        if (location.pathname === '/') {
            return []
        }
        const breadcrumbArr = []
        const paths = location.pathname.split('/').map(item => `/${item}`)
        paths.shift()
        let prevMenu = menus
        let parentPath
        for (let i = 0; i < paths.length; i++) {
            const breadcrumb = {}
            const path = paths[i]
            const currentMenu = prevMenu.find(menu => menu.path === path)
            if (currentMenu) {
                breadcrumb.title = currentMenu.title
                breadcrumb.path = parentPath ? parentPath + currentMenu.path : currentMenu.path
                prevMenu = currentMenu.children
                parentPath = currentMenu.path
                breadcrumbArr.push(breadcrumb)
            }
        }
        return breadcrumbArr
    }

    function logout() {
        Modal.confirm({
            title: '退出登录',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return dispatch(resetToken())
            }
        });

    }

    return (
        <Affix offsetTop={0}>
            <Layout.Header style={{ backgroundColor: '#fff' }}>
                <Row gutter={20}>
                    <Col flex='auto'>
                        <Breadcrumb style={{ lineHeight: '64px' }}>
                            {
                                generateBreadcrumb().map((item, index) => {
                                    return <Breadcrumb.Item key={index}>
                                        <Link to={item.path}>{item.title}</Link>
                                    </Breadcrumb.Item>
                                })
                            }
                        </Breadcrumb>
                    </Col>
                    <Col className='header-username'><Typography.Text>{name}</Typography.Text></Col>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar className='header-avatar' size={32} src={avatar} style={{ marginRight: 20 }} />
                        <Button onClick={logout} type="primary" shape="circle" icon={<PoweroffOutlined />} size={32} />
                    </Col>
                </Row>
            </Layout.Header>
        </Affix>
    )
}
