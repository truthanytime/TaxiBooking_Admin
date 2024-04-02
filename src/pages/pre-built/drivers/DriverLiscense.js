
import { useEffect, useState } from "react";

import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import MailingPanel from "../user/MailingAndNotification/Mailing";
import NotificationPanel from "../user/MailingAndNotification/Notification";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Row } from "reactstrap";
import { Icon } from "../../../components/Component";
import ServerAPI from "../../../api";
import { genShortNameForUser, shallowEqual, validateEmail } from "../../../utils/Utils";
import ReactDatePicker from "react-datepicker";

const InputItem = ({ title, category, licenseInfo, updateDriverLiscens, size }) => {
    return (
        <>
            <Col md={size && "4" || "6"} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}</div>
                <Input value={licenseInfo[category]} onChange={(e) => updateDriverLiscens && updateDriverLiscens(e.target.value, category)} />
            </Col>
        </>
    )
}

const DriverLicense = ({ user, history }) => {

    const [licenseInfo, setlicenseInfo] = useState({});
    const [origin, setOriginlicenseInfo] = useState({})
    const [isUpdated, setIsUpdated] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isScrapping, setScrapping] = useState(false);

    useEffect(() => {
        if (user._id) {
            ServerAPI.get(`/api/admin/user/bank/${user.accountUuid}`).then(res => {
                setlicenseInfo(res.data.body);
                setOriginlicenseInfo(res.data.body);
            }).catch(e => {

            })
        }
    }, [user])

    useEffect(() => {
        if (shallowEqual(licenseInfo, origin) !== true) {
            setIsUpdated(true);
        } else {
            setIsUpdated(false);
        }
    }, [licenseInfo])
    const updateDriverLiscens = (v, item) => {
        setlicenseInfo(prev => ({
            ...prev,
            [item]: v
        }))
    }
    const onCancelHandle = () => {
        setlicenseInfo(prev => ({ ...origin }))
    }
    const onConfirmHandle = () => {
        setSubmitting(true);
        ServerAPI.patch(`/api/admin/user/bank/${user.accountUuid}`, { licenseInfo }).then(res => {
            setSubmitting(false);
        }).catch(e => {
            setSubmitting(false);
        })
    }
    const onScrapHandle = () => {
        
        setScrapping(true); 
        ServerAPI.post(`/api/admin/user/license/scrap/${user.accountUuid}`).then(res=>{
            setScrapping(false)
        }).catch(e=>{
            setScrapping(false)
        })

    }
    return (
        <>
            <Block className="mt-2">
                <Card>
                    <CardHeader>
                        <h4 className="py-2 mb-0">
                            License Details
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <Row className="justify-content-center">
                            <img
                                with="300px"
                                height="200px"
                                src={licenseInfo.image || `${process.env.PUBLIC_URL}/license.jpg`}
                            />
                            <Button disabled={isScrapping || !licenseInfo.image } className="d-flex py-1 h-50 align-self-end " color="primary" onClick={onScrapHandle}>
                                {
                                    !isScrapping && "Scrap Data" || "Scrapping" 
                                }
                                <Icon name="loading"/>
                            </Button>
                        </Row>
                        <h5 className="py-2 mb-0">
                            Personal Information
                        </h5>
                        <Row className="pt-0">
                            <InputItem title="Full Name" category="fullname" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Date of Birth" category="dob" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Gender" category="gender" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Address" category="address" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Eye Color" category="eyeColor" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Height" category="heigt" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                        </Row>
                        <h5 className="py-2 mb-0">
                            License Details
                        </h5>
                        <Row>
                            <InputItem title="License Number" category="licenseNumber" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <Col md="4" className="py-2">
                                <div className="data-label pb-1">Issue Date</div>
                                <ReactDatePicker
                                    selected={licenseInfo?.issueDate}
                                    className="form-control date-picker px-2"
                                    onChange={(v) => {
                                        setlicenseInfo(
                                            prev => ({
                                                ...prev,
                                                issueDate: v
                                            })
                                        )
                                    }}
                                />
                            </Col>
                            <Col md="4" className="py-2">
                                <div className="data-label pb-1">Expiration Date</div>
                                <ReactDatePicker
                                    selected={licenseInfo?.expDate}
                                    className="form-control px-2"
                                    onChange={(v) => {
                                        setlicenseInfo(
                                            prev => ({
                                                ...prev,
                                                expDate: v
                                            })
                                        )
                                    }}
                                />
                            </Col>
                            <InputItem title="Class/Type" category="class" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Endorsements" category="endorsements" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                            <InputItem title="Restrictions" category="restrictions" updateDriverLiscens={updateDriverLiscens} licenseInfo={licenseInfo} size={4} />
                        </Row>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-end">
                        <Button color="secondary" disabled={!isUpdated || isSubmitting} className="mr-1" onClick={onCancelHandle}>
                            Cancel
                        </Button>
                        <Button color="primary" disabled={!isUpdated || isSubmitting} onClick={onConfirmHandle}>
                            {
                                isSubmitting && "Updating" || "Update"
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </Block>
        
        </>
    )
}
export default DriverLicense;