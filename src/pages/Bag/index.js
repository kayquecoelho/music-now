import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";
import Swal from 'sweetalert2';

import { BackgroundScreen, BagTitle, ButtonBag, Cart, CheckoutButton, Products } from "./style";
import Purchase from "./Purchase";

export function BagComponent({ displayBag, setDisplayBag }){
  const { auth } = useAuth();
  const navigate = useNavigate();
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
      } catch(error) {
        if(error.response.status === 401){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sua sessão expirou, faça login novamente!',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("auth");
              navigate("/");
              window.location.reload(true);
            }
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocorreu um erro inesperado, tente novamente!'
          })
        }
      }
    }
    if (auth) {
      getCartrequest();
    }
  }, [displayBag, auth, editQuantity, navigate]);

  console.log(products);
  console.log(localStorage.getItem("auth"));

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
              <Purchase 
                key={product.name} 
                {...product} 
                setEditQuantity={setEditQuantity}
                editQuantity={editQuantity}
              />
            )
          })}
        </Products>
        
        <div className="finish">
          
          {
            localStorage.getItem("auth") !== null && 
              products?.length !== 0 &&
                <Fragment>
                  <div className="subtotal"><span>SUBTOTAL: </span> {total.toString().replace(".", ",")}</div>
                  <CheckoutButton to="/checkout" onClick={closeBag}>
                    FINALIZAR COMPRA
                  </CheckoutButton>
                </Fragment>
          }
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