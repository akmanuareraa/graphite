import React, { useEffect, useState } from 'react';
import config from '../../config-frontend'
import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'
import Web3 from 'web3'
import axios from 'axios';

import Invoicegeneration from '../plasmicComponents/Invoicegeneration.jsx'
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function InvoiceGeneration(props) {

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
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "generateinvoice")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])
    let globalCounter = null

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

        logisticsAssetMinterContract.methods.issueAsset(hash, urlParams.customerAddress).send({ from: props.mainState.account })
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
                if (confirmationNumber == 1) {
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

                            let additionalParams = '&hash=' + receipt.transactionHash + '&status=success' + "&link=http://" + config.domain + "/confirmInvoice/invoice?invoiceno=" + props.allUrlParams.generateinvoice.invoiceno
                            props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateinvoice")
                        } else {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + error
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateinvoice")
                        }
                    })
                        .catch(function (e) {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + e
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateinvoice")
                        })
                }
            })
            .on('error', function (error, receipt) {
                console.log(error)
                let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                console.log(additionalParams)
                try {
                    getRevertReason(receipt.transactionHash, additionalParams, urlParams)
                } catch (error) {
                    console.log('TC ERROR: ', error)
                }
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

    useEffect(() => {
        console.log('creating table..')
        let tempTable = []
        console.log('as', props.allUrlParams.generateinvoice)
        for (let [key, value] of Object.entries(props.allUrlParams.generateinvoice)) {
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
    }, [props.allUrlParams.generateinvoice])

    const invoicerenderer = () => {
        return (
            <>
                <Invoicegeneration

                    displayinvoice={true}

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"Invoice Number"}
                                titlevalue={props.allUrlParams.generateinvoice.invoiceno}
                            />
                            {[...dynamictable]}
                        </>
                    }

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
        props.urlParser("generateinvoice");
        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                generateinvoice: {
                    ...prevState.generateinvoice,
                    Timestamp: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })
    }, [])

    useEffect(() => {
        if (props.allUrlParams.generateinvoice.invoiceno !== null) {
            axios.get(config.backendServer + "getInvoice", { params: { invoiceno: props.allUrlParams.generateinvoice.invoiceno } }).then(function (response, error) {
                if (response) {
                    alert("Invoice already found. Please check Invoice Number.  Redirecting you to the portal...")
                    let urlParamsToSend = "";
                    for (const [key, value] of Object.entries(props.allUrlParams.generateinvoice)) {
                        urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                    }
                    window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+invoice'
                }
            })
                .catch(function (e) {
                    if (e.response.status !== 404) {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
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
