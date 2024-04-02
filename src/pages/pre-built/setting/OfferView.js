import { useEffect, useState } from "react";
import ServerAPI from "../../../api";

import { Row, Col, Container, Card, Button } from "reactstrap";
import { VerifyStatusKeys, VerificationStatus, AccountTypes, AccountTypeStatus, RoleOptions, RoleStatus } from "../../Constant";
import { RSelect } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { BlockHead, BlockHeadContent, BlockTitle } from "../../../components/Component";
import Swal from "sweetalert2";

const OfferView = ({ match, history }) => {

    const offerUuid = match.params.id;
    const [viewMode, setViewMode] = useState(false);
    const [offerState, setOfferInfo] = useState({
        offerUuid,
        isDemo: false,
        hidden: false,
        brokerAnalytics: false,
        isAuto: true,
        verifyRequired: false,
        instrument: "USD",
        leverage: 0,
        PAMMPro: false
    });
    const [originState, setOriginState] = useState({})
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        ServerAPI.get(`api/admin/offer/${offerUuid}`).then(result => {

            setOfferInfo(prev => ({
                ...result.data.body
            }))
            setOriginState({
                ...result.data.body
            })
            ServerAPI.get(`api/admin/groups/offer/${result.data.offerUuid}`)
                .then(res_group => {

                    let _groups = res_group.data.map(item => ({ value: item, label: item }));
                    setGroups(prev => [..._groups]);
                })
                .catch(e => {
                    // Swal.fire("There are no availabel Groups");
                    // history.push('/setting/offers');
                })
        }
        ).catch(e => {
            console.log(e);
        })
    }, [])
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
                [item]: e.value
            }
        })
    }
    const toggleViewMode = () => {
        setViewMode(prev => !prev);
    }
    const setOfferStateByCheck = (e, item) => {
        if(!viewMode) return;
        setOfferInfo(prev => {
            return {
                ...prev,
                [item]: e.target.checked
            }
        })
    }
    const onCancelHandle = () => {
        setOfferInfo({ ...originState });
    }
    const onConfirmHandle = () => {
        let errors = checkValidation();
        if (errors) {
            Swal.fire(errors);
            return;
        }
        ServerAPI.put(`api/admin/offer/${offerUuid}`, { ...offerState })
            .then(result => {
                history.push('/setting/offers');
            }).catch(error => {
                console.log("error", error);
                Swal.fire("Something went wrong. Please check your network connection.")
            })
    }
    const checkValidation = () => {
        let result = !offerState.name && "Name not input" ||
            !offerState.groupName && "Group not selected" || false;

        return result;
    }
    return (
        <>
            <Content page="">
                <Card className="p-2 p-sm-3 p-md-5" >
                    <Row>
                        <Col sm={12} className="d-flex flex-column px-3">
                            <h4>Offer Details : <span className="p-2 text-danger">
                                {offerState.name}
                            </span></h4>

                            <Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Name*</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.name} onChange={e => setOfferState(e, "name")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Currency</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.instrument} onChange={e => setOfferState(e, "instrument")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Description</label>
                                    <input className="form-control" readOnly={!viewMode}
                                        value={offerState.description}
                                        onChange={(e) => setOfferState(e, "description")} />
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Leverage*</label>
                                    <input className="form-control" readOnly={!viewMode}
                                        value={offerState.leverage}
                                        type="number" onChange={(e) => setOfferState(e, "leverage")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">System</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.system?.name} type="number" />
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Operation*</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.operation} onChange={(e) => setOfferState(e, "operation")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Branch*</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.branch?.name} onChange={(e) => setOfferState(e, "operation")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Group Name*</label>
                                    {
                                        (!viewMode || originState.groupName) &&
                                        <input className="form-control" value={offerState.groupName} readOnly={!viewMode || originState.groupName} />
                                        ||
                                        <RSelect
                                            options={groups}
                                            value={{ value: offerState.groupName, label: offerState.groupName }}
                                            onChange={(e) => {
                                                console.log("groupName", e)
                                                setOfferStateBySelect(e, "groupName")
                                            }}
                                        />
                                    }
                                </Col>
                                <Col sm={3} xs={6} className="d-flex mt-2 align-items-center ">
                                    <input className="form-control d-inline w-auto" readOnly={!viewMode} checked={offerState.hidden} type="checkbox"  />
                                    <span className="p-2 m-0">Hidden</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex mt-2 align-items-center ">
                                    <input className="form-control d-inline w-auto" readOnly={!viewMode} checked={offerState.brokerAnalytics} type="checkbox" onChange={(e) => setOfferStateByCheck(e, "brokerAnalytics")} />
                                    <span className="p-2 m-0">Broker Analytics</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex mt-2 align-items-center ">
                                    <input className="form-control d-inline w-auto" readOnly={!viewMode} checked={!!offerState.verifyReqruied} type="checkbox" onChange={(e) => setOfferStateByCheck(e, "verifyReqruied")} />
                                    <span className="p-2 m-0">Verification Required</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} className="d-flex flex-column mt-2 ">
                            <h4>Trading Account Properties</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Initial deposit*</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.initialDeposit} type="number" onChange={e => setOfferState(e, "initialDeposit")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Initial credit*</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.initialCredit} number onChange={e => setOfferState(e, "initialCredit")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Trading Account limit</label>
                                    <input className="form-control" readOnly={!viewMode} value={offerState.tradingAccountLimit} number onChange={(e) => setOfferState(e, "tradingAccountLimit")} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex  mt-2 align-items-center">
                                    <input className="form-control d-inline w-auto" readOnly={!viewMode} checked={offerState.isAuto} type="checkbox" onChange={(e) => setOfferStateByCheck(e, "isAuto")} />
                                    <span className="p-2 m-0">Auto create Trading Account</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 align-items-center">
                                    <input className="form-control d-inline w-auto" checked={offerState.demo} readOnly={!viewMode} type="checkbox" onChange={(e) => setOfferStateByCheck(e, "isDemo")} />
                                    <span className="p-2 m-0">Demo</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} className="d-flex flex-column mt-2 ">
                            <h4>PAMM Properties</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex  mt-2 align-items-center ">
                                    <input className="form-control d-inline w-auto" checked={offerState.PAMMPro} readOnly={!viewMode} type="checkbox" onChange={(e) => {
                                        console.log(e.target.checked);
                                        setOfferStateByCheck(e, "PAMMPro")
                                    }} />
                                    <span className="p-2 m-0">PAMM Pro</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Button
                    onClick={toggleViewMode}
                    color="warning"
                    className="m-1"
                >
                    {
                        viewMode && "Cancel" || "Edit"
                    }
                </Button>
                {
                    viewMode &&
                    <Button
                        className="m-1"
                        color="primary"
                        onClick={onConfirmHandle}
                    >
                        Save
                    </Button>
                }
            </Content>
        </>
    )

}
export default OfferView;