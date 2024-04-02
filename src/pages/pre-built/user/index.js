import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Icon } from "../../../components/Component";
import { DriverTabKeys, DriverTabState, DriverTabName, UserRole, CustomerTabsState, CustomerTabsName } from "./constant";

import classnames from "classnames";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, Card, CardBody, Container } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo, BlockBetween, BlockContent } from "../../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import { useEffect } from "react";
import ServerAPI from "../../../api";

import { toast } from "react-toastify";
import MailAndNotifications from "./MailAndNotifiactions";

import "./index.scss";
import EditCustomerProfile from "../customers/EditCustomerProfile";
import EditDriverProfile from "../drivers/EditDriverProfile";
import BankInfo from "../drivers/BankInfo";
import DriverLiscense from "../drivers/DriverLiscense";
import { genShortNameForUser } from "../../../utils/Utils";
const UserInfoPage = ({ match, history }) => {
    const [activeTab, setActiveTab] = useState(DriverTabState.TAB_PROFILE);
    const [activeUser, setUser] = useState({});
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
        const id = match.params.id;
        ServerAPI.get(`/api/admin/user/profile/${id}`)
            .then(res => {
                if (res.data.success === true) {
                    let _user = res.data.body;
                    if (_user.role === UserRole.CUSTOMER) {
                        ServerAPI.get(`/api/admin/customer/profile/${_user.customerUuid}`).then(ress => {
                            setUser(ress.data.body)
                        }).catch(e => {
                            setUser(_user);
                        })
                    } else if (_user.role === UserRole.DRIVER) {
                        ServerAPI.get(`/api/admin/driver/profile/${_user.driverUuid}`).then(ress => {
                            setUser(ress.data.body);
                            console.log(ress.data.body);
                        }).catch(e => {
                            setUser(_user);
                        })
                    }
                } else {
                    toast.info("User not exist");
                }
            })
    }, [match.params.id]);

    return (
        <React.Fragment>
            <Head title="User Information" ></Head>
            <Content page="component" >
                <Block >
                    <Card className="card-stretch sticky-60 ">
                        <CardBody className="pt-4 border-bottom">
                            <Container>
                                <Row>
                                    <Col>
                                        <span className="px-2 text-dark h4">{genShortNameForUser(activeUser.firstName, activeUser.lastName)}</span>
                                    </Col>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                    <PreviewCard className="card-stretch overflow-uto mt-1">
                        <Nav tabs className="mt-n3 userinfo-tabs ">
                            {
                                activeUser?.role === UserRole.CUSTOMER &&
                                Object.keys(CustomerTabsState).map(key => {
                                    return (
                                        <NavItem>
                                            <NavLink
                                                tag="a"
                                                href="#tab"
                                                className={classnames({ active: activeTab === CustomerTabsState[key] })}
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle(CustomerTabsState[key]);
                                                }}
                                            >
                                                {CustomerTabsName[key]}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })
                                ||
                                Object.keys(DriverTabState).map(key => {
                                    return (
                                        <NavItem>
                                            <NavLink
                                                tag="a"
                                                href="#tab"
                                                className={classnames({ active: activeTab === DriverTabState[key] })}
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle(DriverTabState[key]);
                                                }}
                                            >
                                                {DriverTabName[key]}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })
                            }
                        </Nav>
                        <TabContent activeTab={activeTab} className="my-0">
                            {
                                activeUser?.role === UserRole.CUSTOMER &&
                                <>
                                    <TabPane tabId={CustomerTabsState.TAB_PROFILE}>
                                        <EditCustomerProfile user={activeUser} />
                                    </TabPane>
                                    <TabPane tabId={CustomerTabsState.TAB_BANK}>
                                        <BankInfo user={activeUser} />
                                    </TabPane>

                                    <TabPane tabId={CustomerTabsState.TAB_PAST_JOB}>
                                    </TabPane>
                                    <TabPane tabId={CustomerTabsState.TAB_MAIL_NOTIFICATION}>
                                        <MailAndNotifications user={activeUser} />
                                    </TabPane>
                                </> 
                                ||
                                <>
                                    <TabPane tabId={DriverTabState.TAB_PROFILE}>
                                        <EditDriverProfile user={activeUser} />
                                    </TabPane>
                                    <TabPane tabId={DriverTabState.TAB_CUR_JOB}>

                                    </TabPane>
                                    <TabPane tabId={DriverTabState.TAB_BANK}>
                                        <BankInfo user={activeUser} />
                                    </TabPane>
                                    <TabPane tabId={DriverTabState.TAB_PAST_JOB}>
                                    </TabPane>
                                    <TabPane tabId={DriverTabState.TAB_KYC}>
                                        <DriverLiscense user={activeUser}/>
                                    </TabPane>
                                    <TabPane tabId={DriverTabState.TAB_MAIL_NOTIFICATION}>
                                        <MailAndNotifications user={activeUser} />
                                    </TabPane>
                                </>
                            }
                        </TabContent>
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default UserInfoPage;
