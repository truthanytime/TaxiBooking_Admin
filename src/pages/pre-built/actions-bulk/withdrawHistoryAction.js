import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { WithdrawStatus, ibState } from "../../Constant";
const WithdrawHistoryBulkAction = (props) => {

    const onViewDetail = () => {
        // viewDetails(item)
    }
    const onApproveClick = () => {

    }
    const onRejectClick = () => {

    }
    return (
        <>

            <Row className="d-flex ">
                <ul className="nk-tb-actions gx-1">
                    <li>
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon py-0">
                                <Button color="primary" className="py-1" disabled={!props.selectedItems.length}>Bulk Operation</Button>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onViewDetail()}>
                                        <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="focus"></Icon>
                                            <span>View Detail</span>
                                        </DropdownItem>
                                    </li>
                                    <li onClick={() => onApproveClick()}>
                                        <DropdownItem
                                            tag="a"
                                            href="#approve"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="check-thick"></Icon>
                                            <span>Approve</span>
                                        </DropdownItem>
                                    </li>
                                    <li onClick={() => onRejectClick()}>
                                        <DropdownItem
                                            tag="a"
                                            href="#reject"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="na"></Icon>
                                            <span>Reject</span>
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
export default WithdrawHistoryBulkAction; 