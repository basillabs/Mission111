import React from 'react';

const iconMap = {
  "hamburger": Hamburger,
  "chevron-up": ChevronUp
}

export default function Icon (props) {
  let { name, style, fill = "", size = 16, onClick, ...rest } = props;
  const Component = IconMap[props.name] ? IconMap[props.name] : null;

  return (
    <svg
      width={size}
      height={size}
      style={style}
      viewBox="0 0 16 16"
      onClick={onClick}
    >
      <Component {...rest} fill={fill} />
    </svg>
  )
}

function Hamburger(props) {
  return (
    <path fill={props.fill} d="M3,11 L13,11 L13,13 L3,13 L3,11 L3,11 Z M3,7 L13,7 L13,9 L3,9 L3,7 L3,7 Z M3,3 L13,3 L13,5 L3,5 L3,3 L3,3 Z"></path>
  );
}

function ChevronUp(props) {
  return (
    <polygon fill={props.fill} points="8.26148539 6.33843795 12.3537518 10.4307044 13.5229708 9.26148539 8.84609487 4.58460949 8.26148539 4 3 9.26148539 4.16921897 10.4307044 8.26148539 6.33843795"></polygon>
  );
}
