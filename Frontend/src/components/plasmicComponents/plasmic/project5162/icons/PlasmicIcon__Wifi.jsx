// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function WifiIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 11"}
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
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M7.637 2.277a8.64 8.64 0 015.953 2.379c.12.118.314.116.433-.004l1.156-1.166a.322.322 0 00-.003-.456 10.897 10.897 0 00-15.08 0 .322.322 0 00-.003.456L1.25 4.652c.119.12.312.122.433.004a8.641 8.641 0 015.954-2.379zm0 3.796c1.217 0 2.391.452 3.294 1.27a.31.31 0 00.433-.006l1.155-1.167a.322.322 0 00-.005-.459 7.16 7.16 0 00-9.752 0 .322.322 0 00-.005.46l1.155 1.166a.31.31 0 00.433.006 4.907 4.907 0 013.292-1.27zM9.95 8.627a.314.314 0 01-.094.23l-1.998 2.016a.312.312 0 01-.443 0L5.417 8.857a.314.314 0 01.01-.457 3.422 3.422 0 014.42 0c.063.058.1.14.103.227z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default WifiIcon;
/* prettier-ignore-end */
