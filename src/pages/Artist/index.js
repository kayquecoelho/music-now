import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner, Container, Content, Description, DescriptionAmount, DescriptionName, Hyperlink, Image, ProductCard } from "../../components/ProductCard";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";

export default function Artist() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  console.log(products)

  useEffect(() => {
    async function requestProducts() {
      try {
        const response = await requests.getArtistProducts(id);
        setProducts(response.data);
      } catch (error) {
        console.log(error.response)
        alert(error.response.data);
      }
    }

    requestProducts();
  }, [id]);


  if (!products) {
    return <h1>NADA FOI ENCONTRADO</h1>
  }

  const productsReader = products.products.map((product) => {
    return (
      <Fragment key={product._id}>
        <ProductCard>
          <Image>
            <img alt={product.name} src={product.image} />
          </Image>

          <Description>
            <DescriptionName>{product.name}</DescriptionName>
            <DescriptionAmount>
              {`POR R$ ${product.amount.toString().replace(".",",")}`}
            </DescriptionAmount>
            <Hyperlink to={`/product/${product._id}`}>
              COMPRAR
            </Hyperlink>
          </Description>
        </ProductCard>
      </Fragment>
    );
  })

  return (
    <Container>
      <Content>
        <Banner>
            <img alt="logo.png" src={Logo} />
        </Banner>

        {productsReader}
      </Content>
    </Container>
  );
}