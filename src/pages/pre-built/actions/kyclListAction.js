import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import { kycStatus } from "../../Constant";
import Swal from "sweetalert2";

const KycListAction = (props) => {

    const onShowDetailHandle = () => {
        props.showDetail(props.item);
    }
    const onApproveHandle = () => {
        if (item.isEmailVerified)
            props.approveUser(props.item.accountUuid);
        else    
            Swal.fire("User should verify email"); 
    }
    const onRemoveHandle = () => {
        props.removeAdmin(props.item.accountUuid);
    }
    const onRejectHandle = () => {
        props.rejectUser(props.item.accountUuid);
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
                                    {
                                        props.item.verification_status !== kycStatus.APPROVED &&
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onApproveHandle();
                                                }}
                                            >
                                                <Icon name="check"></Icon>
                                                <span>Approve</span>
                                            </DropdownItem>
                                        </li>
                                    }
                                    <li>
                                        <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                                onRemoveHandle();
                                            }}
                                        >
                                            <Icon name="delete"></Icon>
                                            <span>Delete</span>
                                        </DropdownItem>
                                    </li>
                                    {
                                        props.item.verification_status !== kycStatus.REJECTED &&
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onRejectHandle();
                                                }}
                                            >
                                                <Icon name="delete"></Icon>
                                                <span>Reject</span>
                                            </DropdownItem>
                                        </li>
                                    }
                                </ul>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </li>
                </ul>

            </Row>
        </>

    )
}
export default KycListAction; 