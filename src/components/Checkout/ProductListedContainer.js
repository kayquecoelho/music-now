import styled from "styled-components";

const ProductListedContainer = styled.div`
  width: 100%;
  height: 70%;

  padding: 3px;
  margin: 30px 0 30px 0;

  overflow-y: scroll;

  color: #FFFFFF;

  section{
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: 100%;

    background-color: #000000;

    padding: 5px
  }
`;

export default ProductListedContainer;