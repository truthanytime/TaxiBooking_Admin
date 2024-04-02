
import { useEffect, useMemo, useState } from "react";
import ServerAPI from "../../../api";

import { Row, Col, Container, Card, Button } from "reactstrap";
import { VerifyStatusKeys, VerificationStatus, AccountTypes, AccountTypeStatus, RoleOptions, RoleStatus } from "../../Constant";
import { BlockBetween, RSelect } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { BlockHead, BlockHeadContent, BlockTitle } from "../../../components/Component";
import Swal from "sweetalert2";
import { DataTable, DataTableBody, DataTableHead, DataTableRow, DataTableItem } from "../../../components/Component";
import { DemoKYCItmes, KYCItmes } from "../../Constant";

const KYCSetting = ({ edit, history }) => {

    const [kycState, setKYCState] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(true);

    useEffect(() => {
        ServerAPI.get('api/admin/kyc-setting')
            .then(result => {
                setKYCState(prev => ({
                    ...result.data
                }))
                if (result.data.isFake) {
                    setEditMode(true);
                } else {
                    setEditMode(false);
                }
                setLoading(false);
            })
            .catch(e => {
                Swal.fire("Something went wrong. Please check network connecitivity.");
                console.log(e);
            })
    }, [])
    const toggleEditMode = () => {

        setEditMode(prev => !prev);
    }
    const setKycStateByCheck = (e, item, type) => {
        setKYCState(prev => {
            return {
                ...prev,
                [item]: {
                    ...prev[item],
                    [type]: e.target.checked
                }
            }
        })
    }
    const setKycStateByCheckSingle = (e, item) => {
        setKYCState(prev => {
            return {
                ...prev,
                [item]: e.target.checked
            }
        })
    }
    useEffect(() => {
        ServerAPI.get('api/admin/kyc-setting')
            .then(res => {

            })
            .catch(e => {

            })
    }, []);

    const onConfirmHandle = async () => {
        try {
            const result = await ServerAPI.put('api/admin/kyc-setting', { ...kycState })
            if (result.data == false) {
                Swal.fire("Save Failed.")
            } else {
                Swal.file("Successfully Saved.");
            }
        } catch (e) {
            console.log(e);
            Swal.file("Something went wrong.");
        }
    }
    const RnederView = useMemo(() => (
        <>
            <Content page="component">
                <BlockHead >
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle >
                                KYC Setting
                            </BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Card className="p-4" >
                    <Row>
                        {!isLoading &&
                            <>
                                <Col sm={6}>
                                    <BlockTitle className="h4">
                                        Real Register Field
                                    </BlockTitle>
                                    <DataTable className="card-stretch">
                                        <DataTableBody>
                                            <DataTableHead>
                                                <DataTableRow>
                                                    <div className="nk-tb-col" >
                                                        <span>Type</span>
                                                    </div>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <div className="nk-tb-col d-flex justify-content-center" >
                                                        <span>Active</span>
                                                    </div>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <div className="nk-tb-col justify-content-center" >
                                                        <span>Required</span>
                                                    </div>
                                                </DataTableRow>
                                            </DataTableHead>
                                            {KYCItmes.map((item, index) => {
                                                return (
                                                    <DataTableItem key={index}>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3">
                                                            {item.label}
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3 jutify-content-center">
                                                            <div className="d-flex justify-content-center">
                                                                <input disabled={!editMode} type="checkbox"
                                                                    onChange={(e) => {
                                                                        setKycStateByCheck(e, item.value, "active")
                                                                    }}
                                                                    checked={kycState[item.value].active} />
                                                            </div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3 jutify-content-center">
                                                            <div className="d-flex justify-content-center">
                                                                <input disabled={!editMode} type="checkbox"
                                                                    onChange={(e) => {
                                                                        setKycStateByCheck(e, item.value, "required")
                                                                    }}
                                                                    checked={kycState[item.value].required} />
                                                            </div>
                                                        </DataTableRow>
                                                    </DataTableItem>
                                                );
                                            })
                                                || ""}
                                        </DataTableBody>
                                    </DataTable>
                                </Col>
                                <Col sm={6}>
                                    <BlockTitle className="h4">
                                        Demo Register Fields
                                    </BlockTitle>
                                    <DataTable className="card-stretch">
                                        <DataTableBody>
                                            <DataTableHead>
                                                <DataTableRow>
                                                    <div className="nk-tb-col" >
                                                        <span>Type</span>
                                                    </div>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <div className="nk-tb-col d-flex justify-content-center" >
                                                        <span>Active</span>
                                                    </div>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <div className="nk-tb-col justify-content-center" >
                                                        <span>Required</span>
                                                    </div>
                                                </DataTableRow>
                                            </DataTableHead>
                                            {DemoKYCItmes.map((item, index) => {
                                                return (
                                                    <DataTableItem key={index}>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3">
                                                            {item.label}
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3 jutify-content-center">
                                                            <div className="d-flex justify-content-center">
                                                                <input disabled={!editMode} type="checkbox"
                                                                    onChange={(e) => {
                                                                        setKycStateByCheck(e, item.value, "active")
                                                                    }}
                                                                    checked={kycState[item.value].active} />
                                                            </div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-col-tools p-1 px-3 jutify-content-center">
                                                            <div className="d-flex justify-content-center">
                                                                <input disabled={!editMode} type="checkbox"
                                                                    onChange={(e) => {
                                                                        setKycStateByCheck(e, item.value, "required")
                                                                    }}
                                                                    checked={kycState[item.value].required} />
                                                            </div>
                                                        </DataTableRow>
                                                    </DataTableItem>
                                                );
                                            })
                                                || ""}
                                        </DataTableBody>
                                    </DataTable>
                                </Col>
                            </>
                        }
                    </Row>
                    <Row >
                        <Col className="px-2 pt-3">
                            <div className="fs-3 h4"> Verification: </div>
                            <div className="d-flex column-gap-3 align-items-center px-2">
                                <input disabled={!editMode}
                                    onChange={(e) => setKycStateByCheckSingle(e, "isVerification")}
                                    type="checkbox" checked={kycState.isVerification} />
                                <span className="p-1">enabled</span>
                            </div>
                            <div className="d-flex column-gap-3 align-items-center px-2">
                                <input disabled={!editMode}
                                    onChange={(e) => setKycStateByCheckSingle(e, "googleVisisioinCheck")}
                                    type="checkbox" checked={kycState.googleVisisioinCheck} />
                                <span className="p-1">Enable Google Vision Precheck</span>
                            </div>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="px-2 pt-3">
                            <div className="fs-3 h4"> Verify Email: </div>
                            <div className="d-flex column-gap-3 align-items-center px-2">
                                <input disabled={!editMode}
                                    onChange={(e) => setKycStateByCheckSingle(e, "isEmailVerification")}
                                    type="checkbox" checked={kycState.isEmailVerification} />
                                <span className="p-1">enabled</span>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {
                    !kycState.isFake &&
                    <Button
                        onClick={toggleEditMode}
                        color="warning"
                        className="m-1"
                    >
                        {editMode && "Cancel" || "Edit"}
                    </Button>
                }
                {
                    editMode &&
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
    ), [{ ...kycState }])
    return (
        <>
            {RnederView}
        </>
    )

}
export default KYCSetting;