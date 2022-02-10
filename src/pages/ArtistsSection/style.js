import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  color: #000000;
  font-size: 18px;
  line-height: 21px;

  margin-left: 25px;
`
const Artists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 25px;

  font-size: 22px;
  line-height: 26px;
  color: #000000;

  span {
    align-self: flex-start;
  }
`

const HorLine = styled.div`
  width: 67px;
  height: 6px;

  margin-bottom: 20px;

  background-color: #C4C4C4;
  align-self: flex-start;
`

export {
  HorLine,
  Title,
  Artists,
  StyledLink
}