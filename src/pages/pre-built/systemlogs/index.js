
import { useState, useEffect } from "react";
import ServerAPI from "../../../api";
import { BlockContent, Block, BlockHead, BlockBetween,BlockHeadContent,BlockTitle } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { Icon, Button, DataTable, DataTableRow, DataTableItem, DataTableHead, PaginationComponent, DataTableBody } from "../../../components/Component";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
import SystemLogFilter from "../filters/SystemLogFilter";

const SystemLogs = ({ history, match }) => {

    const [data, setData] = useState([]);
    const [from, setFrom] = useState(0);
    const [to, setTodate] = useState((new Date().getTime()));

    const [originalData, setOriginalData] = useState([]);
    const [tablesm, setTablesm] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [sortState, setSortStates] = useState({
        sort: "",
        sortKind: "createdAt",
        sortOrder: "dsc",
        itemPerPage: 10,
        currentPage: 1,
        searchText: "",
        onSearch: false
    })
    const [showFilters, setShowFilters] = useState(false);

    const updateTableSm = (val) => {
        setTablesm(val);
    }
    const udpateSortState = (val, item) => {
        if (item === "searchText") {
            setSortStates(prev => ({
                ...prev,
                [item]: val,
                currentPage: 1
            }))
        } else {
            setSortStates(prev => ({
                ...prev,
                [item]: val,
            }))
        }
    }
    const paginate = (val) => {
        console.log(val);
        udpateSortState(val, "currentPage");
    }
    const checkValidate = (item) => {

        if (!sortState.searchText) return true;
        const _targetStr = item.createdAt + "  " + item.actionStatus + " " + item.email + "  " + item.comment;

        return _targetStr.search(sortState.searchText) !== -1;
    }


    const componetsForState = {
        Success: <span className="bg-success text-white w-50 small p-1 rounded">Success</span>,
        Error: <span className="bg-danger text-white w-50 small p-1 rounded">Error</span>,
        info: <span className="bg-secondary text-white w-50 small p-1 rounded">Info</span>,
    }


    useEffect(() => {
        ServerAPI.get("/api/admin/system-logs", { params: { from, to } }).then(result => {
            setData(prev => [...result.data.body]);
            setOriginalData(prev => [...result.data.body]);
        }).catch(e => {

        })
    }, []);
    useEffect(() => {
        const { sortKind, sortOrder } = sortState;
        let result = originalData.filter(item => {
            return checkValidate(item);
        }).sort((a, b) => {
            let comp = a[sortKind] > b[sortKind];
            if (sortOrder === "dsc") return !comp;
            return comp;
        });
        setData(prev => [...result]);
    }, [originalData, sortState.sortKind, sortState.sortOrder]);

    useEffect(() => {
        let result;
        const { currentPage, itemPerPage } = sortState;
        if (currentPage * itemPerPage > data.length) {
            result = [...data.slice(itemPerPage * (currentPage - 1), data.length)];
        } else {
            result = [...data.slice(itemPerPage * (currentPage - 1), itemPerPage * currentPage)];
        }
        setTableData(prev =>{
            console.log(prev)
            return result
        })
    }, [data, sortState.currentPage, sortState.itemPerPage])

    const onSelectChange = () => {


    }

    const toggle = () => {
        setSortStates(prev => ({
            ...prev,
            onSearch: !prev.onSearch
        }))
    }

    return (
        <>

            <Content>
                <Block>
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page>IB Commission Setup</BlockTitle>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <BlockContent>
                        <DataTable className="card-stretch">
                            <div className="card-inner position-relative card-tools-toggle">
                                <div className="card-title-group">
                                    <div className="card-tools mr-n1">
                                        <ul className="btn-toolbar gx-1">
                                            <li>
                                                <Button
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        toggle();
                                                    }}
                                                    className="btn-icon search-toggle toggle-search"
                                                >
                                                    <Icon name="search"></Icon>
                                                </Button>
                                            </li>
                                            <li className="btn-toolbar-sep"></li>
                                            <li>
                                                <div className="toggle-wrap">
                                                    <Button
                                                        className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                                                        onClick={() => updateTableSm(true)}
                                                    >
                                                        <Icon name="menu-right"></Icon>
                                                    </Button>
                                                    <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                                                        <ul className="btn-toolbar gx-1">
                                                            <li className="toggle-close">
                                                                <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                                                    <Icon name="arrow-left"></Icon>
                                                                </Button>
                                                            </li>
                                                            <li>
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                                                        <Icon name="setting"></Icon>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu right className="dropdown-menu-xs">
                                                                        <ul className="link-check">
                                                                            <li>
                                                                                <span>Show</span>
                                                                            </li>
                                                                            {
                                                                                [5, 10, 15].map(itemCount => {
                                                                                    return (
                                                                                        <li className={sortState.itemPerPage === itemCount ? "active" : ""} key={Math.random() + "list"}>
                                                                                            <DropdownItem
                                                                                                tag="a"
                                                                                                href="#dropdownitem"
                                                                                                onClick={(ev) => {
                                                                                                    ev.preventDefault();
                                                                                                    udpateSortState(itemCount, "itemPerPage");
                                                                                                }}
                                                                                            >
                                                                                                {itemCount}
                                                                                            </DropdownItem>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                        <ul className="link-check">
                                                                            <li>
                                                                                <span>Order</span>
                                                                            </li>
                                                                            {
                                                                                ["dsc", "asc"].map(sortOrder => {
                                                                                    <li className={sortState.sortOrder === sortOrder ? "active" : ""} key={Math.random + "sortorder"}>
                                                                                        <DropdownItem
                                                                                            tag="a"
                                                                                            href="#dropdownitem"
                                                                                            onClick={(ev) => {
                                                                                                ev.preventDefault();
                                                                                                udpateSortState(sortOrder, "sortOrder");
                                                                                            }}
                                                                                        >
                                                                                            dsc
                                                                                        </DropdownItem>
                                                                                    </li>
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <Button
                                                    onClick={() => { setShowFilters(prev => !prev) }}
                                                >
                                                    Filters
                                                    {
                                                        showFilters &&
                                                        <Icon name="minus-round" />
                                                        ||
                                                        <Icon name="plus-round" />
                                                    }
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={`card-search search-wrap ${sortState.onSearch && "active"}`}>
                                    <div className="card-body">
                                        <div className="search-content">
                                            <Button
                                                onClick={() => {
                                                    udpateSortState("", "searchText");
                                                    toggle();
                                                }}
                                                className="search-back btn-icon toggle-search"
                                            >
                                                <Icon name="arrow-left"></Icon>
                                            </Button>
                                            <input
                                                type="text"
                                                className="border-transparent form-focus-none form-control"
                                                placeholder="Search by user or email"
                                                value={sortState.searchText}
                                                onChange={(e) => udpateSortState(e.target.value, "searchText")}
                                            />
                                            <Button className="search-submit btn-icon">
                                                <Icon name="search"></Icon>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                showFilters && <SystemLogFilter setData={setData} originalData={originalData} />
                            }
                            <DataTableBody>
                                <DataTableHead>
                                    <DataTableRow className="nk-tb-col-check">
                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input form-control"
                                                id="uid_1"
                                                onChange={(e) => selectorCheck(e)}
                                            />
                                            <label className="custom-control-label" htmlFor="uid_1"></label>
                                        </div>
                                    </DataTableRow>
                                    <div className="nk-tb-col" onClick={(e) => { udpateSortState("createdAt", "sortKind"); }}>
                                        <span>Created At</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-mb" onClick={(e) => { udpateSortState("createdAt", "actionStatus"); }}>
                                        <span>Type</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-mb" onClick={(e) => { udpateSortState("createdAt", "email"); }}>
                                        <span>Email</span>
                                    </div>
                                    <div className="nk-tb-col" onClick={(e) => { udpateSortState("createdAt", "comment"); }}>
                                        <span>Message</span>
                                    </div>
                                </DataTableHead>

                                {tableData.length > 0 &&  tableData.map((item) => {

                                        return (
                                            <DataTableItem key={item._id+ "" + Math.random()}>
                                                <DataTableRow className="nk-tb-col-check">
                                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input form-control"
                                                            defaultChecked={item.check}
                                                            id={item._id + "uid1"}
                                                            key={Math.random()}
                                                        />
                                                        <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                                                    </div>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <span>
                                                        {new Date(item.createdAt).toLocaleString()}
                                                    </span>
                                                </DataTableRow>
                                                <DataTableRow size="mb">
                                                    <span className="tb-lead-sub">{componetsForState[item.actionStatus]}</span>
                                                </DataTableRow>
                                                <DataTableRow size="md">
                                                    <span className="text-info " style={{ cursor: "pointer" }}
                                                        onClick={() => { history.push(`/account/${item.accountUuid}`) }}
                                                    >
                                                        {item.email}
                                                    </span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <span className="tb-date">{item.comment}</span>
                                                </DataTableRow>
                                            </DataTableItem>
                                        );
                                    })
                                    || ""}
                            </DataTableBody>
                            <div className="card-inner">
                                {data.length > 0 ? (
                                    <PaginationComponent
                                        noDown
                                        itemPerPage={sortState.itemPerPage}
                                        totalItems={data.length}
                                        paginate={paginate}
                                        currentPage={sortState.currentPage}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <span className="text-silent">No data found</span>
                                    </div>
                                )}
                            </div>
                        </DataTable>


                    </BlockContent>
                </Block>
            </Content>
        </>
    )
}
export default SystemLogs;