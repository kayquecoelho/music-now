import styled from "styled-components";

const Action = styled.div`
  width: 100%;

  padding: 10px 10px 0 10px;

  display: ${(props) => props.visibility ? "initial" : "none"};

  position: fixed;
  top: 52px;
  left: 0;

  background-color: #191919;

  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  color: #FFFFFF;

  section{
    margin: 20px 0;

    hr{
      color: #FFFFFF;
    }
  }
`;

export default Action;