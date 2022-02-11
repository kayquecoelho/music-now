import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";

import ProductBox from "./ProductBox";
import { BackgroundScreen, BagTitle, ButtonBag, Cart, CheckoutButton, Products } from "./style";

export function BagComponent({ displayBag, setDisplayBag }){
  const { auth } = useAuth();
  const [products, setProducts] = useState(null);

  function closeBag() {
    setDisplayBag(false);
  }

  useEffect(() => {
    async function getCartrequest() {
      try {
        const response = await requests.getCart(auth.token);
        setProducts(response.data)
      } catch (error) {
        alert("Something went wrong! Try again later.")
      }
    }
    getCartrequest();

  }, [displayBag, auth?.token]);

  return (
    <BackgroundScreen onClick={closeBag} displayBag={displayBag}>
      <Cart displayBag={displayBag} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <ButtonBag onClick={closeBag}>X</ButtonBag>
          <BagTitle>Minha Sacola</BagTitle>
        </div>

        <Products>
          {!products && "Não há produtos"}
          {products?.map((product) => <ProductBox key={product.name} {...product} />)}
        </Products>
        
        <CheckoutButton to="/checkout" onClick={closeBag}>
          Finalizar Compra
        </CheckoutButton>
      </Cart> 
    </BackgroundScreen>
  );
}