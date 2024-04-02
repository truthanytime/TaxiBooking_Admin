import { useState } from "react"
import ServerAPI from "../../api";
import { Button, Card, Input, Modal } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setUsers , setChecking} from "../../actions";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

const TFAVerification = ({ history }) => {

    const [password, sePassword] = useState("");
    const admin = useSelector(state => state.user.admin);
    const dispatch = useDispatch();
    const navigate = useHistory();
    const onPasswordChange = (e) => {
        sePassword(e.target.value);
    }
    const onDataSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        ServerAPI.post('/api/auth/verify-2fa', { token_2fa: password }).then(res => {
            if (res.data.success === true) {
                dispatch(setAdmin({
                    ...admin,
                    verified_2fa: true
                }))
                dispatch(setChecking(false)); 
                localStorage.setItem("accessToken", res.data.body);
            } else {
                toast.info("One time password is invalid for " + admin.email);
            }
        }).catch(e => {

        })
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        dispatch(setAdmin(null));
        dispatch(setUsers(null));
        navigate.push('/auth-login');
    }
    return (
        <>
            <div >
                <Modal isOpen={true} className="tfa-modal">
                    <Card className="p-4">
                        <form onSubmit={onDataSubmit}>
                            <h3>
                                Two Factor authentication
                            </h3>
                            <p> 
                                Please check your email and  type your 6-digit code from authentication app to confirm login
                            </p>
                            <h5>
                                One-time password
                            </h5>
                            <div>
                                <Input type="text" value={password} onChange={onPasswordChange} required />
                            </div>
                            <div className="mt-3 d-flex flex-row-reverse">
                                <Button type="submit" className="mx-2" onClick={logout}>
                                    Log out
                                </Button >
                                <Button color="primary" onClick={onDataSubmit}>
                                    Verify
                                </Button>
                            </div>
                        </form>
                    </Card>
                </Modal>
            </div>
        </>
    )
}

export default TFAVerification; 