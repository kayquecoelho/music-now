import { useState } from "react";
import { Hyperlink } from "../Form";

export default function ActionProfile(props) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth"));

  function logout() {
    localStorage.removeItem("auth");
    setIsAuth(localStorage.getItem("auth"));
  }

  return (
    <div>
      <span onClick={() => props.setVisibility(false)}>X</span>
      <section onClick={() => props.setVisibility(false)}>
        {!isAuth && (
          <>
            <Hyperlink to="/sign-in">Entrar</Hyperlink>
            <hr />
          </>
        )}
      </section>
      <section onClick={() => props.setVisibility(false)}>
        {!isAuth && (
          <>
            <Hyperlink to="/sign-up">Cadastrar</Hyperlink>
            <hr />
          </>
        )}
      </section>
      <section onClick={() => props.setVisibility(false)}>
        {isAuth && (
        <>
          <p onClick={logout}>Sair</p>
          <hr />
        </>)}
        
      </section>
    </div>
  );
}