import styled from "styled-components";

const Content = styled.div`
  height: 100%;
  width: 100%;
  
  main{
    padding: 0 30px;

    margin-bottom: 20px;

    div{
      width: 100%;
  
      margin-top: 20px;
  
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      h2{
        font-size: 22px;
        line-height: 26px;
      }
    
      section{
        width: 80px;
        height: 6px;
    
        background-color: #C4C4C4;
      }
    }
  }
`;

export default Content;