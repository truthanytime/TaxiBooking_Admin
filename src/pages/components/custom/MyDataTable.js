
import { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Icon } from "../../../components/Component";
import {
    Button,
    BlockBetween,
    TooltipComponent,
    UserAvatar,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    DataTableItem,
    PaginationComponent,
    RSelect,
} from "../../../components/Component";
import { DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import { Block } from "../../../components/block/Block";
import { findUpper } from "../../../utils/Utils";
import ItemShowSetting from "./ItemShowSetting";

const MyDataTable = ({ isLoading, data, columns, keys, defaultSort, history, dataType, columnSize }) => {

    const [isSelectAll, selectAll] = useState(false);
    const [pageState, setPageState] = useState({
        itemPerPage: 10,
        currentPage: 1,
        sortKind: defaultSort,
        totalItems: data?.length,
        sortOrder: "desc",
        searchText: "",
        onSearch: true
    })
    const [previewData, setPreviewData] = useState([]);
    useEffect(() => {
        setPreviewData(prev => {
            const { itemPerPage, currentPage } = pageState;
            let data_length = data.length;
            if (itemPerPage * (currentPage) > data_length) {
                return [...data.slice(itemPerPage * (currentPage - 1), data_length)];
            } else {
                return [...data.slice(itemPerPage * (currentPage - 1), itemPerPage * currentPage)]
            }
        })
    }, [isLoading, pageState.currentPage, pageState.itemPerPage, data])
    const updatePageState = (newValue, item) => {
        setPageState(prev => ({
            ...prev,
            [item]: newValue
        }))
    }
    const [tablesm, setTableSm] = useState(false);
    const paginate = (pageNumber) => updatePageState(pageNumber, "currentPage");
    const toggle = () => {

    }
    const onSortHeaderClick = (e, key) => {

    }
    const selectorCheck = (e) => {
        let newData;
        newData = previewData.map((item) => {
            item.check = e.currentTarget.checked;
            return item;
        });
        setPreviewData([...newData]);
    };

    return (
        <>
            {
                !isLoading &&
                <DataTable className="card-stretch overflow-auto">
                    <div className="card-inner position-relative card-tools-toggle p-2">
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
                                                        <ItemShowSetting
                                                            setItemPerPage={(val) => { updatePageState(val, "itemPerPage") }}
                                                            setSortState={val => updatePageState(val, 'sortOrder')}
                                                            itemPerPage={pageState.itemPerPage} sortOrder={pageState.sortOrder} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`card-search search-wrap ${!pageState.onSearch && "active"}`}>
                            <div className="card-body">
                                <div className="search-content">
                                    <Button
                                        onClick={() => {
                                            setSearchText("");
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
                                        value={pageState.searchText}
                                        onChange={(e) => onFilterChange(e)}
                                    />
                                    <Button className="search-submit btn-icon">
                                        <Icon name="search"></Icon>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataTableBody>
                        <DataTableHead>
                            <DataTableRow className="nk-tb-col-check">
                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input form-control"
                                        id={"uid_" + dataType}
                                        onChange={(e) => selectorCheck(e)}
                                    />
                                    <label className="custom-control-label" htmlFor={"uid_" + dataType}></label>
                                </div>
                            </DataTableRow>
                            {
                                columns.map((column, index) => {
                                    return (
                                        <DataTableRow size={columnSize[index]} >
                                            <div onClick={(e) => { onSortHeaderClick(e, column); }}>
                                                <span>{column}</span>
                                            </div>
                                        </DataTableRow>
                                    )
                                })
                            }
                        </DataTableHead>

                        {!isLoading && previewData.map((item) => {
                            let id = "check_id_"+ Math.random(); 
                            return (
                                <DataTableItem key={item._id}
                                    className="hover:bg-primary"
                                >
                                    <DataTableRow className="nk-tb-col-check">
                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input form-control"
                                                defaultChecked={isSelectAll || item.check}
                                                id={id}
                                                key={Math.random()}
                                                onChange={(e) => onSelectChange(e, item._id)}
                                            />
                                            <label className="custom-control-label" htmlFor={id}></label>
                                        </div>
                                    </DataTableRow>
                                    {
                                        keys.map((_key, index) => {
                                            return (
                                                <DataTableRow size={columnSize[index]}>
                                                    {item[_key]}
                                                </DataTableRow>
                                            )
                                        })
                                    }
                                </DataTableItem>
                            );
                        })
                            || ""}
                    </DataTableBody>
                    <div className="card-inner">
                        {data.length > 0 ? (
                            <PaginationComponent
                                noDown
                                itemPerPage={pageState.itemPerPage}
                                totalItems={data.length}
                                paginate={paginate}
                                currentPage={pageState.currentPage}
                            />
                        ) : (
                            <div className="text-center">
                                <span className="text-silent">No data found</span>
                            </div>
                        )}
                    </div>
                </DataTable>
            }
        </>
    )


}
export default MyDataTable;