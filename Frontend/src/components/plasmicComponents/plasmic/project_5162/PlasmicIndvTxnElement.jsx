// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: cIj7QK_Ydt
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_project_5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicIndvTxnElement.module.css"; // plasmic-import: cIj7QK_Ydt/css

export const PlasmicIndvTxnElement__VariantProps = new Array();

export const PlasmicIndvTxnElement__ArgProps = new Array(
  "txnhash",
  "amount",
  "address"
);

function PlasmicIndvTxnElement__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    <p.Stack
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_tokens,
        sty.root
      )}
    >
      <div className={classNames(projectcss.all, sty.freeBox___8Rgkg)}>
        {p.renderPlasmicSlot({
          defaultContents:
            "0xe985f4ba13b0b2fa3e86b48c4db203271d2c4a7e74ac1092697d304e97bdbd41",
          value: args.txnhash,
          className: classNames(sty.slotTargetTxnhash)
        })}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox___6SdQg)}>
        {p.renderPlasmicSlot({
          defaultContents: "Amount Bridged",
          value: args.amount,
          className: classNames(sty.slotTargetAmount)
        })}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox___9XV5M)}>
        {p.renderPlasmicSlot({
          defaultContents: "0x8971220f58c00005e381200496daf357ba38d1e8",
          value: args.address,
          className: classNames(sty.slotTargetAddress)
        })}
      </div>
    </p.Stack>
  );
}

const PlasmicDescendants = {
  root: ["root"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicIndvTxnElement__ArgProps,
      internalVariantPropNames: PlasmicIndvTxnElement__VariantProps
    });

    return PlasmicIndvTxnElement__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicIndvTxnElement";
  } else {
    func.displayName = `PlasmicIndvTxnElement.${nodeName}`;
  }
  return func;
}

export const PlasmicIndvTxnElement = Object.assign(
  // Top-level PlasmicIndvTxnElement renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    // Metadata about props expected for PlasmicIndvTxnElement
    internalVariantProps: PlasmicIndvTxnElement__VariantProps,
    internalArgProps: PlasmicIndvTxnElement__ArgProps
  }
);

export default PlasmicIndvTxnElement;
/* prettier-ignore-end */