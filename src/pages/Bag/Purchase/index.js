import useAuth from "../../../hooks/useAuth";
import requests from "../../../services/requests";
import Swal from 'sweetalert2';

import { Amount, Box, Counter, Info, Name } from "./style";

export default function Purchase({ name, quantity, amount, image, _id, editQuantity, setEditQuantity }) {
  const {auth} = useAuth();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  
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
      setEditQuantity(!editQuantity);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível editar a quantidade dos produtos. Tente novamente"
      })
    }
  }

  async function deleteProductRequest() {
    try {
      await requests.deleteProduct(auth.token, _id);
      setEditQuantity(!editQuantity);
      Toast.fire({
        icon: 'success',
        title: 'Produto deletado com sucesso!'
      })
    } catch {
      Toast.fire({
        icon: 'error',
        title: 'O produto não foi deletado!',
        text: "Tente novamente mais tarde!"
      })
    }
  }
  return (
    <Box>
      <img src={image} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Amount>POR R$ {amount.toString().replace(".",",")}</Amount>
        <Counter>
          <button className="remove" onClick={() => changeQuantity("decrease")}>-</button>
          <div className="display">{quantity}</div>
          <button className="add" onClick={() => changeQuantity("increase")}>+</button>
        </Counter>
      </Info>

      <button className="deleteProduct" onClick={deleteProductRequest} >
          <ion-icon name="trash-outline" />
      </button>
    </Box>
  );
}