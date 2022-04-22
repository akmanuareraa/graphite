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
import projectcss from "../project_5162/plasmic_project_5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicButtonB.module.css"; // plasmic-import: oSXCQ8ez26/css
import MetamasksvgIcon from "./icons/PlasmicIcon__Metamasksvg"; // plasmic-import: oUB_LRSSgs/icon
import graphiteLogoInvpngB3LtWjF49 from "./images/graphiteLogoInvpng.png"; // plasmic-import: B3LtWjF49/picture
import failgifGV67UXTi from "./images/failgif.gif"; // plasmic-import: gV6-7uXTi/picture
import successCropgifUneR0OkrA from "./images/successCropgif.gif"; // plasmic-import: uneR0OkrA/picture
import loadergifESQzAuv1I from "./images/loadergif.gif"; // plasmic-import: eSQzAuv1i/picture

export const PlasmicButtonB__VariantProps = new Array(
  "installmm",
  "connectmm",
  "sendtxn",
  "processing",
  "success",
  "failed",
  "sendtxnconsent",
  "salesorder",
  "sendtxnconsentso",
  "sendtxnso",
  "invoice",
  "sendtxnconsentinv",
  "sendtxninv",
  "logistics",
  "sendtxnconsentlog",
  "sendtxnlog"
);

export const PlasmicButtonB__ArgProps = new Array(
  "hash",
  "onClick",
  "timer",
  "timer2"
);

function PlasmicButtonB__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (hasVariant(variants, "failed", "failed") ? true : true) ? (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_tokens,
        sty.root,
        {
          [sty.rootconnectmm]: hasVariant(variants, "connectmm", "connectmm"),
          [sty.rootfailed]: hasVariant(variants, "failed", "failed"),
          [sty.rootinstallmm]: hasVariant(variants, "installmm", "installmm"),
          [sty.rootinvoice]: hasVariant(variants, "invoice", "invoice"),
          [sty.rootlogistics]: hasVariant(variants, "logistics", "logistics"),
          [sty.rootprocessing]: hasVariant(
            variants,
            "processing",
            "processing"
          ),

          [sty.rootsalesorder]: hasVariant(
            variants,
            "salesorder",
            "salesorder"
          ),

          [sty.rootsendtxn]: hasVariant(variants, "sendtxn", "sendtxn"),
          [sty.rootsendtxnconsent]: hasVariant(
            variants,
            "sendtxnconsent",
            "sendtxnconsent"
          ),

          [sty.rootsendtxnconsentinv]: hasVariant(
            variants,
            "sendtxnconsentinv",
            "sendtxnconsentinv"
          ),

          [sty.rootsendtxnconsentlog]: hasVariant(
            variants,
            "sendtxnconsentlog",
            "sendtxnconsentlog"
          ),

          [sty.rootsendtxnconsentso]: hasVariant(
            variants,
            "sendtxnconsentso",
            "sendtxnconsentso"
          ),

          [sty.rootsendtxninv]: hasVariant(
            variants,
            "sendtxninv",
            "sendtxninv"
          ),

          [sty.rootsendtxnlog]: hasVariant(
            variants,
            "sendtxnlog",
            "sendtxnlog"
          ),

          [sty.rootsendtxnso]: hasVariant(variants, "sendtxnso", "sendtxnso"),
          [sty.rootsuccess]: hasVariant(variants, "success", "success")
        }
      )}
    >
      <p.Stack
        as={"button"}
        data-plasmic-name={"mainbutton"}
        data-plasmic-override={overrides.mainbutton}
        hasGap={true}
        className={classNames(
          projectcss.all,
          projectcss.button,
          sty.mainbutton,
          {
            [sty.mainbuttonconnectmm]: hasVariant(
              variants,
              "connectmm",
              "connectmm"
            ),

            [sty.mainbuttonfailed]: hasVariant(variants, "failed", "failed"),
            [sty.mainbuttoninstallmm]: hasVariant(
              variants,
              "installmm",
              "installmm"
            ),

            [sty.mainbuttonlogistics]: hasVariant(
              variants,
              "logistics",
              "logistics"
            ),

            [sty.mainbuttonprocessing]: hasVariant(
              variants,
              "processing",
              "processing"
            ),

            [sty.mainbuttonsalesorder]: hasVariant(
              variants,
              "salesorder",
              "salesorder"
            ),

            [sty.mainbuttonsendtxn]: hasVariant(variants, "sendtxn", "sendtxn"),
            [sty.mainbuttonsendtxnconsent]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            ),

            [sty.mainbuttonsuccess]: hasVariant(variants, "success", "success")
          }
        )}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__nRlS5,
            {
              [sty.textconnectmm__nRlS5SqZmt]: hasVariant(
                variants,
                "connectmm",
                "connectmm"
              ),

              [sty.textfailed__nRlS5OcDdJ]: hasVariant(
                variants,
                "failed",
                "failed"
              ),

              [sty.textinstallmm__nRlS5VXuOp]: hasVariant(
                variants,
                "installmm",
                "installmm"
              ),

              [sty.textinvoice__nRlS5MXQyB]: hasVariant(
                variants,
                "invoice",
                "invoice"
              ),

              [sty.textlogistics__nRlS5KbJf2]: hasVariant(
                variants,
                "logistics",
                "logistics"
              ),

              [sty.textprocessing__nRlS5Pdh5H]: hasVariant(
                variants,
                "processing",
                "processing"
              ),

              [sty.textsalesorder__nRlS5AwkTr]: hasVariant(
                variants,
                "salesorder",
                "salesorder"
              ),

              [sty.textsendtxn__nRlS5QfRAj]: hasVariant(
                variants,
                "sendtxn",
                "sendtxn"
              ),

              [sty.textsendtxnconsent__nRlS5LjVjA]: hasVariant(
                variants,
                "sendtxnconsent",
                "sendtxnconsent"
              ),

              [sty.textsendtxnconsentinv__nRlS5N0H5]: hasVariant(
                variants,
                "sendtxnconsentinv",
                "sendtxnconsentinv"
              ),

              [sty.textsendtxnconsentlog__nRlS59Uo71]: hasVariant(
                variants,
                "sendtxnconsentlog",
                "sendtxnconsentlog"
              ),

              [sty.textsendtxninv__nRlS5WqMv]: hasVariant(
                variants,
                "sendtxninv",
                "sendtxninv"
              ),

              [sty.textsendtxnlog__nRlS5Achdx]: hasVariant(
                variants,
                "sendtxnlog",
                "sendtxnlog"
              ),

              [sty.textsuccess__nRlS5KPrSc]: hasVariant(
                variants,
                "success",
                "success"
              )
            }
          )}
        >
          {hasVariant(variants, "salesorder", "salesorder")
            ? "Create Sales Order"
            : hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
            ? "Sign and Submit Request"
            : hasVariant(variants, "failed", "failed")
            ? "Transaction Failed"
            : hasVariant(variants, "success", "success")
            ? "Transaction Successful"
            : hasVariant(variants, "processing", "processing")
            ? "Transaction in Process"
            : hasVariant(variants, "sendtxn", "sendtxn")
            ? "Sign and Submit Request"
            : hasVariant(variants, "connectmm", "connectmm")
            ? "Connect Metamask Account"
            : hasVariant(variants, "sendtxnlog", "sendtxnlog")
            ? "Confirm Logistics"
            : hasVariant(variants, "sendtxnconsentlog", "sendtxnconsentlog")
            ? "Confirm Logistics"
            : hasVariant(variants, "logistics", "logistics")
            ? "Create Logistics"
            : hasVariant(variants, "sendtxninv", "sendtxninv")
            ? "Confirm Invoice"
            : hasVariant(variants, "sendtxnconsentinv", "sendtxnconsentinv")
            ? "Confirm Invoice"
            : hasVariant(variants, "invoice", "invoice")
            ? "Create Invoice"
            : hasVariant(variants, "installmm", "installmm")
            ? "Install Metamask"
            : "Confirm Sales Order"}
        </div>

        {(hasVariant(variants, "connectmm", "connectmm") ? true : true) ? (
          <MetamasksvgIcon
            className={classNames(projectcss.all, sty.svg__gyZm, {
              [sty.svgconnectmm__gyZmSqZmt]: hasVariant(
                variants,
                "connectmm",
                "connectmm"
              )
            })}
            role={"img"}
          />
        ) : null}
        {(hasVariant(variants, "installmm", "installmm") ? true : true) ? (
          <MetamasksvgIcon
            className={classNames(projectcss.all, sty.svg__iJNmD, {
              [sty.svginstallmm__iJNmDvXuOp]: hasVariant(
                variants,
                "installmm",
                "installmm"
              )
            })}
            role={"img"}
          />
        ) : null}
        {(
          hasVariant(variants, "sendtxnconsent", "sendtxnconsent") ? true : true
        ) ? (
          <p.PlasmicImg
            alt={""}
            className={classNames(sty.img__ogYqa, {
              [sty.imgsendtxnconsent__ogYqaLjVjA]: hasVariant(
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
            displayWidth={"42px"}
            loading={"lazy"}
            src={{
              src: graphiteLogoInvpngB3LtWjF49,
              fullWidth: 117,
              fullHeight: 106,
              aspectRatio: undefined
            }}
          />
        ) : null}
        {(hasVariant(variants, "failed", "failed") ? true : true) ? (
          <p.PlasmicImg
            alt={""}
            className={classNames(sty.img__oWsst, {
              [sty.imgfailed__oWsstocDdJ]: hasVariant(
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
            className={classNames(sty.img__kOt3V, {
              [sty.imgsuccess__kOt3VkPrSc]: hasVariant(
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
        {(hasVariant(variants, "processing", "processing") ? true : true) ? (
          <p.PlasmicImg
            alt={""}
            className={classNames(sty.img__oIaL1, {
              [sty.imgprocessing__oIaL1Pdh5H]: hasVariant(
                variants,
                "processing",
                "processing"
              )
            })}
            displayHeight={"50px"}
            displayMaxHeight={"none"}
            displayMaxWidth={"none"}
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
        {(hasVariant(variants, "sendtxn", "sendtxn") ? true : true) ? (
          <p.PlasmicImg
            alt={""}
            className={classNames(sty.img__fUSlm, {
              [sty.imgsendtxn__fUSlmQfRAj]: hasVariant(
                variants,
                "sendtxn",
                "sendtxn"
              )
            })}
            displayHeight={"42px"}
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={"42px"}
            loading={"lazy"}
            src={{
              src: graphiteLogoInvpngB3LtWjF49,
              fullWidth: 117,
              fullHeight: 106,
              aspectRatio: undefined
            }}
          />
        ) : null}
      </p.Stack>

      {(hasVariant(variants, "success", "success") ? true : true) ? (
        <div
          className={classNames(projectcss.all, sty.freeBox___4NAoc, {
            [sty.freeBoxsuccess___4NAockPrSc]: hasVariant(
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
                  [sty.textsuccess__rSbHKPrSc]: hasVariant(
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
                [sty.freeBoxsuccess__ltjiykPrSc]: hasVariant(
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
                  [sty.slotTargetHashsuccess]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                })
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {(hasVariant(variants, "connectmm", "connectmm") ? true : false) ? (
        <a
          data-plasmic-name={"installmetamasktext"}
          data-plasmic-override={overrides.installmetamasktext}
          className={classNames(
            projectcss.all,
            projectcss.a,
            projectcss.__wab_text,
            sty.installmetamasktext,
            {
              [sty.installmetamasktextconnectmm]: hasVariant(
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
        hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? false
          : hasVariant(variants, "failed", "failed")
          ? true
          : hasVariant(variants, "success", "success")
          ? true
          : false
      ) ? (
        <div
          className={classNames(projectcss.all, sty.freeBox__uQsb, {
            [sty.freeBoxfailed__uQsBocDdJ]: hasVariant(
              variants,
              "failed",
              "failed"
            ),

            [sty.freeBoxsendtxnconsent__uQsbljVjA]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            ),

            [sty.freeBoxsuccess__uQsBkPrSc]: hasVariant(
              variants,
              "success",
              "success"
            )
          })}
        >
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : true
          ) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__euXxt,
                {
                  [sty.textfailed__euXxTocDdJ]: hasVariant(
                    variants,
                    "failed",
                    "failed"
                  ),

                  [sty.textsuccess__euXxTkPrSc]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                }
              )}
            >
              {"Redirecting in "}
            </div>
          ) : null}
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : false
          ) ? (
            <div
              className={classNames(projectcss.all, sty.freeBox__gxcma, {
                [sty.freeBoxfailed__gxcmAocDdJ]: hasVariant(
                  variants,
                  "failed",
                  "failed"
                ),

                [sty.freeBoxsuccess__gxcmAkPrSc]: hasVariant(
                  variants,
                  "success",
                  "success"
                )
              })}
            >
              {p.renderPlasmicSlot({
                defaultContents: "5",
                value: args.timer
              })}
            </div>
          ) : null}
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : false
          ) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text___6IsjH,
                {
                  [sty.textfailed___6IsjHocDdJ]: hasVariant(
                    variants,
                    "failed",
                    "failed"
                  ),

                  [sty.textsuccess___6IsjHkPrSc]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                }
              )}
            >
              {" seconds..."}
            </div>
          ) : null}
        </div>
      ) : null}
      {(
        hasVariant(variants, "sendtxnconsentso", "sendtxnconsentso")
          ? true
          : hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? true
          : hasVariant(variants, "sendtxnlog", "sendtxnlog")
          ? false
          : hasVariant(variants, "sendtxnconsentlog", "sendtxnconsentlog")
          ? true
          : hasVariant(variants, "sendtxninv", "sendtxninv")
          ? false
          : hasVariant(variants, "sendtxnconsentinv", "sendtxnconsentinv")
          ? true
          : hasVariant(variants, "sendtxnso", "sendtxnso")
          ? false
          : false
      ) ? (
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__wsCoW,
            {
              [sty.textfailed__wsCoWocDdJ]: hasVariant(
                variants,
                "failed",
                "failed"
              ),

              [sty.textsendtxnconsent__wsCoWljVjA]: hasVariant(
                variants,
                "sendtxnconsent",
                "sendtxnconsent"
              ),

              [sty.textsendtxnconsentinv__wsCoWn0H5]: hasVariant(
                variants,
                "sendtxnconsentinv",
                "sendtxnconsentinv"
              ),

              [sty.textsendtxnconsentlog__wsCoW9Uo71]: hasVariant(
                variants,
                "sendtxnconsentlog",
                "sendtxnconsentlog"
              ),

              [sty.textsendtxnconsentso__wsCoWEknV0]: hasVariant(
                variants,
                "sendtxnconsentso",
                "sendtxnconsentso"
              ),

              [sty.textsendtxninv__wsCoWwqMv]: hasVariant(
                variants,
                "sendtxninv",
                "sendtxninv"
              ),

              [sty.textsendtxnlog__wsCoWAchdx]: hasVariant(
                variants,
                "sendtxnlog",
                "sendtxnlog"
              ),

              [sty.textsendtxnso__wsCoWcK3Fg]: hasVariant(
                variants,
                "sendtxnso",
                "sendtxnso"
              )
            }
          )}
        >
          {"( Please agree to the terms and conditions )"}
        </div>
      ) : null}
      {(
        hasVariant(variants, "sendtxnconsent", "sendtxnconsent")
          ? false
          : hasVariant(variants, "failed", "failed")
          ? true
          : hasVariant(variants, "success", "success")
          ? true
          : false
      ) ? (
        <div
          className={classNames(projectcss.all, sty.freeBox__cYhkM, {
            [sty.freeBoxfailed__cYhkMocDdJ]: hasVariant(
              variants,
              "failed",
              "failed"
            ),

            [sty.freeBoxsendtxnconsent__cYhkMljVjA]: hasVariant(
              variants,
              "sendtxnconsent",
              "sendtxnconsent"
            ),

            [sty.freeBoxsuccess__cYhkMkPrSc]: hasVariant(
              variants,
              "success",
              "success"
            )
          })}
        >
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : true
          ) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__ruRcb,
                {
                  [sty.textfailed__ruRcbocDdJ]: hasVariant(
                    variants,
                    "failed",
                    "failed"
                  ),

                  [sty.textsuccess__ruRcbkPrSc]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                }
              )}
            >
              {"Redirecting in "}
            </div>
          ) : null}
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : false
          ) ? (
            <div
              className={classNames(projectcss.all, sty.freeBox__hUNzM, {
                [sty.freeBoxfailed__hUNzMocDdJ]: hasVariant(
                  variants,
                  "failed",
                  "failed"
                ),

                [sty.freeBoxsuccess__hUNzMkPrSc]: hasVariant(
                  variants,
                  "success",
                  "success"
                )
              })}
            >
              {p.renderPlasmicSlot({
                defaultContents: "5",
                value: args.timer2
              })}
            </div>
          ) : null}
          {(
            hasVariant(variants, "failed", "failed")
              ? true
              : hasVariant(variants, "success", "success")
              ? true
              : false
          ) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__jfLtw,
                {
                  [sty.textfailed__jfLtWocDdJ]: hasVariant(
                    variants,
                    "failed",
                    "failed"
                  ),

                  [sty.textsuccess__jfLtWkPrSc]: hasVariant(
                    variants,
                    "success",
                    "success"
                  )
                }
              )}
            >
              {" seconds..."}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
}

const PlasmicDescendants = {
  root: ["root", "mainbutton", "installmetamasktext"],
  mainbutton: ["mainbutton"],
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

    return PlasmicButtonB__RenderFunc({
      variants,
      args,
      overrides,
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
    installmetamasktext: makeNodeComponent("installmetamasktext"),
    // Metadata about props expected for PlasmicButtonB
    internalVariantProps: PlasmicButtonB__VariantProps,
    internalArgProps: PlasmicButtonB__ArgProps
  }
);

export default PlasmicButtonB;
/* prettier-ignore-end */