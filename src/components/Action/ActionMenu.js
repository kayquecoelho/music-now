import { Fragment } from "react";

export default function ActionMenu(props) {
  return(
    <Fragment>
      <div>
        <span onClick={() => props.setVisibility(false)}>X</span>
        <section>
          <p>Artistas</p>
          <hr />
        </section>
        <section>
          <p>Roupas</p>
          <hr />
        </section>
        <section>
          <p>Acessórios</p>
          <hr />
        </section>
      </div>
    </Fragment>
  );
}