import { useEffect, useState } from "react"
import { Icon } from "../../../../components/Component";
import CardBox from "./CardBox";


const TransactionInfo = (props) => {

    const [data, setData] =useState({
        categories: ["Withdrawals", "Deposits"], 
        values: []
    })
    useEffect(()=>{


    }, [props])
    return(
        <>
            <CardBox type="Transaction" className="bg-grad-2" size="6" data={data}/>
        </>
    )

}

export default TransactionInfo; 