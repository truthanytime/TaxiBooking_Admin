import { useState } from "react"
import { Container, Row, Col, Card, CardBody, Input, Button, Form, CardHeader } from "reactstrap"
import ServerAPI from "../../../../api"
import Swal from "sweetalert2"

const MailingPanel = (props) => {

    const [data, setData] = useState({
        subject: "",
        content: ""
    })

    const onContentChange = (e) => {
        console.log(e.target.value); 
        setData(prev => ({
            ...prev,
            content: e.target.value
        }))
    }
    const onTitleChange = (e) => {
        setData(prev => ({
            ...prev,
            subject: e.target.value
        }))
    }

    const sendEmail = () => {
        ServerAPI.post(`/api/admin/user/mail/${props.user?.accountUuid}`, {...data}).then(res => {
            if(res.data.success === true){
                Swal.fire("Email was successfully sent to the "+ props.user.email)
            }else{
                Swal.fire("Failed to send the email to "+ props.user.email)
            }
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
                                        Email
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="mailing-pane py-2">
                                        <div>
                                            Email Title
                                        </div>
                                        <div>
                                            <Input onChange={onTitleChange} />
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <div>
                                            Email Content*
                                        </div>
                                        <div>
                                            <textarea className="w-100 form-control" onChange={onContentChange} rows="10" />
                                        </div>
                                    </div>
                                    <div>
                                        <Button color="primary" onClick={sendEmail} className="mr-1">
                                            Send Email
                                        </Button>
                                        <Button type="reset" >
                                            Reset
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

export default MailingPanel; 