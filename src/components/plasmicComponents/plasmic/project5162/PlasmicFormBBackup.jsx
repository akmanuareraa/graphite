// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: lzrj0EFvzjD
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import TabA from "../../TabA"; // plasmic-import: 4t9Lx1xGXs/component
import ParamDisplay from "../../ParamDisplay"; // plasmic-import: Pzz-_WqNylx/component
import Consentandsubmit from "../../Consentandsubmit"; // plasmic-import: eZig3v-AJ7/component
import ButtonB from "../../ButtonB"; // plasmic-import: oSXCQ8ez26/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_project5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicFormBBackup.module.css"; // plasmic-import: lzrj0EFvzjD/css

export const PlasmicFormBBackup__VariantProps = new Array();

export const PlasmicFormBBackup__ArgProps = new Array(
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
  "orgFileNo"
);

function PlasmicFormBBackup__RenderFunc(props) {
  const { variants, args, overrides, forNode, dataFetches } = props;
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
        <div className={classNames(projectcss.all, sty.freeBox__wRcRd)}>
          <div
            data-plasmic-name={"frame3"}
            data-plasmic-override={overrides.frame3}
            className={classNames(projectcss.all, sty.frame3)}
          >
            <div
              data-plasmic-name={"graphiteLogo2"}
              data-plasmic-override={overrides.graphiteLogo2}
              className={classNames(projectcss.all, sty.graphiteLogo2)}
            />

            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__vw6Tx
              )}
            >
              {"POWERED BY"}
            </div>
          </div>
        </div>

        {true ? (
          <p.Stack
            as={"div"}
            hasGap={true}
            className={classNames(projectcss.all, sty.freeBox__cqFtn)}
          >
            {true ? (
              <TabA
                data-plasmic-name={"applicationtab"}
                data-plasmic-override={overrides.applicationtab}
                className={classNames("__wab_instance", sty.applicationtab)}
              >
                {"APPLICATION DETAILS"}
              </TabA>
            ) : null}

            <TabA
              data-plasmic-name={"applicanttab"}
              data-plasmic-override={overrides.applicanttab}
              className={classNames("__wab_instance", sty.applicanttab)}
            >
              {"APPLICANT DETAILS"}
            </TabA>

            <TabA
              data-plasmic-name={"orgtab"}
              data-plasmic-override={overrides.orgtab}
              className={classNames("__wab_instance", sty.orgtab)}
            >
              {"ORGANIZATION DETAILS"}
            </TabA>
          </p.Stack>
        ) : null}

        <div className={classNames(projectcss.all, sty.freeBox__lAfZp)}>
          <ParamDisplay
            data-plasmic-name={"paramdisplay"}
            data-plasmic-override={overrides.paramdisplay}
            accompanied={p.renderPlasmicSlot({
              defaultContents: "N/A",
              value: args.accompanied
            })}
            applicant={"applicant"}
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
        </div>

        {true ? (
          <div className={classNames(projectcss.all, sty.freeBox__g4Zee)}>
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text___88ZTy
              )}
            >
              {"TRANSACTION FEE"}
            </div>

            <p.Stack
              as={"div"}
              hasGap={true}
              className={classNames(projectcss.all, sty.freeBox__nfbQk)}
            >
              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text__uClb
                )}
              >
                {"CHARGE NAME"}
              </div>

              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text__dvBcJ
                )}
              >
                {"QUANTITY"}
              </div>

              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text__bifBt
                )}
              >
                {"CHARGE UNIT"}
              </div>

              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text___4GhcS
                )}
              >
                {"CHARGE TOTAL"}
              </div>
            </p.Stack>

            {true ? (
              <div className={classNames(projectcss.all, sty.freeBox__fnPjI)}>
                <div className={classNames(projectcss.all, sty.freeBox___1AEu)}>
                  <p.Stack
                    as={"div"}
                    hasGap={true}
                    className={classNames(projectcss.all, sty.freeBox__bNduE)}
                  >
                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text___1GYf3
                      )}
                    >
                      {"Application Fee"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__wxoJi
                      )}
                    >
                      {"Innovation, Knowledge and Service Fee"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__puEb7
                      )}
                    >
                      {"Tax (13%)"}
                    </div>
                  </p.Stack>

                  <p.Stack
                    as={"div"}
                    hasGap={true}
                    className={classNames(projectcss.all, sty.freeBox__fsRlk)}
                  >
                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__nxbH
                      )}
                    >
                      {"100"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__zzd8B
                      )}
                    >
                      {"1"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__hWlz5
                      )}
                    >
                      {"1"}
                    </div>
                  </p.Stack>

                  <p.Stack
                    as={"div"}
                    hasGap={true}
                    className={classNames(projectcss.all, sty.freeBox__el6H)}
                  >
                    <div
                      className={classNames(
                        projectcss.all,
                        sty.freeBox___5Hwlq
                      )}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__z4P0
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__sOqP
                        )}
                      >
                        {"100"}
                      </div>
                    </div>

                    <div
                      className={classNames(projectcss.all, sty.freeBox__wfo58)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__xGj5D
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__q2Mxk
                        )}
                      >
                        {"100"}
                      </div>
                    </div>

                    <div
                      className={classNames(projectcss.all, sty.freeBox__l7H47)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__cfGgN
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text___1XAqG
                        )}
                      >
                        {"100"}
                      </div>
                    </div>
                  </p.Stack>

                  <p.Stack
                    as={"div"}
                    hasGap={true}
                    className={classNames(projectcss.all, sty.freeBox__vEcgY)}
                  >
                    <div
                      className={classNames(projectcss.all, sty.freeBox__wUVeA)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__mw6Sn
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__hf3Nz
                        )}
                      >
                        {"100"}
                      </div>
                    </div>

                    <div
                      className={classNames(projectcss.all, sty.freeBox__gzjzX)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__sMocU
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__mzh6I
                        )}
                      >
                        {"100"}
                      </div>
                    </div>

                    <div
                      className={classNames(projectcss.all, sty.freeBox__tbzpo)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__zzYd
                        )}
                      >
                        {"$"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__wzNqK
                        )}
                      >
                        {"100"}
                      </div>
                    </div>
                  </p.Stack>
                </div>
              </div>
            ) : null}

            <div className={classNames(projectcss.all, sty.freeBox__b0L1S)}>
              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text__l3Xpl
                )}
              >
                {"CHARGE TOTAL"}
              </div>

              {true ? (
                <div className={classNames(projectcss.all, sty.freeBox__uhy3B)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__n0CFv
                    )}
                  >
                    {"$"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__bySd
                    )}
                  >
                    {"10000"}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={classNames(projectcss.all, sty.freeBox__sQoDj)}>
              <div
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.text__nh7Ws
                )}
              >
                {"AMOUNT TO PAY IN GPI"}
              </div>

              {true ? (
                <p.Stack
                  as={"div"}
                  hasGap={true}
                  className={classNames(projectcss.all, sty.freeBox___4U9Y)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__qeOx5
                    )}
                  >
                    {"1.2656568"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__epzkQ
                    )}
                  >
                    {"GPI"}
                  </div>
                </p.Stack>
              ) : null}
            </div>
          </div>
        ) : null}

        <Consentandsubmit
          data-plasmic-name={"consent"}
          data-plasmic-override={overrides.consent}
          className={classNames("__wab_instance", sty.consent)}
        />
      </div>

      {true ? (
        <ButtonB
          data-plasmic-name={"formbutton"}
          data-plasmic-override={overrides.formbutton}
          className={classNames("__wab_instance", sty.formbutton)}
          connectmm={"connectmm"}
        />
      ) : null}
    </div>
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "applicationForm",
    "frame3",
    "graphiteLogo2",
    "applicationtab",
    "applicanttab",
    "orgtab",
    "paramdisplay",
    "consent",
    "formbutton"
  ],

  applicationForm: [
    "applicationForm",
    "frame3",
    "graphiteLogo2",
    "applicationtab",
    "applicanttab",
    "orgtab",
    "paramdisplay",
    "consent"
  ],

  frame3: ["frame3", "graphiteLogo2"],
  graphiteLogo2: ["graphiteLogo2"],
  applicationtab: ["applicationtab"],
  applicanttab: ["applicanttab"],
  orgtab: ["orgtab"],
  paramdisplay: ["paramdisplay"],
  consent: ["consent"],
  formbutton: ["formbutton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicFormBBackup__ArgProps,
      internalVariantPropNames: PlasmicFormBBackup__VariantProps
    });

    const { dataFetches } = props;
    return PlasmicFormBBackup__RenderFunc({
      variants,
      args,
      overrides,
      dataFetches,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicFormBBackup";
  } else {
    func.displayName = `PlasmicFormBBackup.${nodeName}`;
  }
  return func;
}

export const PlasmicFormBBackup = Object.assign(
  // Top-level PlasmicFormBBackup renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    applicationForm: makeNodeComponent("applicationForm"),
    frame3: makeNodeComponent("frame3"),
    graphiteLogo2: makeNodeComponent("graphiteLogo2"),
    applicationtab: makeNodeComponent("applicationtab"),
    applicanttab: makeNodeComponent("applicanttab"),
    orgtab: makeNodeComponent("orgtab"),
    paramdisplay: makeNodeComponent("paramdisplay"),
    consent: makeNodeComponent("consent"),
    formbutton: makeNodeComponent("formbutton"),
    // Metadata about props expected for PlasmicFormBBackup
    internalVariantProps: PlasmicFormBBackup__VariantProps,
    internalArgProps: PlasmicFormBBackup__ArgProps
  }
);

export default PlasmicFormBBackup;
/* prettier-ignore-end */