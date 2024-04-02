import { Col, Input } from "reactstrap";

const UserInput = ({ title, category, user, updateUserInfo, size, required , type}) => {
    return (
        <>
            <Col md={size && "4" || "6"} xxl={size && "3" || "4"} className="py-2">
                <div className=" pb-1">{title}{required && "*" || ""}</div>
                <Input value={user[category]} onChange={(e) => updateUserInfo && updateUserInfo(e.target.value, category)} required={required}
                    type={type}
                />
            </Col>
        </>
    )
}
export default UserInput; 