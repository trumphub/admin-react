import { Row, Col, Card } from 'antd'
import { Line } from '@ant-design/charts'

const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }
]

const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
        size: 5,
        shape: 'diamond',
    }
}

export default function Home() {

    return <>
        <Row gutter={20}>
            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
            <Col className="gutter-row" lg={{ span: 6, push: 3 }} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
            <Col className="gutter-row" lg={{ span: 6, push: 9 }} md={8} sm={12} xs={24}>
                <Card title="标题" style={{ marginBottom: 20 }}>
                    内容
                </Card>
            </Col>
        </Row>
        <Card>
            <Line {...config} />
        </Card>
    </>
}
