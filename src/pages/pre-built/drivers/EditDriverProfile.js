import { useEffect, useState } from "react";
import ServerAPI from "../../../api";
import { Card, Button, Input } from "reactstrap";
import { Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import EditEmailPanel from "../user/UserInfo/EditEmail";
import PasswordChangePanel from "../user/UserInfo/PasswordChange";

const InputItem = ({ title, category, user, updateUserInfo, size }) => {
    return (
        <>
            <Col md={size && "4" || "6"} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}</div>
                <Input value={user[category]} onChange={(e) => updateUserInfo && updateUserInfo(e.target.value, category)} />
            </Col>
        </>
    )
}
const StaticInputItem = ({ title, value, size }) => {
    return (
        <>
            <Col md={size && 4 || 6} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}</div>
                <Input value={value} disabled />
            </Col>
        </>
    )
}
const SelectItem = ({ title, category, user, categories }) => {
    return (
        <>
            <Col >
                <div className="data-label">{title}</div>
                <div className="data-value">{user[category]}</div>
            </Col>
        </>
    )
}


const EditDriverProfile = ({ user, history }) => {
    const [remark, setRemark] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [updatedUserInfo, setUpdatedUserInfo] = useState({})
    const [dialogState, setDlgState] = useState({
        isEDlgOpen: false,
        isPDlgOpen: false
    })
    useEffect(() => {
        setUserInfo({ ...user });
    }, [user])
    const setUserData = (value, item) => {
        setUserInfo(prev => {
            return {
                ...prev,
                [item]: value
            }
        })
        setUpdatedUserInfo(prev => {
            return {
                ...prev,
                [item]: value
            }
        })
    }
    const setUserDataBySelect = (e, item) => {
        setUserInfo(prev => {
            return {
                ...prev,
                [item]: e.value
            }
        })
    }

    const toggleEditEmailPanel = () => {
        setDlgState(prev => ({
            ...prev,
            isEDlgOpen: !prev.isEDlgOpen
        }))
    }
    const togglePasswordChangePanel = () => {
        setDlgState(prev => ({
            ...prev,
            isPDlgOpen: !prev.isPDlgOpen
        }))
    }

    const saveUserInfo = () => {

        if (updatedUserInfo !== {}) {
            ServerAPI.patch(`/api/admin/user/profile/${userInfo.accountUuid}`, { ...updatedUserInfo }).then(res => {
                if (res.data.success === true) {
                    Swal.fire("User's profile was successfully updated.")
                } else {
                    Swal.fire("Failed to update user's profile.")
                }
            }).catch(e => {
                Swal.fire("Failed to update user's profile.")
            })
        }
    }
    return (
        <>
            <Row className="mt-2 px-2" >
                <Card className="card-bordered mb-2">
                    <Col lg="12">
                        <h4 className="py-2 mt-3 mb-0"> Account Details</h4>
                        <Row className="">
                            <Col lg="12">
                                <Row>
                                    <StaticInputItem title={"Email Address"} value={userInfo.email} size="4" />
                                    <InputItem title={"First Name"} category="firstName" user={userInfo} updateUserInfo={setUserData} size="4" />
                                    <InputItem title={"Last Name"} category="firstName" user={userInfo} updateUserInfo={setUserData} size="4" />
                                    <InputItem title={"Phone Number"} category="phone" user={userInfo} updateUserInfo={setUserData} size="4" />
                                    <StaticInputItem title={"Account Type"} value={userInfo.role} size="4" />
                                    <Col className="py-2">
                                        <div className="data-label pb-1">Date of Birth</div>
                                        <DatePicker
                                            selected={userInfo.birthday}
                                            className="form-control date-picker px-2"
                                            onChange={(v) => {
                                                setUserInfo(
                                                    prev => ({
                                                        ...prev,
                                                        birthday: v
                                                    })
                                                )
                                            }}
                                        />
                                    </Col>
                                    <StaticInputItem title="Status" value={userInfo.status} size="4" />
                                    <StaticInputItem title="Created at" value={new Date(userInfo.created).toDateString()} size="4" />
                                    <StaticInputItem title="Last IP" value={userInfo.lastIp} size="4" />
                                    <StaticInputItem title="Contact Date" value={userInfo.contactDate} size="4" />
                                    <StaticInputItem title="Broker Notification" value={"Enabled"} size="4" />
                                </Row>
                            </Col>
                        </Row>
                        <h4 className="py-2 mb-0">
                            Address Details
                        </h4>
                        <Row className="pt-0">
                            <InputItem title="Country of Residence" category="country" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="State" category="state" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="Full Address" category="address" updateUserInfo={setUserData} user={userInfo} size={4} />
                        </Row>

                        <h4 className="py-2 mb-0">
                            Bank Details
                        </h4>
                        <Row className="pt-0">
                            <InputItem title="Bank Name" category="bankName" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="Bank Address" category="bankAddress" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="Bank Swift Code" category="bankSwfitCode" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="Bank Account" category="bankAccount" updateUserInfo={setUserData} user={userInfo} size={4} />
                            <InputItem title="Account Name" category="bankAccontName" updateUserInfo={setUserData} user={userInfo} size={4} />
                        </Row>
                        <Row>
                            <EditEmailPanel isOpen={dialogState.isEDlgOpen} user={userInfo} toggle={toggleEditEmailPanel} />
                            <PasswordChangePanel isOpen={dialogState.isPDlgOpen} user={userInfo} toggle={togglePasswordChangePanel} />
                        </Row>
                        <Row className="my-3">
                            <Col>
                                <Button color="secondary" className="mr-1 w-100 center mb-1" >Cancel</Button>
                            </Col>
                            <Col>
                                <Button color="primary" className="mr-1 w-100 center" onClick={saveUserInfo}>Save</Button>
                            </Col>
                            <Col>
                                <Button color="primary" className="mr-1 center w-100" onClick={toggleEditEmailPanel}  >Edit Email</Button>
                            </Col>
                            <Col>
                                <Button color="primary" className="mr-1 center w-100" onClick={togglePasswordChangePanel}>Edit Password</Button>
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Row>
        </>
    )
}
export default EditDriverProfile;