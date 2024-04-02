import { useEffect } from "react"
import { Button, Card, CardBody, CardFooter, CardHeader, Label, Modal } from "reactstrap"
import { Icon } from "../../../components/Component"
import { WithdrawStatus } from "../../Constant"


const WithdrawDetail = ({ withdrawInfo, isOpen, hideDetails, approve, decline }) => {

    const onApprove = () => {
        if (confirm('Are you sure to approve selected withdraw request?')) {
            approve(withdrawInfo.Uuid);
        }
    }
    const onDecline = () => {
        if (confirm('Are you sure to decline selected withdraw request?')) {
            decline(withdrawInfo._id);
        }
    }
    useEffect(() => {

    }, [withdrawInfo])
    return (
        <>
            <Modal isOpen={isOpen} size="lg" toggle={hideDetails} >
                <Card className="m-2">
                    <CardHeader>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>
                                Withdraw Request Details
                            </h5>
                            <Button onClick={hideDetails} > X</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ul className="data-list is-compact">
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Email Address</div>
                                    <div className="data-value">{withdrawInfo?.email}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Trading Account Id</div>
                                    <div className="data-value">{withdrawInfo?.tradingAccountId}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Withdraw Amount</div>
                                    <div className="data-value">${withdrawInfo?.amount}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Withdraw Type</div>
                                    <div className="data-value">{withdrawInfo?.method}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">When:</div>
                                    <div className="data-value">{new Date(withdrawInfo?.submittedAt).toLocaleDateString()}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Status</div>
                                    <div className="data-value">{withdrawInfo.status}</div>
                                </div>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter>
                        {
                            withdrawInfo.status !== WithdrawStatus.APPROVED &&
                            <Button
                                color="primary"
                                onClick={onApprove}
                                className="mr-2"
                            >
                                Approve
                            </Button>
                        }
                        {
                            withdrawInfo.status === WithdrawStatus.NEW &&
                            <Button onClick={onDecline}>
                                Decline
                            </Button>
                        }
                    </CardFooter>
                </Card>
            </Modal>
        </>
    )
}

export default WithdrawDetail; 