import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 110 110" width={110} height={110} fill="none" {...props}>
    <Path
      fill="#5DDD48"
      fillRule="evenodd"
      d="M110 55c0 30.376-24.624 55-55 55S0 85.376 0 55 24.624 0 55 0s55 24.624 55 55ZM85.454 42.648a7.5 7.5 0 0 0-10.907-10.297L44.171 64.525l-9.379-7.794a7.5 7.5 0 0 0-9.586 11.537l14.792 12.293a7.5 7.5 0 0 0 10.247-.62l35.208-37.293Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
