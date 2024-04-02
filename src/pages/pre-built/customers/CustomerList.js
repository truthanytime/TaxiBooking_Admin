import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  DropdownItem,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
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
import { findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../../actions";
import ServerAPI from "../../../api";
import { KYCItmes, VerificationStatus, kycStatus } from "../../Constant";
import DatePicker from "react-datepicker";
import { preventContextMenu } from "@fullcalendar/core";
import Swal from "sweetalert2";
import ClientFilter from "../filters/ClientFilter";
import KycListAction from "../actions/kyclListAction";
import KycListBulkAction from "../actions-bulk/kyclListAction";
import { UserStatus } from "../user/constant";


const CustomerList = ({ history }) => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [tablesm, updateTableSm] = useState(false);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [sortKind, setSortKind] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentItems, setCurrentItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSeletecItems] = useState([]);

  const dispatch = useDispatch();
  const [rangeDate, setRangeDate] = useState({
    start: 0,
    end: new Date(),
  })
  const onRangeChange = (dates, item) => {
    setRangeDate(prev => ({
      ...prev,
      [item]: dates
    }))
  };

  useEffect(() => {

    let _defaultData = originalData.filter(item => {
      let created, start, end;
      created = new Date(item.created).getTime();
      start = new Date(rangeDate.start).getTime();
      end = new Date(rangeDate.end).getTime();
      console.log({ created, start, end });
      return created >= start && created <= end
    });
    setData(prev => [..._defaultData]);

  }, [rangeDate])

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.fullname.localeCompare(b.fullname));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.fullname.localeCompare(a.fullname));
      setData([...sortedData]);
    }
  };
  useEffect(() => {
    ServerAPI.get(`/api/admin/customers`)
      .then(res => {
        console.log("data", res.data)
        setData(res.data.body);
        dispatch(setUsers(res.data.body));
        setOriginalData(res.data.body);
      })

  }, [])

  useEffect(() => {
    let defaultData = data;
    if (sortOrder === "asc") {
      let sortedData = [];
      if (sortKind === "email") {
        sortedData = defaultData.sort((a, b) => a.email?.localeCompare(b.email));
      } else if (sortKind === "docType") {
        sortedData = defaultData.sort((a, b) => a?.docType?.localeCompare(b.docType));
      } else if (sortKind === "created") {
        sortedData = defaultData.sort((a, b) => a.created?.localeCompare(b.created));
      } else if (sortKind === "verification_status") {
        sortedData = defaultData.sort((a, b) => a.verification_status?.localeCompare(b.verification_status));
      }
      setData([...sortedData]);
    } else if (sortOrder === "desc") {
      let sortedData = [];
      if (sortKind === "email") {
        sortedData = defaultData.sort((a, b) => b.email.localeCompare(a.email));
      } else if (sortKind === "docType") {
        sortedData = defaultData.sort((a, b) => b.docType?.localeCompare(a.docType));
      } else if (sortKind === "created") {
        sortedData = defaultData.sort((a, b) => b.created.localeCompare(a.created));
      } else if (sortKind === "verification_status") {
        sortedData = defaultData.sort((a, b) => b.verification_status.localeCompare(a.verification_status));
      }
      setData([...sortedData]);
    }
  }, [sortKind, sortOrder]);

  // sort param change function 
  const onSortHeaderClick = (e, kind) => {
    if (kind === sortKind) setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setSortKind(kind);
  }

  // Changing state value when searching name
  useEffect(() => {
    let kycData = originalData;
    console.log("onSearchText", onSearchText)
    if (onSearchText !== "") {
      const filteredObject = kycData.filter((item) => {
        console.log("item", item)
        return item.fullname?.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email?.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.docType?.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...kycData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to declare the state change
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // function to select all the items of the table
  const selectorCheck = (e) => {
    setSeletecItems(prev => {
      let _seletecItems = new Set([...prev]);
      data.map((item) => {
        item.check = e.target.checked;
        if (e.target.checked) {
          _seletecItems.add(item._id);
        } else {
          _seletecItems.delete(item._id);
        }
        return item;
      });
      return [..._seletecItems];
    })
    setData(prev => {
      let newData = [];
      newData = prev.map((item) => {
        item.check = e.target.checked;
        return item;
      })
      return [...newData]
    })
  };

  // function to change the property of an item of the table
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
    setSeletecItems(prev => {
      let _seletecItems = new Set([...prev]);
      if (e.target.checked) {
        _seletecItems.add(id);
        return [..._seletecItems];
      } else {
        _seletecItems.delete(id);
        return [..._seletecItems];
      }
    })
  };

  // function to fire actions after dropdowm select
  const onActionClick = (e) => {
    if (actionText === "Reject") {
      let newData = data.map((item) => {
        if (item.check === true) item.verification_status = "Rejected";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "Delete") {
      let newData;
      newData = data.filter((item) => item.check !== true);
      setData([...newData]);
    }
  };

  const approveUser = (id) => {
    updateStatus(id, kycStatus.APPROVED)
  }
  const rejectUser = (id) => {
    updateStatus(id, kycStatus.REJECTED)
  }
  const showDetail = (item) => {
    history.push(`${process.env.PUBLIC_URL}/account/${item.accountUuid}`);
  }
  const deleteUser = (id) => {

  }

  const updateStatus = (id, status) => {

    let newData = data;
    ServerAPI.post(`/api/admin/status/${id}`, { verification_status: status })
      .then(res => {
        if (res.data.success === true) {
          let index = newData.findIndex((item) => item.accountUuid === id);
          newData[index].verification_status = status;
          setData([...newData]);
        }
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })

  }
  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item._id === id);
    setDetail(data[index]);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination

  useEffect(() => {
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    if (!!data && data.length)
      setCurrentItems(prev => data.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemPerPage, currentPage, data]);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const gotoUserProfile = (accountUuid) => {
    if (!!accountUuid) {
      history.push(`/account/${accountUuid}`);
      return;
    }
    Swal.fire("User Should verify email.")
  }

  const onCustomerAddClick = () =>{
    history.push('customer/add'); 
  }
  return (
    <React.Fragment>
      <Head title="Clients"></Head>
      <Content>
        <BlockTitle page>Customers</BlockTitle>
        <BlockDes className="text-soft">
          <p>You have total {data.length} KYC documents.</p>
        </BlockDes>
        <Block>
          <DataTable className="card-stretch overflow-auto">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools mr-n1 justify-content-between w-100">
                  <ul className="btn-toolbar">
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
                          <ul className="btn-toolbar">
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
                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 15 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(15);
                                        }}
                                      >
                                        15
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Order</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="align-items-center d-none d-md-flex h-100 ">
                        <div className="d-flex px-1  align-items-center form-control-wrap">
                          <span className="px-1 text-nowrap">from :</span>
                          <DatePicker
                            selected={rangeDate.start}
                            onChange={(v) => onRangeChange(v, 'start')}
                            className="form-control date-picker px-2"
                          />
                        </div>
                        <div className="d-flex px-1 align-items-center form-control-wrap ">
                          <span className="px-1 text-nowrap ">to :</span>
                          <DatePicker
                            selected={rangeDate.end}
                            onChange={(v) => onRangeChange(v, 'end')}
                            className="form-control date-picker"
                          />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center h-100">
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
                      </div>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <Button color="primary" onClick={onCustomerAddClick}>
                      <Icon name="plus" /> Add Driver
                    </Button>
                    <KycListBulkAction selectedItems={selectedItems} />
                  </div>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
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
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {
              showFilters && <ClientFilter setData={setData} originalData={originalData} /> || ""
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
                <div className="nk-tb-col" onClick={(e) => { onSortHeaderClick(e, "email"); }}>
                  <span>User</span>
                </div>
                <div className="nk-tb-col tb-col-lg" onClick={(e) => { onSortHeaderClick(e, "created"); }}>
                  <span>Submitted</span>
                </div>
                <div className="nk-tb-col tb-col-lg" onClick={(e) => { onSortHeaderClick(e, "verification_status"); }}>
                  <span>Status</span>
                </div>
                <div className="nk-tb-col">
                  &nbsp;
                </div>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item._id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            defaultChecked={item.check}
                            id={item._id + "uid1"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item._id)}
                          />
                          <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow >
                        <Link onClick={() => gotoUserProfile(item.accountUuid)}>
                          <div className="user-card">
                            <UserAvatar
                              theme={"primary"}
                              text={findUpper(item.fullname)}
                              image={item.image}
                            ></UserAvatar>
                            <div className="user-info text-primary">
                              <span className="tb-lead">
                                <span
                                  className={`dot dot-${item.verification_status === kycStatus.APPROVED
                                    ? "success"
                                    : item.verification_status === kycStatus.PENDING
                                      ? "info"
                                      : "danger"
                                    } d-md-none mr-1`}
                                ></span>
                                {item.fullname}{" "}
                              </span>
                              <span>{item.email}</span>
                            </div>
                          </div>
                        </Link>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span className="tb-date">{new Date(item.created).toLocaleString()}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                      <DataTableRow size="md">
                        <span
                          className={`tb-status text-${item.status === UserStatus.ACTIVE? "success" : item.status === UserStatus.PENDING ? "info" : "danger"
                            }`}
                        >
                          {item.status}
                        </span>
                      </DataTableRow>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <KycListAction item={item} approveUser={approveUser} rejectUser={rejectUser} showDetail={showDetail} />
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  noDown
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      </Content>

      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              setViewModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="nk-modal-head">
            <h4 className="nk-modal-title title">
              KYC Details <small className="text-primary"> {detail._id}</small>
            </h4>
          </div>
          <div className="nk-tnx-details mt-sm-3">
            <Row className="gy-3">
              <Col lg={6}>
                <span className="sub-text"> ID</span>
                <span className="caption-text">{detail._id}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Applicant Name </span>
                <span className="caption-text text-break">{detail.fullname}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Document Type </span>
                <span className="caption-text">{detail?.docType?.toUpperCase()}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Status</span>
                <Badge
                  color={detail.verification_status === kycStatus.APPROVED ? "success" : detail.verification_status === kycStatus.PENDING ? "info" : "danger"}
                  size="md"
                >
                  {detail.verification_status}
                </Badge>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Date</span>
                <span className="caption-text"> {new Date(detail.created).toLocaleString()}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Checked By</span>
                <span className="caption-text"> {detail.checked}</span>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default CustomerList;
