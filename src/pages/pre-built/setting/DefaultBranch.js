import { useState, useEffect } from "react"
import ServerAPI from "../../../api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { RSelect } from "../../../components/Component";
import { Button } from "../../../components/Component";
const DefaultBranch = (branch) => {

    const [editMode, setEditMode] = useState(false);
    const [defaultBranch, setDefaultBranch] = useState(0);
    const [originBranch, setOriginBranch] = useState(0);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        getDefaultBranch();
        getBranches();
    }, []);

    const getDefaultBranch = () => {
        ServerAPI.get("/api/admin/default-branch")
            .then(result => {
                if (result.data.success === true) {
                    setDefaultBranch(prev=>({
                        value: result.data?.body?.branchUuid, 
                        label: result.data?.body?.name
                    }))
                } else {
                    toast.info("Server Error!");
                }
            })
            .catch(e => {
                console.log(e);
                Swal.fire("Please check your network connection!");
            })
    }
    const getBranches = () => {
        ServerAPI.get("/api/admin/branches")
            .then(result => {
                if (result.data.success === true) {
                    let _data = result.data.body.map(item => ({
                        value: item.branchUuid, label: item.name
                    }))
                    setBranches(_data);
                } else {
                    toast.info("Internal Server Error");
                }
            })
            .catch(e => {
                Swal.fire("Please check your network connection!");
            })

    }
    const onHandleConfirm = () => {
        ServerAPI.put("/api/admin/default-branch", { branchUuid: defaultBranch.value })
            .then(result => {
                if (result.data.success === true) {
                    setDefaultBranch({
                        value:result.data.body.branchUuid, 
                        label: result.data.body.name
                    })
                    toast.success("Successfully updated!");
                } else {
                    toast.info("Server Error!");
                }
                toggleEdit();
            })
            .catch(e => {
                console.log(e);
                Swal.fire("Please check your network connection!");
            })
    }
    const cancelUpdate = () => {
        setDefaultBranch(originBranch);
    }
    const toggleEdit = () => {
        setEditMode(prev => !prev);
    }
    const onBranchChangeHandle = (e) => {
        console.log(e);
        setDefaultBranch({...e});
    }
    return (
        <div className="input-group">
            <div className="p-1 col-md-3" >
                Default Branch
            </div>
            <div className="col-md-5">
                {
                    !editMode &&
                    <input type="text" className="form-control"
                        disabled={true}
                        value={defaultBranch.label}
                    /> ||
                    <RSelect
                        options={branches}
                        value={defaultBranch}
                        onChange={onBranchChangeHandle}
                    />
                }
            </div>
            <div className="col-md-4">
                <Button
                    onClick={toggleEdit}
                >
                    {
                        editMode && "Cancel" || "Edit"
                    }
                </Button>
                {
                    editMode &&
                    <Button
                        onClick={onHandleConfirm}
                    >
                        Update
                    </Button>
                }
            </div>
        </div>
    )

}
export default DefaultBranch;