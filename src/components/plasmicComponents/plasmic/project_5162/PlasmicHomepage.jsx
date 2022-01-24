// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: sO5m3uTzIQI
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_project_5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicHomepage.module.css"; // plasmic-import: sO5m3uTzIQI/css
import imageedit06595945666PngGAp4VAj from "./images/imageedit06595945666Png.png"; // plasmic-import: G_ap4vAJ-/picture

export const PlasmicHomepage__VariantProps = new Array();

export const PlasmicHomepage__ArgProps = new Array();

function PlasmicHomepage__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(projectcss.all, projectcss.root_reset, sty.root)}
    >
      <div
        data-plasmic-name={"applicationForm"}
        data-plasmic-override={overrides.applicationForm}
        className={classNames(projectcss.all, sty.applicationForm)}
      >
        {true ? (
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text__sBtwJ
            )}
          >
            {"Fetching Data from Database...."}
          </div>
        ) : null}

        <p.PlasmicImg
          data-plasmic-name={"img"}
          data-plasmic-override={overrides.img}
          alt={""}
          className={classNames(sty.img)}
          displayHeight={"172px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"731px"}
          loading={"lazy"}
          src={{
            src: imageedit06595945666PngGAp4VAj,
            fullWidth: 1316,
            fullHeight: 322,
            aspectRatio: undefined
          }}
        />

        {false ? (
          <div
            data-plasmic-name={"freeBox"}
            data-plasmic-override={overrides.freeBox}
            className={classNames(projectcss.all, sty.freeBox)}
          />
        ) : null}

        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__q1Fi8
          )}
        >
          {"Blockchain Secured Workflows Demo"}
        </div>
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: ["root", "applicationForm", "img", "freeBox"],
  applicationForm: ["applicationForm", "img", "freeBox"],
  img: ["img"],
  freeBox: ["freeBox"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicHomepage__ArgProps,
      internalVariantPropNames: PlasmicHomepage__VariantProps
    });

    return PlasmicHomepage__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicHomepage";
  } else {
    func.displayName = `PlasmicHomepage.${nodeName}`;
  }
  return func;
}

export const PlasmicHomepage = Object.assign(
  // Top-level PlasmicHomepage renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    applicationForm: makeNodeComponent("applicationForm"),
    img: makeNodeComponent("img"),
    freeBox: makeNodeComponent("freeBox"),
    // Metadata about props expected for PlasmicHomepage
    internalVariantProps: PlasmicHomepage__VariantProps,
    internalArgProps: PlasmicHomepage__ArgProps
  }
);

export default PlasmicHomepage;
/* prettier-ignore-end */
