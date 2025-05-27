import { useSelector } from "react-redux";
import { useShoppingPaymentQuery } from "../../../store/api/api";

export const UserOrders = () => {
    const user = useSelector((state: any) => state.Auth.user);

    const {data} = useShoppingPaymentQuery({email: user.email})

    console.log(data)
    return (
        <>
            Pedidos
        </>
    )
}