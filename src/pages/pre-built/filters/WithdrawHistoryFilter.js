import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import { accountType, kycStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";
import DatePicker from "react-datepicker";
import { checkTimeRange } from "./util";

const accountTypeNameAndColors = [
    {
        name: accountType.REAL, color: "success"
    },
    {
        name: accountType.DEMO, color: "info"
    },
    {
        name: accountType.IB, color: "danger"
    },
]
const AccountTypeBtn = ({ accountType, name, color, updateAccountTypeState }) => {
    return (
        <Button
            color={accountType.has(name) && color || "white"}
            className={`btn rounded-circle p-1 m-2 border-${color} border-3`}
            onClick={() => updateAccountTypeState(name)}
        >
            <TooltipComponent
                tag="a"
                containerClassName="btn-trigger"
                direction="top"
                id={`Tooltip-${name}`}
                text={name}
            ></TooltipComponent>
        </Button>
    )
}

const WithdrawHistoryFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            email: "",
            tradingAccountId: "",
            start: new Date("2020-01-01"),
            end: new Date(),
            accountType: new Set([accountType.REAL, accountType.DEMO, accountType.IB])
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
            accountType: new Set([accountType.REAL, accountType.DEMO, accountType.IB])
        }))
    }

    const updateAccountTypeState = (name) => {
        setFilterState(prev => {
            let _accountType = prev.accountType;
            if (_accountType.has(name)) {
                _accountType.delete(name)
            } else {
                _accountType.add(name)
            }
            return ({
                ...prev,
                accountType: _accountType
            })
        })
    }

    useEffect(() => {
        setData(prev => {
            let _filteredData = [...originalData];
            _filteredData = _filteredData?.filter(item => checkTimeRange(filterState.start, filterState.end, item.createdAt))
            _filteredData = _filteredData?.filter(item => item.email?.toLowerCase().includes(filterState.email.trim()));
            _filteredData = _filteredData?.filter(item => item.tradingAccountId?.toLowerCase().includes(filterState.tradingAccountId.trim()));
            // _filteredData= _filteredData?.filter(item=>filterState.accountType.has(item.accountType_status))
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
                            Account Type
                        </div>
                        <div>
                            {
                                accountTypeNameAndColors.map(item => {
                                    return (
                                        <>
                                            <AccountTypeBtn
                                                {...item}
                                                updateAccountTypeState={updateAccountTypeState}
                                                accountType={filterState.accountType}
                                                key={"veribtn" + Math.random()}
                                            />
                                            {item.name}
                                        </>
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
export default WithdrawHistoryFilter; 