import styled from "styled-components";

const CounterContainer = styled.div`
  width: 85px;
  height: 41px;
  left: 57px;
  top: 500px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #C4C4C4;

  font-weight: 300;
  font-size: 18px;
  line-height: 21px;

  color: #000000;

  button{
    background-color: transparent;
    
    border: none;
  }

  span{
      margin: 0 15px 0 15px;
  }
`;

export default CounterContainer;