import useSliderJSXProvider from "../../Hooks/useSliderJSXProvider";

function AutomaticView() {
  const automaticViewState = useSliderJSXProvider();
  return <div className="maxHeight">{automaticViewState}</div>;
}
export default AutomaticView;
