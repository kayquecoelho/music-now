import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner, Container, Content } from "../../components/ProductCard";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import Footer from "../../components/Footer";
import ProductBox from "../ProductBox";

export default function Artist() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

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


  const productsReader = products?.products.map((product) => {
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