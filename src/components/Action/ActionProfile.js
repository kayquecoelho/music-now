import { useState } from "react";
import { Hyperlink } from "../Form";

export default function ActionProfile(props) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth"));

  function logout() {
    localStorage.removeItem("auth");
    setIsAuth(localStorage.getItem("auth"));
  }

  function changeVisibility() {
    props.setVisibility(false);
  }
  
  return (
    <div>
      <span onClick={changeVisibility}>X</span>
      <section onClick={changeVisibility}>
        {!isAuth && (
          <>
            <Hyperlink to="/sign-in">Entrar</Hyperlink>
            <hr />
          </>
        )}
      </section>
      <section onClick={changeVisibility}>
        {!isAuth && (
          <>
            <Hyperlink to="/sign-up">Cadastrar</Hyperlink>
            <hr />
          </>
        )}
      </section>
      <section onClick={changeVisibility}>
        {isAuth && (
        <>
          <p onClick={logout}>Sair</p>
          <hr />
        </>)}
        
      </section>
    </div>
  );
}