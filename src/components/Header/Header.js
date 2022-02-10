import styled from "styled-components";

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 52px;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #000000;

  img{
    width: 120px;
  }

  div{
    display: flex;
    align-items: center;
    justify-content: center;

    button{
      border: none;
      background-color: transparent;

      img{
        width: 32px;
  
        margin: 0 5px;
      }
    }
  }
`;

export default Header;