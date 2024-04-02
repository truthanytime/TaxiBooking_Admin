import { Button, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../components/Component";



const TradingAccountAction = (props) => {

    const onDepositHandle = () => {
        if (props.offer.name !== "Exxo IB")
            props.history.push(`/wallet/deposit/${props.tradingAccountUuid}`);
    }
    const onWithdrawHandle = () => {
        props.history.push(`/wallet/withdrawal/${props.tradingAccountUuid}`);
    }


    return (
        <>
          
            <Row className= "d-flex d-lg-none">
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
                                                props.history.push(`${process.env.PUBLIC_URL}/wallet/${props.tradingAccountUuid}`);
                                            }}
                                        >
                                            <Icon name="focus"></Icon>
                                            <span>View Details</span>
                                        </DropdownItem>
                                    </li>
                                    <li onClick={() => updateStatus(item.accountUuid, kycStatus.APPROVED)}>
                                        <DropdownItem
                                            tag="a"
                                            href="#deposit"
                                            onClick={(ev) => {
                                                onDepositHandle();
                                            }}
                                        >
                                            <Icon name="sign-dollar"></Icon>
                                            <span>Deposit</span>
                                        </DropdownItem>
                                    </li>
                                    <li onClick={() => updateStatus(item.accountUuid, kycStatus.REJECTED)}>
                                        <DropdownItem
                                            tag="a"
                                            href="#withdraw"
                                            onClick={(ev) => {
                                                onWithdrawHandle()
                                            }}
                                        >
                                            <Icon name="na"></Icon>
                                            <span>Withdraw</span>
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
export default TradingAccountAction; 