import styled from "styled-components";

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
`;
const Box = styled.div `
  display: flex;

  height: 110px;
  margin-bottom: 20px;

  img {
    width: 110px;
    height: 110px;
  }
`;

export {
  Box,
  Info,
  Name,
  Counter,
  Amount
};