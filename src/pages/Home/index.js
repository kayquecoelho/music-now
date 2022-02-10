import { Fragment, useEffect, useState } from "react";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import { 
  Container,
  Content,
  Banner,
  ProductCard, 
  Image, 
  Description, 
  DescriptionName, 
  DescriptionAmount,
  Hyperlink
} from "../../components/ProductCard";
import Footer from "../../components/Footer";
import Swal from 'sweetalert2';

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    handleProducts();
  }, [])

  if(products === null){
    return "";
  }

  async function handleProducts() {
    try {
      const response = await requests.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro inesperado, tente novamente!'
      })
    }
  }

  const productsReader = products.map((product) => {
    return(
      <Fragment key={product._id}>
        <ProductCard>
          <Image>
            <img alt={product.name} src={product.image} />
          </Image>

          <Description>
            <DescriptionName>{product.name}</DescriptionName>
            <DescriptionAmount>
              {`POR R$ ${product.amount.toString().replace(".",",")}0`}
            </DescriptionAmount>
            <Hyperlink to={`/product/${product._id}`}>
              COMPRAR
            </Hyperlink>
          </Description>
        </ProductCard>
      </Fragment>
    );
  })

  return(
    <Fragment>
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

            <div>
              {productsReader}
            </div>
          </main>

          <Footer>
            Copyright © Music Now 2022
          </Footer>
        </Content>
      </Container>
    </Fragment>
  );
}