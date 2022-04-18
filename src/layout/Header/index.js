import { PageHeader } from 'antd'

const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    }
]

export default function Header() {
    return <PageHeader breadcrumb={{ routes }} />
}
