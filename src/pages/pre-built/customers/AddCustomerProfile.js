import { useEffect, useState } from "react";
import ServerAPI from "../../../api";
import {
    Modal,
    ModalHeader,
    ModalBody,
    TabPane,
    TabContent,
    Nav,
    NavItem,
    NavLink,
    Label,
    Card,
    Button,
    Input,
    CardBody,
    CardHeader,
    CardFooter,
    Form
} from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import { Block, Icon } from "../../../components/Component";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { UserRole } from "../user/constant";
import { validateEmail } from "../../../utils/Utils";
import UserInput from "../common/UserInput";

const StaticInputItem = ({ title, value, size }) => {
    return (
        <>
            <Col md={size && 4 || 6} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}</div>
                <Input value={value} disabled />
            </Col>
        </>
    )
}
const SelectItem = ({ title, category, user, categories }) => {
    return (
        <>
            <Col >
                <div className="data-label">{title}</div>
                <div className="data-value">{user[category]}</div>
            </Col>
        </>
    )
}

const AddCustomerProfile = ({ history }) => {
    const [userInfo, setUserInfo] = useState({
        role: UserRole.CUSTOMER
    });

    const setUserData = (value, item) => {
        setUserInfo(prev => {
            return {
                ...prev,
                [item]: value
            }
        })
    }
    const saveUserInfo = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        if (userInfo.email && validateEmail(userInfo.email)) {
            ServerAPI.post('/api/admin/user/email/duplicate', { email: userInfo.email }).then(res => {
                ServerAPI.post(`/api/admin/customer/profile`, { ...userInfo }).then(res => {
                    if (res.data.success === true) {
                        Swal.fire("Customer's profile was successfully created.")
                    } else {
                        Swal.fire("Failed to create Customer's profile.")
                    }
                }).catch(e => {
                    Swal.fire("Failed to create Customer's profile.")
                })
            }).catch(err => {
                Swal.fire("Email already exist.")
            })
        }
    }
    return (
        <>
            <Head title="Add Driver" />
            <Content>
                <Block>
                    <Form  onSubmit={saveUserInfo}>
                        <Row >
                            <Col lg="12">
                                <Card>
                                    <CardHeader>
                                        <h4 className="py-2 mt-3 mb-0"> Customer Details</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <h4 className="py-2 mt-3 mb-0"> Account Information</h4>
                                        <Row className="">
                                            <Col lg="12">
                                                <Row>
                                                    <UserInput title={"Email"} category="email" user={userInfo} updateUserInfo={setUserData} size={4} required={true} type={"email"} />
                                                    <UserInput title={"First Name"} category="firstName" user={userInfo} updateUserInfo={setUserData} size={4} required={true} />
                                                    <UserInput title={"Last Name"} category="lastName" user={userInfo} updateUserInfo={setUserData} size={4} required={true} />
                                                    <UserInput title={"Phone Number"} category="phone" user={userInfo} updateUserInfo={setUserData} size={4} />
                                                    <StaticInputItem title={"Account Type"} value={userInfo.role} size={4} />
                                                    <Col className="py-2">
                                                        <div className="data-label pb-1">Date of Birth</div>
                                                        <DatePicker
                                                            selected={new Date(userInfo.birthday).getTime()}
                                                            className="form-control date-picker px-2"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <h4 className="py-2 mb-0">
                                            Address Information
                                        </h4>
                                        <Row className="pt-0">
                                            <UserInput title="Country of Residence" category="country" updateUserInfo={setUserData} user={userInfo} size={4} />
                                            <UserInput title="State" category="state" updateUserInfo={setUserData} user={userInfo} size={4} />
                                            <UserInput title="Full Address" category="address" updateUserInfo={setUserData} user={userInfo} size={4} />
                                        </Row>
                                    </CardBody>
                                    <CardFooter>
                                        <Row className="my-3">
                                            <Col>
                                                <Button color="secondary" className="mr-1 w-100 center mb-1" >Cancel</Button>
                                            </Col>
                                            <Col>
                                                <Button type="submit" color="primary" className="mr-1 w-100 center">Save</Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Block>
            </Content>
        </>
    )
}
export default AddCustomerProfile;