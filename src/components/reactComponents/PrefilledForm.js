/* eslint-disable no-native-reassign */
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

import config from '../../config-frontend'

// importing plasmic components
import FormB from '../plasmicComponents/FormB';
import BeFormB from '../plasmicComponents/BeFormB'
import PlasmicTableHeader from '../plasmicComponents/Tableheader'
import PlasmicTableRow from '../plasmicComponents/Tablerow'

// ABI
import gpi from '../../ABI/gpiABI';
import assetMinter from '../../ABI/assetMinterABI'

function PrefilledForm(props) {

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
                    props.redirectExecution(formParams, addParams + edit[5], 5400, 900, "createAsset")
                })
            console.log('result', result)
        } catch (error) {
            console.log(error)
        }
    }

    const [dynamictable, setDynamictable] = useState([])
    let globalCounter = 0

    // function to publish the hash to blockchain and to store the data in mongoDB
    const issueNewId = (formParams) => {
        console.log(formParams)

        let web3 = props.mainState.web3
        let assetMinterAddress = config.idAssetMinterAddress
        let assetMinterABI = JSON.parse(assetMinter)
        let assetMinterContract = new web3.eth.Contract(assetMinterABI, assetMinterAddress)
        //web3.eth.handleRevert = true
        let hash = Web3.utils.keccak256(JSON.stringify(formParams))

        let gpiAddress = config.gpiAddress
        let gpiABI = JSON.parse(gpi)
        let gpiContract = new web3.eth.Contract(gpiABI, gpiAddress)
        //let idCardFee = Web3.utils.toBN(props.allUrlParams.createAsset.totalcharge / 0.12);
        let idCardFee = Web3.utils.toBN(169.44 / 0.12)

        gpiContract.methods.balanceOf(props.mainState.account).call({ from: props.mainState.account }).then(function (response, error) {
            if (response) {
                console.log('bal', response)
                if (parseInt(response) < 1412) {
                    alert("Insufficient Graphite Tokens to sign the transaction")
                    props.setAllUiStates(prevState => {
                        console.log('starting', props.allUiStates.createAsset)
                        return {
                            ...prevState,
                            createAsset: {
                                ...prevState.createAsset,
                                sendtxn: false,
                                connectmm: true
                            }
                        }
                    })
                } else {
                    props.setAllUiStates(prevState => {
                        console.log('starting', props.allUiStates.createAsset)
                        return {
                            ...prevState,
                            createAsset: {
                                ...prevState.createAsset,
                                sendtxn: false,
                                processing: true
                            }
                        }
                    })
                    // publishing to blockchain
                    gpiContract.methods.decimals().call({ from: props.mainState.account }).then(function (response, error) {
                        if (response) {
                            let decimalsBigInt = Web3.utils.toBN(10 ** response);
                            let idCardFeeinGPI = idCardFee.mul(decimalsBigInt);
                            console.log(idCardFeeinGPI.toString(), "idCardFeeinGPI");

                            gpiContract.methods.approve(assetMinterAddress, idCardFeeinGPI).send({ from: props.mainState.account })
                                .on('transactionHash', function (hash) {
                                    console.log(hash)
                                })
                                .on('receipt', function (receipt) {
                                    console.log(receipt)
                                })
                                .on('confirmation', function (confirmationNumber, txnreceipt) {
                                    if (confirmationNumber === 1) {
                                        console.log(confirmationNumber)
                                        console.log(txnreceipt)
                                        try {
                                            assetMinterContract.methods.issueAsset(hash).send({ from: props.mainState.account })
                                                .on('transactionHash', function (hash) {
                                                    console.log(hash)
                                                    props.setMainState(prevState => {
                                                        return {
                                                            ...prevState,
                                                            createAsset: {
                                                                ...prevState.createAsset,
                                                                txnHash: hash
                                                            }
                                                        }
                                                    })
                                                })
                                                .on('receipt', function (receipt) {
                                                    console.log(receipt)
                                                    props.setMainState(prevState => {
                                                        return {
                                                            ...prevState,
                                                            createAsset: {
                                                                ...prevState.createAsset,
                                                                txnReceipt: receipt
                                                            }
                                                        }
                                                    })
                                                })
                                                .on('confirmation', function (confirmationNumber, receipt) {
                                                    if (confirmationNumber === 1) {

                                                        // on successfull transactions, data will be stored in mongoDB
                                                        console.log(confirmationNumber)
                                                        if (receipt.status) {
                                                            console.log("MongoDB: ", formParams)
                                                            axios.post(config.backendServer + 'addNewAsset', formParams).then(function (response, error) {
                                                                if (response) {
                                                                    console.log("DB-NEW ASSET: ", response)

                                                                    // after adding asset data to MonogDB
                                                                    // create a new ID with only the known parameters in a new collection
                                                                    // let body = {
                                                                    //     appNo: formParams.appNo,
                                                                    //     nationality: formParams.nationality,
                                                                    //     name: formParams.fName,
                                                                    //     dob: formParams.dob,
                                                                    //     sex: formParams.sex
                                                                    // }
                                                                    //axios.post(config.backendServer + 'addNewId', formParams).then(function (response, error) {
								    axios.post(config.backendServer + 'addNewId', {appNo: formParams.appNo}).then(function (response, error) {
                                                                        if (response) {
                                                                            console.log("DB-NEW ID: ", response)

                                                                            // once all data processing is done, update the state of transaction to "completed"
                                                                            // show the transaction hash in the UI component
                                                                            props.setAllUiStates(prevState => {
                                                                                return {
                                                                                    ...prevState,
                                                                                    createAsset: {
                                                                                        ...prevState.createAsset,
                                                                                        processing: false,
                                                                                        txnsuccess: true
                                                                                    }
                                                                                }
                                                                            })
                                                                            props.setMainState(prevState => {
                                                                                return {
                                                                                    ...prevState,
                                                                                    createAsset: {
                                                                                        ...prevState.createAsset,
                                                                                        rNo: formParams.rNo,
                                                                                        pDate: formParams.pDate
                                                                                    }
                                                                                }
                                                                            })
                                                                            props.setAllUrlParams(prevState => {
                                                                                return {
                                                                                    ...prevState,
                                                                                    createAsset: {
                                                                                        ...prevState.createAsset,
                                                                                        rNo: props.allUrlParams.createAsset.appNo + new Date().toISOString().slice(0, 10).replaceAll("-", "") + props.allUrlParams.createAsset.refId,
                                                                                        pDate: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                                                                                    }
                                                                                }
                                                                            })

                                                                            console.log('RECP STATUS > ', receipt.status)

                                                                            if (receipt.status) {
                                                                                let additionalParams = 'totalcharge=1412&hash=' + receipt.transactionHash + '&status=success'
                                                                                props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                                                            }
                                                                        } else {

                                                                            // DB error if new id creation has failed
                                                                            console.log("DB-NEW ID: ", response)
                                                                        }
                                                                    })

                                                                        // If any error is encountered during the interaction with database, then
                                                                        // the transaction fails and the user is redirected back to the portal along
                                                                        // with the error message
                                                                        .catch(function (e) {
                                                                            alert(e, "Error encountered in Database.  Redirecting back to portal..")
                                                                            let additionalParams = '&status=failed&reason=' + e.message
                                                                            props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                                                                        })
                                                                } else {
                                                                    // DB error if new asset creation failed
                                                                    console.log("DB-NEW ASSET: ", response)
                                                                }
                                                            })
                                                                .catch(function (e) {
                                                                    alert(e, "Error encountered in Database.  Redirecting back to portal..")
                                                                    let additionalParams = '&status=failed&reason=' + e.message
                                                                    props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                                                                })
                                                        }
                                                    }
                                                })
                                                .on('error', function (error, receipt) {
                                                    console.log("ERROR::", error)
                                                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                                                    console.log(additionalParams)
                                                    try {
                                                        getRevertReason(receipt.transactionHash, additionalParams, formParams)
                                                    } catch (error) {
                                                        console.log('TC ERROR: ', error)
                                                    }
                                                    console.log(receipt)
                                                    props.setAllUiStates(prevState => {
                                                        return {
                                                            ...prevState,
                                                            createAsset: {
                                                                ...prevState.createAsset,
                                                                processing: false,
                                                                txnfailed: true,
                                                                txnsuccess: false
                                                            }
                                                        }
                                                    })
                                                })
                                                .catch(function (e) {
                                                    console.log('METAMASK-ASSET MINT: ', e.data)
                                                    props.setAllUiStates(prevState => {
                                                        return {
                                                            ...prevState,
                                                            createAsset: {
                                                                ...prevState.createAsset,
                                                                processing: false,
                                                                txnfailed: true,
                                                                txnsuccess: false
                                                            }
                                                        }
                                                    })
                                                    let additionalParams = '&status=failed&reason=' + e.message
                                                    props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                                })
                                        } catch (error) {
                                            console.log('TRY CATCH ERROR: ', error)
                                        }
                                    }
                                })
                                .on('error', function (error, receipt) {
                                    console.log("ERROR::", error)
                                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason='
                                    console.log(additionalParams)
                                    try {
                                        getRevertReason(receipt.transactionHash, additionalParams, formParams)
                                    } catch (error) {
                                        console.log('TC ERROR: ', error)
                                    }
                                    props.setAllUiStates(prevState => {
                                        console.log('error', props.allUiStates.createAsset)
                                        return {
                                            ...prevState,
                                            createAsset: {
                                                ...prevState.createAsset,
                                                processing: false,
                                                txnfailed: true,
                                                txnsuccess: false
                                            }
                                        }
                                    })
                                })
                                .catch(function (e) {
                                    console.log('METAMASK-ASSET MINT: ', e.message)
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            createAsset: {
                                                ...prevState.createAsset,
                                                processing: false,
                                                txnfailed: true,
                                                txnsuccess: false
                                            }
                                        }
                                    })
                                    let additionalParams = '&status=failed&reason=' + e.message
                                    props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                })
                        }
                    })
                }
            } else {
                console.log(error)
            }
        })
    }

    // function that will handle the entire form state
    const formRender = () => {
        return (
            <>
                <BeFormB

                    dynamictable={
                        <>
                            <PlasmicTableHeader
                                titlefield={"Application Number"}
                                titlevalue={props.allUrlParams.createAsset.appNo}
                            />
                            {[...dynamictable]}
                        </>
                    }

                    copybutton={{
                        onClick: () => {
                            navigator.clipboard.writeText(props.mainState.createAsset.txnHash)
                        }
                    }}

                    walletmount={{
                        disconnected: props.allUiStates.createAsset.walletStateDis,
                        connected: props.allUiStates.createAsset.walletStateCon,
                        address: props.mainState.createAsset.account
                    }}

                    formbutton={{
                        installmm: props.allUiStates.createAsset.installmm,
                        connectmm: props.allUiStates.createAsset.connectmm,
                        sendtxn: props.allUiStates.createAsset.sendtxn,
                        sendtxnconsent: props.allUiStates.createAsset.sendtxnconsent,
                        processing: props.allUiStates.createAsset.processing,
                        success: props.allUiStates.createAsset.txnsuccess,
                        failed: props.allUiStates.createAsset.txnfailed,
                        hash: props.mainState.createAsset.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (props.allUiStates.createAsset.connectmm) { props.setupMetamask("createAsset").catch((error) => { alert("Please reopen Metamask and connect your wallet") }) }
                                else if (props.allUiStates.createAsset.sendtxn) { issueNewId(props.allUrlParams.createAsset) }
                            }
                        },
                        copybutton: {
                            onClick: () => {
                                navigator.clipboard.writeText(props.mainState.createAsset.txnHash)
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } },
                        timer: props.mainState.createAsset.timer
                    }}

                    applicationtab={{
                        selected: props.allUiStates.createAsset.applicationtab,
                        onClick: () => {
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    createAsset: {
                                        ...prevState.createAsset,
                                        application: true,
                                        applicant: false,
                                        organization: false,
                                        applicanttab: false,
                                        applicationtab: true,
                                        orgtab: false
                                    }
                                }
                            })
                        }
                    }}

                    applicanttab={{
                        selected: props.allUiStates.createAsset.applicanttab,
                        onClick: () => {
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    createAsset: {
                                        ...prevState.createAsset,
                                        application: false,
                                        applicant: true,
                                        organization: false,
                                        applicanttab: true,
                                        applicationtab: false,
                                        orgtab: false
                                    }
                                }
                            })
                        }
                    }}

                    orgtab={{
                        selected: props.allUiStates.createAsset.orgtab,
                        onClick: () => {
                            props.setAllUiStates(prevState => {
                                return {
                                    ...prevState,
                                    createAsset: {
                                        ...prevState.createAsset,
                                        application: false,
                                        applicant: false,
                                        organization: true,
                                        applicanttab: false,
                                        applicationtab: false,
                                        orgtab: true
                                    }
                                }
                            })
                        }
                    }}

                    paramdisplay={{
                        application: props.allUiStates.createAsset.application,
                        applicant: props.allUiStates.createAsset.applicant,
                        organization: props.allUiStates.createAsset.organization,
                        applicationNo: props.allUrlParams.createAsset.appNo,
                        txnNo: props.allUrlParams.createAsset.txnNo,
                        receiptNo: props.mainState.createAsset.rNo,
                        paymentDate: props.mainState.createAsset.pDate,
                        fullName: props.allUrlParams.createAsset.fName,
                        passportNo: props.allUrlParams.createAsset.pNo,
                        fileNo: props.allUrlParams.createAsset.fNo,
                        nationality: props.allUrlParams.createAsset.nationality,
                        accompanied: props.allUrlParams.createAsset.accompanied,
                        orgName: props.allUrlParams.createAsset.oName,
                        orgFileNo: props.allUrlParams.createAsset.ofNo
                    }}

                    transactiondashboard={{
                        appfeeq: "1",//props.allUrlParams.createAsset.appfeeq,
                        iksfeeq: "1", //props.allUrlParams.createAsset.iksfeeq,
                        taxq: "1",//props.allUrlParams.createAsset.taxq,
                        appfeecu: "100",//props.allUrlParams.createAsset.appfeecu,
                        iksfeecu: "50",//props.allUrlParams.createAsset.iksfeecu,
                        taxcu: "19.44",//props.allUrlParams.createAsset.taxcu,
                        appfeect: "100",//props.allUrlParams.createAsset.appfeect,
                        iksfeect: "50",//props.allUrlParams.createAsset.iksfeect,
                        taxct: "19.44",//props.allUrlParams.createAsset.taxct,
                        totalcharge: "169.44", //props.allUrlParams.createAsset.totalcharge,
                        totalgpi: "1412" //(parseFloat(props.allUrlParams.createAsset.totalcharge) / 0.12).toFixed(4)
                    }}

                    consent={{
                        agreed: props.allUiStates.createAsset.tickboxState,
                        tickbox: {
                            onClick: () => {
                                if (!props.allUiStates.createAsset.processing && !props.allUiStates.createAsset.txnsuccess && !props.allUiStates.createAsset.txnfailed) {
                                    if (props.allUiStates.createAsset.tickboxState) {
                                        console.log("1")
                                        props.setAllUrlParams(prevState => {
                                            return {
                                                ...prevState,
                                                createAsset: {
                                                    ...prevState.createAsset,
                                                    consent: false
                                                }
                                            }
                                        })
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("2")
                                                return {
                                                    ...prevState,
                                                    createAsset: {
                                                        ...prevState.createAsset,
                                                        tickboxState: false,
                                                        sendtxnconsent: true,
                                                        sendtxn: false
                                                    }
                                                }
                                            } else {
                                                console.log("6")
                                                return {
                                                    ...prevState,
                                                    createAsset: {
                                                        ...prevState.createAsset,
                                                        tickboxState: false
                                                    }

                                                }
                                            }
                                        })
                                    } else {
                                        console.log("3")
                                        props.setAllUrlParams(prevState => {
                                            return {
                                                ...prevState,
                                                createAsset: {
                                                    ...prevState.createAsset,
                                                    consent: true
                                                }
                                            }
                                        })
                                        props.setAllUiStates(prevState => {
                                            if (props.mainState.account != null) {
                                                console.log("4")
                                                return {
                                                    ...prevState,
                                                    createAsset: {
                                                        ...prevState.createAsset,
                                                        tickboxState: true,
                                                        sendtxnconsent: false,
                                                        sendtxn: true
                                                    }
                                                }
                                            } else {
                                                console.log("5")
                                                return {
                                                    ...prevState,
                                                    createAsset: {
                                                        ...prevState.createAsset,
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

    // useEffect will only run once when the component is mounted for the first time
    // since we didn't pass any dependency. This function
    // will filter the url params, update the urlParams and UI state
    useEffect(() => {
        props.urlParser("createAsset");
    }, [])

    useEffect(() => {
        console.log('creating table...')
        let tempTable = []
        console.log('as', props.allUrlParams.createAsset)
        for (let [key, value] of Object.entries(props.allUrlParams.createAsset)) {
            let gvar = null
            console.log(`${key}: ${value}`);
            if (key !== 'refId' && key !== 'urlLength' && key !== 'consent' && key !== 'appNo') {
                // let row = <tr>
                //     <td><b>{key}</b></td>
                //     <td>{value}</td>
                // </tr>
                if (key === 'rNo') {
                    key = 'Reference Number'
                } else if (key === 'pDate') {
                    key = 'Payment Date'
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
    }, [props.allUrlParams.createAsset])

    // This function executes when Application Number is parsed from the URL and then checks
    // for any duplicate application, if found, throws an error and redirects the user back to
    // the portal along with the error message. If not found, proceeds as usual
    useEffect(() => {
        console.log("backend called")
        console.log('appno', props.allUrlParams.createAsset.appNo)
        if (props.allUrlParams.createAsset.appNo !== undefined && props.allUrlParams.createAsset.appNo !== null && props.allUrlParams.createAsset.appNo !== '') {
            console.log('inside backend with appno', props.allUrlParams.createAsset.appNo)
            //checks if application already exists
            axios.get(config.backendServer + "applicationExists", { params: { appNo: props.allUrlParams.createAsset.appNo } }).then(function (response, error) {
                if (response) {
                    if (response.data) {
                        alert("Application Number already found. Please check Application Number.  Redirecting you to the portal...")
                        let urlParamsToSend = "";
                        for (const [key, value] of Object.entries(props.allUrlParams.createAsset)) {
                            urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
                        }
                        window.location.href = config.redirectUrl + urlParamsToSend + '&status=failed' + '&reason=duplicate+application'

                        // if no duplicate application is found then proceed to get the reference number from the 
                        // previous document
                    } else {
                        axios.get(config.backendServer + "getLastRecord").then(function (response, error) {
                            if (response) {
                                console.log('res', response.data.refId)
                                let referenceId = 1
                                if (response.data.refId !== undefined) { referenceId = parseInt(response.data.refId) + 1 }
                                console.log('refNO', referenceId)
                                // create the receiptNo and payment timestamp
                                props.setAllUrlParams(prevState => {
                                    return {
                                        ...prevState,
                                        createAsset: {
                                            ...prevState.createAsset,
                                            refId: referenceId,
                                            //rNo: props.allUrlParams.createAsset.appNo + new Date().toISOString().slice(0, 10).replaceAll("-", "") + referenceId,
                                            //pDate: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                                        }
                                    }
                                })
                                console.log(props.allUrlParams.createAsset)
                            } else {
                                console.log(error)
                            }
                        })
                            .catch(function (e) {
                                alert(e, "Error encountered in Database. Redirecting back to portal..")
                                let additionalParams = '&status=failed&reason=' + e.message
                                props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                            })
                    }
                } else {
                    console.log(error)
                }
            })
                .catch(function (e) {
                    alert(e, "Error encountered in Database.  Redirecting back to portal..")
                    let additionalParams = '&status=failed&reason=' + e.message
                    props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                })
        }

        // only executes when change is detected in props.allUrlParams.createAsset.appNo   
    }, [props.allUrlParams.createAsset.appNo])

    return (
        <>
            <div className="columns is-centered">
                {formRender()}
            </div>
        </>
    );
}

export default PrefilledForm;
