import ProductListedCounter from "./ProductListerdCounter";
import requests from "../../services/requests";
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";

export default function ProductListedFooter({ productListedCart, setIsEdited, isEdited }) {
  const { quantity, amount, _id } = productListedCart;
  const { auth } = useAuth();

  async function changeQuantity(type) {
    let newquantity;

    if (quantity > 10 || quantity < 1) return;

    if (type === "decrease") {
      newquantity = quantity - 1;
    }

    if (type === "increase"){
      newquantity = quantity + 1
    }

    try {
      await requests.editQuantity(auth.token, _id, {quantity: newquantity});
      setIsEdited(!isEdited);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível editar a quantidade dos produtos. Tente novamente"
      })
    }
  }

  return(
    <ProductListedCounter>
      <div className="footer-controls">
        <button onClick={() => changeQuantity("decrease")}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity("increase")}>+</button>
      </div>

      <span>
        {`Total: R$ ${(quantity * amount).toFixed(2).toString().replace(".",",")}`}
      </span>
    </ProductListedCounter>
  );
}