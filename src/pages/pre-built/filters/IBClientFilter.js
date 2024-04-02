import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import { ibState, kycStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";
import DatePicker from "react-datepicker";
import { checkTimeRange } from "./util";

const ibStatusNameAndColors = [
    {
        name: ibState.IB_APPROVED, color: "success"
    },
    {
        name: ibState.IB_NEW, color: "danger"
    },
    {
        name: ibState.IB_DECLINED, color: "secondary"
    }
]
const IBStatusBtn = ({ ibStatus, name, color, updateIBState }) => {
    return (
        <Button
            color={ibStatus.has(name) && color || "white"}
            className={`btn rounded-circle p-0 m-2 border-${color} border-3`}
            onClick={() => updateIBState(name)}
        >
            <TooltipComponent
                tag="a"
                containerClassName="btn-trigger p-1"
                direction="top"
                id={`Tooltip-${name}`}
                text={name}
            >
            </TooltipComponent>
        </Button>
    )
}

const IBClientFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            fullname: "",
            ibAccountId: "",
            email: "",
            start: new Date("2020-01-01"),
            end: new Date(),
            ibStatus: new Set([ibState.IB_APPROVED, ibState.IB_NEW, ibState.IB_DECLINED])
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
            ibStatus: new Set([ibState.IB_APPROVED, ibState.IB_NEW, ibState.IB_DECLINED])
        }))
    }

    const updateIBState = (name) => {
        setFilterState(prev => {
            let _ibStatus = prev.ibStatus;
            if (_ibStatus.has(name)) {
                _ibStatus.delete(name)
            } else {
                _ibStatus.add(name)
            }
            return ({
                ...prev,
                ibStatus: _ibStatus
            })
        })
    }

    useEffect(() => {
        setData(prev => {
            let _filteredData = [...originalData];
            _filteredData = _filteredData?.filter(item => checkTimeRange(filterState.start, filterState.end, item.ibSubmittedAt))
            _filteredData = filterState.fullname && _filteredData?.filter(item => item.fullname?.toLowerCase().includes(filterState.fullname.toLowerCase())) || _filteredData;
            _filteredData = _filteredData?.filter(item => item.email?.toLowerCase().includes(filterState.email.toLowerCase()));
            _filteredData =filterState.ibAccountId && _filteredData?.filter(item => item.ibParentTradingAccountId?.includes(filterState.ibAccountId)) || _filteredData;
            _filteredData = _filteredData?.filter(item => filterState.ibStatus.has(item.ibStatus))
            return [..._filteredData];
        })
    }, [filterState])

    return (
        <>
            <Card className="px-4 py-2">
                <Row>
                    <Col xs={12} md={6} xl={3}>
                        <div>
                            User Name
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "fullname")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <div>
                            email
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "email")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <div>
                            IB Account
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "ibAccountId")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <div>
                            IB Status
                        </div>
                        <div>
                            {
                                ibStatusNameAndColors.map(item => {
                                    return (
                                        <IBStatusBtn
                                            {...item}
                                            updateIBState={updateIBState}
                                            ibStatus={filterState.ibStatus}
                                            key={"veribtn" + Math.random()}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col md={12} xxl={8}>
                        <div className="align-items-center d-none d-md-flex mt-1 ">
                            <div className="d-flex px-1  align-items-center form-control-wrap">
                                <span className="px-1 text-nowrap">from :</span>
                                <DatePicker
                                    selected={filterState.start}
                                    onChange={(v) => updateFilterState(v, 'start')}
                                    className="form-control date-picker px-2"
                                />
                            </div>
                            <div className="d-flex px-1 align-items-center form-control-wrap ">
                                <span className="px-1 text-nowrap ">to :</span>
                                <DatePicker
                                    selected={filterState.end}
                                    onChange={(v) => updateFilterState(v, 'end')}
                                    className="form-control date-picker"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}
export default IBClientFilter; 