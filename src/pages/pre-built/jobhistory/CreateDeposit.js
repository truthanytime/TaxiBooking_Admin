import { useEffect, useState } from "react";
import ServerAPI from "../../../api";

import { Row, Col, Container, Card, Button } from "reactstrap";
import { VerifyStatusKeys, VerificationStatus, AccountTypes, AccountTypeStatus, RoleOptions, RoleStatus } from "../../Constant";
import { RSelect } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { BlockHead, BlockHeadContent, BlockTitle } from "../../../components/Component";
import Swal from "sweetalert2";
const CreateDeposit = ({ match,  history }) => {

    const tradingAccountUuid = match.params.tradingAccountUuid; 

    const [clinetId, setClientId] = useState(null); 

    const [depositState,  setDepositInfo] = useState({
        amout: 0, 
        netAmout: 0, 
        comment: null, 
        paymentGateway: null, 
        currency: null 
    });

    useEffect(()=>{
        ServerAPI.get('/admin/tradingaccount/:id')
        .then(res=>{
            setClientId(res.data);
        })
        .catch(e=>{
            console.log(e); 
        })
    }, [])

    const setDepositState = (e, item) => {
        setDepositInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setDepositStateBySelect = (e, item) => {
        setDepositInfo(prev => {
            return {
                ...prev,
                [item]: e.target.value
            }
        })
    }
    const setDepositStateByCheck = (e, item)=>{
        setDepositInfo(prev => {
            return {
                ...prev,
                [item]: e.target.checked
            }
        })
    }
    const onCancelHandle = ()=>{
        setDepositInfo({});
        
    }
    const onConfirmHandle = () =>{
        let errors =  checkValidation();
        if(errors){
            Swal.fire(errors);
            return; 
        }
        ServerAPI.post('api/admin/deposit/', {...depositState})
        .then(result=>{
            history.push('/deposit');
        }).catch(error=>{
            console.log("error", error);
            Swal.fire("Something went wrong. Please check your network connection.")
        })
    }
    const checkValidation = ()=>{

        let result = !depositState.name && "Name not input" || 
                    !depositState.groupName && "Group not selected" ||
                    !depositState.branch && "Branch not selected" || false; 

        return result; 
    }
    return (
        <>
            <Content page="component">
                <Card className="p-2" >
                    <Row>
                        <Col sm={12} className="d-flex flex-column px-3">
                            <h4>Deposit funds</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Trading Account</label>
                                    <input value= {clinetId} readOnly disabled/>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Currency</label>
                                    <input onChange={e => setDepositState(e, "instrument")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Description</label>
                                    <input onChange={(e) => setDepositState(e, "description")} />
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Leverage*</label>
                                    <input type="number" onChange={(e) => setDepositState(e, "leverage")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">System</label>
                                    <input type="number" onChange={(e) => setDepositState(e, "system")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Branch*</label>
                                    <input onChange={(e) => setDepositState(e, "branch")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Operation*</label>
                                    <input onChange={(e) => setDepositState(e, "operation")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Group Name*</label>
                                    <input onChange={(e) => setDepositState(e, "groupName")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex mt-2 ">
                                    <input type="checkbox" onChange={(e) => setDepositStateByCheck(e,"groupName")} />
                                    <span className="p-2 m-0">Hidden</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setDepositStateByCheck(e,"brokerAnalytics")} />
                                    <span className="p-2 m-0">Broker Analytics</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setDepositStateByCheck(e,"verifyRequired")} />
                                    <span className="p-2 m-0">Verification Requiredf</span>
                                </Col>

                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Verification Status</label>
                                    <RSelect
                                        options={VerifyStatusKeys}
                                        onChange={(e) => {
                                            setDepositStateBySelect(e, "verification_status")
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
                                    <input type="number" onChange={e => setDepositState(e, "name")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Initial credit*</label>
                                    <input number onChange={e => setDepositState(e, "instrument")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex flex-column mt-2 ">
                                    <label className="p-0 m-0">Trading Account limit</label>
                                    <input number onChange={(e) => setDepositState(e, "description")} />
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setDepositStateByCheck(e,"verifyRequired")} />
                                    <span className="p-2 m-0">Auto create Trading Account</span>
                                </Col>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) => setDepositStateByCheck(e,"isDemo")} />
                                    <span className="p-2 m-0">Demo</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} className="d-flex flex-column mt-2 ">
                            <h4>PAMM Properties</h4>
                            <Row>
                                <Col sm={3} xs={6} className="d-flex  mt-2 ">
                                    <input type="checkbox" onChange={(e) =>{
                                        console.log(e.target.checked);
                                        setDepositStateByCheck(e, "PAMM_Pro")
                                    } } />
                                    <span className="p-2 m-0">PAMM Pro</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

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
            </Content>
        </>
    )

}
export default CreateDeposit;