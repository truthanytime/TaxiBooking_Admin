
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

const Bookings = ({ history }) => {

    const [data, setData] = useState([]);
    const getDateFormat = (time) => {
        const date = new Date(Number(time));
        return date.toLocaleString();
    }

    const getEntryType = (itemType) => {
        return itemType === "4" && "Deposit" || "Withdrawal";
    }
    const columns = ["Date&Time", "Pickup Location", "Dest Location", "Customer Type",  "Travel Mode", "Action"] //, "Payment Gateway"]; 
    const keys = ["startAt", "pickupLocation", "destLocation", "customerUuid",  "bookType", "action"]
    const columnSize = ["", "lg", "", "lg", "md", "", ""]
    const [isLoading, setLoading] = useState(false);

    const convertDate = (dataItem) => {
        return ({
            ...dataItem,
            action: ""
        })
    }
    useEffect(() => {
        const from = 0;
        const to = new Date().getTime();
        ServerAPI.get(`/api/admin/bookings`)
            .then(result => {
                const convertedData = result.data.body.map(dataItem => convertDate(dataItem));
                setData(prev => [...convertedData]);
                setLoading(false);
                console.log(convertedData)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])
    return (
        <>
            <Head title="Bookings" />
            <Content>
                <Block>
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page>Bookings</BlockTitle>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <MyDataTable
                        isLoading={isLoading}
                        data={data}
                        columns={columns}
                        keys={keys}
                        dataType={"booking"}
                        columnSize={columnSize}
                    />
                </Block>
            </Content>
        </>
    )


}
export default Bookings;