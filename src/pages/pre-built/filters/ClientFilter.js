import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import { kycStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";


const verificationStatusNameAndColors = [
    {
        name: kycStatus.APPROVED, color: "success"
    },
    {
        name: kycStatus.PENDING, color: "info"
    },
    {
        name: kycStatus.NEW, color: "danger"
    },
    {
        name: kycStatus.REJECTED, color: "secondary"
    }
]
const VerificationStatusBtn = ({ verificationStatus, name, color, updateVerificationState }) => {
    return (
        <Button
            color={verificationStatus.has(name) && color || "white"}
            className={`btn rounded-circle p-1 m-2 border-${color} border-3`}
            onClick={() => updateVerificationState(name)}
        >
            <TooltipComponent
                tag="a"
                containerClassName="btn-trigger"
                direction="top"
                id={`client-${name}`}
                text={name}
            ></TooltipComponent>
        </Button>
    )
}

const ClientFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            fullname: "",
            email: "",
            docType: "",
            startTime: "",
            endTime: "",
            verificationStatus: new Set([kycStatus.APPROVED, kycStatus.PENDING, kycStatus.NEW, kycStatus.REJECTED])
        }
    );
    const updateFilterState = (value, item) => {
        setFilterState(prev => ({
            ...prev,
            [item]: value
        }))
    }

    const resetFilterState = () => {
        setFilterState(prev => ({
            fullname: "",
            email: "",
            docType: "",
            startTime: "",
            endTime: "",
            verificationStatus: new Set([kycStatus.APPROVED, kycStatus.PENDING, kycStatus.NEW, kycStatus.REJECTED])
        }))
    }

    const updateVerificationState = (name) => {
        setFilterState(prev => {
            let _verificationStatus = prev.verificationStatus;
            if (_verificationStatus.has(name)) {
                _verificationStatus.delete(name)
            } else {
                _verificationStatus.add(name)
            }
            return ({
                ...prev,
                verificationStatus: _verificationStatus
            })
        })
    }

    useEffect(() => {
        setData(prev => {
            let _filteredData = [...originalData];
            _filteredData = _filteredData?.filter(item => item.fullname?.toLowerCase().includes(filterState.fullname));
            _filteredData = _filteredData?.filter(item => item.email?.toLowerCase().includes(filterState.email));
            _filteredData = _filteredData?.filter(item => filterState.verificationStatus.has(item.verification_status))
            console.log(_filteredData);
            return [..._filteredData];
        })
    }, [filterState])

    return (
        <>
            <Card className="px-4 py-2">
                <Row>
                    <Col xs={12} md={6} xl={4}>
                        <div>
                            User Name
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "fullname")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={4}>
                        <div>
                            email
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "email")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={4}>
                        <div>
                            Verification Status
                        </div>
                        <div>
                            {
                                verificationStatusNameAndColors.map(item => {
                                    return (
                                        <VerificationStatusBtn
                                            {...item}
                                            updateVerificationState={updateVerificationState}
                                            verificationStatus={filterState.verificationStatus}
                                            key={"veribtn" + Math.random()}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}
export default ClientFilter; 