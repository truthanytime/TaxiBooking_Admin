import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { ibState } from "../../Constant";

const OrderAction = (props) => {

    const onShowDetailHandle = () => {
        props.onApproveHandle(props._id);
    }
    return (
        <>
            <Row className="d-flex d-lg-none">
                <ul className="nk-tb-actions gx-1">
                    <li>
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                    <li>
                                        <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                onShowDetailHandle(); 
                                            }}
                                        >
                                            <Icon name="focus"></Icon>
                                            <span>View Details</span>
                                        </DropdownItem>
                                    </li>
                                </ul>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </li>
                </ul>

            </Row>
        </>

    )
}
export default OrderAction; 