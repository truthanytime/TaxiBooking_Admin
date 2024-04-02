import { useEffect, useState } from "react"
import { Icon } from "../../../../components/Component";


const CardBox = (props) => {

    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const formatNumber = (amount)=>{

        if(amount>1000000){
            return Math.floor(amount/100000)/10 + "M"
        }else if (amount>1000){
            return Math.floor(amount/10)/100 + "K"
        }else if(amount>10){
            return Math.floor(amount*10)/10
        }else{
            return amount; 
        }
    }
    useEffect(() => {
        setType(prev => props.type);
        setAmount(prev => props.amount);
    }, [props])
    return (
        <>
            <div className={`${props.className} text-white rounded-lg mb-4 overflow-hidden`}>
                <div class="px-3 pt-3">
                    <div class="opacity-50">
                        <span class="fs-12 d-block">Total</span>
                        {props.type}
                    </div>
                    <div class="h3 fw-700 mb-3">{formatNumber(props.amount)}</div>
                </div>
                <div className="card-icon-img">
                    <Icon name={props.icon}/>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(255,255,255,0.3)" fill-opacity="1" d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                </svg>
            </div>
        </>
    )

}

export default CardBox; 