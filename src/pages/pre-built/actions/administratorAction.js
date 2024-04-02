import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { ibState } from "../../Constant";

const AdminTableAction = (props) => {

    const onShowDetailHandle = () => {
        props.showDetail(props.item);
    }
    const onEditDetailHandle = () => {
        props.editDetail(props.item);
    }
    const onRemoveHandle = () => {
        if (confirm("Are you sure to delete selected admin?") === true)
            props.removeAdmin(props.item._id);
    }
    return (
        <>
            <Row className="d-flex">
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
                                                onShowDetailHandle();
                                            }}
                                        >
                                            <Icon name="focus"></Icon>
                                            <span>View Details</span>
                                        </DropdownItem>
                                    </li>
                                    <li>
                                        <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                                onEditDetailHandle();
                                            }}
                                        >
                                            <Icon name="edit"></Icon>
                                            <span>Edit</span>
                                        </DropdownItem>
                                    </li>
                                    <li>
                                        <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                                onRemoveHandle();
                                            }}
                                        >
                                            <Icon name="delete"></Icon>
                                            <span>Remove</span>
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
export default AdminTableAction; 