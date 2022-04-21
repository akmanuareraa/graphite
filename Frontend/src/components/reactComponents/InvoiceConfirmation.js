import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'

import Invoiceconfirmation from '../plasmicComponents/Invoiceconfirmation.jsx';
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function InvoiceConfirmation(props) {

    async function getRevertReason(txHash, addParams, formParams) {
        let web3 = props.mainState.web3
        console.log(11)
        const tx = await web3.eth.getTransaction(txHash)
        console.log(22)
        try {
            var result = await web3.eth.call(tx, tx.blockNumber)
                .catch(function (e) {
                    console.log('NEW ON ERROR: ', JSON.stringify(e.message).split('\\"'))
                    let edit = JSON.stringify(e.message).split('\\"')
                    console.log('RR: ', edit[5])
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "confirminvoice")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])
    let globalCounter = null

    // handles the confirmation of invoice
    const confirmInvoice = () => {

        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(props.allUrlParams.confirminvoice))

        if (props.mainState.account.toLowerCase() !== props.allUrlParams.confirminvoice.customerAddress.toLowerCase()) {
            alert("Incorrect customer address. Transaction can only be signed with the correct address")
            props.setAllUiStates(prevState => {
                console.log('starting', props.allUiStates.confirminvoice)
                return {
                    ...prevState,
                    confirminvoice: {
                        ...prevState.confirminvoice,
                        sendtxninv: false,
                        connectmm: true
                    }
                }
            })
        } else {
            props.setAllUiStates(prevState => {
                return {
                    ...prevState,
                    confirminvoice: {
                        ...prevState.confirminvoice,
                        sendtxninv: false,
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
                            confirminvoice: {
                                ...prevState.confirminvoice,
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
                                confirminvoice: {
                                    ...prevState.confirminvoice,
                                    processing: false,
                                    txnsuccess: true
                                }
                            }
                        })

                        let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'
                        props.redirectExecution(props.allUrlParams.confirminvoice, additionalParams, 5400, 900, "confirminvoice")
                    }
                })
                .on('error', function (error, receipt) {
                    console.log(error)
                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                    console.log(additionalParams)
                    try {
                        getRevertReason(receipt.transactionHash, additionalParams, props.allUrlParams.confirminvoice)
                    } catch (error) {
                        console.log('TC ERROR: ', error)
                    }
                    props.setAllUiStates(prevState => {
                        return {
                            ...prevState,
                            confirminvoice: {
                                ...prevState.confirminvoice,
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
                            confirminvoice: {
                                ...prevState.confirminvoice,
                                processing: false,
                                txnfailed: true
                            }
                        }
                    })
                    let additionalParams = '&status=failed&reason=' + e.message
                    props.redirectExecution(props.allUrlParams.confirminvoice, additionalParams, 5400, 900, "confirminvoice")
                })
        }
    }

    useEffect(() => {
        console.log('creating table..')
        let tempTable = []
        console.log('as', props.allUrlParams.confirminvoice)
        for (let [key, value] of Object.entries(props.allUrlParams.confirminvoice)) {
            let gvar = null
            console.log(`${key}: ${value}`);
            if (key !== 'refId' && key !== 'urlLength' && key !== 'consent' && key !== 'invoiceno') {
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
    }, [props.allUrlParams.confirminvoice])

    // handles the UI component
    const invoicerenderer = () => {
        return (
            <>
                <Invoiceconfirmation

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"Invoice Number"}
                                titlevalue={props.allUrlParams.confirminvoice.invoiceno}
                            />
                            {[...dynamictable]}
                        </>
                    }

                    loading={props.allUiStates.confirminvoice.loading}
                    notfound={props.allUiStates.confirminvoice.notfound}
                    confirmed={props.allUiStates.confirminvoice.confirmed}

                    invoiceno={props.allUrlParams.confirminvoice.invoiceno}
                    date={props.allUrlParams.confirminvoice.date}
                    value={props.allUrlParams.confirminvoice.value}
                    awbbl={props.allUrlParams.confirminvoice.awbbl}
                    qty={props.allUrlParams.confirminvoice.qty}
                    gross={props.allUrlParams.confirminvoice.gross}
                    volume={props.allUrlParams.confirminvoice.volume}
                    eta={props.allUrlParams.confirminvoice.eta}

                    formbutton={{
                        installmm: props.allUiStates.confirminvoice.installmm,
                        connectmm: props.allUiStates.confirminvoice.connectmm,
                        invoice: props.allUiStates.confirminvoice.invoice,
                        sendtxnconsentinv: props.allUiStates.confirminvoice.sendtxnconsentinv,
                        sendtxninv: props.allUiStates.confirminvoice.sendtxninv,
                        processing: props.allUiStates.confirminvoice.processing,
                        success: props.allUiStates.confirminvoice.txnsuccess,
                        failed: props.allUiStates.confirminvoice.txnfailed,
                        hash: props.mainState.confirminvoice.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (props.allUiStates.confirminvoice.connectmm) { props.setupMetamask("confirminvoice").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.confirminvoice.sendtxninv) { confirmInvoice(props.allUrlParams.confirminvoice) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.confirminvoice.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.confirminvoice.timer
                    }}

                    consent={{
                        agreed: props.allUiStates.confirminvoice.tickboxState,
                        tickbox: {
                            onClick: () => {
                                if (!props.allUiStates.confirminvoice.processing && !props.allUiStates.confirminvoice.txnsuccess && !props.allUiStates.confirminvoice.txnfailed) {
                                    if (props.allUiStates.confirminvoice.tickboxState) {
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("2")
                                                return {
                                                    ...prevState,
                                                    confirminvoice: {
                                                        ...prevState.confirminvoice,
                                                        tickboxState: false,
                                                        sendtxnconsentinv: true,
                                                        sendtxninv: false
                                                    }
                                                }
                                            } else {
                                                console.log("6")
                                                return {
                                                    ...prevState,
                                                    confirminvoice: {
                                                        ...prevState.confirminvoice,
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
                                                    confirminvoice: {
                                                        ...prevState.confirminvoice,
                                                        tickboxState: true,
                                                        sendtxnconsentinv: false,
                                                        sendtxninv: true
                                                    }
                                                }
                                            } else {
                                                return {
                                                    ...prevState,
                                                    confirminvoice: {
                                                        ...prevState.confirminvoice,
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

        props.urlParser("confirminvoice")
    }, [])

    // checks if the invoice has already been approved
    useEffect(() => {
        if (props.allUrlParams.confirminvoice.invoiceno != null) {
            // checks if the sales order has already been created
            // checks the status of the sales order
            axios.get(config.backendServer + "getInvoiceStatus", { params: { "invoiceno": props.allUrlParams.confirminvoice.invoiceno } }).then(function (response, error) {
                if (response) {

                    // if already approved
                    if (response.data.Status === 'Approved') {
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                confirminvoice: {
                                    ...prevState.confirminvoice,
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
                                confirminvoice: {
                                    ...response.data.Invoice
                                }
                            }
                        })
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                confirminvoice: {
                                    ...prevState.confirminvoice,
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
                    if (e.response.status === 404) {
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                confirminvoice: {
                                    ...prevState.confirminvoice,
                                    loading: false,
                                    notfound: true,
                                    confirmed: false
                                }
                            }
                        })
                    } else {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "confirminvoice")
                    }
                })
        }
    }, [props.allUrlParams.confirminvoice.invoiceno])

    return (
        <div className="columns is-centered">
            {invoicerenderer()}
        </div>
    );
}

export default InvoiceConfirmation;