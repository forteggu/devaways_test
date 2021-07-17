import useSliderJSXProvider from "../../Hooks/useSliderJSXProvider";

function AutomaticView() {
  const avContent = useSliderJSXProvider();
  return <div className="maxHeight">{avContent}</div>;
}
export default AutomaticView;
