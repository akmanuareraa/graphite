// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function OksvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 30 30"}
      fill={"currentColor"}
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
          "M15 3C8.373 3 3 8.373 3 15s5.373 12 12 12 12-5.373 12-12S21.627 3 15 3zm6.707 9.707l-7.56 7.56a1 1 0 01-1.414 0L9.28 16.814a.999.999 0 111.414-1.414l2.746 2.746 6.853-6.853a.999.999 0 111.414 1.414z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default OksvgIcon;
/* prettier-ignore-end */
