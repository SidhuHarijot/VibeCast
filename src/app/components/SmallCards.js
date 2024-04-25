"use client";
import React, { useState, useEffect } from "react";

const SmallCard = ({
  name,
  onClick,
  fontColor,
  bgColor,
  isToggleButton,
  toggledColor,
  hoverColor,
  tailwindCSS,
  isClickable,
  defaultToggled,
  borderColor,
  hoverMatchBorder,
}) => {
  const [isToggled, setIsToggled] = useState(defaultToggled);

  const style = {
    color: fontColor,
    backgroundColor: isToggled ? toggledColor : bgColor,
    borderRadius: "9999px",
    padding: "8px 16px",
    cursor: isClickable ? "pointer" : "default",
    transition: "background-color 300ms",
    border: `2px solid ${borderColor}`,
  };

  if (hoverMatchBorder) {
    style.transition = "border-color 300ms";
    hoverColor = borderColor;
  }

  useEffect(() => {
    setIsToggled(defaultToggled); 
  }, [defaultToggled]);

  const handleClick = () => {
    if ((isClickable || isToggleButton) && onClick) {
      if (isToggleButton) {
        setIsToggled(!isToggled);
      }
      onClick(name);
    }
  };

  return (
    <div
      className={`inline-block m-1 text-sm font-medium ${
        hoverColor ? `hover:bg-${hoverColor}-500` : ""
      } ${tailwindCSS}`}
      style={style}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

export default SmallCard;
