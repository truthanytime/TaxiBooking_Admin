import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import { SocialAccountStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";

const VerificationStatusNameAndColors = [
    {
        name: SocialAccountStatus.APPROVED, color: "success"
    },
    {
        name: SocialAccountStatus.PENDING, color: "info"
    },
    {
        name: SocialAccountStatus.NEW, color: "danger"
    },
    {
        name: SocialAccountStatus.DECLINED, color: "secondary"
    }
]
const VerificationStatusBtn = ({ verificationStatus, name, color, updateVerificationState }) => {
    return (
        <Button
            color={verificationStatus.has(name) && color || "white"}
            className={`btn rounded-circle p-0 m-2 border-${color} border-3`}
            onClick={() => updateVerificationState(name)}
        >
            <TooltipComponent
                tag="a"
                containerClassName="btn-trigger p-1"
                direction="top"
                id={`Tooltip-${name}`}
                text={name}
            ></TooltipComponent>
        </Button>
    )
}

const SocialAccountFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            fullname: "",
            email: "",
            docType: "",
            startTime: "",
            endTime: "",
            verificationStatus: new Set([SocialAccountStatus.APPROVED, SocialAccountStatus.PENDING, SocialAccountStatus.NEW, SocialAccountStatus.DECLINED])
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
            verificationStatus: new Set([SocialAccountStatus.APPROVED, SocialAccountStatus.PENDING, SocialAccountStatus.NEW, SocialAccountStatus.DECLINED])
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
                                VerificationStatusNameAndColors.map(item => {
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
export default SocialAccountFilter; 