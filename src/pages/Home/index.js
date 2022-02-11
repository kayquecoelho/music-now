import { Fragment, useEffect, useState } from "react";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import { Container, Content, Banner } from "../../components/ProductCard";
import Footer from "../../components/Footer";
import ProductBox from "../ProductBox";
import Swal from 'sweetalert2';

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    handleProducts();
  }, [])

  if(!products){
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

  const productsReader = products?.map((product) => {
    return (
      <ProductBox
        key={product._id}
        {...product}
      />
    );
  });

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

            <div className="products">
              {!products && "Não há produtos nesta seção"}
              {products && productsReader}
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