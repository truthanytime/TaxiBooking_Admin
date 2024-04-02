import { useEffect, useState } from "react";
import ServerAPI from "../../../api";

import { Row, Col, Container, Card, Button, Input } from "reactstrap";
import { VerifyStatusKeys, VerificationStatus, AccountTypes, AccountTypeStatus, RoleOptions, RoleStatus } from "../../Constant";
import { RSelect } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { BlockHead,BlockBetween,  BlockHeadContent, BlockTitle } from "../../../components/Component";
import Swal from "sweetalert2";
const CreatePaymentGateway = ({ history }) => {

    const [gatewayState, setOfferInfo] = useState({
        name: "",
        paymentMethod: null,
        currency: "",
        processingFee: 0,
        depositFee: 0,
        withdrawFee: 0,
        isDepositActive: false,
        isWithdrawActive: false,
        minAmount: 0,
        masAmount: 0,
        isVerifyRequired: true,
        isAllowTransfer: false,

    });


    const setGatewayState = (e, item) => {
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setGatewayStateBySelect = (e, item) => {
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setGatewayStateByCheck = (e, item) => {
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.checked
            }
        })
    }
    const onCancelHandle = () => {
        setOfferInfo({});
    }
    const onConfirmHandle = () => {
        let errors = checkValidation();
        if (errors) {
            Swal.fire(errors);
            return;
        }
        ServerAPI.post('api/admin/offer', { ...gatewayState })
            .then(result => {
                history.push('/setting/offers');
            }).catch(error => {
                console.log("error", error);
                Swal.fire("Something went wrong. Please check your network connection.")
            })
    }
    const checkValidation = () => {

        let result = !gatewayState.name && "Name not input" ||
            !gatewayState.groupName && "Group not selected" ||
            !gatewayState.branch && "Branch not selected" || false;

        return result;
    }
    return (
        <>
            <Content page="component">
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page> Create Payment Gateway</BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Card className="p-2" >
                    <Row>
                        <Col sm={12} className="d-flex flex-column px-3">
                            <Col className="mb-4">
                                <BlockTitle tag="h3" className="fw-normal">
                                    Info
                                </BlockTitle>
                                <Row>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Name*</label>
                                        <input onChange={e => setGatewayState(e, "name")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Icon</label>
                                        <input onChange={e => setGatewayState(e, "icon")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Deposit Operation</label>
                                        <input onChange={(e) => setGatewayState(e, "deposit_operation")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Withdraw Operation</label>
                                        <input type="number" onChange={(e) => setGatewayState(e, "withdraw_operation")} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <BlockTitle tag="h3" className="fw-normal">
                                    Activation Setting
                                </BlockTitle>
                                <Row className="mb-3">
                                    <Col sm={3} xs={6} className="d-flex ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_deposit")} />
                                        <span className="p-2 m-0">Active Deposit</span>
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_withdraw")} />
                                        <span className="p-2 m-0">Active Withdraw</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <BlockTitle tag="h3" className="fw-normal">
                                    Payment Settings
                                </BlockTitle>
                                <Row className="mb-3">
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Currency</label>
                                        <input type="number" onChange={(e) => setGatewayState(e, "system")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Processing Fee[%]</label>
                                        <input onChange={(e) => setGatewayState(e, "branch")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Deposit Fee</label>
                                        <input onChange={(e) => setGatewayState(e, "operation")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Withdraw Fee</label>
                                        <input onChange={(e) => setGatewayState(e, "groupName")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Min Amount</label>
                                        <input onChange={(e) => setGatewayState(e, "operation")} />
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                        <label className="p-0 m-0">Max Amount</label>
                                        <input onChange={(e) => setGatewayState(e, "groupName")} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <BlockTitle tag="h3" className="fw-normal">
                                    Processing Setting
                                </BlockTitle>
                                <Row className="mb-3">
                                    <Col sm={3} xs={6} className="d-flex align-items-center ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_deposit")} />
                                        <span className="p-2 m-0">Auto Deposits</span>
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex align-items-center ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_withdraw")} />
                                        <span className="p-2 m-0">Auto Withdrawls</span>
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex align-items-center ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_deposit")} />
                                        <span className="p-2 m-0">Verification Required</span>
                                    </Col>
                                    <Col sm={3} xs={6} className="d-flex align-items-center ">
                                        <input type="checkbox" onChange={(e) => setGatewayStateByCheck(e, "active_withdraw")} />
                                        <span className="p-2 m-0">Allow transfers between clients</span>
                                    </Col>
                                </Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Payment Method*</label>
                                    <RSelect
                                        options={VerifyStatusKeys}
                                        onChange={(e) => {
                                            setGatewayStateBySelect(e, "verification_status")
                                        }}
                                    />
                                </Col>
                            </Col>
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Col className="d-flex flex-row mt-2">
                        <Button
                            onClick={onCancelHandle}
                            color="warning"
                            className="m-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="m-1"
                            color="primary"
                            onClick={onConfirmHandle}
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Content>
        </>
    )

}
export default CreatePaymentGateway;