import cssAV from "./AutomaticView.module.css";
import GeneralRanking from "../GeneralRanking/GeneralRanking";
import useSliderJSXProvider from "../../Hooks/useSliderJSXProvider";
import { useSpring, animated, useTransition } from "react-spring";
import { useEffect, useState } from "react";
import { sleep } from "../../Api/Utils";

function AutomaticView() {
  const automaticViewState = useSliderJSXProvider();
  /*const [state, setstate] = useState();
  const propsIn = {
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: {duration: 1000 }
  };
  const propsOut = {
    to: { opacity: 0 },
    from: { opacity: 1 },
    config: {duration: 1000 }
  };
  const [style, api] = useSpring(() => (propsIn))
  useEffect(() => {
    api.start(propsIn);
    api.update(propsOut);
  }, [automaticViewState])
  //const jsxStatus = useSliderJSXProvider();
  //return <div className="maxHeight">{jsxStatus}</div>;
  */return (
    <div className='maxHeight'>
      {automaticViewState}
    </div>
  );
}
export default AutomaticView;
