import { Fragment } from "react";
import { Hyperlink } from "../Form";

export default function ActionMenu(props) {

  function changeVisibility() {
    props.setVisibility(false);
  }

  return(
    <Fragment>
      <div>
        <span onClick={changeVisibility}>X</span>
        <section onClick={changeVisibility}>
          <Hyperlink to="/artists">Artitas</Hyperlink>
          <hr />
        </section>
        <section onClick={changeVisibility}>
          <Hyperlink to="/cloths">Roupas</Hyperlink>
          <hr />
        </section>
        <section onClick={changeVisibility}>
          <Hyperlink to="/album">Album</Hyperlink>
          <hr />
        </section>
        <section onClick={changeVisibility}>
          <Hyperlink to="/acessory">Acessórios</Hyperlink>
          <hr />
        </section>
      </div>
    </Fragment>
  );
}