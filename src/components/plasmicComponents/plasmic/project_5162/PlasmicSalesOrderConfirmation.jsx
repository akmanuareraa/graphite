// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 5GT6nVB5WgvLWb2iBXTk1E
// Component: 06rRaje_XQa
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import Consentandsubmit from "../../Consentandsubmit"; // plasmic-import: eZig3v-AJ7/component
import ButtonB from "../../ButtonB"; // plasmic-import: oSXCQ8ez26/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_project_5162.module.css"; // plasmic-import: 5GT6nVB5WgvLWb2iBXTk1E/projectcss
import sty from "./PlasmicSalesOrderConfirmation.module.css"; // plasmic-import: 06rRaje_XQa/css

export const PlasmicSalesOrderConfirmation__VariantProps = new Array(
  "loading",
  "notfound",
  "confirmed"
);

export const PlasmicSalesOrderConfirmation__ArgProps = new Array(
  "pono",
  "children",
  "slot",
  "slot2",
  "slot3",
  "slot4",
  "slot5"
);

function PlasmicSalesOrderConfirmation__RenderFunc(props) {
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
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.text___8TsS7
        )}
      >
        {"SALES ORDER CONFIRMATION"}
      </div>

      <div
        data-plasmic-name={"applicationForm"}
        data-plasmic-override={overrides.applicationForm}
        className={classNames(projectcss.all, sty.applicationForm, {
          [sty.applicationForm__confirmed]: hasVariant(
            variants,
            "confirmed",
            "confirmed"
          ),

          [sty.applicationForm__loading]: hasVariant(
            variants,
            "loading",
            "loading"
          ),

          [sty.applicationForm__notfound]: hasVariant(
            variants,
            "notfound",
            "notfound"
          )
        })}
      >
        {(
          hasVariant(variants, "confirmed", "confirmed")
            ? false
            : hasVariant(variants, "notfound", "notfound")
            ? false
            : hasVariant(variants, "loading", "loading")
            ? false
            : true
        ) ? (
          <p.Stack
            as={"div"}
            hasGap={true}
            className={classNames(projectcss.all, sty.freeBox__zponD, {
              [sty.freeBox__confirmed__zponDok5D2]: hasVariant(
                variants,
                "confirmed",
                "confirmed"
              ),

              [sty.freeBox__loading__zponDnqWfg]: hasVariant(
                variants,
                "loading",
                "loading"
              ),

              [sty.freeBox__notfound__zponDmPOd]: hasVariant(
                variants,
                "notfound",
                "notfound"
              )
            })}
          >
            <div className={classNames(projectcss.all, sty.freeBox___8LufF)}>
              <div className={classNames(projectcss.all, sty.freeBox__gewWb)}>
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__l4Ro
                  )}
                >
                  {"PO No"}
                </div>

                {true ? (
                  <div
                    className={classNames(projectcss.all, sty.freeBox__y4Hq1)}
                  >
                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__lRkiI
                      )}
                    >
                      {"#"}
                    </div>

                    <div
                      className={classNames(projectcss.all, sty.freeBox__jnRrA)}
                    >
                      {p.renderPlasmicSlot({
                        defaultContents: "ABC123",
                        value: args.pono,
                        className: classNames(sty.slotTargetPono)
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox__zMf9C)}
              >
                {true ? (
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__ieet7
                    )}
                  >
                    {"Order To: "}
                  </div>
                ) : null}
                {true ? (
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__wqWlN
                    )}
                  >
                    {"Ship To:"}
                  </div>
                ) : null}
              </p.Stack>
            ) : null}
            {true ? (
              <div className={classNames(projectcss.all, sty.freeBox__y4Mdc)}>
                <div className={classNames(projectcss.all, sty.freeBox__qkQhz)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__fZupo
                    )}
                  >
                    {"Supplier Name"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xVoQo
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"supplier"}
                    data-plasmic-override={overrides.supplier}
                    className={classNames(projectcss.all, sty.supplier)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.children,
                      className: classNames(sty.slotTargetChildren)
                    })}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__iZwuY)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__wcxpG
                    )}
                  >
                    {"Mode of Shipment"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__vfWf5
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"shipmentmode"}
                    data-plasmic-override={overrides.shipmentmode}
                    className={classNames(projectcss.all, sty.shipmentmode)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.slot,
                      className: classNames(sty.slotTargetSlot)
                    })}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__v2ULp)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__hfFt
                    )}
                  >
                    {"Country of Origin"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xRnQg
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"origincountry"}
                    data-plasmic-override={overrides.origincountry}
                    className={classNames(projectcss.all, sty.origincountry)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.slot2,
                      className: classNames(sty.slotTargetSlot2)
                    })}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__s3Nvt)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text___84I7H
                    )}
                  >
                    {"SAP Status"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__aqu6R
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"sap"}
                    data-plasmic-override={overrides.sap}
                    className={classNames(projectcss.all, sty.sap)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.slot3,
                      className: classNames(sty.slotTargetSlot3)
                    })}
                  </div>
                </div>

                <div
                  className={classNames(projectcss.all, sty.freeBox___1U569)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__altQg
                    )}
                  >
                    {"GRN Number"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__oug2R
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"grn"}
                    data-plasmic-override={overrides.grn}
                    className={classNames(projectcss.all, sty.grn)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.slot4,
                      className: classNames(sty.slotTargetSlot4)
                    })}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__iY4Jb)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text___9Qzu9
                    )}
                  >
                    {"Credit Note Value"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__epal
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"creditnotevalue"}
                    data-plasmic-override={overrides.creditnotevalue}
                    className={classNames(projectcss.all, sty.creditnotevalue)}
                  >
                    {p.renderPlasmicSlot({
                      defaultContents: "N/A",
                      value: args.slot5,
                      className: classNames(sty.slotTargetSlot5)
                    })}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__aiMKe)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__emJq
                    )}
                  >
                    {
                      "Balance Payable (Total Invoice Value - Credit Note Amount"
                    }
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text___7FFoH
                    )}
                  >
                    {":"}
                  </div>

                  <div
                    data-plasmic-name={"balance2"}
                    data-plasmic-override={overrides.balance2}
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.balance2
                    )}
                  >
                    {"$"}
                  </div>

                  <div
                    data-plasmic-name={"balance"}
                    data-plasmic-override={overrides.balance}
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.balance
                    )}
                  >
                    {"N/A"}
                  </div>
                </div>
              </div>
            ) : null}

            <Consentandsubmit
              data-plasmic-name={"consent"}
              data-plasmic-override={overrides.consent}
              className={classNames("__wab_instance", sty.consent)}
            />

            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox___0Tto4)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__hZLq
                  )}
                >
                  {"Order To: "}
                </div>

                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__dG7Aj
                  )}
                >
                  {"Ship To:"}
                </div>
              </p.Stack>
            ) : null}
            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox__eOd31)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text___8T728
                  )}
                >
                  {"ABC Company, \nLocation"}
                </div>

                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text__q3XHf
                  )}
                >
                  {"ABC Company, \nLocation"}
                </div>
              </p.Stack>
            ) : null}
            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox__v71)}
              >
                <div className={classNames(projectcss.all, sty.freeBox___10R)}>
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__lao3K
                    )}
                  >
                    {"Contact:"}
                  </div>

                  {true ? (
                    <p.Stack
                      as={"div"}
                      hasGap={true}
                      className={classNames(projectcss.all, sty.freeBox__i6HTm)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__zhbnD
                        )}
                      >
                        {"Name:"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__suTjw
                        )}
                      >
                        {"1234567890"}
                      </div>
                    </p.Stack>
                  ) : null}
                </div>

                <div
                  className={classNames(projectcss.all, sty.freeBox___8Xsno)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xaoJj
                    )}
                  >
                    {"Date:"}
                  </div>

                  {true ? (
                    <p.Stack
                      as={"div"}
                      hasGap={true}
                      className={classNames(
                        projectcss.all,
                        sty.freeBox___4Iwqc
                      )}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__hqPKm
                        )}
                      >
                        {"1234567890"}
                      </div>
                    </p.Stack>
                  ) : null}
                </div>
              </p.Stack>
            ) : null}
            {true ? (
              <div className={classNames(projectcss.all, sty.freeBox__nn9O3)}>
                <div
                  className={classNames(projectcss.all, sty.freeBox___2GtPf)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__ew770
                    )}
                  >
                    {"#"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__mUb1D
                    )}
                  >
                    {"Product ID"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xitpU
                    )}
                  >
                    {"Product"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__v3Sb
                    )}
                  >
                    {"Quantity"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__eiWs
                    )}
                  >
                    {"Unit Price"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xjzmt
                    )}
                  >
                    {"Total"}
                  </div>
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__mZjP)}>
                  <div
                    className={classNames(projectcss.all, sty.freeBox__cB2Y)}
                  >
                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text___5FiMz
                      )}
                    >
                      {"#"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__mNje
                      )}
                    >
                      {"Product ID"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__i3Ah0
                      )}
                    >
                      {"Product"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__uyM00
                      )}
                    >
                      {"Quantity"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__rcQq4
                      )}
                    >
                      {"Unit Price"}
                    </div>

                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text__hcG2G
                      )}
                    >
                      {"Total"}
                    </div>
                  </div>

                  {true ? (
                    <div
                      className={classNames(projectcss.all, sty.freeBox__u0PBd)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__csI85
                        )}
                      >
                        {"#"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__fiq5H
                        )}
                      >
                        {"Product ID"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__u2VhO
                        )}
                      >
                        {"Product"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__lssQm
                        )}
                      >
                        {"Quantity"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__rluUq
                        )}
                      >
                        {"Unit Price"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text___1QnS
                        )}
                      >
                        {"Total"}
                      </div>
                    </div>
                  ) : null}
                  {true ? (
                    <div
                      className={classNames(projectcss.all, sty.freeBox__g2IrI)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__eKjq6
                        )}
                      >
                        {"#"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text___1ZAeJ
                        )}
                      >
                        {"Product ID"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__hOfyv
                        )}
                      >
                        {"Product"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__eUk8P
                        )}
                      >
                        {"Quantity"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__a8KAu
                        )}
                      >
                        {"Unit Price"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__y9Clp
                        )}
                      >
                        {"Total"}
                      </div>
                    </div>
                  ) : null}
                  {true ? (
                    <div
                      className={classNames(projectcss.all, sty.freeBox__olgOy)}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text___6AhL8
                        )}
                      >
                        {"#"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__ev9E
                        )}
                      >
                        {"Product ID"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__seOt
                        )}
                      >
                        {"Product"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__kkFfv
                        )}
                      >
                        {"Quantity"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__kQVuI
                        )}
                      >
                        {"Unit Price"}
                      </div>

                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__gyPmf
                        )}
                      >
                        {"Total"}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox__z2Vg)}
              >
                <p.Stack
                  as={"div"}
                  hasGap={true}
                  className={classNames(projectcss.all, sty.freeBox__fGbUe)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__z3Dhs
                    )}
                  >
                    {"Sub Total"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__vdG5L
                    )}
                  >
                    {"Total"}
                  </div>
                </p.Stack>

                <p.Stack
                  as={"div"}
                  hasGap={true}
                  className={classNames(projectcss.all, sty.freeBox__izVs)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__zxi7
                    )}
                  >
                    {"Tax"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__lwb2I
                    )}
                  >
                    {"Total"}
                  </div>
                </p.Stack>

                <p.Stack
                  as={"div"}
                  hasGap={true}
                  className={classNames(projectcss.all, sty.freeBox__uFhnd)}
                >
                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__xu3Qq
                    )}
                  >
                    {"Total"}
                  </div>

                  <div
                    className={classNames(
                      projectcss.all,
                      projectcss.__wab_text,
                      sty.text__bSla7
                    )}
                  >
                    {"Total"}
                  </div>
                </p.Stack>
              </p.Stack>
            ) : null}
            {true ? (
              <ButtonB
                data-plasmic-name={"formbutton"}
                data-plasmic-override={overrides.formbutton}
                className={classNames("__wab_instance", sty.formbutton)}
                connectmm={true}
              />
            ) : null}
          </p.Stack>
        ) : null}
        {(
          hasVariant(variants, "confirmed", "confirmed")
            ? true
            : hasVariant(variants, "notfound", "notfound")
            ? true
            : hasVariant(variants, "loading", "loading")
            ? true
            : true
        ) ? (
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text__qJBg,
              {
                [sty.text__confirmed__qJBgOk5D2]: hasVariant(
                  variants,
                  "confirmed",
                  "confirmed"
                ),

                [sty.text__loading__qJBgnqWfg]: hasVariant(
                  variants,
                  "loading",
                  "loading"
                ),

                [sty.text__notfound__qJBgmPOd]: hasVariant(
                  variants,
                  "notfound",
                  "notfound"
                )
              }
            )}
          >
            {hasVariant(variants, "confirmed", "confirmed")
              ? "Sales Order already approved."
              : hasVariant(variants, "notfound", "notfound")
              ? "No Record Found.\nPlease create the sales order."
              : "Fetching Data from Database...."}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "applicationForm",
    "supplier",
    "shipmentmode",
    "origincountry",
    "sap",
    "grn",
    "creditnotevalue",
    "balance2",
    "balance",
    "consent",
    "formbutton"
  ],

  applicationForm: [
    "applicationForm",
    "supplier",
    "shipmentmode",
    "origincountry",
    "sap",
    "grn",
    "creditnotevalue",
    "balance2",
    "balance",
    "consent",
    "formbutton"
  ],

  supplier: ["supplier"],
  shipmentmode: ["shipmentmode"],
  origincountry: ["origincountry"],
  sap: ["sap"],
  grn: ["grn"],
  creditnotevalue: ["creditnotevalue"],
  balance2: ["balance2"],
  balance: ["balance"],
  consent: ["consent"],
  formbutton: ["formbutton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicSalesOrderConfirmation__ArgProps,
      internalVariantPropNames: PlasmicSalesOrderConfirmation__VariantProps
    });

    return PlasmicSalesOrderConfirmation__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicSalesOrderConfirmation";
  } else {
    func.displayName = `PlasmicSalesOrderConfirmation.${nodeName}`;
  }
  return func;
}

export const PlasmicSalesOrderConfirmation = Object.assign(
  // Top-level PlasmicSalesOrderConfirmation renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    applicationForm: makeNodeComponent("applicationForm"),
    supplier: makeNodeComponent("supplier"),
    shipmentmode: makeNodeComponent("shipmentmode"),
    origincountry: makeNodeComponent("origincountry"),
    sap: makeNodeComponent("sap"),
    grn: makeNodeComponent("grn"),
    creditnotevalue: makeNodeComponent("creditnotevalue"),
    balance2: makeNodeComponent("balance2"),
    balance: makeNodeComponent("balance"),
    consent: makeNodeComponent("consent"),
    formbutton: makeNodeComponent("formbutton"),
    // Metadata about props expected for PlasmicSalesOrderConfirmation
    internalVariantProps: PlasmicSalesOrderConfirmation__VariantProps,
    internalArgProps: PlasmicSalesOrderConfirmation__ArgProps
  }
);

export default PlasmicSalesOrderConfirmation;
/* prettier-ignore-end */