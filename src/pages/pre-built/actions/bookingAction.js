import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { WithdrawStatus, ibState } from "../../Constant";
const BookingListActions = ({ item, viewDetails, createJob, rejectRequest }) => {

    const onViewDetail = () => {
        viewDetails(item)
    }
    const onCreateJob = () => {
        createJob(item.Uuid);
        ServerAPI.post(`/api/admin/job/${item.uuid}`).then(res=>{

        }).catch(e=>{
            
        })

    }
    const onRejectBook = () => {
        rejectRequest(item._id);
    }
    return (
        <>

            <Row className="d-flex ">
                {
                    item.status !== "DONE" &&
                    <ul className="nk-tb-actions gx-1">
                        <li>
                            <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                    <Icon name="more-h"></Icon>
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
                                        {
                                            item.status !== WithdrawStatus.APPROVED &&
                                            <li onClick={() => onCreateJob()}>
                                                <DropdownItem
                                                    tag="a"
                                                    href="#approve"
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                    }}
                                                >
                                                    <Icon name="check-thick"></Icon>
                                                    <span>Create Job</span>
                                                </DropdownItem>
                                            </li>
                                        }
                                        {
                                            (item.status === WithdrawStatus.NEW  || item.status === WithdrawStatus.PENDING) &&
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
                                        }
                                    </ul>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </li>
                    </ul>
                }
            </Row>
        </>

    )
}
export default BookingListActions; 