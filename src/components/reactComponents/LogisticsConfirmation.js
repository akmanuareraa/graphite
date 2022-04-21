import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config-frontend'

import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'

import Logisticsconfirmation from '../plasmicComponents/Logisticsconfirmation.jsx';
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function LogisticsConfirmation(props) {

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
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "confirmlogistics")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])
    let globalCounter = null

    // handles the confirmation of logistics
    const confirmLogistics = () => {

        let web3 = props.mainState.web3
        let logisticsAssetMinterAddress = config.logisticsAssetMinterAddress
        let logisticsAssetMinterABI = JSON.parse(logisticsAssetMinter)
        let logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterABI, logisticsAssetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(props.allUrlParams.confirmlogistics))

        if (props.mainState.account.toLowerCase() !== props.allUrlParams.confirmlogistics.customerAddress.toLowerCase()) {
            alert("Incorrect customer address. Transaction can only be signed with the correct address")
            props.setAllUiStates(prevState => {
                console.log('starting', props.allUiStates.confirmlogistics)
                return {
                    ...prevState,
                    confirmlogistics: {
                        ...prevState.confirmlogistics,
                        sendtxnlog: false,
                        connectmm: true
                    }
                }
            })
        } else {
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
                    if (confirmationNumber == 1) {
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
                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                    console.log(additionalParams)
                    try {
                        getRevertReason(receipt.transactionHash, additionalParams, props.allUrlParams.confirmlogistics)
                    } catch (error) {
                        console.log('TC ERROR: ', error)
                    }
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
    }

    useEffect(() => {
        console.log('creating table..')
        let tempTable = []
        console.log('as', props.allUrlParams.confirmlogistics)
        for (let [key, value] of Object.entries(props.allUrlParams.confirmlogistics)) {
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
    }, [props.allUrlParams.confirmlogistics])

    // handles the UI component
    const logisticsrenderer = () => {
        return (
            <>
                <Logisticsconfirmation
                    loading={props.allUiStates.confirmlogistics.loading}
                    notfound={props.allUiStates.confirmlogistics.notfound}
                    confirmed={props.allUiStates.confirmlogistics.confirmed}

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"CHA"}
                                titlevalue={props.allUrlParams.confirmlogistics.cha}
                            />
                            {[...dynamictable]}
                        </>
                    }

                    cha={props.allUrlParams.confirmlogistics.cha}
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
            // checks if the sales order has already been created
            // checks the status of the sales order
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
                                    ...response.data.Logistics
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
                    }
                }
            })
                .catch(function (e) {
                    if (e.response.status === 404) {
                        console.log("here")
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
                    } else {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
                        let additionalParams = '&status=failed&reason=' + e.response.data
                        props.redirectExecution("null", additionalParams, 10, 10, "confirmlogistics")
                    }
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