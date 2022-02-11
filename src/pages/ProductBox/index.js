import { Description, DescriptionAmount, DescriptionName, Hyperlink, Image, ProductCard } from "../../components/ProductCard"; 
 
export default function ProductBox({_id, image, name, amount}) {
  return (
    <ProductCard>
      <Image>
        <img alt={name} src={image} />
      </Image>

      <Description>
        <DescriptionName>{name}</DescriptionName>
        <DescriptionAmount>
          {`POR R$ ${amount.toString().replace(".",",")}`}
        </DescriptionAmount>
        <Hyperlink to={`/product/${_id}`}>
          COMPRAR
        </Hyperlink>
      </Description>
    </ProductCard>
  );
}