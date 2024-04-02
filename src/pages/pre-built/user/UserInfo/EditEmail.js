import { useEffect , useState} from "react";
import { Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Button } from "reactstrap"
import { validateEmail } from "../../../../utils/Utils";
import ServerAPI from "../../../../api";

const EditEmailPanel = (props)=>{
    const [newEmail, setNewEmail]= useState(""); 
    const [error, setError] = useState(null); 
    useEffect(()=>{

        if(!validateEmail(newEmail)){
            setError("This is not valid email"); 
        }else{
            setError("");
        }

    }, [newEmail])
    const updateEmail= ()=>{
        ServerAPI.patch(`/api/admin/user/email/${props.user.accountUuid}`, {newEmail}).then(res=>{
            props.toggle(); 
        }).catch(e=>{

        })
    }
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader>
                    <h4>Edit Email for {props.user.fullname}</h4>
                </ModalHeader>
                <ModalBody>

                    <Label className="mb-1">Old Email:</Label>
                    <Input value={props.user.email} className="mb-2"/>
                    
                    <Label className="mb-1">New Email:</Label>
                    <Input onChange={(e)=>setNewEmail(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.toggle}>Cancel</Button>
                    <Button onClick={updateEmail} disabled={!newEmail || error} color="primary">Update</Button>
                </ModalFooter>
            </Modal>

        </>
    )

}
export default EditEmailPanel