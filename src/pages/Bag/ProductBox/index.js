import { Amount, Box, Counter, Info, Name } from "./style";

export default function ProductBox({ name, quantity, amount, image}) {
  return (
    <Box>
      <img src={image} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Amount>POR R$ {amount.toString().replace(".",",")}</Amount>
        <Counter>
          <button className="remove">-</button>
          <div className="display">{quantity}</div>
          <button className="add">+</button>
        </Counter>
      </Info>
    </Box>
  );
}