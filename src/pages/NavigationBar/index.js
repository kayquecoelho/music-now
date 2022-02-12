import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../../assets/img/logo.png";
import Bag from "../../assets/icons/bag.png";
import Profile from "../../assets/icons/profile.png";
import Bars from "../../assets/icons/bars.png";
import { Header, Action } from "../../components/Header";
import { ActionMenu, ActionProfile } from "../../components/Action";

export default function NavigationBar({ setDisplayBag, displayBag}) {
  const { pathname } = useLocation();
  const [visibility, setVisibility] = useState(false);
  const [actionContent, setActionContent] = useState(null);

  function handleMenu() {
    setActionContent(<ActionMenu setVisibility={setVisibility} />);
    setVisibility(true);
  }

  function handleProfile() {
    setActionContent(<ActionProfile setVisibility={setVisibility} />);
    setVisibility(true);
  }

  function handleBag() {
    setDisplayBag(true);
  }

  if(pathname === "/sign-in" || pathname === "/sign-up"){
    return null;
  }

  return(
    <Fragment>
      <Header>
        <img alt="logo.png" src={Logo}/>

        <div>
          <button onClick={handleBag}>
            <img alt="logo.png" src={Bag}/>
          </button>
          <button onClick={handleProfile}>
            <img alt="logo.png" src={Profile}/>
          </button>
          <button onClick={handleMenu}>
            <img alt="logo.png" src={Bars}/>
          </button>
        </div>
      </Header>
      <Action visibility={visibility ? 1 : undefined}>
        {actionContent}
      </Action>
    </Fragment>
  );
}