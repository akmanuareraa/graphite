// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function NotchIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 164 31"}
      height={"1em"}
      width={"1em"}
      style={{
        fill: "currentcolor",
        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M0 0h164a4.29 4.29 0 00-2.714 3.889l-.044 1.858c0 13.947-11.306 25.253-25.253 25.253H28.011C14.064 31 2.758 19.694 2.758 5.747L2.714 3.89A4.292 4.292 0 000 0z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default NotchIcon;
/* prettier-ignore-end */
