import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";

import ProductBox from "./ProductBox";
import { BackgroundScreen, BagTitle, ButtonBag, Cart, CheckoutButton, Products } from "./style";

export function BagComponent({ displayBag, setDisplayBag }){
  const { auth } = useAuth();
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const [editQuantity, setEditQuantity] = useState(false);

  function closeBag() {
    setDisplayBag(false);
  }

  useEffect(() => {
    async function getCartrequest() {
      try {
        const response = await requests.getCart(auth.token);
        const value = calculateTotal(response.data);
        setTotal(value);
        setProducts(response.data)
      } catch (error) {
        alert("Something went wrong! Try again later.")
      }
    }
    if (auth) {
      getCartrequest();
    }
  }, [displayBag, auth, editQuantity]);
  
  return (
    <BackgroundScreen onClick={closeBag} displayBag={displayBag}>
      <Cart displayBag={displayBag} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <ButtonBag onClick={closeBag}>X</ButtonBag>
          <BagTitle>Minha Sacola</BagTitle>
        </div>

        <Products>
          {!auth && "Você não está logado! Para começar a comprar, entre ou crie uma conta"}
          {products?.length === 0 && "Não há produtos"}
          {products?.map((product) => {
            return (
              <ProductBox 
                key={product.name} 
                {...product} 
                setEditQuantity={setEditQuantity}
                editQuantity={editQuantity}
              />
            )
          })}
        </Products>
        
        <div className="finish">
          <div className="subtotal"><span>SUBTOTAL: </span> {total.toString().replace(".", ",")}</div>
          <CheckoutButton to="/checkout" onClick={closeBag}>
            Finalizar Compra
          </CheckoutButton>
        </div>
      </Cart> 
    </BackgroundScreen>
  );
}

function calculateTotal(products) {
  let total = 0;

  for (let i = 0; i < products.length; i++){
    const element = products[i];
    total += element.amount * element.quantity
  }

  return total.toFixed(2);
}