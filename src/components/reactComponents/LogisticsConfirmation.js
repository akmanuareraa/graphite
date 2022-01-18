import React, { useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'

import Logisticsconfirmation from '../plasmicComponents/Logisticsconfirmation.jsx';

function LogisticsConfirmation(props) {

    // handles the confirmation of logistics
    const confirmLogistics = () => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                confirmlogistics: {
                    ...prevState.confirmlogistics,
                    sendtxnlog: false,
                    processing: true
                }
            }
        })

        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(props.allUrlParams.confirmlogistics))

        logisticsAssetMinterContract.methods.addCustomerApproval(hash).send({ from: props.mainState.account })
            .on('transactionHash', function (hash) {
                console.log(hash)
                props.setMainState(prevState => {
                    return {
                        ...prevState,
                        confirmlogistics: {
                            ...prevState.confirmlogistics,
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
                            confirmlogistics: {
                                ...prevState.confirmlogistics,
                                processing: false,
                                txnsuccess: true
                            }
                        }
                    })

                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'
                    props.redirectExecution(props.allUrlParams.confirmlogistics, additionalParams, 5400, 900, "confirmlogistics")
                }
            })
            .on('error', function (error, receipt) {
                console.log(error)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        confirmlogistics: {
                            ...prevState.confirmlogistics,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })

                let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason=' + error
                props.redirectExecution(props.allUrlParams.confirmlogistics, additionalParams, 5400, 900, "confirmlogistics")
            })
            .catch(function (e) {
                console.log(e.message)
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        confirmlogistics: {
                            ...prevState.confirmlogistics,
                            processing: false,
                            txnfailed: true
                        }
                    }
                })
                let additionalParams = '&status=failed&reason=' + e.message
                props.redirectExecution(props.allUrlParams.confirmlogistics, additionalParams, 5400, 900, "confirmlogistics")
            })
    }

    // handles the UI component
    const logisticsrenderer = () => {
        return (
            <>
                <Logisticsconfirmation
                    loading={props.allUiStates.confirmlogistics.loading}
                    notfound={props.allUiStates.confirmlogistics.notfound}
                    confirmed={props.allUiStates.confirmlogistics.confirmed}

                    cha= {props.allUrlParams.confirmlogistics.cha}
                    ffname={props.allUrlParams.confirmlogistics.ffname}
                    entryno={props.allUrlParams.confirmlogistics.entryno}
                    entrydate={props.allUrlParams.confirmlogistics.entrydate}
                    dutyamount={props.allUrlParams.confirmlogistics.dutyamount}
                    hts={props.allUrlParams.confirmlogistics.hts}
                    tfamount={props.allUrlParams.confirmlogistics.tfamount}
                    ntfamount={props.allUrlParams.confirmlogistics.ntfamount}
                    tchaamount={props.allUrlParams.confirmlogistics.tchaamount}
                    ntchaamount={props.allUrlParams.confirmlogistics.ntchaamount}

                    formbutton={{
                        installmm: props.allUiStates.confirmlogistics.installmm,
                        connectmm: props.allUiStates.confirmlogistics.connectmm,
                        logistics: props.allUiStates.confirmlogistics.logistics,
                        processing: props.allUiStates.confirmlogistics.processing,
                        success: props.allUiStates.confirmlogistics.txnsuccess,
                        failed: props.allUiStates.confirmlogistics.txnfailed,
                        hash: props.mainState.confirmlogistics.txnHash,
                        sendtxnconsentlog: props.allUiStates.confirmlogistics.sendtxnconsentlog,
                        sendtxnlog: props.allUiStates.confirmlogistics.sendtxnlog,
                        mainbutton: {
                            onClick: () => {
                                console.log(props.allUiStates.confirmlogistics.sendtxnlog)
                                if (props.allUiStates.confirmlogistics.connectmm) { props.setupMetamask("confirmlogistics").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.confirmlogistics.sendtxnlog) { confirmLogistics(props.allUrlParams.confirmlogistics) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.confirmlogistics.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.confirmlogistics.timer
                    }}

                    consent={{
                        agreed: props.allUiStates.confirmlogistics.tickboxState,
                        tickbox: {
                            onClick: () => {
                                if (!props.allUiStates.confirmlogistics.processing && !props.allUiStates.confirmlogistics.txnsuccess && !props.allUiStates.confirmlogistics.txnfailed) {
                                    if (props.allUiStates.confirmlogistics.tickboxState) {
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("2")
                                                return {
                                                    ...prevState,
                                                    confirmlogistics: {
                                                        ...prevState.confirmlogistics,
                                                        tickboxState: false,
                                                        sendtxnconsentlog: true,
                                                        sendtxnlog: false
                                                    }
                                                }
                                            } else {
                                                console.log("6")
                                                return {
                                                    ...prevState,
                                                    confirmlogistics: {
                                                        ...prevState.confirmlogistics,
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
                                                    confirmlogistics: {
                                                        ...prevState.confirmlogistics,
                                                        tickboxState: true,
                                                        sendtxnconsentlog: false,
                                                        sendtxnlog: true
                                                    }
                                                }
                                            } else {
                                                return {
                                                    ...prevState,
                                                    confirmlogistics: {
                                                        ...prevState.confirmlogistics,
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

        props.urlParser("confirmlogistics")
    }, [])

    // checks if the logistics has already been approved
    useEffect(() => {
        if (props.allUrlParams.confirmlogistics.cha != null) {
            // checks if the logistics has already been created
            axios.get(config.backendServer + "getLogistics", { params: { "cha": props.allUrlParams.confirmlogistics.cha } }).then(function (response, error) {
                if (response) {

                    // Not created scenario
                    if (response.data === 'No Record Found') {
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                confirmlogistics: {
                                    ...prevState.confirmlogistics,
                                    loading: false,
                                    notfound: true,
                                    confirmed: false
                                }
                            }
                        })
                    
                        // created scenario
                    } else {

                        let logisticsFromDB = response.data.Logistics

                        // checks the status of the logistics
                        axios.get(config.backendServer + "getLogisticsStatus", { params: { "cha": props.allUrlParams.confirmlogistics.cha } }).then(function (response, error) {
                            if (response) {

                                // if already approved
                                if (response.data.Status === 'Approved') {
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            confirmlogistics: {
                                                ...prevState.confirmlogistics,
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
                                            confirmlogistics: {
                                                ...logisticsFromDB
                                            }
                                        }
                                    })
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            confirmlogistics: {
                                                ...prevState.confirmlogistics,
                                                loading: false,
                                                notfound: false,
                                                confirmed: false
                                            }
                                        }
                                    })
                                    console.log('URL STATE: ', props.allUrlParams.confirmlogistics)
                                }
                            }
                        })
                            .catch(function (e) {
                                alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                                let additionalParams = '&status=failed&reason=' + e
                                props.redirectExecution("null", additionalParams, 10, 10, "confirmlogistics")
                            })
                    }
                }
            })
                .catch(function (e) {
                    alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                    let additionalParams = '&status=failed&reason=' + e
                    props.redirectExecution("null", additionalParams, 10, 10, "confirmlogistics")
                })
        }
    }, [props.allUrlParams.confirmlogistics.cha])

    return (
        <div className="columns is-centered">
            {logisticsrenderer()}
        </div>
    );
}

export default LogisticsConfirmation;