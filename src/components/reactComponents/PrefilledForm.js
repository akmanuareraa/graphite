/* eslint-disable no-native-reassign */
import React, { useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

import config from '../../config-frontend'

// importing plasmic components
import FormB from '../plasmicComponents/FormB';

// ABI
import gpi from '../../ABI/gpiABI';
import assetMinter from '../../ABI/assetMinterABI'

function PrefilledForm(props) {

    // function to publish the hash to blockchain and to store the data in mongoDB
    const issueNewId = (formParams) => {

        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                createAsset: {
                    ...prevState.createAsset,
                    sendtxn: false,
                    processing: true
                }
            }
        })

        let web3 = props.mainState.web3
        let assetMinterAddress = config.assetMinterAddress
        let assetMinterABI = JSON.parse(assetMinter)
        let assetMinterContract = new web3.eth.Contract(assetMinterABI, assetMinterAddress)
        let hash = Web3.utils.keccak256(JSON.stringify(formParams))

        let gpiAddress = config.gpiAddress
        let gpiABI = JSON.parse(gpi)
        let gpiContract = new web3.eth.Contract(gpiABI, gpiAddress)
        let idCardFee = Web3.utils.toBN(props.allUrlParams.createAsset.totalcharge / 0.12);

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
                    .on('confirmation', function (confirmationNumber, receipt) {
                        if (confirmationNumber === 10) {
                            console.log(confirmationNumber)
                            console.log(receipt)
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
                                    if (confirmationNumber === 10) {

                                        // on successfull transactions, data will be stored in mongoDB
                                        console.log(confirmationNumber)

                                        console.log("MongoDB: ", formParams)
                                        axios.post(config.backendServer + 'addNewAsset', formParams).then(function (response, error) {
                                            if (response) {
                                                console.log("DB-NEW ASSET: ", response)

                                                // after adding asset data to MonogDB
                                                // create a new ID with only the known parameters in a new collection
                                                let body = {
                                                    appNo: formParams.appNo,
                                                    nationality: formParams.nationality,
                                                    name: formParams.fName,
                                                    dob: formParams.dob,
                                                    sex: formParams.sex
                                                }
                                                axios.post(config.backendServer + 'addNewId', body).then(function (response, error) {
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

                                                        let additionalParams = '&hash=' + receipt.transactionHash + '&status=success'
                                                        props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                                    } else {

                                                        // DB error if new id creation has failed
                                                        console.log("DB-NEW ID: ", response)
                                                    }
                                                })

                                                    // If any error is encountered during the interaction with database, then
                                                    // the transaction fails and the user is redirected back to the portal along
                                                    // with the error message
                                                    .catch(function (e) {
                                                        alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                                                        let additionalParams = '&status=failed&reason=' + e.message
                                                        props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                                                    })
                                            } else {
                                                // DB error if new asset creation failed
                                                console.log("DB-NEW ASSET: ", response)
                                            }
                                        })
                                            .catch(function (e) {
                                                alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                                                let additionalParams = '&status=failed&reason=' + e.message
                                                props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                                            })
                                    }
                                })
                                .on('error', function (error, receipt) {
                                    console.log(error)
                                    console.log(receipt)
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            createAsset: {
                                                ...prevState.createAsset,
                                                processing: false,
                                                txnfailed: true
                                            }
                                        }
                                    })

                                    let additionalParams = '&hash=' + receipt.transactionHash + '&status=failed&reason=' + error
                                    props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                })
                                .catch(function (e) {
                                    console.log('METAMASK-ASSET MINT: ', e)
                                    props.setAllUiStates(prevState => {
                                        return {
                                            ...prevState,
                                            createAsset: {
                                                ...prevState.createAsset,
                                                processing: false,
                                                txnfailed: true
                                            }
                                        }
                                    })
                                    let additionalParams = '&status=failed&reason=' + e.message
                                    props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                                })
                        }
                    })
                    .on('error', function (error, receipt) {
                        console.log(error)
                        console.log(receipt)
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                createAsset: {
                                    ...prevState.createAsset,
                                    processing: false,
                                    txnfailed: true
                                }
                            }
                        })

                        let additionalParams = '&status=failed&reason=' + error
                        props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                    })
                    .catch(function (e) {
                        console.log('METAMASK-ASSET MINT: ', e.message)
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                createAsset: {
                                    ...prevState.createAsset,
                                    processing: false,
                                    txnfailed: true
                                }
                            }
                        })
                        let additionalParams = '&status=failed&reason=' + e.message
                        props.redirectExecution(formParams, additionalParams, 5400, 900, "createAsset")
                    })
            }
        })
    }

    // function that will handle the entire form state
    const formRender = () => {
        return (
            <>
                <FormB
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
                        appfeeq: props.allUrlParams.createAsset.appfeeq,
                        iksfeeq: props.allUrlParams.createAsset.iksfeeq,
                        taxq: props.allUrlParams.createAsset.taxq,
                        appfeecu: props.allUrlParams.createAsset.appfeecu,
                        iksfeecu: props.allUrlParams.createAsset.iksfeecu,
                        taxcu: props.allUrlParams.createAsset.taxcu,
                        appfeect: props.allUrlParams.createAsset.appfeect,
                        iksfeect: props.allUrlParams.createAsset.iksfeect,
                        taxct: props.allUrlParams.createAsset.taxct,
                        totalcharge: props.allUrlParams.createAsset.totalcharge,
                        totalgpi: (parseFloat(props.allUrlParams.createAsset.totalcharge) / 0.12).toFixed(4)
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

    // This function executes when Application Number is parsed from the URL and then checks
    // for any duplicate application, if found, throws an error and redirects the user back to
    // the portal along with the error message. If not found, proceeds as usual
    useEffect(() => {
        if (props.allUrlParams.createAsset.appNo > 0) {

            //checks if application already exists
            axios.get(config.backendServer + "applicationExists", { params: { appNo: props.allUrlParams.createAsset.appNo } }).then(function (response, error) {
                if (response) {
                    if (response.data) {
                        alert("Application Number already found. Process cannot be completed. Please contact Administrator. Redirecting you to the portal...")
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
                                let referenceId = parseInt(response.data.refId) + 1

                                // create the receiptNo and payment timestamp
                                props.setAllUrlParams(prevState => {
                                    return {
                                        ...prevState,
                                        createAsset: {
                                            ...prevState.createAsset,
                                            refId: referenceId,
                                            rNo: props.allUrlParams.createAsset.appNo + new Date().toISOString().slice(0, 10).replaceAll("-", "") + referenceId,
                                            pDate: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                                        }
                                    }
                                })
                            } else {
                                console.log(error)
                            }
                        })
                            .catch(function (e) {
                                alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                                let additionalParams = '&status=failed&reason=' + e
                                props.redirectExecution("null", additionalParams, 10, 10, "createAsset")
                            })
                    }
                } else {
                    console.log(error)
                }
            })
                .catch(function (e) {
                    alert(e, "Error encountered in Database. Please contact Administrator. Redirecting back to portal..")
                    let additionalParams = '&status=failed&reason=' + e
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
