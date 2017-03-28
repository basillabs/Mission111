import React from 'react';
import Svg,{
    Path,
    Polygon,
} from 'react-native-svg';

const IconMap = {
  "hamburger": Hamburger,
  "chevron-up": ChevronUp,
  "split-view": SplitView,
  "chevron-right": ChevronRight,
};

export default function Icon(props) {
  let { name, style, fill = "black", size = 16, onClick, ...rest } = props;
  const Component = IconMap[props.name] ? IconMap[props.name] : null;

  return (
    <Svg
      width={size}
      height={size}
      style={style}
      viewBox="0 0 16 16"
      onClick={onClick}
    >
      <Component {...rest} fill={fill} />
    </Svg>
  )
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  size: React.PropTypes.number,
  fill: React.PropTypes.string,
  onClick: React.PropTypes.func
};

function Hamburger(props) {
  return (
    <Path fill={props.fill} d="M14.9991283,2 C15.5518945,2 16,2.44386482 16,3 C16,3.55228475 15.5553691,4 14.9991283,4 L1.00087166,4 C0.448105505,4 0,3.55613518 0,3 C0,2.44771525 0.444630861,2 1.00087166,2 L14.9991283,2 Z M14.9991283,7 C15.5518945,7 16,7.44386482 16,8 C16,8.55228475 15.5553691,9 14.9991283,9 L1.00087166,9 C0.448105505,9 0,8.55613518 0,8 C0,7.44771525 0.444630861,7 1.00087166,7 L14.9991283,7 Z M14.9991283,12 C15.5518945,12 16,12.4438648 16,13 C16,13.5522847 15.5553691,14 14.9991283,14 L1.00087166,14 C0.448105505,14 0,13.5561352 0,13 C0,12.4477153 0.444630861,12 1.00087166,12 L14.9991283,12 Z"></Path>
  );
}

function ChevronUp(props) {
  return (
    <Polygon fill={props.fill} points="8.26148539 6.33843795 12.3537518 10.4307044 13.5229708 9.26148539 8.84609487 4.58460949 8.26148539 4 3 9.26148539 4.16921897 10.4307044 8.26148539 6.33843795"></Polygon>
  );
}

function ChevronRight(props) {
  return (
    <Path fill={props.fill} d="M12.3539618,8.8148684 L6.59262194,14.3785296 C6.19716999,14.7604131 5.56825844,14.7507012 5.18193448,14.3506511 C4.79828526,13.9533707 4.81505365,13.3147802 5.2033052,12.93985 L10.2419945,8.07404429 L5.3761888,3.03535497 C4.9943053,2.63990303 5.00401718,2.01099147 5.40406735,1.62466752 C5.80134775,1.24101829 6.43993824,1.25778668 6.8148684,1.64603823 L12.3785296,7.40737806 C12.5689453,7.60455933 12.6620009,7.85978438 12.6578521,8.11403774 C12.6487793,8.37543033 12.5475483,8.62792406 12.3539618,8.8148684 Z"></Path>
  );
}


function SplitView(props) {
  return (
    <Path fill={props.fill} d="M0,1.99406028 C0,0.892771196 0.894513756,0 1.99406028,0 L14.0059397,0 C15.1072288,0 16,0.894513756 16,1.99406028 L16,14.0059397 C16,15.1072288 15.1054862,16 14.0059397,16 L1.99406028,16 C0.892771196,16 0,15.1054862 0,14.0059397 L0,1.99406028 Z M0,7 L0,9 L16,9 L16,7 L0,7 Z"></Path>
  );
}
