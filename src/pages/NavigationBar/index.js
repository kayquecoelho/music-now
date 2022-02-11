import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Bag from "../../assets/icons/bag.png";
import Profile from "../../assets/icons/profile.png";
import Bars from "../../assets/icons/bars.png";
import { Header, Action } from "../../components/Header";
import { ActionMenu, ActionProfile } from "../../components/Action";
import styled from "styled-components";

export default function NavigationBar({ setDisplayBag, displayBag}) {
  const { pathname } = useLocation();
  const [visibility, setVisibility] = useState(false);
  const [actionContent, setActionContent] = useState(null);

  function handleMenu() {
    setActionContent(<ActionMenu setVisibility={setVisibility} />);
    setVisibility(true);
  }

  function handleProfile() {
    setActionContent(<ActionProfile setVisibility={setVisibility} />);
    setVisibility(true);
  }

  function handleBag() {
    setDisplayBag(true);
  }

  if(pathname === "/sign-in" || pathname === "/sign-up"){
    return null;
  }

  return(
    <Fragment>
      <Header>
        <img alt="logo.png" src={Logo}/>

        <div>
          <button onClick={handleBag}>
            <img alt="logo.png" src={Bag}/>
          </button>
          <button onClick={handleProfile}>
            <img alt="logo.png" src={Profile}/>
          </button>
          <button onClick={handleMenu}>
            <img alt="logo.png" src={Bars}/>
          </button>
        </div>
      </Header>
      <Action visibility={visibility ? 1 : undefined}>
        {actionContent}
      </Action>
    </Fragment>
  );
}

export function BagComponent({ displayBag, setDisplayBag }){

  function closeBag(e) {
    setDisplayBag(false);
  }

  return (
    <BackgroundScreen onClick={closeBag} displayBag={displayBag}>
      <Cart displayBag={displayBag} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <ButtonBag onClick={closeBag}>X</ButtonBag>
          <BagTitle>Minha Sacola</BagTitle>
        </div>

        <Products>
          <ProductBag></ProductBag>
        </Products>
        
        <CheckoutButton>Finalizar Compra</CheckoutButton>
      </Cart> 

    </BackgroundScreen>
  )
}

function ProductBag({ name, quantity, amount, image}) {
  return (
    <Box>
      <img src="{image}" alt="{name}" />
      <Info>
        <Name>asei la</Name>
        <Amount>POR R$ {/* quantity.toString().replace(".",",") */}</Amount>
        <Counter>
          <button className="remove">-</button>
          <div className="display">2</div>
          <button className="add">+</button>
        </Counter>
      </Info>
    </Box>
  )
}

const Name = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  word-break: break-word;
`;
const Amount = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  word-break: break-word;
`;

const Counter = styled.div`
  display: flex;  
  align-items: center;


  .display {
    width: 20px;
    text-align: center;
  }
  .remove, .add {
    width: 20px;
    font-size: 13px;
    font-weight: bold;
    line-height: 15px;
    color: #7a7a7a;

    border: none;
    cursor: pointer;
  }
`;
const Info = styled.div`
  margin-left: 10px;
  word-break: break-word;

  display: flex; 
  flex-direction: column;
  justify-content: space-between;
`
const Box = styled.div `
  display: flex;

  height: 110px;
  background-color: purple;
  margin-bottom: 10px;

  img {
    width: 110px;
    height: 110px;
  }
`
const Products = styled.div`
  width: 100%;
  margin-top: 15px;
  word-break: break-word;

  display: flex;
  flex-direction: column;

  background-color: red;
`
const CheckoutButton = styled.button`
  width: 242px;
  height: 41px;

  background-color: #706969;
  border: none;
  
  position: absolute;
  bottom: 20px;

  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #F8F8F8;
`
const ButtonBag = styled.button`
  width: 15px;
  height: 20px;

  margin-right: 10px;
  
  background-color: inherit;
  border: none;
`
const BackgroundScreen = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: ${(props) => props.displayBag ? "initial" : "none"};
`;

const Cart = styled.div`
  width: 300px;
  height: 100%;
  background-color: #FFFFFF;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;

  position: absolute;
  right: ${(props) => props.displayBag ? "0": "-300px"};
  top: 0px;

  .header {
    width: 100%;
    display: flex;
  }
`;

const BagTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`