
import { useEffect, useState } from "react";

import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import MailingPanel from "./MailingAndNotification/Mailing";
import NotificationPanel from "./MailingAndNotification/Notification";
import { Button } from "reactstrap";
import { Icon } from "../../../components/Component";

const PageType = {
    NOTIFICATION: "Notification",
    EMAIL: "Email"
}

const MailAndNotifications = ({ user, history }) => {

    const [pageType, setPageType] = useState(PageType.EMAIL);
    return (
        <>
            <Block>
                <div className="p-3">
                    <Button className="mr-2" color="primary" onClick={()=>setPageType(PageType.EMAIL)}>
                        Mailing <Icon className="pl-1" name="mail"/>
                    </Button>
                    <Button color="primary" onClick={()=>setPageType(PageType.NOTIFICATION)}>
                        Notification <Icon className="pl-1" name="notify"/>
                    </Button>
                </div>
                {
                    pageType === PageType.EMAIL && 
                    <MailingPanel user={user}/> ||
                    <NotificationPanel user={user}/>
                }
            </Block>
        </>
    )
}
export default MailAndNotifications;