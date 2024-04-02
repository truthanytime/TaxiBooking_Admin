import { useEffect, useState } from "react";
import { Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Button} from "reactstrap"
import ServerAPI from "../../../../api";

const PasswordChangePanel = (props)=>{
    const [newPassword, setNewPassword]= useState(""); 
    const [error, setError] = useState(null); 
  
    const updatePassword= ()=>{
        ServerAPI.patch(`/api/admin/user/password/${props.user.accountUuid}`, {newPassword}).then(res=>{
            props.toggle(); 
        }).catch(e=>{

        })
    }
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader>
                    <h4>Update Password for {props.user.fullname}</h4>
                </ModalHeader>
                <ModalBody>
                    <Label>New Password:</Label>
                    <Input onChange={(e)=>setNewPassword(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.toggle}>Cancel</Button>
                    <Button onClick={updatePassword} color="primary">Update</Button>
                </ModalFooter>
            </Modal>

        </>
    )

}
export default PasswordChangePanel