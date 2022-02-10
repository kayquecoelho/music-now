import { Link } from "react-router-dom";
import styled from "styled-components";

const Hyperlink = styled(Link)`
  height: 30px;
  width: 95px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #706969;
  border-radius: 5px;

  margin-top: 10px;

  color: #FFFFFF;
  font-weight: 700;
  text-decoration: none;
`;

export default Hyperlink;