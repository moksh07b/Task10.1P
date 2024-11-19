import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {useState} from "react";
import {usePlan} from "../context/PlanContext";
import "./../css/Payments.css";

export function Payments(){
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {plan} = usePlan();
    var planTitle = null;
    var priceID = null;
    var planPrice = null;
    if(plan === "Standard"){
        planTitle = "Standard";
        priceID = "price_1QFtu6EJAsUd94etFY4581qg";
        planPrice = 10;
    }
    if(plan === "Premium"){
        planTitle = "Premium";
        priceID = "price_1QFt03EJAsUd94et75oZUp5x";
        planPrice = 20;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!stripe || !elements) {
            setError("Stripe is not loaded");
            setLoading(false);
            return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
    
        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    priceID: priceID,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                window.location.href = data.url;
                setSuccess(true);
            } else {
                setError(data.error || "Payment failed");
            }
        } catch (err) {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };
    


    return(
        <div className="payment-container">
            <div className="payment-card">
                <h2>Payment</h2>
                <div className="payment-details">
                    <h3>{planTitle} Plan</h3>
                    <p>Price: ${planPrice}</p>
                    <p>Duration: 1 month</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-element-container">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Payment successful</div>}
                    <button type="submit" disabled={loading || !stripe || success}>
                        {loading ? "Loading..." : "Pay"}
                    </button>
                </form>
            </div>
        </div>
    )
}