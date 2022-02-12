import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Amount, Box, Counter, Info, Name } from "./style";

export default function ProductBox({ name, quantity, amount, image, _id, editQuantity, setEditQuantity }) {
  const {auth} = useAuth();

  function increaseQuantity(){
    if (quantity === 10){
      return;
    }
    const newquantity = quantity + 1;
    const promise = axios.put(`http://localhost:5000/cart/${_id}`, {quantity: newquantity}, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    
    promise.then(() => setEditQuantity(!editQuantity));
  }

  function decreaseQuantity(){
    if (quantity === 1){
      return;
    }

    const newquantity = quantity - 1;
    const promise = axios.put(`http://localhost:5000/cart/${_id}`, {quantity: newquantity}, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    
    promise.then(() => setEditQuantity(!editQuantity));
  }
  
  return (
    <Box>
      <img src={image} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Amount>POR R$ {amount.toString().replace(".",",")}</Amount>
        <Counter>
          <button className="remove" onClick={decreaseQuantity}>-</button>
          <div className="display">{quantity}</div>
          <button className="add" onClick={increaseQuantity}>+</button>
        </Counter>
      </Info>
    </Box>
  );
}