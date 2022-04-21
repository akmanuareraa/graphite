import React, { useEffect, useState } from 'react';
import config from '../../config-frontend'
import logisticsAssetMinter from '../../ABI/logisticsAssetMinterABI'
import Web3 from 'web3'
import axios from 'axios';

import Logisticsgeneration from '../plasmicComponents/Logisticsgeneration.jsx'
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

function LogisticsGeneration(props) {

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
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "generatelogistics")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])
    let globalCounter = null

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

        logisticsAssetMinterContract.methods.issueAsset(hash, urlParams.customerAddress).send({ from: props.mainState.account })
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
                if (confirmationNumber == 1) {
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

                            let additionalParams = '&hash=' + receipt.transactionHash + '&status=success' + "&link=http://" + config.domain + "/confirmLogistics/logistics?cha=" + props.allUrlParams.generatelogistics.cha
                            props.redirectExecution(urlParams, additionalParams, 5400, 900, "generatelogistics")
                        } else {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + error
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generatelogistics")
                        }
                    })
                        .catch(function (e) {
                            alert("Error encountered in Database.  Redirecting back to portal..")
                            let additionalParams = '&status=failed&reason=' + e
                            props.redirectExecution(urlParams, additionalParams, 10, 10, "generatelogistics")
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
                        generatelogistics: {
                            ...prevState.generatelogistics,
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

    useEffect(() => {
        console.log('creating table..')
        let tempTable = []
        console.log('as', props.allUrlParams.generatelogistics)
        for (let [key, value] of Object.entries(props.allUrlParams.generatelogistics)) {
            let gvar = null
            console.log(`${key}: ${value}`);
            if (key !== 'refId' && key !== 'urlLength' && key !== 'consent' && key !== 'cha') {
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
    }, [props.allUrlParams.generatelogistics])

    const logisticsrenderer = () => {
        return (
            <>
                <Logisticsgeneration

                    displaylogistics={true}

                    dynamictableslot={
                        <>
                            <PlasmicTableHeader
                                titlefield={"CHA"}
                                titlevalue={props.allUrlParams.generatelogistics.cha}
                            />
                            {[...dynamictable]}
                        </>
                    }

                    cha={props.allUrlParams.generatelogistics.cha}
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
        props.urlParser("generatelogistics");
        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                generatelogistics: {
                    ...prevState.generatelogistics,
                    Timestamp: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })
    }, [])

    useEffect(() => {
        if (props.allUrlParams.generatelogistics.cha !== null) {
            axios.get(config.backendServer + "getLogistics", { params: { cha: props.allUrlParams.generatelogistics.cha } }).then(function (response, error) {
                if (response) {
                    alert("Logistics already found. Please check CHA value.  Redirecting you to the portal...")
                    let urlParamsToSend = "";
                    for (const [key, value] of Object.entries(props.allUrlParams.generatelogistics)) {
                        urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                    }
                    window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+logistics'
                }
            })
                .catch(function (e) {
                    if (e.response.status !== 404) {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
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
