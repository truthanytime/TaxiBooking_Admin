import { useState } from "react"
import { Container, Row, Col, Card, CardBody, Input, Button, Form, CardHeader } from "reactstrap"
import ServerAPI from "../../../../api"

const NotificationPanel = (props) => {

    const [data, setData] = useState({
        subject: "",
        content: ""
    })

    const onContentChange = (e) => {
        setData(prev => ({
            ...prev,
            content: e.target.value
        }))
    }
    const onTitleChange = (e) => {
        setData(prev => ({
            ...prev,
            title: e.target.value
        }))
    }

    const sendNotification = (data) => {
        ServerAPI.post(`/api/admin/sms-notification/${props.user?.accountUuid}`,{data}).then(res => {

        }).catch(e => {

        })
    }

    return (
        <>
            <Container className="p-0">
                <Form>
                    <Row className="justify-content-center d-flex">
                        <Col md={10} lg={8}>
                            <Card>
                                <CardHeader>
                                    <h4>
                                        Notification
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="Notification-pane py-2">
                                        <div>
                                            Notification Title
                                        </div>
                                        <div>
                                            <Input onChange={onTitleChange} />
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <div>
                                            Notification Content*
                                        </div>
                                        <div>
                                            <textarea className="w-100 form-control" onChange={onContentChange} rows="10" />
                                        </div>
                                    </div>
                                    <div>
                                        <Button color="primary" onClick={sendNotification} className="mr-1">
                                            Send Notification
                                        </Button>
                                        <Button type="reset">
                                            Cancel
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>

        </>
    )
}

export default NotificationPanel; 