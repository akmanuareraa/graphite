import React, { useEffect } from 'react';
import config from '../../config-frontend'
import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'
import Web3 from 'web3'
import axios from 'axios';

import Invoicegeneration from '../plasmicComponents/Invoicegeneration.jsx'

function InvoiceGeneration(props) {

    const createInvoice = (urlParams) => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                generateinvoice: {
                    ...prevState.generateinvoice,
                    invoice: false,
                    processing: true
                }
            }
        })


        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(urlParams))
        console.log("HASH: ", hash)

        logisticsAssetMinterContract.methods.issueAsset(hash, props.mainState.account).send({ from: props.mainState.account })
            .on('transactionHash', function (hash) {
                console.log(hash)
                props.setMainState(prevState => {
                    return {
                        ...prevState,
                        generateinvoice: {
                            ...prevState.generateinvoice,
                            txnHash: hash
                        }
                    }
                })
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber == 2) {
                    // on successfull transactions, data will be stored in mongoDB
                    console.log(confirmationNumber)
                    console.log("MongoDB: ", urlParams)
                    axios.post(config.backendServer + 'addInvoice', urlParams).then(function (response, error) {
                        if (response) {
                            console.log("DB-NEW-SO: ", response)
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    generateinvoice: {
                                        ...prevState.generateinvoice,
                                        processing: false,
                                        txnsuccess: true
                                    }
                                }
                            })

                            let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'+ "&link=http://localhost:3000/confirmInvoice/invoice?invoiceno=" + props.allUrlParams.generateinvoice.invoiceno 
                            props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateinvoice")
                        } else {
                            alert("Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + error
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateinvoice")
                        }
                    })
                        .catch(function (e) {
                            alert("Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + e
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateinvoice")
                        })
                }
            })
            .on('error', function (error, receipt) {
                console.log(error)
                console.log(receipt)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        generateinvoice: {
                            ...prevState.generateinvoice,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })

                let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason=' + error 
                props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateinvoice")
            })
            .catch(function (e) {
                console.log('METAMASK-ERROR: ', e)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        generateinvoice: {
                            ...prevState.generateinvoice,
                            processing: false,
                            txnfailed: true
                        }

                    }
                })
                let additionalParams = '&status=failed&reason=' + e.message 
                props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateinvoice")
            })
    }

    const invoicerenderer = () => {
        return (
            <>
                <Invoicegeneration

                    displayinvoice={true}

                    invoiceno={props.allUrlParams.generateinvoice.invoiceno}
                    date={props.allUrlParams.generateinvoice.date}
                    value={props.allUrlParams.generateinvoice.value}
                    awbbl={props.allUrlParams.generateinvoice.awbbl}
                    qty={props.allUrlParams.generateinvoice.qty}
                    gross={props.allUrlParams.generateinvoice.gross}
                    volume={props.allUrlParams.generateinvoice.volume}
                    eta={props.allUrlParams.generateinvoice.eta}

                    formbutton={{
                        installmm: props.allUiStates.generateinvoice.installmm,
                        connectmm: props.allUiStates.generateinvoice.connectmm,
                        invoice: props.allUiStates.generateinvoice.invoice,
                        sendtxninv: props.allUiStates.generateinvoice.sendtxninv,
                        sendtxnconsentinv: props.allUiStates.generateinvoice.sendtxnconsentinv,
                        processing: props.allUiStates.generateinvoice.processing,
                        success: props.allUiStates.generateinvoice.txnsuccess,
                        failed: props.allUiStates.generateinvoice.txnfailed,
                        hash: props.mainState.generateinvoice.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (props.allUiStates.generateinvoice.connectmm) { props.setupMetamask("generateinvoice").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.generateinvoice.invoice) { createInvoice(props.allUrlParams.generateinvoice) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.generateinvoice.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.generateinvoice.timer
                    }}

                />
            </>
        )
    }

    useEffect(() => {

        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                generateinvoice: {
                    ...prevState.generateinvoice,
                    timestamp: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })

        props.urlParser("generateinvoice");
    }, [])

    useEffect(() => {
        if (props.allUrlParams.generateinvoice.invoiceno !== undefined) {
            axios.get(config.backendServer + "getInvoice", { params: { invoiceno: props.allUrlParams.generateinvoice.invoiceno } }).then(function (response, error) {
                if (response) {
                    alert("Invoice already found. Process cannot be completed. Please contact Administrator. Redirecting you to the portal...")
                    let urlParamsToSend = "";
                    for (const [key, value] of Object.entries(props.allUrlParams.generateinvoice)) {
                        urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                    }
                    window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+invoice'
                }
            })
                .catch(function (e) {
                    if (e.response.status !== 404) {
                        alert(e.response.status + ":" + e.response.statusText + ". Please contact Administrator. Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "generateinvoice")
                    }
                })
        }

        //executes when change is detected in props.allUrlParams.invoicegeneration.invoiceno
    }, [props.allUrlParams.generateinvoice.invoiceno])

    return (
        <div className="columns is-centered">
            {invoicerenderer()}
        </div>
    );
}

export default InvoiceGeneration;