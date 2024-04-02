import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { ibState } from "../../Constant";

const DepositHistoryAction = (props) => {

    const onViewDetails = () => {
        props.viewDetails(props.item);
    }
    const onDeleteHandle = () => {
        props.deleteDepositReport(props._id);
    }
    return (
        <>
            {/* <Row className="d-none d-lg-flex flex-row">
                <Button
                    onClick={() => onViewDetails()}
                    color="primary" className="p-1 mx-1"
                >
                    Detail
                </Button>
                <Button
                    onClick={() => onDeleteHandle()}
                    color="primary" className="p-1">
                    Delete
                </Button>
            </Row> */}
            <Row className="d-flex ">
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
                                                onViewDetails()
                                            }}
                                        >
                                            <Icon name="focus"></Icon>
                                            <span>View Details</span>
                                        </DropdownItem>
                                    </li>
                                    <li >
                                        <DropdownItem
                                            tag="a"
                                            onClick={(ev) => {
                                                onDeleteHandle();
                                            }}
                                        >
                                            <Icon name="trash"></Icon>
                                            <span>Delete</span>
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
export default DepositHistoryAction; 