import { Fragment, useState } from "react";
import { SizeContent } from "../../components/Product";

export default function SizeComponent(props) {
  const [backgorundSize, setBackgroundSize] = useState(false);

  function handleSize() {
    if(props.sizeSelected && backgorundSize === false){
      return;
    }

    if(!backgorundSize){
      setBackgroundSize(true);
      props.setSizeSelected(true);
      props.setSelectedSize(props.size);
    }else{
      setBackgroundSize(false);
      props.setSizeSelected(false);
      props.setSelectedSize(null);
    }
  }

  return(
    <Fragment>
      <SizeContent backgorundSize={backgorundSize} onClick={handleSize}>
        {props.size}
      </SizeContent>
    </Fragment>
  );
}