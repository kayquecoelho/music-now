import { Link } from "react-router-dom";
import styled from "styled-components";

const Products = styled.div`
  width: 100%;
  margin-top: 15px;
  word-break: break-word;

  display: flex;
  flex-direction: column;

  margin-bottom: 100px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;  
`;

const CheckoutButton = styled(Link)`
  width: 242px;
  height: 41px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #706969;
  border: none;

  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #F8F8F8;
`;

const ButtonBag = styled.button`
  width: 15px;
  height: 20px;

  margin-right: 10px;
  
  background-color: inherit;
  border: none;
`;

const BackgroundScreen = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: ${(props) => props.displayBag ? "initial" : "none"};

  .finish {
    position: absolute;
    bottom: 20px;

    .subtotal {
      margin-bottom: 5px;

      display: flex;
      justify-content: space-between;
    }
  }
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
`;

export {
  BagTitle,
  Cart,
  BackgroundScreen,
  ButtonBag,
  CheckoutButton,
  Products
};