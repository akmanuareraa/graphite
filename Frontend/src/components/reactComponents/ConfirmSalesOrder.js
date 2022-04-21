import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'

import SalesOrderConfirmation from '../plasmicComponents/SalesOrderConfirmation';
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function ConfirmSalesOrder(props) {

    async function getRevertReason(txHash, addParams, formParams) {
        let web3 = props.mainState.web3
        const tx = await web3.eth.getTransaction(txHash)
        try {
            var result = await web3.eth.call(tx, tx.blockNumber)
                .catch(function (e) {
                    console.log('NEW ON ERROR: ', JSON.stringify(e.message).split('\\"'))
                    let edit = JSON.stringify(e.message).split('\\"')
                    console.log('RR: ', edit[5])
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "confirmSalesOrder")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])

    let globalCounter = null

    // handles the confirmation of sales order
    const confirmSalesOrder = () => {

        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(props.allUrlParams.confirmSalesOrder))
        console.log('==================================')
        console.log(props.allUrlParams.confirmSalesOrder)
        console.log('==================================')
        console.log('hash', hash)

        if (props.mainState.account.toLowerCase() !== props.allUrlParams.confirmSalesOrder.customerAddress.toLowerCase()) {
            alert("Incorrect customer address. Transaction can only be signed with the correct address")
            props.setAllUiStates(prevState => {
                console.log('starting', props.allUiStates.confirmSalesOrder)
                return {
                    ...prevState,
                    confirmSalesOrder: {
                        ...prevState.confirmSalesOrder,
                        salesorder: false,
                        connectmm: true
                    }
                }
            })
        } else {
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
                    if (confirmationNumber == 1) {
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
                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                    console.log(additionalParams)
                    try {
                        getRevertReason(receipt.transactionHash, additionalParams, props.allUrlParams.confirmSalesOrder)
                    } catch (error) {
                        console.log('TC ERROR: ', error)
                    }
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
    }

    // handles the UI component
    const salesOrderRenderer = () => {
        return (
            <>
                <SalesOrderConfirmation
                    loading={props.allUiStates.confirmSalesOrder.loading}
                    notfound={props.allUiStates.confirmSalesOrder.notfound}
                    confirmed={props.allUiStates.confirmSalesOrder.confirmed}

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"PO Number"}
                                titlevalue={props.allUrlParams.confirmSalesOrder.pono}
                            />
                            {[...dynamictable]}
                        </>
                    }

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
        props.urlParser("confirmSalesOrder")
    }, [])

    useEffect(() => {
        console.log("calling =========================== TABLE")
        let tempTable = []
        console.log('as', props.allUrlParams.confirmSalesOrder)
        for (let [key, value] of Object.entries(props.allUrlParams.confirmSalesOrder)) {
            let gvar = null
            console.log(`${key}: ${value}`);
            if (key !== 'refId' && key !== 'urlLength' && key !== 'consent' && key !== 'pono') {
                // let row = <tr>
                //     <td><b>{key}</b></td>
                //     <td>{value}</td>
                // </tr>
                if (key === 'rNo') {
                    key = 'Reference Number'
                } else if (key === 'pDate') {
                    key = 'Payment Date'
                } else if (key === 'customerAddress') {
                    key = 'Customer Address'
                }
                if (globalCounter % 2 === 0) {
                    gvar = true
                } else {
                    gvar = false
                }
                let row = <PlasmicTableRow
                    fieldslot={key}
                    valueslot={value}
                    greyvariant={gvar}
                />
                tempTable.push(row)
                setDynamictable([...tempTable])
                globalCounter++
            }
        }
    }, [props.allUrlParams.confirmSalesOrder])

    // checks if the sales order has already been approved
    useEffect(() => {
        console.log("calling =========================== BACKEND")
        if (props.allUrlParams.confirmSalesOrder.pono != null) {
            // checks if the sales order has already been created
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
                                    ...prevState.confirmSalesOrder,
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
                        console.log('test', props.allUrlParams.confirmSalesOrder)
                    }
                }
            })
                .catch(function (e) {
                    if (e.response.status === 404) {
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
                    } else {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "confirmSalesOrder")
                    }
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