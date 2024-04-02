import { useState } from "react";
import { useEffect } from "react"
import { useForm } from "react-hook-form";
import { Modal, ModalBody, Col, Row, Button, Input } from "reactstrap";
import { Icon, RSelect } from "../../../components/Component";
import ServerAPI from "../../../api";
import generatePassword from "./util";
import { toast } from "react-toastify";

const AdminDetail = (props) => {

    const { errors, register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({})
    useEffect(() => {
        if (props.item) {
            setFormData({ ...props.item, password: undefined });
        }
    }, [props.item])

    const resetForm = () => {
        props.resetItem();
        setFormData({
            name: "",
            email: "",
            role: "",
        });
    };
    const onRoleChange = (role) => {
        setFormData({ ...formData, role: role.value });
    };
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const on2FAReset = () => {
        ServerAPI.post(`/api/admin/reset-2fa`, { email: props.item.email }).then(res => {
            setFormData(prev => ({
                ...prev,
                secret: res.data.body.secret,
                enable2FA: true
            }))
        })
    }

    const onEditSubmit = () => {

        ServerAPI.post(`/api/admin/admin`, {adminInfo: formData, email:props.item.email})
            .then(res => {
                props.onFormCancel(); 
                toast.success("Updated a new admin successfully!")
            })
            .catch(err => {
                toast.error(err.response.data.message)
                props.onFormCancel(); 
            })
        // setData(newItems);
        resetForm();
        // setView({ edit: false, add: false });
    };
    const on2FAChange = (e) => {
        setFormData(prev => ({
            ...prev,
            enable2FA: e.target.checked
        }))
    }
    const resetPassword = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let _password = generatePassword(15);
        setFormData(prev => ({
            ...prev,
            password: _password
        }))
    }
    return (
        <>
            <Modal isOpen={props.isOpen} toggle={() => props.onFormCancel()} className="modal-dialog-centered" size="lg">
                <ModalBody>
                    <a href="#cancel" className="close">
                        {" "}
                        <Icon
                            name="cross-sm"
                            onClick={(ev) => {
                                ev.preventDefault();
                                props.onFormCancel();
                            }}
                        ></Icon>
                    </a>
                    <div className="p-2">
                        <h5 className="title">Update Admin</h5>
                        <div className="mt-4">
                            <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                                <Row className="g-3">
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="product-title">
                                                Name
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    onChange={(e) => onInputChange(e)}
                                                    ref={register({
                                                        required: "This field is required",
                                                    })}
                                                    defaultValue={formData.name}
                                                />
                                                {errors.title && <span className="invalid">{errors.title.message}</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="regular-price">
                                                Email
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    ref={register({ required: "This is required" })}
                                                    className="form-control"
                                                    defaultValue={formData.email}
                                                    onChange={(e) => onInputChange(e)}
                                                />
                                                {errors.email && <span className="invalid">{errors.email.message}</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="regular-price">
                                                Password
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    defaultValue={formData.password}
                                                    onChange={(e) => onInputChange(e)}

                                                />
                                                <Button color={"primary"} onClick={resetPassword} className={"mt-2"}>Reset</Button>
                                                {errors.password && <span className="invalid">{errors.password.message}</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="role">
                                                Role
                                            </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    options={props.roleOptions}
                                                    defaultValue={{ label: formData.role, value: formData.role }}
                                                    onChange={onRoleChange}
                                                //ref={register({ required: "This is required" })}
                                                />
                                                {errors.role && <span className="invalid">{errors.role.message}</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label mr-4" htmlFor="role">
                                                Two Factor Secret
                                            </label>

                                            <input type="checkbox" name="enable2FA" checked={formData.enable2FA} onChange={on2FAChange} />
                                            {
                                                formData.enable2FA &&
                                                <div className="form-control-wrap d-flex">
                                                    <Input type="text" value={formData.secret} disabled />
                                                    {errors.role && <span className="invalid">{errors.role.message}</span>}
                                                    <Button onClick={on2FAReset}>
                                                        Reset
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <Button color="primary" type="submit">
                                            <Icon className="plus"></Icon>
                                            <span>Update Admin</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

export default AdminDetail; 