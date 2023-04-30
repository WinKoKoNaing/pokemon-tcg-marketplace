import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
    viewBox="0 0 21 21"
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m18.59 5.363-2.203 8.67H4.49l-1.49-8 14.018.01.52-2.043H21v1.363h-2.41Zm-3.255 7.307 1.337-5.263-12.039-.01.983 5.273h9.719Zm1.365 4.15c0 1.202-.973 2.18-2.168 2.18a2.176 2.176 0 0 1-2.01-2.996H8.374A2.176 2.176 0 0 1 6.364 19a2.176 2.176 0 0 1-2.168-2.18c0-1.201.972-2.179 2.168-2.179h8.168c1.195 0 2.168.978 2.168 2.18Zm-10.336.817a.815.815 0 0 0 .812-.817.815.815 0 0 0-.812-.816.815.815 0 0 0-.813.816c0 .45.365.817.813.817Zm8.168 0a.815.815 0 0 0 .812-.817.815.815 0 0 0-.812-.816.815.815 0 0 0-.813.816c0 .45.365.817.813.817Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
