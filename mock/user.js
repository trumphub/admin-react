const { Router } = require("express")

const router = Router()

const TOKENS = {
    admin: 'admin-token',
    editor: 'editor-token'
}

const USERS = {
    [TOKENS.admin]: {
        role: 'admin',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    [TOKENS.editor]: {
        role: 'editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

router.post(
    '/user/login',
    (req, res) => {
        const { username } = req.body
        const token = TOKENS[username]
        if (!token) {
            res.json({
                code: 500,
                message: '登录失败'
            })
        } else {
            res.json({ data: token, code: 200 })
        }
    }
)

router.post(
    '/user/info',
    (req, res) => {
        const token = req.get('token')
        const info = USERS[token]
        if (!info) {
            res.json({
                code: 403,
                message: '认证过期'
            })
        } else {
            res.json({ data: info, code: 200 })
        }
    }
)

module.exports = router
