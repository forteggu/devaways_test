import React from "react";
import { animated, Spring } from "react-spring";
import Constants from "../../Api/Constants";
import useSliderJSXProvider from "../../Hooks/useSliderJSXProvider";
import useSliderStateManagerHook from "../../Hooks/useSliderStateManagerHook";

function AutomaticView() {
  const sliderState = useSliderStateManagerHook();
  const avContent = useSliderJSXProvider(sliderState);
  return (
    <div className="maxHeight">
      <Spring
        from={{ opacity: 0 }}
        to={[
          { opacity: 1 },
          {
            delay:
              sliderState.transitionTime - Constants.fadeInOutAnimation > 0
                ? sliderState.transitionTime - Constants.fadeInOutAnimation
                : 0,
            opacity: 0,
          },
        ]}
      >
        {(styles) => (
          <animated.div style={{ height: "100%", ...styles }}>
            { avContent }
          </animated.div>
        )}
      </Spring>
    </div>
  );
}
export default AutomaticView;
