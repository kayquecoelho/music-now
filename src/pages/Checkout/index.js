import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";
import Swal from 'sweetalert2';
import { 
  Container, 
  Content, 
  ContinueButton, 
  FinishButton, 
  ProductListed,
  ProductListedContainer,
  ProductImg,
  ProductDescription } from "../../components/Checkout";
import ProductListedFooter from "../../components/Checkout/ProductListedFooter";

export default function Checkout() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  useEffect(() => {
    async function getCart() {
      try {
        const response = await requests.getCart(auth.token);
        setCart(response.data);
      } catch {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro inesperado, tente novamente!'
        })
      }
    }

    if(auth){
      getCart();
    }
  }, [auth, isDeleted, isEdited]);

  if(cart === null){
    return "";
  }

  async function handleDeletePurchase(id) {
    try {
      await requests.deleteProduct(auth.token, id);
      setIsDeleted(!isDeleted);
      Toast.fire({
        icon: 'success',
        title: 'Produto deletado com sucesso!'
      })
    } catch {
      Toast.fire({
        icon: 'error',
        title: 'O produto não foi deletado!',
        text: "Tente novamente mais tarde!"
      })
    }
  }

  async function handleFinishPurchase() {
    try {
      await requests.postCheckout(auth.token, cart );
      Toast.fire({
        icon: 'success',
        title: 'Compra finalizada com sucesso!'
      })
      
      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Não foi possível finalizar a compra, tente novamente mais tarde!'
      })
    }
  }

  const cartReader = cart.map((productListedCart) => {
    return(
      <Fragment key={productListedCart._id}>        
        <ProductListed>
          <ProductImg>
            <img 
              alt={productListedCart.name} 
              src={productListedCart.image}
            />
          </ProductImg>

          <ProductDescription>
            <span onClick={() => handleDeletePurchase(productListedCart._id)} className="delete-purchase">X</span>

            <div>
              <p>{productListedCart.name}</p>
              <br />
              <p>
                {`Unitário: R$ ${productListedCart.amount.toString().replace(".",",")}`}
              </p>
            </div>

            <ProductListedFooter 
              isEdited={isEdited}
              setIsEdited={setIsEdited}
              productListedCart={productListedCart} 
              auth={auth}
            />
          </ProductDescription>
        </ProductListed>
      </Fragment>
    );
  })

  return(
    <Fragment>
      <Container>
        <Content>
          <ProductListedContainer>
            <section>
              {cartReader}
            </section>
          </ProductListedContainer>

          <ContinueButton onClick={() => navigate("/")}>
            CONTINUAR COMPRANDO
          </ContinueButton>
          <FinishButton onClick={handleFinishPurchase}>
            FINALIZAR COMPRA
          </FinishButton>
        </Content>
      </Container>
    </Fragment>
  );
}