import styled from "styled-components";

const SizeContent = styled.div`
  height: 30px;
  width: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.backgorundSize ? "#000000" : "#FFFFFF" };

  border: 1px solid #000000;

  font-weight: 300;
  font-size: 20px;
  color: ${(props) => props.backgorundSize ? "#FFFFFF" : "#000000" };
`;

export default SizeContent;