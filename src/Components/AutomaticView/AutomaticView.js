import cssAV from "./AutomaticView.module.css";
import GeneralRanking from "../GeneralRanking/GeneralRanking";
import useSliderJSXProvider from "../../Hooks/useSliderJSXProvider";

function AutomaticView() {
  //const automaticViewState = useSliderJSXProvider();
  const jsxStatus = useSliderJSXProvider();
  return <div className="maxHeight">{jsxStatus}</div>;
}
export default AutomaticView;
