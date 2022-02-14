import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";
import Swal from 'sweetalert2';

import Logo from "../../assets/img/logo.png";
import { Button, Container, Content, Form, Input, Hyperlink } from "../../components/Form";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const inputPassword = useRef(null);
  const inputEmail = useRef(null);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    if (localStorage.getItem("auth") !== null) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);
    try {
      const response = await requests.signIn({
        email,
        password
      });
      setIsloading(false);

      login(response.data);

      Toast.fire({
        icon: 'success',
        title: 'Login realizado com sucesso'
      })
      navigate("/");
    } catch (error) {
      setIsloading(false);
      if (error.response.status === 401) {
        Toast.fire({
          icon: 'error',
          text: 'Confira seu e-mail e senha!'
        });
        inputEmail.current.focus();
        inputEmail.current.style.backgroundColor = "rgba(238, 156, 166, 0.8)";
        inputPassword.current.style.backgroundColor = "rgba(238, 156, 166, 0.8)";
      } else {

        Toast.fire({
          icon: 'error',
          text: 'Não foi possível efetuar o login. Ocorreu um erro inesperado, tente novamente mais tarde!'
        })
      }
    }
  }

  return(
    <Fragment>
      <Container>
        <Content>
          <img alt="logo.png" src={Logo}/>

          <Form onSubmit={handleSubmit}>
            <Input 
              ref={inputEmail}
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              stageloading={isLoading}
              required
            />
            <Input
              ref={inputPassword}
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              stageloading={isLoading}
              required
            />

            <Button type="submit" stageloading={isLoading}>
              {isLoading ?
                "Carregando..."
              :
                "Entrar"
              }
            </Button>
          </Form>

          <Hyperlink to="/sign-up" stageloading={isLoading ? 1 : undefined}>
            Primeira vez? Cadastre-se!
          </Hyperlink>
        </Content>
      </Container>
    </Fragment>
  );
}