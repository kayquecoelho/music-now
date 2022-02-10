import { Fragment } from "react";

export default function ActionProfile(props) {
  return(
    <Fragment>
      <div>
        <span onClick={() => props.setVisibility(false)}>X</span>
        <section>
          <p>Entrar</p>
          <hr />
        </section>
        <section>
          <p>Cadastrar</p>
          <hr />
        </section>
        <section>
          <p>Sair</p>
          <hr />
        </section>
      </div>
    </Fragment>
  );
}