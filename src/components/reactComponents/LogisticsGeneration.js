import React, { useEffect } from 'react';
import config from '../../config-frontend'
import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'
import Web3 from 'web3'
import axios from 'axios';

import Logisticsgeneration from '../plasmicComponents/Logisticsgeneration.jsx'

function LogisticsGeneration(props) {

    const createLogistics = (urlParams) => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                generatelogistics: {
                    ...prevState.generatelogistics,
                    logistics: false,
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
                        generatelogistics: {
                            ...prevState.generatelogistics,
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
                    axios.post(config.backendServer + 'addLogistics', urlParams).then(function (response, error) {
                        if (response) {
                            console.log("DB-NEW-SO: ", response)
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    generatelogistics: {
                                        ...prevState.generatelogistics,
                                        processing: false,
                                        txnsuccess: true
                                    }
                                }
                            })

                            let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'+ "&link=http://localhost:3000/confirmLogistics/logistics?cha=" + props.allUrlParams.generatelogistics.cha 
                            props.redirectExecution(urlParams, additionalParams, 5400, 900, "generatelogistics")
                        } else {
                            alert("Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + error
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generatelogistics")
                        }
                    })
                        .catch(function (e) {
                            alert("Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + e
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generatelogistics")
                        })
                }
            })
            .on('error', function (error, receipt) {
                console.log(error)
                console.log(receipt)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        generatelogistics: {
                            ...prevState.generatelogistics,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })

                let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason=' + error 
                props.redirectExecution(urlParams, additionalParams, 5400, 900, "generatelogistics")
            })
            .catch(function (e) {
                console.log('METAMASK-ERROR: ', e)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        generatelogistics: {
                            ...prevState.generatelogistics,
                            processing: false,
                            txnfailed: true
                        }

                    }
                })
                let additionalParams = '&status=failed&reason=' + e.message 
                props.redirectExecution(urlParams, additionalParams, 5400, 900, "generatelogistics")
            })
    }

    const logisticsrenderer = () => {
        return (
            <>
                <Logisticsgeneration

                    displaylogistics={true}

                    cha= {props.allUrlParams.generatelogistics.cha}
                    ffname={props.allUrlParams.generatelogistics.ffname}
                    entryno={props.allUrlParams.generatelogistics.entryno}
                    entrydate={props.allUrlParams.generatelogistics.entrydate}
                    dutyamount={props.allUrlParams.generatelogistics.dutyamount}
                    hts={props.allUrlParams.generatelogistics.hts}
                    tfamount={props.allUrlParams.generatelogistics.tfamount}
                    ntfamount={props.allUrlParams.generatelogistics.ntfamount}
                    tchaamount={props.allUrlParams.generatelogistics.tchaamount}
                    ntchaamount={props.allUrlParams.generatelogistics.ntchaamount}

                    formbutton={{
                        installmm: props.allUiStates.generatelogistics.installmm,
                        connectmm: props.allUiStates.generatelogistics.connectmm,
                        logistics: props.allUiStates.generatelogistics.logistics,
                        sendtxnconsentlog: props.allUiStates.generatelogistics.sendtxnconsentlog,
                        sendtxnlog: props.allUiStates.generatelogistics.sendtxnlog,
                        processing: props.allUiStates.generatelogistics.processing,
                        success: props.allUiStates.generatelogistics.txnsuccess,
                        failed: props.allUiStates.generatelogistics.txnfailed,
                        hash: props.mainState.generatelogistics.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (props.allUiStates.generatelogistics.connectmm) { props.setupMetamask("generatelogistics").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.generatelogistics.logistics) { createLogistics(props.allUrlParams.generatelogistics) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.generatelogistics.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.generatelogistics.timer
                    }}

                />
            </>
        )
    }

    useEffect(() => {

        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                generatelogistics: {
                    ...prevState.generatelogistics,
                    timestamp: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })

        props.urlParser("generatelogistics");
    }, [])

    useEffect(() => {
        if (props.allUrlParams.generatelogistics.cha !== undefined) {
            axios.get(config.backendServer + "getLogistics", { params: { cha: props.allUrlParams.generatelogistics.cha } }).then(function (response, error) {
                if (response) {
                    alert("Logistics already found. Process cannot be completed. Please contact Administrator. Redirecting you to the portal...")
                    let urlParamsToSend = "";
                    for (const [key, value] of Object.entries(props.allUrlParams.generatelogistics)) {
                        urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                    }
                    window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+logistics'
                }
            })
                .catch(function (e) {
                    if (e.response.status !== 404) {
                        alert(e.response.status + ":" + e.response.statusText + ". Please contact Administrator. Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "generatelogistics")
                    }
                })
        }

        //executes when change is detected in props.allUrlParams.generatelogistics.cha
    }, [props.allUrlParams.generatelogistics.cha])

    return (
        <div className="columns is-centered">
            {logisticsrenderer()}
        </div>
    );
}

export default LogisticsGeneration;