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
import { setChecking } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ServerAPI from "../../../api";
import { kycStatus } from "../../Constant";
import AdminTableAction from "../actions/administratorAction";
import AdminDetail from "./AdminDetail";
import generatePassword from "./util";

let totalData = [];
let roleOptions = [
  {
    value: "Super Admin",
    label: "Super Admin",
  },
  {
    value: "Admin",
    label: "Admin",
  },
]
const Administrator = ({ history }) => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [onSearch, setOnSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [tablesm, updateTableSm] = useState(false);
  const [data, setData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [editItem, setEditedItem] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [sort, setSortState] = useState("");
  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.email.localeCompare(b.email));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.email.localeCompare(a.email));
      setData([...sortedData]);
    }
  };
  useEffect(() => {
    if (admin?.role !== "Super Admin") {
      history.push("/kyc-list-regular");
      return;
    }
    dispatch(setChecking(true));
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/auth/admins`)
      .then(res => {
        dispatch(setChecking(false));
        setData(res.data);
        totalData = res.data;
      })
      .catch(err => {
        dispatch(setChecking(false));
      })

  }, [])
  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = totalData.filter((item) => {
        return (item.email.toLowerCase().includes(onSearchText.toLowerCase()) || item.name.toLowerCase().includes(onSearchText.toLowerCase()) || item.role.toLowerCase().includes(onSearchText.toLowerCase()));
      });
      setData([...filteredObject]);
    } else {
      setData([...totalData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // role change
  const onRoleChange = (role) => {
    setFormData({ ...formData, role: role.value });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setEditedItem({});
    setFormData({
      name: "",
      email: "",
      role: "",
    });
  };

  const onFormSubmit = (form) => {
    let submittedData = {
      id: data.length + 1,
      email: form.email,
      name: form.name,
      password: form.password,
      role: formData.role,
      createdAt: new Date().toLocaleDateString(),
    };
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/auth/admin`, submittedData)
      .then(res => {
        toast.success("Created a new admin successfully!")
        setData([submittedData, ...data]);
      })
      .catch(err => {
        toast.error(err.response.data.message)
      })
    setView({ open: false });
    resetForm();
  };
  // function that loads the want to editted data
  const editDetail = (item) => {
    setEditedItem(prev => item);
    setView({ add: false, edit: true });
  };
  // function to delete a product
  const removeAdmin = (id) => {
    let defaultData = data;
    const removeData = defaultData.find(item => item._id === id);
    console.log(removeData)
    defaultData = defaultData.filter((item) => item._id !== id);
    axios.delete(`${process.env.REACT_APP_API_SERVER}/api/auth/admin`, { data: removeData })
      .then(res => {
        toast.success("Deleted a new admin successfully!")
        setData([...defaultData]);
      })
      .catch(err => {
        toast.error(err.response.data.message)
      })
  };

  const showDetail = (item) => {

  }


  // function to toggle the search option
  const toggle = () => setOnSearch(!onSearch);
  const toggleAdmin = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const resetItem = () => {
    setEditedItem({});
  }
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const { errors, register, handleSubmit } = useForm();

  const resetPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let _password = generatePassword(15);
    setFormData(prev => ({
      ...prev,
      password: _password
    }))
  }
  return (
    <React.Fragment>
      <Head title="Administrators"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Administrators</BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {data.length} administrators.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch overflow-auto">
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
                                          setItemPerPage(20);
                                        }}
                                      >
                                        20
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
                            <li className="nk-block-tools-opt">
                              <Button
                                className="toggle btn-icon d-md-none"
                                color="primary"
                                onClick={() => {
                                  toggleAdmin("add");
                                }}
                              >
                                <Icon name="plus"></Icon>
                              </Button>
                              <Button
                                className="toggle d-none d-md-inline-flex"
                                color="primary"
                                onClick={() => {
                                  toggleAdmin("add");
                                }}
                              >
                                <Icon name="plus"></Icon>
                                <span>Add</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
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
                      placeholder="Search by email, address or trading acount id"
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
            <DataTableBody>
              <DataTableHead>
                <DataTableRow  >
                  <span>Email</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Name</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Role</span>
                </DataTableRow>
                <DataTableRow size="mb" >
                  <span>CreatedAt</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Actions</span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item._id} >
                      <DataTableRow>
                        <div className="user-card" >
                          <span>{item.email}</span>
                        </div>
                      </DataTableRow>
                      <DataTableRow >
                        <span className="tb-lead-sub">{item.name}</span>
                      </DataTableRow>
                      <DataTableRow >
                        <span className="tb-lead-sub">{item.role}</span>
                      </DataTableRow>
                      <DataTableRow size={"mb"}>
                        <span className="tb-date">{new Date(item.createdAt).toLocaleString()}</span>
                      </DataTableRow>
                      <DataTableRow >
                        <AdminTableAction item={item} showDetail={showDetail} editDetail={editDetail} removeAdmin={removeAdmin} />
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner overflow-auto">
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
        <AdminDetail isOpen={view.edit} item={editItem} roleOptions={roleOptions} resetItem={resetItem} onFormCancel={onFormCancel} />
        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${view.add ? "content-active" : ""
            }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Admin</BlockTitle>
              <BlockDes>
                <p>Add information or update admin.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.name}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Email
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="email"
                        name="email"
                        ref={register({ required: "This is required" })}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.email}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="password"
                        ref={register({ required: "This is required" })}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.password}
                      />
                      <Button color={"primary"} onClick={resetPassword} className={"mt-2"}>Reset</Button>
                      {errors.password && <span className="invalid">{errors.password.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={roleOptions}
                        defaultValue={{ label: formData.role, value: formData.value }}
                        onChange={onRoleChange}
                      //ref={register({ required: "This is required" })}
                      />
                      {errors.role && <span className="invalid">{errors.role.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Admin</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggleAdmin}></div>}
      </Content>
    </React.Fragment>
  );
};
export default Administrator;
