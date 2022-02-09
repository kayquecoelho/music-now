import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import requests from '../../services/requests';

import { Button, Container, Content, Form, Input, Hyperlink } from "../../components/Form";
import Logo from "../../assets/img/logo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await requests.registerUser({ ...formData });
      navigate("/sign-in");
    } catch (error) {
      alert(error.response?.data);
      setIsLoading(false);
    }
  }

  return (
  <Container>
    <Content>
      <img alt="logo.png" src={Logo}/>

      <Form onSubmit={handleSubmit}>
        <Input 
          placeholder='Nome'
          type="text"
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          stageloading={isLoading}
          required  
        />
        <Input 
          placeholder='E-mail'
          type="email"
          name="email" 
          value={formData.email} 
          onChange={handleChange}
          stageloading={isLoading}
          required
        />
        <Input 
          placeholder='Senha'
          type="password"
          name="password" 
          value={formData.password} 
          onChange={handleChange}
          stageloading={isLoading}
          required  
        />

        <Button type="submit" stageloading={isLoading}>
          {isLoading ?
            "Carregando..."
          :
            "Cadastrar-se"
          }
        </Button>
      </Form>

      <Hyperlink to="/sign-in" stageloading={isLoading ? 1 : undefined}>
        Já tem uma conta? Entre agora!
      </Hyperlink>
    </Content>
  </Container>
  );
}