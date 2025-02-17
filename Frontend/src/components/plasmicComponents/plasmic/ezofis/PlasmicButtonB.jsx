// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: oSXCQ8ez26
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_ezofis.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicButtonB.module.css"; // plasmic-import: oSXCQ8ez26/css
import MetamasksvgIcon from "./icons/PlasmicIcon__Metamasksvg"; // plasmic-import: oUB_LRSSgs/icon
import failgifGV67UXTi from "./images/failgif.gif"; // plasmic-import: gV6-7uXTi/picture
import successCropgifUneR0OkrA from "./images/successCropgif.gif"; // plasmic-import: uneR0OkrA/picture
import graphiteLogoInvpngB3LtWjF49 from "./images/graphiteLogoInvpng.png"; // plasmic-import: B3LtWjF49/picture
import loadergifESQzAuv1I from "./images/loadergif.gif"; // plasmic-import: eSQzAuv1i/picture
import copygifN5E9Rn6NN from "./images/copygif.gif"; // plasmic-import: n5e9rn6nN/picture

export const PlasmicButtonB__VariantProps = new Array(
  "installmm",
  "connectmm",
  "sendtxn",
  "processing",
  "success",
  "failed",
  "sendtxnconsent"
);

export const PlasmicButtonB__ArgProps = new Array("hash", "onClick");

function PlasmicButtonB__RenderFunc(props) {
  const { variants, args, overrides, forNode, dataFetches } = props;
  return true ? (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(projectcss.all, projectcss.root_reset, sty.root, {
        [sty.root__connectmm]: hasVariant(variants, "connectmm", "connectmm"),
        [sty.root__failed]: hasVariant(variants, "failed", "failed"),
        [sty.root__installmm]: hasVariant(variants, "installmm", "installmm"),
        [sty.root__processing]: hasVariant(
          variants,
          "processing",
          "processing"
        ),

        [sty.root__sendtxn]: hasVariant(variants, "sendtxn", "sendtxn"),
        [sty.root__sendtxnconsent]: hasVariant(
          variants,
          "sendtxnconsent",
          "sendtxnconsent"
        ),

        [sty.root__success]: hasVariant(variants, "success", "success")
      })}
    >
      <button
        data-plasmic-name={"mainbutton"}
        data-plasmic-override={overrides.mainbutton}
        className={classNames(
          projectcss.button,
          projectcss.__wab_text,
          sty.mainbutton,
          {
            [sty.mainbutton__connectmm]: hasVariant(
              variants,
              "connectmm",
              "connectmm"
            ),

            [sty.mainbutton__failed]: hasVariant(variants, "failed", "failed"),
            [sty.mainbutton__installmm]: hasVariant(
              variants,
              "installmm",
              "installmm"
            ),

            [sty.mainbutton__processing]: hasVariant(
              variants,
              "processing",
              "processing"
            ),

            [sty.mainbutton__sendtxn]: hasVariant(
              variants,
              "sendtxn",
              "sendtxn"
            ),

            [sty.mainbutton__sendtxnconsent]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            ),

            [sty.mainbutton__success]: hasVariant(
              variants,
              "success",
              "success"
            )
          }
        )}
        disabled={
          hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
            ? true
            : undefined
        }
      >
        {hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? "Sign and Submit Request"
          : hasVariant(variants, "failed", "failed")
          ? "Transaction Failed"
          : hasVariant(variants, "success", "success")
          ? "Transaction Successfull"
          : hasVariant(variants, "processing", "processing")
          ? "Transaction in Process"
          : hasVariant(variants, "sendtxn", "sendtxn")
          ? "Sign and Submit Request"
          : hasVariant(variants, "connectmm", "connectmm")
          ? "Connect Metamask Account"
          : hasVariant(variants, "installmm", "installmm")
          ? "Install Metamask"
          : "Transaction in Process"}
      </button>

      {(hasVariant(variants, "failed", "failed") ? true : true) ? (
        <p.PlasmicImg
          alt={""}
          className={classNames(sty.img___4PNmP, {
            [sty.img__failed___4PNmPocDdJ]: hasVariant(
              variants,
              "failed",
              "failed"
            )
          })}
          displayHeight={"50px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"53px"}
          loading={"lazy"}
          src={{
            src: failgifGV67UXTi,
            fullWidth: 200,
            fullHeight: 200,
            aspectRatio: undefined
          }}
        />
      ) : null}
      {(hasVariant(variants, "success", "success") ? true : true) ? (
        <p.PlasmicImg
          alt={""}
          className={classNames(sty.img___6BiMu, {
            [sty.img__success___6BiMukPrSc]: hasVariant(
              variants,
              "success",
              "success"
            )
          })}
          displayHeight={"50px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"94px"}
          loading={"lazy"}
          src={{
            src: successCropgifUneR0OkrA,
            fullWidth: 214,
            fullHeight: 209,
            aspectRatio: undefined
          }}
        />
      ) : null}
      {(
        hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? true
          : hasVariant(variants, "sendtxn", "sendtxn")
          ? true
          : true
      ) ? (
        <p.PlasmicImg
          alt={""}
          className={classNames(sty.img__rfRzo, {
            [sty.img__sendtxn__rfRzoQfRAj]: hasVariant(
              variants,
              "sendtxn",
              "sendtxn"
            ),

            [sty.img__sendtxnconsent__rfRzoLjVjA]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            )
          })}
          displayHeight={"38px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"auto"}
          loading={"lazy"}
          src={{
            src: graphiteLogoInvpngB3LtWjF49,
            fullWidth: 117,
            fullHeight: 106,
            aspectRatio: undefined
          }}
        />
      ) : null}
      {(
        hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? true
          : hasVariant(variants, "failed", "failed")
          ? true
          : hasVariant(variants, "success", "success")
          ? true
          : hasVariant(variants, "processing", "processing")
          ? false
          : hasVariant(variants, "sendtxn", "sendtxn")
          ? true
          : true
      ) ? (
        <MetamasksvgIcon
          data-plasmic-name={"svg"}
          data-plasmic-override={overrides.svg}
          className={classNames(projectcss.all, sty.svg, {
            [sty.svg__connectmm]: hasVariant(
              variants,
              "connectmm",
              "connectmm"
            ),

            [sty.svg__failed]: hasVariant(variants, "failed", "failed"),
            [sty.svg__installmm]: hasVariant(
              variants,
              "installmm",
              "installmm"
            ),

            [sty.svg__processing]: hasVariant(
              variants,
              "processing",
              "processing"
            ),

            [sty.svg__sendtxn]: hasVariant(variants, "sendtxn", "sendtxn"),
            [sty.svg__sendtxnconsent]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            ),

            [sty.svg__success]: hasVariant(variants, "success", "success")
          })}
          role={"img"}
        />
      ) : null}
      {(hasVariant(variants, "processing", "processing") ? true : true) ? (
        <p.PlasmicImg
          alt={""}
          className={classNames(sty.img___3Qsg6, {
            [sty.img__processing___3Qsg6Pdh5H]: hasVariant(
              variants,
              "processing",
              "processing"
            )
          })}
          displayHeight={"50px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"142px"}
          loading={"lazy"}
          src={{
            src: loadergifESQzAuv1I,
            fullWidth: 1500,
            fullHeight: 1500,
            aspectRatio: undefined
          }}
        />
      ) : null}
      {(hasVariant(variants, "success", "success") ? true : true) ? (
        <div
          className={classNames(projectcss.all, sty.freeBox___4NAoc, {
            [sty.freeBox__success___4NAockPrSc]: hasVariant(
              variants,
              "success",
              "success"
            )
          })}
        >
          {(hasVariant(variants, "success", "success") ? true : true) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__rSbH,
                {
                  [sty.text__success__rSbHKPrSc]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                }
              )}
            >
              {"HASH:"}
            </div>
          ) : null}
          {(hasVariant(variants, "success", "success") ? true : true) ? (
            <div
              className={classNames(projectcss.all, sty.freeBox__ltjiy, {
                [sty.freeBox__success__ltjiykPrSc]: hasVariant(
                  variants,
                  "success",
                  "success"
                )
              })}
            >
              {p.renderPlasmicSlot({
                defaultContents: "sdfbsdfdfdfgdfhdfhdfhdfhdfhdh",
                value: args.hash,
                className: classNames(sty.slotTargetHash, {
                  [sty.slotTargetHash__success]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                })
              })}
            </div>
          ) : null}
          {(hasVariant(variants, "success", "success") ? true : true) ? (
            <a
              data-plasmic-name={"copybutton"}
              data-plasmic-override={overrides.copybutton}
              className={classNames(projectcss.a, sty.copybutton, {
                [sty.copybutton__success]: hasVariant(
                  variants,
                  "success",
                  "success"
                )
              })}
            >
              <p.PlasmicImg
                data-plasmic-name={"copyimage"}
                data-plasmic-override={overrides.copyimage}
                alt={""}
                className={classNames(sty.copyimage)}
                displayHeight={"auto"}
                displayMaxHeight={"none"}
                displayMaxWidth={"100%"}
                displayMinHeight={"0"}
                displayMinWidth={"0"}
                displayWidth={"12px"}
                loading={"lazy"}
                src={{
                  src: copygifN5E9Rn6NN,
                  fullWidth: 1500,
                  fullHeight: 1500,
                  aspectRatio: undefined
                }}
              />
            </a>
          ) : null}
        </div>
      ) : null}
      {(hasVariant(variants, "connectmm", "connectmm") ? true : true) ? (
        <a
          data-plasmic-name={"installmetamasktext"}
          data-plasmic-override={overrides.installmetamasktext}
          className={classNames(
            projectcss.a,
            projectcss.__wab_text,
            sty.installmetamasktext,
            {
              [sty.installmetamasktext__connectmm]: hasVariant(
                variants,
                "connectmm",
                "connectmm"
              )
            }
          )}
        >
          {"Click here to install Metamask"}
        </a>
      ) : null}
      {(
        hasVariant(variants, "sendtxnconsent", "sendtxnconsent") ? true : true
      ) ? (
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__dvzO3,
            {
              [sty.text__sendtxnconsent__dvzO3LjVjA]: hasVariant(
                variants,
                "sendtxnconsent",
                "sendtxnconsent"
              )
            }
          )}
        >
          {"( Please agree to the terms and conditions )"}
        </div>
      ) : null}
    </div>
  ) : null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "mainbutton",
    "svg",
    "copybutton",
    "copyimage",
    "installmetamasktext"
  ],

  mainbutton: ["mainbutton"],
  svg: ["svg"],
  copybutton: ["copybutton", "copyimage"],
  copyimage: ["copyimage"],
  installmetamasktext: ["installmetamasktext"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicButtonB__ArgProps,
      internalVariantPropNames: PlasmicButtonB__VariantProps
    });

    const { dataFetches } = props;
    return PlasmicButtonB__RenderFunc({
      variants,
      args,
      overrides,
      dataFetches,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicButtonB";
  } else {
    func.displayName = `PlasmicButtonB.${nodeName}`;
  }
  return func;
}

export const PlasmicButtonB = Object.assign(
  // Top-level PlasmicButtonB renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    mainbutton: makeNodeComponent("mainbutton"),
    svg: makeNodeComponent("svg"),
    copybutton: makeNodeComponent("copybutton"),
    copyimage: makeNodeComponent("copyimage"),
    installmetamasktext: makeNodeComponent("installmetamasktext"),
    // Metadata about props expected for PlasmicButtonB
    internalVariantProps: PlasmicButtonB__VariantProps,
    internalArgProps: PlasmicButtonB__ArgProps
  }
);

export default PlasmicButtonB;
/* prettier-ignore-end */
