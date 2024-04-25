"use client";
import React, { useState } from "react";
import SmallCard from "./SmallCards";

const SmallCardHolder = ({
  items,
  fontColor,
  bgColorList,
  isToggleButton,
  toggledColor,
  hoverColor,
  tailwindCSS,
  isClickable,
  onClick,
  style,
  setToggled,
  borderColors,
  hoverMatchBorder,
  overflowHidden,
}) => {
  if (overflowHidden === true)
    {document.addEventListener('DOMContentLoaded', () => {
      const scrollContainer = document.getElementById('scroll-container');
      alert("default prevented")
      scrollContainer.addEventListener('wheel', (event) => {
        event.preventDefault(); // Prevents the window from scrolling vertically
        scrollContainer.scrollLeft += event.deltaY + event.deltaX; // Adjusts horizontal scroll
      }, {passive: false}); // `passive: false` lets us `preventDefault` effectively
    });
  }
  
  return (
    <div id="scroll-container" className={`flex ${overflowHidden ? "overflow-hidden flex-nowrap" : "flex-wrap"} max-w-full`} style={style}>
      {items.map((item) => (
        <SmallCard
          key={item}
          name={item}
          fontColor={fontColor ? fontColor : "black"}
          bgColor={
            bgColorList[Math.floor(Math.random() * bgColorList.length)]
              ? bgColorList[Math.floor(Math.random() * bgColorList.length)]
              : "white"
          }
          isToggleButton={isToggleButton ? isToggleButton : false}
          toggledColor={toggledColor ? toggledColor : "black"}
          hoverColor={hoverColor ? hoverColor : "black"}
          tailwindCSS={tailwindCSS ? tailwindCSS : ""}
          isClickable={isClickable ? isClickable : false}
          onClick={
            onClick
              ? onClick
              : () => {
                  console.log("Clicked on " + item);
                }
          }
          defaultToggled={
            setToggled ? (setToggled.includes(item) ? true : false) : false
          }
          borderColor={
            borderColors
              ? borderColors[Math.floor(Math.random() * borderColors.length)]
              : "black"
          }
          hoverMatchBorder={hoverMatchBorder ? hoverMatchBorder : false}
        />
      ))}
    </div>
  );
};

export default SmallCardHolder;
