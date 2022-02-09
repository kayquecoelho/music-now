import { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import requests from "../../services/requests";
import Logo from "../../assets/img/logo.png";
import { Button, Container, Content, Form, Input, Hyperlink } from "../../components/Form";
import Swal from 'sweetalert2';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);
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

      Toast.fire({
        icon: 'error',
        text: 'Não foi possível efetuar o login. Ocorreu um erro inesperado, tente novamente mais tarde!'
      })
    }
  }

  return(
    <Fragment>
      <Container>
        <Content>
          <img alt="logo.png" src={Logo}/>

          <Form onSubmit={handleSubmit}>
            <Input 
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              stageloading={isLoading}
              required
            />
            <Input
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