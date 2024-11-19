import { usePlan } from "../../context/PlanContext";
import "./../../css/Plans.css"
import { useNavigate } from "react-router-dom"
export function PaymentCard({prop}){

    const navigate = useNavigate();
    const {SetPlan} = usePlan();
    const handleClick = () => {
        SetPlan(prop.Title);
        navigate("/payment");
    }

    return(
        <div className="PaymentCard">
            <div>
                <h3>{prop.Title}</h3>
                { prop.State ? <p>${prop.Price} <span>/ month</span></p> : <p>Free</p>}
                <p> {prop.PriceDescription} </p>
            </div>

            <div>
                <ul>
                    {prop.ListItems.map((item, index)=>(
                        <li>{item}</li>
                    ))}
                </ul>
            </div>

            <button className="btn btn-full" onClick={handleClick}>Sign up now</button>
        </div>

    )

}