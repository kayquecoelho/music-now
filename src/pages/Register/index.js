import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import requests from '../../services/requests';
import Swal from "sweetalert2";

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

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await requests.registerUser({ ...formData });
      Toast.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!'
      })
      navigate("/sign-in");
    } catch (error) {

      if (error.response?.status === 409) {
        Toast.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Já existe um usuário cadastrado com esse email!"
        })
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Erro desconhecido',
          text: 'Tente novamente mais tarde!'
        })
      }
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