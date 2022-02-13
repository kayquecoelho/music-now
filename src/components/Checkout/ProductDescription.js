import styled from "styled-components";

const ProductDescription = styled.div`
  width: 65%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  position: relative;

  font-weight: 700;
  font-size: 15px;
  line-height: 15px;

  color: #000000;

  border: 1px solid transparent;

  span.delete-purchase{
    position: absolute;
    top: 0;
    right: 0;

    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    color: #7A7A7A;

    cursor: pointer;
  }

  div{
    width: 80%;
  }

  @media screen and (min-width: 700px) {
    width: 90%;
  }
`;

export default ProductDescription;