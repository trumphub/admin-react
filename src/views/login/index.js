import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { login } from '@/store/userSlice'

export default function Login() {

    const { token } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    if (token && !loading) {
        return <Navigate to="/" replace />
    }

    async function onFinish(user) {
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
        }
    }

    return <Form onFinish={onFinish} style={{
        width: 300,
        margin: '200px auto'
    }}>
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: '账号不能为空',
                },
            ]}
        >
            <Input prefix={<UserOutlined />} placeholder="账号" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: '密码不能为空',
                },
            ]}
        >
            <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
            />
        </Form.Item>
        <Form.Item>
            <Button loading={loading} type="primary" block htmlType="submit">
                登录
            </Button>
        </Form.Item>
    </Form>
}
