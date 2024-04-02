
import { useEffect, useState } from "react";

import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import MailingPanel from "../user/MailingAndNotification/Mailing";
import NotificationPanel from "../user/MailingAndNotification/Notification";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Row } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { genShortNameForUser, validateEmail } from "../../../utils/Utils";

const InputItem = ({ title, category, bankInfo, updateBankInfo, size }) => {
    return (
        <>
            <Col md={size && "4" || "6"} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}</div>
                <Input value={bankInfo[category]} onChange={(e) => updateBankInfo && updateBankInfo(e.target.value, category)} />
            </Col>
        </>
    )
}
const BankInfo = ({ user, history }) => {

    const [bankInfo, setBankInfo] = useState({}); 
    const [origin, setOriginBankInfo] = useState({})
    useEffect(() => {
        if (user._id) {
            ServerAPI.get(`/api/admin/user/bank/${user.accountUuid}`).then(res => {
                setBankInfo(res.data.body); 
            }).catch(e => {

            })
        }
    }, [user])
    const updateBankInfo = (v, item) =>{
        setBankInfo(prev=>( {
            ...prev, 
            [item]: v
        }))
    }
    const onCancelHandle = () =>{
        setBankInfo(prev=>({...origin}))
    }
    const onConfirmHandle = () =>{
        ServerAPI.patch(`/api/admin/user/bank/${user.accountUuid}`, {bankInfo}).then(res=>{

        }).catch(e=>{

        })
    }
    return (
        <>
            <Block className="mt-2">
                <Card>
                    <CardHeader>
                        <h4 className="py-2 mb-0">
                            Bank Details
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <Row className="pt-0">
                            <InputItem title="Bank Name" category="bankName" updateBankInfo={updateBankInfo} bankInfo={bankInfo} size={4} />
                            <InputItem title="Bank Address" category="bankAddress" updateBankInfo={updateBankInfo} bankInfo={bankInfo} size={4} />
                            <InputItem title="Bank Swift Code" category="bankSwfitCode" updateBankInfo={updateBankInfo} bankInfo={bankInfo} size={4} />
                            <InputItem title="Bank Account" category="bankAccount" updateBankInfo={updateBankInfo} bankInfo={bankInfo} size={4} />
                            <InputItem title="Account Name" category="bankAccontName" updateBankInfo={updateBankInfo} bankInfo={bankInfo} size={4} />
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button color="secondary" className="mr-1" onClick={onCancelHandle}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={onConfirmHandle}>
                            Confirm
                        </Button>
                    </CardFooter>
                </Card>
            </Block>
        </>
    )
}
export default BankInfo;