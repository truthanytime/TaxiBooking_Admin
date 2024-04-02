
import { DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import { Icon } from "../../../components/Component";

const ItemShowSetting = ({ setItemPerPage, setSortState, itemPerPage, sort }) => {

    const show_itmePerPages = [5, 10,20, 50];

    const sortFunc = ()=>{
        
    }
    return (

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
                        show_itmePerPages.map((_itmePerPage)=>(
                            <li className={itemPerPage === _itmePerPage ? "active" : ""}>
                                <DropdownItem
                                    tag="a"
                                    href="#dropdownitem"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setItemPerPage(_itmePerPage);
                                    }}
                                >
                                    {_itmePerPage}
                                </DropdownItem>
                            </li>
                        ))
                    }
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
    )
}
export default ItemShowSetting;
