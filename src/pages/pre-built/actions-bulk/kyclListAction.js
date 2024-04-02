import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row,Col,  UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import { kycStatus } from "../../Constant";
import Swal from "sweetalert2";
import ServerAPI from "../../../api";

const KycListBulkAction = (props) => {
    const onBulkApproveHandle = () => {
        ServerAPI.post(`api/admin/bulk-approve-kyc`, props.data).then(res => {

        }).catch(e => {

        })
    }
    const onBulkRemoveHandle = () => {
        ServerAPI.post(`api/admin/bulk-remove-kyc`, props.data).then(res => {

        }).catch(e => {

        })
    }
    const onBulkRejectHandle = () => {
        ServerAPI.post(`api/admin/bulk-reject-kyc`, props.data).then(res => {

        }).catch(e => {

        })
    }
    const onBulkEmailHandle = () => {
        ServerAPI.post(`api/admin/bulk-reject-kyc`, props.data).then(res => {

        }).catch(e => {

        })
    }
    return (
        <>
            <Row className="d-flex">
                <Col>
                    <ul className="nk-tb-actions gx-1">
                        <li>
                            <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon p-0">
                                    <Button 
                                        color="primary" 
                                        className="py-1"  
                                        disabled = {!props.selectedItems.length}
                                    > Bulk Operation</Button>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <ul className="link-list-opt no-bdr">
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onBulkApproveHandle();
                                                }}
                                            >
                                                <Icon name="check"></Icon>
                                                <span>Approve</span>
                                            </DropdownItem>
                                        </li>
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onBulkRemoveHandle();
                                                }}
                                            >
                                                <Icon name="delete"></Icon>
                                                <span>Delete</span>
                                            </DropdownItem>
                                        </li>
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onBulkRejectHandle();
                                                }}
                                            >
                                                <Icon name="delete"></Icon>
                                                <span>Reject</span>
                                            </DropdownItem>
                                        </li>
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onBulkEmailHandle();
                                                }}
                                            >
                                                <Icon name="mail"></Icon>
                                                <span>Mass Mail</span>
                                            </DropdownItem>
                                        </li>
                                        <li>
                                            <DropdownItem
                                                tag="a"
                                                href="#details"
                                                onClick={(ev) => {
                                                    onBulkEmailHandle();
                                                }}
                                            >
                                                <Icon name="gift"></Icon>
                                                <span>Mass Commission</span>
                                            </DropdownItem>
                                        </li>
                                    </ul>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </li>
                    </ul>
                </Col>
            </Row>
        </>

    )
}
export default KycListBulkAction; 