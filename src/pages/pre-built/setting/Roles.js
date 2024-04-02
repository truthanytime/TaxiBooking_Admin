
import { useEffect, useState } from "react";
import ServerAPI from "../../../api";

import { Row, Col, Container, Card, Button } from "reactstrap";
import { VerifyStatusKeys, VerificationStatus, AccountTypes, AccountTypeStatus, RoleOptions, RoleStatus } from "../../Constant";
import { RSelect } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { BlockHead, BlockHeadContent, BlockTitle } from "../../../components/Component";
import Swal from "sweetalert2";

const RoleSetting = ({ edit, history }) => {

    const [offerState, setOfferInfo] = useState({
        isDemo: false,
        isHidden: false,
        brokerAnalytics: false,
        isAuto: true,
        verifyRequired: false,
        instrument: "USD"
    });

    const setOfferState = (e, item) => {
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setOfferStateBySelect = (e, item) => {
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setOfferStateByCheck = (e, item) => {
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
        ServerAPI.post('api/admin/offer', { ...offerState })
            .then(result => {
                history.push('/setting/offers');
            }).catch(error => {
                console.log("error", error);
                Swal.fire("Something went wrong. Please check your network connection.")
            })
    }
    const checkValidation = () => {
        let result = !offerState.name && "Name not input" ||
            !offerState.groupName && "Group not selected" ||
            !offerState.branch && "Branch not selected" || false;

        return result;
    }
    return (
        <>
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">
                            Offer Create
                        </BlockTitle>
                    </BlockHeadContent>
                </BlockHead>
                <Card className="p-2" >
                    <Row>
                        <Col sm={12} className="d-flex flex-column px-3">
                            <h4>Offer Details</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Name*</label>
                                    <input onChange={e => setOfferState(e, "name")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Currency</label>
                                    <input onChange={e => setOfferState(e, "instrument")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Description</label>
                                    <input onChange={(e) => setOfferState(e, "description")} />
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Leverage*</label>
                                    <input type="number" onChange={(e) => setOfferState(e, "leverage")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">System</label>
                                    <input type="number" onChange={(e) => setOfferState(e, "system")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Branch*</label>
                                    <input onChange={(e) => setOfferState(e, "branch")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Operation*</label>
                                    <input onChange={(e) => setOfferState(e, "operation")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Group Name*</label>
                                    <input onChange={(e) => setOfferState(e, "groupName")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex mt-2 ">
                                    <input type="checkbox" onChange={(e) => setOfferStateByCheck(e, "groupName")} />
                                    <span className="p-2 m-0">Hidden</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setOfferStateByCheck(e, "brokerAnalytics")} />
                                    <span className="p-2 m-0">Broker Analytics</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setOfferStateByCheck(e, "verifyRequired")} />
                                    <span className="p-2 m-0">Verification Requiredf</span>
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Verification Status</label>
                                    <RSelect
                                        options={VerifyStatusKeys}
                                        onChange={(e) => {
                                            setOfferStateBySelect(e, "verification_status")
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} className="d-flex flex-column mt-2 ">
                            <h4>Trading Account Properties</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Initial deposit*</label>
                                    <input type="number" onChange={e => setOfferState(e, "name")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Initial credit*</label>
                                    <input number onChange={e => setOfferState(e, "instrument")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Trading Account limit</label>
                                    <input number onChange={(e) => setOfferState(e, "description")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setOfferStateByCheck(e, "verifyRequired")} />
                                    <span className="p-2 m-0">Auto create Trading Account</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setOfferStateByCheck(e, "isDemo")} />
                                    <span className="p-2 m-0">Demo</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} className="d-flex flex-column mt-2 ">
                            <h4>PAMM Properties</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => {
                                        console.log(e.target.checked);
                                        setOfferStateByCheck(e, "PAMM_Pro")
                                    }} />
                                    <span className="p-2 m-0">PAMM Pro</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Button
                    onClick={ onCancelHandle }
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
            </Content>
        </>
    )

}
export default RoleSetting;