import { useEffect, useState } from "react";
import requests from "../../services/requests";
import Swal from "sweetalert2";  

import { Banner, Container, Content } from "../../components/ProductCard";
import Logo from "../../assets/img/logo.png";
import Footer from "../../components/Footer";
import ProductBox from "../ProductBox";

export default function Section({ type }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function requestProducts() {
      try {
        const response = await requests.getProducts(type);
        setProducts(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro inesperado, tente novamente!'
        })
      }
    }

    requestProducts();
  }, [type]);

  const productsReader = products?.map((product) => {
    return (
      <ProductBox
        key={product._id}
        {...product}
      />
    );
  });

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
              {!products && "Não há produtos nesta seção"}
              {products && productsReader}
            </div>
          </main>
          <Footer>
            Copyright © Music Now 2022
          </Footer>
      </Content>
    </Container>
  );
}

