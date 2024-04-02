import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import { actionStatus } from "../../Constant";
import { TooltipComponent } from "../../../components/Component";
import DatePicker from "react-datepicker";
import { checkTimeRange } from "./util";

const actionStatusNameAndColors = [
    {
        name: actionStatus.SUCCESS, color: "success"
    },
    {
        name: actionStatus.INFO, color: "info"
    },
    {
        name: actionStatus.ERROR, color: "danger"
    },
]
const ActionStatusBtn = ({ actionStatus, name, color, updateactionState }) => {
    return (
        <Button
            color={actionStatus.has(name) && color || "white"}
            className={`btn rounded-circle p-1 m-2 border-${color} border-3`}
            onClick={() => updateactionState(name)}
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

const SystemLogFilter = ({
    setData, originalData
}) => {

    const [filterState, setFilterState] = useState(
        {
            comment: "",
            email: "",
            start: new Date("2020-01-01"),
            end: new Date(),
            actionStatus: new Set([actionStatus.SUCCESS, actionStatus.ERROR, actionStatus.INFO])
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
            comment: "",
            email: "",
            start: "",
            end: "",
            actionStatus: new Set([actionStatus.ERROR, actionStatus.ERROR, actionStatus.INFO])
        }))
    }
    const updateactionState = (name) => {
        setFilterState(prev => {
            let _actionStatus = prev.actionStatus;
            if (_actionStatus.has(name)) {
                _actionStatus.delete(name)
            } else {
                _actionStatus.add(name)
            }
            return ({
                ...prev,
                actionStatus: _actionStatus
            })
        })
    }
    useEffect(() => {
        setData(prev => {
            let _filteredData = [...originalData];
            _filteredData = _filteredData?.filter(item => checkTimeRange(filterState.start, filterState.end, item.createdAt))
            _filteredData = _filteredData?.filter(item => item.email?.toLowerCase().includes(filterState.email));
            _filteredData = _filteredData?.filter(item => item.comment?.toLowerCase().includes(filterState.comment));
            console.log(_filteredData);
            _filteredData = _filteredData?.filter(item => filterState.actionStatus.has(item.actionStatus))
            return [..._filteredData];
        })
    }, [filterState])

    return (
        <>
            <Card className="px-4 py-2">
                <Row>
                   
                    <Col xs={12} md={6} xl={4}>
                        <div>
                            Action Content
                        </div>
                        <div>
                            <Input
                                onChange={(e) => updateFilterState(e.target.value, "comment")}
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
                            Action Status
                        </div>
                        <div>
                            {
                                actionStatusNameAndColors.map(item => {
                                    return (
                                        <ActionStatusBtn
                                            {...item}
                                            updateactionState={updateactionState}
                                            actionStatus={filterState.actionStatus}
                                            key={"veribtn" + Math.random()}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col md={12} xxl={8}>
                        <div className="align-items-center d-none d-md-flex ">
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
export default SystemLogFilter; 