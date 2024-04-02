import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import { accountType, depositType, kycStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";
import DatePicker from "react-datepicker";
import { checkTimeRange } from "./util";


const depositTypeNameAndColors = [
    {
        name: depositType.GATEWAY, color: "success", label: "Net"
    },
    {
        name: depositType.MANUAL, color: "info", label: "Admin"
    }
]
const DepositTypeBtn = ({ depositType, name, color, label, updateDepositTypeState }) => {
    return (
        <>
            <Button
                color={depositType.has(name) && color || "white"}
                className={`btn rounded-circle p-1 m-2 border-${color} border-3`}
                onClick={() => updateDepositTypeState(name)}
            >
                <TooltipComponent
                    tag="a"
                    containerClassName="btn-trigger"
                    direction="top"
                    id={`Tooltip-deposit-${label}`}
                    text={name}
                ></TooltipComponent>
            </Button>
            {label}
        </>
    )
}

const DepositHistoryFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            email: "",
            tradingAccountId: "",
            start: new Date("2020-01-01"),
            end: new Date(),
            depositType: new Set([depositType.GATEWAY, depositType.MANUAL])
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
            depositType: new Set([depositType.GATEWAY, depositType.MANUAL])
        }))
    }

    const updateDepositTypeState = (name) => {
        setFilterState(prev => {
            let _depositType = prev.depositType;
            if (_depositType.has(name)) {
                _depositType.delete(name)
            } else {
                _depositType.add(name)
            }
            return ({
                ...prev,
                depositType: _depositType
            })
        })
    }

    useEffect(() => {
        setData(prev => {
            let _filteredData = [...originalData];
            _filteredData = _filteredData?.filter(item => checkTimeRange(filterState.start, filterState.end, item.createdAt))
            _filteredData = _filteredData?.filter(item => item.email?.toLowerCase().includes(filterState.email.trim()));
            _filteredData = _filteredData?.filter(item => item.tradingAccountId?.includes(filterState.tradingAccountId.trim()));
            _filteredData = _filteredData?.filter(item => filterState?.depositType?.has(item.depositMode))

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
                            Trading Account Id
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "tradingAccountId")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={4}>
                        <div className="mt-1 mt-md-0">
                            email
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "email")}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={4}>
                        <div className="mt-1 mt-md-0">
                            Deposit Type
                        </div>
                        <div>
                            {
                                depositTypeNameAndColors.map(item => {
                                    return (
                                        <DepositTypeBtn
                                            {...item}
                                            updateDepositTypeState={updateDepositTypeState}
                                            depositType={filterState.depositType}
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
export default DepositHistoryFilter; 