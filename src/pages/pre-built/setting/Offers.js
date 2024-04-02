

import { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    DataTableItem,
} from "../../../components/Component";
import { DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import { Link } from "react-router-dom";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import ServerAPI from "../../../api";
import { findUpper } from "../../../utils/Utils";
import Content from "../../../layout/content/Content";
const Offers = ({ user, history }) => {

    const [tablesm, updateTableSm] = useState(false);
    const [offers, setOffers] = useState([]);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [detail, setDetail] = useState({});
    const [actionText, setActionText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [sort, setSortState] = useState("");
    const [sortKind, setSortKind] = useState("submittedAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        ServerAPI.get(`/api/admin/offers`)
            .then(result => {
                if (result.data.success === true) {
                    setOffers(result.data.body);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    const toggle = () => {

    }
    const onFilterChange = (e) => {

    }
    const selectorCheck = (e) => {

    }
    const onSortHeaderClick = (e, sortKind) => {

        
    }
    const onSelectChange = (e) => {

    }
    return (
        <>
            <Content page="">
                <Block>
                    <BlockHead>
                        <h3>
                            Available Offers
                        </h3>
                    </BlockHead>
                    <DataTable className="card-stretch">
                        <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                               
                            </div>
                        </div>
                        <DataTableBody>
                            <DataTableHead>
                                <DataTableRow className="nk-tb-col-check">
                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox" readOnly
                                            className="custom-control-input form-control"
                                            id="uid_1"
                                            onChange={(e) => selectorCheck(e)}
                                        />
                                        <label className="custom-control-label" htmlFor="uid_1"></label>
                                    </div>
                                </DataTableRow>
                                <div className="nk-tb-col" onClick={(e) => { onSortHeaderClick(e, "name"); }}>
                                    <span>Name</span>
                                </div>
                                <div className="nk-tb-col tb-col-mb" onClick={(e) => { onSortHeaderClick(e, "group"); }}>
                                    <span>Group</span>
                                </div>
                                <div className="nk-tb-col tb-col-mb" onClick={(e) => { onSortHeaderClick(e, "initialDeposit"); }}>
                                    <span>Initial deposit</span>
                                </div>
                                <DataTableRow onClick={(e) => { onSortHeaderClick(e, "currency"); }}>
                                    <span>Currency</span>
                                </DataTableRow>
                                <div className="nk-tb-col tb-col-mb" onClick={(e) => { onSortHeaderClick(e, "isDemo"); }}>
                                    <span>Demo</span>
                                </div>
                                <div className="nk-tb-col tb-col-mb" onClick={(e) => { onSortHeaderClick(e, "isHidden"); }}>
                                    <span>Hidden</span>
                                </div>
                                <DataTableRow onClick={(e) => { onSortHeaderClick(e, "verifyReqruied"); }}>
                                    <span>Verification Required</span>
                                </DataTableRow>
                                <div className="nk-tb-col tb-col-mb">
                                    &nbsp;
                                </div>
                            </DataTableHead>

                            {offers.length > 0
                                ? offers.map((item) => {
                                    return (
                                        <DataTableItem key={item._id}>
                                            <DataTableRow className="nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox" readOnly
                                                        className="custom-control-input form-control"
                                                        defaultChecked={item.check}
                                                        id={item._id + "uid1"}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChange(e, item._id)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <Link to={`${process.env.PUBLIC_URL}/setting/offers/${item.uuid}`}>
                                                    <div className="user-card">
                                                        <div className="user-info text-primary">
                                                            <span classnames="text-primary fw-bold">{item.name}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </DataTableRow>
                                            <DataTableRow size="mb">
                                                <span className="tb-lead-sub">{item.groupName}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                {item.initialDeposit}
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-tools">
                                                {item.currency}
                                            </DataTableRow>
                                            <DataTableRow size="mb">
                                                <input type="checkbox" readOnly checked={item.demo} />
                                            </DataTableRow>
                                            <DataTableRow size="mb">
                                                <input type="checkbox" readOnly checked={item.hidden} />
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-tools">
                                                <input type="checkbox" readOnly checked={item.verificationRequired} />
                                            </DataTableRow>
                                        </DataTableItem>
                                    );
                                })
                                : null}
                        </DataTableBody>
                        <div className="card-inner">
                           
                        </div>
                    </DataTable>
                </Block>
            </Content>

        </>
    )


}
export default Offers;