import { Fragment, useEffect, useState } from "react";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import Bag from "../../assets/icons/bag.png";
import Profile from "../../assets/icons/profile.png";
import Bars from "../../assets/icons/bars.png";
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
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Swal from 'sweetalert2';

export default function Home() {
  const [products, setProducts] = useState(null);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    async function handleProducts() {
      try {
        const response = await requests.getProducts();
        setProducts(response.data);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          text: 'Ocorreu um erro inesperado, tente novamente mais tarde!'
        })
      }
    }

    handleProducts();
  }, [Toast])

  if(products === null){
    return "";
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
          <Header>
            <img alt="logo.png" src={Logo}/>

            <div>
              <img alt="logo.png" src={Bag}/>
              <img alt="logo.png" src={Profile}/>
              <img alt="logo.png" src={Bars}/>
            </div>
          </Header>

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