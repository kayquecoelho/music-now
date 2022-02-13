import styled from "styled-components";

const ProductListedCounter = styled.main`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div.footer-controls{
    button{
      border: none;

      background-color: transparent;
      
      cursor: pointer;
    }

    span{
      margin: 0 10px 0 10px;
    }
  }

  span{
    width: inherit;
    text-align: right;
  }
`;

export default ProductListedCounter;