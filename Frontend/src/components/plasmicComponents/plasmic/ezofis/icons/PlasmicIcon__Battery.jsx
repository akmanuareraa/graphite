// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function BatteryIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 25 12"}
      height={"1em"}
      width={"1em"}
      style={{
        stroke: "currentcolor",
        fill: "currentcolor",
        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        opacity={".35"}
        d={
          "M2.667.5h16.666c1.197 0 2.167.97 2.167 2.167v6c0 1.196-.97 2.166-2.167 2.166H2.667A2.167 2.167 0 01.5 8.667v-6C.5 1.47 1.47.5 2.667.5z"
        }
        stroke={"currentColor"}
      ></path>

      <path
        opacity={".4"}
        d={"M23 3.667v4a2.17 2.17 0 000-4"}
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M2 3.1A1.1 1.1 0 013.1 2h15.8A1.1 1.1 0 0120 3.1v5.133a1.1 1.1 0 01-1.1 1.1H3.1a1.1 1.1 0 01-1.1-1.1V3.1z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BatteryIcon;
/* prettier-ignore-end */
