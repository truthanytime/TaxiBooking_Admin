
import { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Icon } from "../../../components/Component";
import {
    Button,
    BlockBetween,
    TooltipComponent,
    UserAvatar,
    RSelect,
} from "../../../components/Component";
import { DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import ServerAPI from "../../../api";
import MyDataTable from "../../components/custom/MyDataTable";

const FutureJob = ({ history }) => {

    const [data, setData] = useState([]);
    const getDateFormat = (time) => {
        const date = new Date(Number(time));
        return date.toLocaleString();
    }

    const getEntryType = (itemType) => {
        return itemType === "4" && "Deposit" || "Withdrawal";
    }
    const columns = ["Date&Time", "Customer", "Pick Up", "Drop Off", "Driver", "F.I.A", "F.P.A", "..."] 
    const keys = ["clientId", "generatedTime", "amount", "net_amount", "currency", "entryType", "action"]
    const columnSize = ["", "lg", "", "lg", "md", "", ""]
    const [isLoading, setLoading] = useState(false);

    const convertDate = (dataItem) => {
        return ({
            ...dataItem,
            generatedTime: getDateFormat(dataItem.generatedTime),
            amount: dataItem.amount / 100,
            entryType: getEntryType(dataItem.entryType)
        })
    }
    useEffect(() => {
        const from = 0;
        const to = new Date().getTime();
        ServerAPI.get(`/api/admin/user/deposit-withdraw`, { params: { from, to } })
            .then(result => {
                console.log(result.data);
                const convertedData = result.data.map(dataItem => convertDate(dataItem));
                setData(prev => [...convertedData]);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])
    return (
        <>
            <Content>
                <Block>
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page>Future Jobs:</BlockTitle>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <MyDataTable
                        isLoading={isLoading}
                        data={data}
                        columns={columns}
                        keys={keys}
                        dataType={"deposit_withdraw"}
                        columnSize={columnSize}
                    />
                </Block>
            </Content>
        </>
    )


}
export default FutureJob;