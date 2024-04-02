


import { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Icon } from "../../../components/Component";
import { UserTabsState, UserTabsName } from "./constant";
import {
    Button,
    BlockBetween,
    TooltipComponent,
    UserAvatar,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    DataTableItem,
    PaginationComponent,
    RSelect,
} from "../../../components/Component";
import { DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import ServerAPI from "../../../api";
import { findUpper } from "../../../utils/Utils";
import MyDataTable from "../../components/custom/MyDataTable";

const PaymentGateways = ({ history }) => {

    const [data, setData] = useState([]);
    const columns = ["Name", "Method", "Currency", "Processing Fee[%]", "Deposit Fee", "Withdraw Fee", "Deposit Active", "Withdraw Active", "Action"] //, "Payment Gateway"]; 
    const keys = ["name", "method", "currency", "prcessing_fee", "desposit_fee", "withdraw_fee", "deposit_active", "withdraw_active"]
    const columnSize = ["", "", "lg", "lg", "lg", "lg", "lg", "lg", "lg", ""]

    const onCreatePaymentHandle = () => {
        history.push('/setting/create-gateway');
    }
    useEffect(() => {
        const from = 0;
        const to = new Date().getTime();
        ServerAPI.get(`/api/admin/peyment-gateway`)
            .then(result => {
                console.log(result.data);
                setData(result.data);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])
    return (
        <>
            <Head title="Payment Gateways" />
            <Content page="">
                <Block>
                    <BlockHead size="sm" className="d-flex justify-content-between">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page>Payment Gateways</BlockTitle>
                            </BlockHeadContent>
                        </BlockBetween>
                        <Button color="primary"
                            onClick={onCreatePaymentHandle}
                        >
                            Add Payment
                        </Button>
                    </BlockHead>
                    <MyDataTable data={data} columns={columns} keys={keys} dataType={"payment_gateway"} columnSize={columnSize} />
                </Block>
            </Content>

        </>
    )


}
export default PaymentGateways;