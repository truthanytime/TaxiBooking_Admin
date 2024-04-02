
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

const SimpleTable = ({ isLoading, data, columns, keys, defaultSort, history, dataType }) => {

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

                <DataTable className="card-stretch overflow-auto">
                    <DataTableBody>
                        <DataTableHead>
                            {
                                columns.map((column, index) => {
                                    return (
                                        <DataTableRow className="nk-tb-col-check">
                                            <div onClick={(e) => { onSortHeaderClick(e, column); }}>
                                                <span>{column}</span>
                                            </div>
                                        </DataTableRow>
                                    )
                                })
                            }
                        </DataTableHead>

                        { data.map((item) => {
                            return (
                                <DataTableItem key={item._id}
                                    className="hover:bg-primary"
                                >
                                    {
                                        keys.map((_key, index) => {
                                            return (
                                                <DataTableRow className="nk-tb-col ">
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
                    
                </DataTable>
            }
        </>
    )


}
export default SimpleTable;