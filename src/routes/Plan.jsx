import { PaymentCard } from "../main_files/Plans/Plan_Card"
import { Plan } from "../main_files/Plans/Paymentplans"

export function Plans() {
  return (
    <div className="AllPaymentCard">
      {Plan.map((plan, index) => (
        <PaymentCard key={index} prop={plan} />
      ))}
    </div>
  );
}