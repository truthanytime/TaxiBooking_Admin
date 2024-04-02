
import { useDispatch, useSelector } from "react-redux";
import TwoFactorAuthForm from "../pages/auth/TFAVerification";
import { useEffect } from "react";


const TwoFactorWrapper = (props) => {

    const admin = useSelector(state => state.user.admin);
    useEffect(()=>{
        
    }, [] )
    return (
        <>
            {
                !admin?.verified_2fa &&  admin?.enable2FA &&  <TwoFactorAuthForm />
            }
            {
                props.children
            }
        </>
    )
}

export default TwoFactorWrapper; 