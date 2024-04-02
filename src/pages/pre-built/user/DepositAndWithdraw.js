
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
    RSelect,
} from "../../../components/Component";
import { DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import ServerAPI from "../../../api";
import { findUpper, setDeadlineDays } from "../../../utils/Utils";
import MyDataTable from "../../components/custom/MyDataTable";


const DepositAndWithdraw = ({ user, history }) => {

   
    const [data, setData] = useState([]);

    const getDateFormat = (time) =>{
        const date= new Date(Number(time)); 
        return date.toLocaleString();

    }
    const getEntryType = (itemType)=>{
        return itemType === "4" && "Deposit" || "Withdrawal"; 
    }
    const columns = [ "ClientID","Created at", "Amount", "Net amount", "Currency", "Status", "Action"] //, "Payment Gateway"]; 
    const keys = [ "clientId","generatedTime", "amount", "net_amount", "currency", "entryType", "action"]
    const columnSize = ["", "lg", "", "lg", "md", "", ""]
    const [isLoading, setLoading] = useState(true);


    const convertDate = (dataItem) =>{
        return ({
            ...dataItem, 
            generatedTime: getDateFormat(dataItem.generatedTime), 
            amount: dataItem.amount/100,
            entryType: getEntryType(dataItem.entryType)
        })
    }
    useEffect(() => {
        if (user._id) {
            const from = 0; 
            const to = new Date().getTime();
            ServerAPI.get(`/api/admin/user/deposit-withdraw/${user.accountUuid}`, {params: {from, to}})
                .then(result => {
                    console.log(result.data);
                    const convertedData = result.data.map(dataItem=> convertDate(dataItem));
                    setData(prev=> [...convertedData]);
                    setLoading(false);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [user._id])
    return (
        <>
            {
                <Block>
                   <MyDataTable  
                        isLoading = {isLoading}  
                        data={data} 
                        columns={columns} 
                        keys={keys} 
                        dataType={"deposit_withdraw"} 
                        columnSize={columnSize}
                    />
                </Block>
            }
        </>
    )


}
export default DepositAndWithdraw;