import React, { useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'

import SalesOrderConfirmation from '../plasmicComponents/SalesOrderConfirmation';

function ConfirmSalesOrder(props) {

    // handles the confirmation of sales order
    const confirmSalesOrder = () => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                confirmSalesOrder: {
                    ...prevState.confirmSalesOrder,
                    sendtxnso: false,
                    processing: true
                }
            }
        })

        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(props.allUrlParams.confirmSalesOrder))

        logisticsAssetMinterContract.methods.addCustomerApproval(hash).send({ from: props.mainState.account })
            .on('transactionHash', function (hash) {
                console.log(hash)
                props.setMainState(prevState => {
                    return {
                        ...prevState,
                        confirmSalesOrder: {
                            ...prevState.confirmSalesOrder,
                            txnHash: hash
                        }
                    }
                })
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber == 10) {
                    console.log(confirmationNumber)

                    props.setAllUiStates(prevState => {
                        return {
                            ...prevState,
                            confirmSalesOrder: {
                                ...prevState.confirmSalesOrder,
                                processing: false,
                                txnsuccess: true
                            }
                        }
                    })

                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'
                    props.redirectExecution(props.allUrlParams.confirmSalesOrder, additionalParams, 5400, 900, "confirmSalesOrder")
                }
            })
            .on('error', function (error, receipt) {
                console.log(error)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        confirmSalesOrder: {
                            ...prevState.confirmSalesOrder,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })

                let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason=' + error
                props.redirectExecution(props.allUrlParams.confirmSalesOrder, additionalParams, 5400, 900, "confirmSalesOrder")
            })
            .catch(function (e) {
                console.log(e.message)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        confirmSalesOrder: {
                            ...prevState.confirmSalesOrder,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })
                let additionalParams = '&status=failed&reason=' + e.message
                props.redirectExecution(props.allUrlParams.confirmSalesOrder, additionalParams, 5400, 900, "confirmSalesOrder")
            })
    }

    // handles the UI component
    const salesOrderRenderer = () => {
        return (
            <>
                <SalesOrderConfirmation
                    loading={props.allUiStates.confirmSalesOrder.loading}
                    notfound={props.allUiStates.confirmSalesOrder.notfound}
                    confirmed={props.allUiStates.confirmSalesOrder.confirmed}

                    pono={props.allUrlParams.confirmSalesOrder.pono}
                    supplier={props.allUrlParams.confirmSalesOrder.supplier}
                    shipmentmode={props.allUrlParams.confirmSalesOrder.shipmentmode}
                    origincountry={props.allUrlParams.confirmSalesOrder.origincountry}
                    sap={props.allUrlParams.confirmSalesOrder.sap}
                    grn={props.allUrlParams.confirmSalesOrder.grn}
                    creditnotevalue={props.allUrlParams.confirmSalesOrder.creditnotevalue}
                    balance={props.allUrlParams.confirmSalesOrder.balance}

                    formbutton={{
                        installmm: props.allUiStates.confirmSalesOrder.installmm,
                        connectmm: props.allUiStates.confirmSalesOrder.connectmm,
                        salesorder: props.allUiStates.confirmSalesOrder.salesorder,
                        processing: props.allUiStates.confirmSalesOrder.processing,
                        success: props.allUiStates.confirmSalesOrder.txnsuccess,
                        failed: props.allUiStates.confirmSalesOrder.txnfailed,
                        hash: props.mainState.confirmSalesOrder.txnHash,
                        sendtxnconsentso: props.allUiStates.confirmSalesOrder.sendtxnconsentso,
                        sendtxnso: props.allUiStates.confirmSalesOrder.sendtxnso,
                        mainbutton: {
                            onClick: () => {
                                console.log(props.allUiStates.confirmSalesOrder.sendtxnso)
                                if (props.allUiStates.confirmSalesOrder.connectmm) { props.setupMetamask("confirmSalesOrder").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.confirmSalesOrder.sendtxnso) { confirmSalesOrder(props.allUrlParams.confirmSalesOrder) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.confirmSalesOrder.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.confirmSalesOrder.timer
                    }}

                    consent={{
                        agreed: props.allUiStates.confirmSalesOrder.tickboxState,
                        tickbox: {
                            onClick: () => {
                                if (!props.allUiStates.confirmSalesOrder.processing && !props.allUiStates.confirmSalesOrder.txnsuccess && !props.allUiStates.confirmSalesOrder.txnfailed) {
                                    if (props.allUiStates.confirmSalesOrder.tickboxState) {
                                        console.log("1")
                                        // props.setAllUrlParams(prevState => {
                                        //     return {
                                        //         ...prevState,
                                        //         confirmSalesOrder: {
                                        //             ...prevState.confirmSalesOrder,
                                        //             consent: false
                                        //         }
                                        //     }
                                        // })
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("2")
                                                return {
                                                    ...prevState,
                                                    confirmSalesOrder: {
                                                        ...prevState.confirmSalesOrder,
                                                        tickboxState: false,
                                                        sendtxnconsentso: true,
                                                        sendtxnso: false
                                                    }
                                                }
                                            } else {
                                                console.log("6")
                                                return {
                                                    ...prevState,
                                                    confirmSalesOrder: {
                                                        ...prevState.confirmSalesOrder,
                                                        tickboxState: false
                                                    }

                                                }
                                            }
                                        })
                                    } else {
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("4")
                                                return {
                                                    ...prevState,
                                                    confirmSalesOrder: {
                                                        ...prevState.confirmSalesOrder,
                                                        tickboxState: true,
                                                        sendtxnconsentso: false,
                                                        sendtxnso: true
                                                    }
                                                }
                                            } else {
                                                return {
                                                    ...prevState,
                                                    confirmSalesOrder: {
                                                        ...prevState.confirmSalesOrder,
                                                        tickboxState: true
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }}
                />
            </>
        )
    }

    useEffect(() => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                navbar: {
                    newasset: false,
                    gensalesorder: false,
                    confirmsalesorder: true
                }
            }
        })

        props.urlParser("confirmSalesOrder")
    }, [])

    // checks if the sales order has already been approved
    useEffect(() => {
        if (props.allUrlParams.confirmSalesOrder.pono != null) {
            // checks if the sales order has already been created
            axios.get(config.backendServer + "getSalesOrder", { params: { "pono": props.allUrlParams.confirmSalesOrder.pono } }).then(function (response, error) {
                if (response) {

                    // Not created scenario
                    if (response.data === 'No Record Found') {
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                confirmSalesOrder: {
                                    ...prevState.confirmSalesOrder,
                                    loading: false,
                                    notfound: true,
                                    confirmed: false
                                }
                            }
                        })
                    
                        // created scenario
                    } else {

                        // checks the status of the sales order
                        axios.get(config.backendServer + "getSalesOrderStatus", { params: { "pono": props.allUrlParams.confirmSalesOrder.pono } }).then(function (response, error) {
                            if (response) {

                                // if already approved
                                if (response.data.Status === 'Approved') {
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            confirmSalesOrder: {
                                                ...prevState.confirmSalesOrder,
                                                loading: false,
                                                notfound: false,
                                                confirmed: true
                                            }
                                        }
                                    })

                                    // else proceed as usual
                                } else {
                                    props.setAllUrlParams(prevState => {
                                        return {
                                            ...prevState,
                                            confirmSalesOrder: {
                                                ...response.data.SalesOrder
                                            }
                                        }
                                    })
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            confirmSalesOrder: {
                                                ...prevState.confirmSalesOrder,
                                                loading: false,
                                                notfound: false,
                                                confirmed: false
                                            }
                                        }
                                    })
                                }
                            }
                        })
                            .catch(function (e) {
                                alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                                let additionalParams = '&status=failed&reason=' + e
                                props.redirectExecution("null", additionalParams, 10, 10, "confirmSalesOrder")
                            })
                    }
                }
            })
                .catch(function (e) {
                    alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                    let additionalParams = '&status=failed&reason=' + e
                    props.redirectExecution("null", additionalParams, 10, 10, "confirmSalesOrder")
                })
        }
    }, [props.allUrlParams.confirmSalesOrder.pono])

    return (
        <div className="columns is-centered">
            {salesOrderRenderer()}
        </div>
    );
}

export default ConfirmSalesOrder;