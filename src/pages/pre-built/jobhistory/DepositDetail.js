import { useEffect } from "react"
import { Button, Card, CardBody, CardHeader, Label, Modal } from "reactstrap"
import { Icon } from "../../../components/Component"


const DepositDetail = ({ depositInfo, isOpen, hideDetails }) => {

    useEffect(() => {


    }, [depositInfo])
    return (
        <>
            <Modal isOpen={isOpen} size="lg" toggle={hideDetails} >
                <Card className="m-2">
                    <CardHeader>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>
                                Deposit Details
                            </h5>
                            <Button onClick={hideDetails} > X</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ul className="data-list is-compact">
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Email Address</div>
                                    <div className="data-value">{depositInfo?.email}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Trading Account Id</div>
                                    <div className="data-value">{depositInfo?.tradingAccountId}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Deposit Amount</div>
                                    <div className="data-value">${depositInfo?.amount}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Deposit Type</div>
                                    <div className="data-value">{depositInfo?.depositMode}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">When:</div>
                                    <div className="data-value">{new Date(depositInfo?.createdAt).toLocaleDateString()}</div>
                                </div>
                            </li>
                            <li className="data-item">
                                <div className="data-col">
                                    <div className="data-label">Description</div>
                                    <div className="data-value">{depositInfo.comment}</div>
                                </div>
                            </li>
                          
                        </ul>

                    </CardBody>
                </Card>
            </Modal>
        </>
    )
}

export default DepositDetail; 