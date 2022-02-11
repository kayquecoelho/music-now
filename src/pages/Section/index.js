import { Fragment, useEffect, useState } from "react";
import { Banner, Container, Content, Description, DescriptionAmount, DescriptionName, Hyperlink, Image, ProductCard } from "../../components/ProductCard";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import Footer from "../../components/Footer";
import Swal from 'sweetalert2';

export default function Section(props) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    requestProducts();
  }, []);

  async function requestProducts() {
    try {
      const response = await requests.getProducts(props.type);
      setProducts(response.data);
    } catch (error) {
      console.log(error.response)
      alert(error.response.data);
    }
  }

  const productsReader = products?.map((product) => {
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
          <main>
            <div>
              <h2>Produtos</h2>
              <section />
            </div>

            <div className="products">
              {productsReader}
            </div>
          </main>
          <Footer>
            Copyright © Music Now 2022
          </Footer>
      </Content>
    </Container>
  );
}