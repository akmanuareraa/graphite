// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: q50-pcd5Qb2
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import TabA from "../../TabA"; // plasmic-import: 4t9Lx1xGXs/component
import ParamDisplay from "../../ParamDisplay"; // plasmic-import: Pzz-_WqNylx/component
import Txndashboardcomponent from "../../Txndashboardcomponent"; // plasmic-import: hVy-CJexZCU/component
import Consentandsubmit from "../../Consentandsubmit"; // plasmic-import: eZig3v-AJ7/component
import ButtonB from "../../ButtonB"; // plasmic-import: oSXCQ8ez26/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_project_5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicBeFormB2.module.css"; // plasmic-import: q50-pcd5Qb2/css

export const PlasmicBeFormB2__VariantProps = new Array("versiontwo");

export const PlasmicBeFormB2__ArgProps = new Array(
  "applicationNo",
  "txnNo",
  "receiptNo",
  "paymentDate",
  "fullName",
  "passportNo",
  "fileNo",
  "nationality",
  "accompanied",
  "orgName",
  "orgFileNo",
  "appfeeq",
  "taxq",
  "iksfeeq",
  "appfeecu",
  "iksfeecu",
  "taxcu",
  "totalcharge",
  "totalgpi"
);

function PlasmicBeFormB2__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
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
        sty.root
      )}
    >
      <div
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.text___0TiAf
        )}
      >
        {"ID CARD APPLICATION"}
      </div>

      <div
        data-plasmic-name={"applicationForm"}
        data-plasmic-override={overrides.applicationForm}
        className={classNames(projectcss.all, sty.applicationForm)}
      >
        <p.Stack
          as={"div"}
          hasGap={true}
          className={classNames(projectcss.all, sty.freeBox__a56Tv)}
        >
          {true ? (
            <p.Stack
              as={"div"}
              hasGap={true}
              className={classNames(projectcss.all, sty.freeBox__faKu2)}
            >
              <TabA
                data-plasmic-name={"applicationtab"}
                data-plasmic-override={overrides.applicationtab}
                className={classNames("__wab_instance", sty.applicationtab)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__ox3Iv
                  )}
                >
                  {"APPLICATION DETAILS"}
                </div>
              </TabA>

              <TabA
                data-plasmic-name={"applicanttab"}
                data-plasmic-override={overrides.applicanttab}
                className={classNames("__wab_instance", sty.applicanttab)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__dLgRt
                  )}
                >
                  {"APPLICANT DETAILS"}
                </div>
              </TabA>

              <TabA
                data-plasmic-name={"orgtab"}
                data-plasmic-override={overrides.orgtab}
                className={classNames("__wab_instance", sty.orgtab)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__gP5Xb
                  )}
                >
                  {"ORGANIZATION DETAILS"}
                </div>
              </TabA>
            </p.Stack>
          ) : null}

          <ParamDisplay
            data-plasmic-name={"paramdisplay"}
            data-plasmic-override={overrides.paramdisplay}
            accompanied={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.accompanied
            })}
            applicant={true}
            applicationNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.applicationNo
            })}
            className={classNames("__wab_instance", sty.paramdisplay)}
            fileNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.fileNo
            })}
            fullName={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.fullName
            })}
            nationality={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.nationality
            })}
            orgFileNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.orgFileNo
            })}
            orgName={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.orgName
            })}
            passportNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.passportNo
            })}
            paymentDate={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.paymentDate
            })}
            receiptNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.receiptNo
            })}
            txnNo={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.txnNo
            })}
          />

          <div className={classNames(projectcss.all, sty.freeBox__dYo6)}>
            {true ? (
              <Txndashboardcomponent
                data-plasmic-name={"transactiondashboard"}
                data-plasmic-override={overrides.transactiondashboard}
                appfeecu={p.renderPlasmicSlot({
                  defaultContents: "1000",
                  value: args.appfeecu
                })}
                appfeeq={p.renderPlasmicSlot({
                  defaultContents: "100",
                  value: args.appfeeq
                })}
                className={classNames(
                  "__wab_instance",
                  sty.transactiondashboard
                )}
                iksfeecu={p.renderPlasmicSlot({
                  defaultContents: "100",
                  value: args.iksfeecu
                })}
                iksfeeq={p.renderPlasmicSlot({
                  defaultContents: "1",
                  value: args.iksfeeq
                })}
                taxcu={p.renderPlasmicSlot({
                  defaultContents: "100",
                  value: args.taxcu
                })}
                taxq={p.renderPlasmicSlot({
                  defaultContents: "1",
                  value: args.taxq
                })}
                totalcharge={p.renderPlasmicSlot({
                  defaultContents: "10000",
                  value: args.totalcharge
                })}
                totalgpi={p.renderPlasmicSlot({
                  defaultContents: "1.2656568",
                  value: args.totalgpi,
                  className: classNames(sty.slotTargetTotalgpi)
                })}
              />
            ) : null}
          </div>

          <Consentandsubmit
            data-plasmic-name={"consent"}
            data-plasmic-override={overrides.consent}
            className={classNames("__wab_instance", sty.consent)}
          />

          {true ? (
            <ButtonB
              data-plasmic-name={"formbutton"}
              data-plasmic-override={overrides.formbutton}
              className={classNames("__wab_instance", sty.formbutton)}
              success={true}
            />
          ) : null}
        </p.Stack>
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "applicationForm",
    "applicationtab",
    "applicanttab",
    "orgtab",
    "paramdisplay",
    "transactiondashboard",
    "consent",
    "formbutton"
  ],

  applicationForm: [
    "applicationForm",
    "applicationtab",
    "applicanttab",
    "orgtab",
    "paramdisplay",
    "transactiondashboard",
    "consent",
    "formbutton"
  ],

  applicationtab: ["applicationtab"],
  applicanttab: ["applicanttab"],
  orgtab: ["orgtab"],
  paramdisplay: ["paramdisplay"],
  transactiondashboard: ["transactiondashboard"],
  consent: ["consent"],
  formbutton: ["formbutton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicBeFormB2__ArgProps,
      internalVariantPropNames: PlasmicBeFormB2__VariantProps
    });

    return PlasmicBeFormB2__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicBeFormB2";
  } else {
    func.displayName = `PlasmicBeFormB2.${nodeName}`;
  }
  return func;
}

export const PlasmicBeFormB2 = Object.assign(
  // Top-level PlasmicBeFormB2 renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    applicationForm: makeNodeComponent("applicationForm"),
    applicationtab: makeNodeComponent("applicationtab"),
    applicanttab: makeNodeComponent("applicanttab"),
    orgtab: makeNodeComponent("orgtab"),
    paramdisplay: makeNodeComponent("paramdisplay"),
    transactiondashboard: makeNodeComponent("transactiondashboard"),
    consent: makeNodeComponent("consent"),
    formbutton: makeNodeComponent("formbutton"),
    // Metadata about props expected for PlasmicBeFormB2
    internalVariantProps: PlasmicBeFormB2__VariantProps,
    internalArgProps: PlasmicBeFormB2__ArgProps
  }
);

export default PlasmicBeFormB2;
/* prettier-ignore-end */
