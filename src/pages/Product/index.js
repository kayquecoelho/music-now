import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";
import {   
  Container,
  Content,
  Description,
  ProductAmount,
  ProductArtist,
  ProductId,
  ProductName,
  Button,
  ActionSection,
  CounterContainer,
  SizeContainer,
  SizeComponent } from "../../components/Product";
import Swal from 'sweetalert2';


export default function Product() {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
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
    async function handleProduct() {
      try {
        const response = await requests.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
  
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro inesperado, tente novamente!'
        })
      }
    }

    handleProduct();
  }, [id]);

  function handleMinusCounter(counter) {
    let newCounter = counter - 1;
    if(counter <= 1){
      newCounter = 1;
    }

    setCounter(newCounter);
  }

  function handlePlusCounter(counter) {
    let newCounter = counter + 1;
    if(counter >= 10){
      newCounter = 10;
    }

    setCounter(newCounter);
  }

  function handleBag() {
    if(productSizesReader.length !== 0 && selectedSize === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'É necessário informar o tamanho para continuar, tente novamente!'
      })

      return;
    }

    if(localStorage.getItem("auth") === null){
      Swal.fire({
        title: 'Você criou uma conta em nosso site?',
        text: 'Caso tenha uma conta, clique em "Entrar", caso contrário clique em "Cadastrar".',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Entrar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        denyButtonText: 'Cadastrar'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        } else if (result.isDenied) {
          navigate("/sign-up");
        }
      })
    }else{
      delete product._id;

      handleCart({ 
        ...product, 
        size: productSizesReader.length === 0 ? " " : selectedSize, 
        quantity: counter 
      }, auth.token);

      Toast.fire({
        icon: 'success',
        title: 'Produto adicionado ao carrinho com sucesso!'
      })
      navigate("/");
    }
  }

  async function handleCart(body, token) {
    try {
      await requests.postCart(body, token);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não foi possível adicionar o seu produto ao carrinho, tente novamente!'
      })
    }
  }

  if(product === null){
    return "";
  }

  const productSizesReader = product.size.map((size) => {
    return(
      <Fragment key={size}>
        <SizeComponent 
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
          setSelectedSize={setSelectedSize}
          size={size} 
        />
      </Fragment>
    );
  })

  return(
    <Fragment>
      <Container>
        <Content>
          <img alt={product.name} src={product.image} />

          <Description>
            <ProductName>{product.name}</ProductName>
            <ProductId>{`ref: ${product._id}`}</ProductId>
            <ProductArtist>{product.artist}</ProductArtist>

            {
              productSizesReader.length !== 0 && 
                <SizeContainer>
                  {productSizesReader}
                </SizeContainer>
            }

            <ProductAmount>
              {`POR: R$ ${product.amount.toString().replace(".",",")}`}
            </ProductAmount>
          </Description>

          <ActionSection>
            <CounterContainer>
              <button onClick={() => handleMinusCounter(counter)}>-</button>
              <span>{counter}</span>
              <button onClick={() => handlePlusCounter(counter)}>+</button>
            </CounterContainer>

            <Button onClick={() => handleBag(product)}>
              ADICIONAR AO <br />
              CARRINHO
            </Button>
          </ActionSection>

          <Link to="/">Voltar</Link>
        </Content>
        
      </Container>
    </Fragment>
  );
}