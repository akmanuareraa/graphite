/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import Salesordergeneration from '../plasmicComponents/Salesordergeneration';
import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function GenerateSalesOrder(props) {

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
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "generateSalesOrder")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])

    let globalCounter = null

    // function to create the sales order
    const createSalesOrder = (urlParams) => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                generateSalesOrder: {
                    ...prevState.generateSalesOrder,
                    salesorder: false,
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
                        generateSalesOrder: {
                            ...prevState.generateSalesOrder,
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
                    axios.post(config.backendServer + 'addSalesOrder', urlParams).then(function (response, error) {
                        if (response) {
                            console.log("DB-NEW-SO: ", response)
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    generateSalesOrder: {
                                        ...prevState.generateSalesOrder,
                                        processing: false,
                                        txnsuccess: true
                                    }
                                }
                            })

                            let additionalParams = '&hash=' + receipt.transactionHash + '&status=success' + "&link=http://" + config.domain + "/confirmSalesOrder/salesorder?pono=" + props.allUrlParams.generateSalesOrder.pono
                            props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateSalesOrder")
                        } else {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + error
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateSalesOrder")
                        }
                    })
                        .catch(function (e) {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + e
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generateSalesOrder")
                        })
                }
            })
            .on('error', function (error, receipt) {
                console.log(receipt)
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
                        generateSalesOrder: {
                            ...prevState.generateSalesOrder,
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
                        generateSalesOrder: {
                            ...prevState.generateSalesOrder,
                            processing: false,
                            txnfailed: true
                        }

                    }
                })
                let additionalParams = '&status=failed&reason=' + e.message
                props.redirectExecution(urlParams, additionalParams, 5400, 900, "generateSalesOrder")
            })

    }

    useEffect(() => {
        console.log('creating table..')
        let tempTable = []
        console.log('as', props.allUrlParams.generateSalesOrder)
        for (let [key, value] of Object.entries(props.allUrlParams.generateSalesOrder)) {
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
    }, [props.allUrlParams.generateSalesOrder])

    // handles the UI component 
    const salesOrderRenderer = () => {
        return (
            <>
                <Salesordergeneration

                    displaysalesorder={true}

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"PO Number"}
                                titlevalue={props.allUrlParams.generateSalesOrder.pono}
                            />
                            {[...dynamictable]}
                        </>
                    }

                    pono={props.allUrlParams.generateSalesOrder.pono}
                    supplier={props.allUrlParams.generateSalesOrder.supplier}
                    shipmentmode={props.allUrlParams.generateSalesOrder.shipmentmode}
                    origincountry={props.allUrlParams.generateSalesOrder.origincountry}
                    sap={props.allUrlParams.generateSalesOrder.sap}
                    grn={props.allUrlParams.generateSalesOrder.grn}
                    creditnotevalue={props.allUrlParams.generateSalesOrder.creditnotevalue}
                    balance={props.allUrlParams.generateSalesOrder.balance}

                    formbutton={{
                        installmm: props.allUiStates.generateSalesOrder.installmm,
                        connectmm: props.allUiStates.generateSalesOrder.connectmm,
                        salesorder: props.allUiStates.generateSalesOrder.salesorder,
                        sendtxnso: props.allUiStates.generateSalesOrder.sendtxnso,
                        sendtxnconsentso: props.allUiStates.generateSalesOrder.sendtxnconsentso,
                        processing: props.allUiStates.generateSalesOrder.processing,
                        success: props.allUiStates.generateSalesOrder.txnsuccess,
                        failed: props.allUiStates.generateSalesOrder.txnfailed,
                        hash: props.mainState.generateSalesOrder.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (props.allUiStates.generateSalesOrder.connectmm) { props.setupMetamask("generateSalesOrder").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.generateSalesOrder.salesorder) {
                                    createSalesOrder(props.allUrlParams.generateSalesOrder)
                                }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.generateSalesOrder.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.generateSalesOrder.timer
                    }}

                />
            </>
        )
    }

    // executes when component mounts initially
    useEffect(() => {
        props.urlParser("generateSalesOrder");
        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                generateSalesOrder: {
                    ...prevState.generateSalesOrder,
                    Timestamp: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })
    }, [])

    // checks if the sales order with the provided PO Number
    // has already been created. If found redirect the user back with the error message. If not, proceed as usual
    useEffect(() => {
        if (props.allUrlParams.generateSalesOrder.pono !== null) {
            axios.get(config.backendServer + "getSalesOrder", { params: { pono: props.allUrlParams.generateSalesOrder.pono } }).then(function (response, error) {
                if (response) {
                    alert("Sales Order already exists. Please check PO Number. Redirecting you to the portal...")
                    let urlParamsToSend = "";
                    for (const [key, value] of Object.entries(props.allUrlParams.generateSalesOrder)) {
                        urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                    }
                    window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+sales+order'
                }
            })
                .catch(function (e) {
                    if (e.response.status !== 404) {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "generateSalesOrder")
                    }
                })
        }

        //executes when change is detected in pono
    }, [props.allUrlParams.generateSalesOrder.pono])

    return (
        <div className="columns is-centered">
            {salesOrderRenderer()}
        </div>
    );
}

export default GenerateSalesOrder;
