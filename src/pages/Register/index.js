import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import api from '../../services/api';

export function Register() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password:""
  });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setDisableForm(true);

    try {
      await api.registerUser({ ...formData });
      navigate("/");
    } catch (error) {
      alert(error.response?.data);
      setDisableForm(false);
    }
  }
  return (
    <Container>
      <Title>Music Now</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          placeholder='Nome'
          type="text"
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          disabled={disableForm}
          required  
        />
        <Input 
          placeholder='Email'
          type="email"
          name="email" 
          value={formData.email} 
          onChange={handleChange}
          disabled={disableForm}
          required
        />
        <Input 
          placeholder='Senha'
          type="password"
          name="password" 
          value={formData.password} 
          onChange={handleChange}
          disabled={disableForm}
          required  
        />
        <Button type="submit" disabled={disableForm}>Cadastrar-se</Button>
      </Form>
      <StyledLink to="/" >
        Já tem uma conta? Entre agora!
      </StyledLink>
    </Container>
  )
}

const Title = styled.h1`
  margin-top: 120px;
  margin-bottom: 30px;

  color: #FFFFFF;
  font-family: 'Saira Stencil One', cursive;
  font-size: 32px;
  font-weight: 400;
  line-height: 50px;
`;
const Input = styled.input`
  width: 100%;
  height: 58px;

  background-color: #FFFFFF;
  border-radius: 5px;
  border: none;

  padding: 20px;

  color: #000000;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;

  ::placeholder {
    color: #000000;
  }
`;
const Form = styled.form`
  max-width: 780px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Button = styled.button`
  width: 100%;
  height: 46px;

  background-color: #555555;
  border-radius: 5px;
  border: none;

  margin-bottom: 20px;
  ${(props) => props.disabled && "opacity: 0.7;"}
 
  color: #FFFFFF;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  padding: 0 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledLink = styled(Link)`
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  text-decoration: none;

  cursor: pointer;
`;
