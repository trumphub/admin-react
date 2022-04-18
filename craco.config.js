const { join } = require("path")
const CracoLessPlugin = require('craco-less')

module.exports = {
    devServer: {
        before: require('./mock')
    },
    babel: {
        plugins: [
            [
                "import",
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                }
            ]
        ],
    },
    webpack: {
        alias: {
            "@": join(__dirname, 'src')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
}
