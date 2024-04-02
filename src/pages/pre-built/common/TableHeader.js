// import { useState, useEffect } from "react";
// import ServerAPI from "../../../api";
// import { BlockContent, Block, BlockHead } from "../../../components/Component";
// import Content from "../../../layout/content/Content";
// import { Icon, Button, DataTable, DataTableRow, DataTableItem,DataTableHead, DataTableBody } from "../../../components/Component";
// import {
//     UncontrolledDropdown,
//     DropdownMenu,
//     DropdownToggle,
//     DropdownItem,
// } from "reactstrap";

// const TableHeader = ({sortState, updateTableSm, udpateSortState}) => {


//     return (
//         <>
//             <div className="card-inner position-relative card-tools-toggle">
//                 <div className="card-title-group">
//                     <div className="card-tools mr-n1">
//                         <ul className="btn-toolbar gx-1">
//                             <li>
//                                 <Button
//                                     onClick={(ev) => {
//                                         ev.preventDefault();
//                                         toggle();
//                                     }}
//                                     className="btn-icon search-toggle toggle-search"
//                                 >
//                                     <Icon name="search"></Icon>
//                                 </Button>
//                             </li>
//                             <li className="btn-toolbar-sep"></li>
//                             <li>
//                                 <div className="toggle-wrap">
//                                     <Button
//                                         className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
//                                         onClick={() => updateTableSm(true)}
//                                     >
//                                         <Icon name="menu-right"></Icon>
//                                     </Button>
//                                     <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
//                                         <ul className="btn-toolbar gx-1">
//                                             <li className="toggle-close">
//                                                 <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
//                                                     <Icon name="arrow-left"></Icon>
//                                                 </Button>
//                                             </li>
//                                             <li>
//                                                 <UncontrolledDropdown>
//                                                     <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
//                                                         <Icon name="setting"></Icon>
//                                                     </DropdownToggle>
//                                                     <DropdownMenu right className="dropdown-menu-xs">
//                                                         <ul className="link-check">
//                                                             <li>
//                                                                 <span>Show</span>
//                                                             </li>
//                                                             {
//                                                                 [5, 10, 15].map(itemCount => {
//                                                                     return (
//                                                                         <li className={sortState.itemPerPage === itemCount ? "active" : ""} key={Math.random() + "list"}>
//                                                                             <DropdownItem
//                                                                                 tag="a"
//                                                                                 href="#dropdownitem"
//                                                                                 onClick={(ev) => {
//                                                                                     ev.preventDefault();
//                                                                                     udpateSortState(itemCount, "itemPerPage");
//                                                                                 }}
//                                                                             >
//                                                                                 {itemCount}
//                                                                             </DropdownItem>
//                                                                         </li>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </ul>
//                                                         <ul className="link-check">
//                                                             <li>
//                                                                 <span>Order</span>
//                                                             </li>
//                                                             {
//                                                                 ["dsc", "asc"].map(sortOrder => {
//                                                                     <li className={sortState.sortOrder === sortOrder ? "active" : ""} key={Math.random + "sortorder"}>
//                                                                         <DropdownItem
//                                                                             tag="a"
//                                                                             href="#dropdownitem"
//                                                                             onClick={(ev) => {
//                                                                                 ev.preventDefault();
//                                                                                 udpateSortState(sortOrder, "sortOrder");
//                                                                             }}
//                                                                         >
//                                                                             dsc
//                                                                         </DropdownItem>
//                                                                     </li>
//                                                                 })
//                                                             }
//                                                         </ul>
//                                                     </DropdownMenu>
//                                                 </UncontrolledDropdown>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className={`card-search search-wrap ${!sortState.onSearch && "active"}`}>
//                     <div className="card-body">
//                         <div className="search-content">
//                             <Button
//                                 onClick={() => {
//                                     setSearchText("");
//                                     toggle();
//                                 }}
//                                 className="search-back btn-icon toggle-search"
//                             >
//                                 <Icon name="arrow-left"></Icon>
//                             </Button>
//                             <input
//                                 type="text"
//                                 className="border-transparent form-focus-none form-control"
//                                 placeholder="Search by user or email"
//                                 value={searchText}
//                                 onChange={(e) => onFilterChange(e)}
//                             />
//                             <Button className="search-submit btn-icon">
//                                 <Icon name="search"></Icon>
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default TableHeader;