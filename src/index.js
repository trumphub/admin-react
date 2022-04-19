import { ConfigProvider } from 'antd'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import zhCN from 'antd/lib/locale/zh_CN'

import './styles/index.scss'
import store from './store'
import App from './App'

render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
