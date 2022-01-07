import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import sha256 from 'sha256';
import axios from 'axios';

// importing plasmic components
import Form from '../plasmicComponents/Form';
import ButtonA from '../plasmicComponents/ButtonA';
import FormB from '../plasmicComponents/FormB';

// ABI
import gpi from '../../ABI/gpiABI';
import assetMinter from '../../ABI/assetMinterABI'


function PrefilledForm({updateMainState}) {

    // setting the initial state of url params to empty object
    const [urlParams, setUrlParams] = useState(() => {
        return {}
    })

    // setting the initial state of Plasmic UI components to default
    const [uiStates, setUiStates] = useState(() => {
        return {
            walletStateDis: true,
            walletStateCon: false,
            installmm: false,
            connectmm: true,
            sendtxn: false,
            sendtxnconsent: false,
            processing: false,
            txnsuccess: false,
            txnfailed: false,
            tickboxState: false,     
            transaction: "null",      
            application: true,
            applicant: false,
            organization: false,
            applicationtab: true,
            applicanttab: false,
            orgtab: false
        }
    })

    // setting the initial app state with neceassary variables
    const [appState, setAppState] = useState(() => {
        return {
            txnHash: "defaultHash",
            userAccount: null,
            rNo: "---",
            pDate: "---",
            referenceId: null
        }
    })

    const setupMetamask = async () => {

        // check if web3 is injected
        if (typeof window.ethereum !== 'undefined') {
            
            // get the user account
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            //update app state
            setAppState(prevState => {
                return {
                    ...prevState,
                    userAccount: accounts[0]
                }
            })

            updateMainState(accounts[0])

            // Switching current chain to Mumbai Testnet 
            // assuming that the user has already added the Mumbai Testnet chain to Metamask
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }],
                });
                
                setUiStates(prevState => {
                    return {
                        ...prevState,
                        connectmm: false,
                        sendtxnconsent: true,
                        walletStateDis: false,
                        walletStateCon: true
                    }
                })

            } catch (switchError) {
                console.log("Mumbai Testnet not added to Metamask. Attempting to add chain to Metamask...")
                try {
                    
                    // if the user has not added the chain already
                    // add now
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0x13881', rpcUrl: ' https://rpc-mumbai.maticvigil.com/' /* ... */ }],
                    });

                    setUiStates(prevState => {
                        return {
                            ...prevState,
                            connectmm: false,
                            sendtxnconsent: true,
                            walletStateDis: false,
                            walletStateCon: true
                        }
                    })
                } catch (addError) {
                    console.log("Error occured in Adding Mumbai Testnet Network to Metamask")
                }
            }
        } else {
            alert("Please install Metamask to proceed")
        }
    }

    // function to publish the hash to blockchain and to store the data in mongoDB
    const issueNewId = (formParams) => {

        setUiStates(prevState => {
            return {
                ...prevState,
                sendtxn: false,
                processing: true
            }
        })

        let web3 = new Web3(window.ethereum);
        let assetMinterAddress = '0x43Ee17a9D58aDD85ccb59D7d2b73b349e479a5F3'
        let assetMinterABI = JSON.parse(assetMinter)
        let assetMinterContract = new web3.eth.Contract(assetMinterABI, assetMinterAddress)
        let hash = '0x' + sha256(JSON.stringify(formParams))

        let gpiAddress = '0x2f6D1b2e4C9D04CF6377252473F0499657Da715B'
        let gpiABI = JSON.parse(gpi)
        let gpiContract = new web3.eth.Contract(gpiABI, gpiAddress)
        let amountInGpi = "1415"

        // incase if we need later
        //let amountInGpi = Math.ceil(urlParams.totalcharge/0.12).toString()
        
        // publishing to blockchain

        // calling approve method 
        gpiContract.methods.approve( assetMinterAddress, amountInGpi).send({ from: appState.userAccount }).then(function (response, error) {
            if (response) {
                console.log("APPROVE: ", response)

                // minting new asset
                assetMinterContract.methods.issueAsset(hash).send({ from: appState.userAccount }).then(function (response, error) {
                    if (response) {
                        console.log("ISSUE ASSET: ", response)

                        setAppState(prevState => {
                            return {
                                ...prevState,
                                txnHash: response['transactionHash']
                            }
                        })

                        // on successfull transactions, data will be stored in mongoDB
                        console.log("MongoDB: ", urlParams)
                        axios.post('http://localhost:5000/addNewAsset', urlParams).then(function (response, error) {
                            if (response) {
                                console.log("DB-NEW ASSET: ", response)
                                // after adding asset data to MonogDB
                                // create a new ID with only the known parameters in a new collection
                                let dataToSend = { 
                                    estName: urlParams.oName,
                                    pName: urlParams.fName,
                                    appNo: urlParams.appNo
                                }
                                axios.post('http://localhost:5000/addNewId',dataToSend).then(function (response, error) {
                                    if(response){
                                        console.log("DB-NEW ID: ", response)

                                        // once all data processing is done, update the state of transaction to "completed"
                                        // show the transaction hash in the ui component
                                        setUiStates(prevState => {
                                            return {
                                                ...prevState,
                                                processing: false,
                                                txnsuccess: true
                                            }
                                        })
                                        setAppState(prevState => {
                                            return {
                                                ...prevState,
                                                rNo: urlParams.rNo,
                                                pDate: urlParams.pDate
                                            }
                                        })

                                        // wait for 5 seconds and then redirect
                                        // setTimeout(() => {
                                        //     window.location.href = 'https://www.url.com/Products.html?appNo=' + (urlParams.appNo).toString() + '?status=success' + '?hash=' + (appState.txnHash).toString()
                                        // }, 5000)
                                    } else {

                                        // DB error if new id creation has failed
                                        console.log("DB-NEW ID: ", response)
                                    }
                                })
                            } else {
                                // DB error if new asset creation failed
                                console.log("DB-NEW ASSET: ", response)
                            }
                        
                        // using catch here to detect errors thrown by Metamask
                        // using if-else and try-catch does not detect errors thrown by Metamask   
                        }).catch(function (e) {
                            console.log('METAMASK-ASSET MINT: ',e)
                            setUiStates(prevState => {
                                return {
                                    ...prevState,
                                    processing: false,
                                    txnfailed: true
                                }
                            })
                        })
                    } else {
                        console.log("ASSET MINT: ",error)
                        setUiStates(prevState => {
                            return {
                                ...prevState,
                                processing: false,
                                txnfailed: true
                            }
                        })
                        setAppState(prevState => {
                            return {
                                ...prevState,
                                txnHash: appState.txnHash
                            }
                        })
                        setTimeout(() => {
                            window.location.href = 'https://www.url.com/details?appNo=' + (urlParams.appNo).toString + '?status=failed' + '?hash=' + (appState.txnHash).toString
                        }, 4000)
                    }
                }).catch(function (e) {
                    console.log('METAMASK-APPROVE: ',e)
                    setUiStates(prevState => {
                        return {
                            ...prevState,
                            processing: false,
                            txnfailed: true
                        }
                    })
                })
            } else {
                console.log("APPROVE: ",error)
                setUiStates(prevState => {
                    return {
                        ...prevState,
                        processing: false,
                        txnfailed: true
                    }
                })
                setAppState(prevState => {
                    return {
                        ...prevState,
                        txnHash: null
                    }
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
                            navigator.clipboard.writeText(appState.txnHash) 
                        }
                    }}
                    
                    walletmount={{
                        disconnected: uiStates.walletStateDis,
                        connected: uiStates.walletStateCon,
                        address: appState.userAccount
                    }}

                    formbutton={{
                        installmm: uiStates.installmm,
                        connectmm: uiStates.connectmm,
                        sendtxn: uiStates.sendtxn,
                        sendtxnconsent: uiStates.sendtxnconsent,
                        processing: uiStates.processing,
                        success: uiStates.txnsuccess,
                        failed: uiStates.txnfailed,
                        hash: appState.txnHash,
                        mainbutton: {
                            onClick: () => {
                                if (uiStates.connectmm) { setupMetamask() }
                                else if (uiStates.sendtxn) { issueNewId(urlParams) }
                            }
                        },
                        copybutton: {
                            onClick: () => { 
                                navigator.clipboard.writeText(appState.txnHash) 
                            }
                        },
                        installmetamasktext: { onClick: () => { window.open("https://metamask.io/download", '_blank') } }
                    }}

                    applicationtab={{
                        selected: uiStates.applicationtab,
                        onClick: () => {
                            setUiStates(prevState => {
                                return {
                                    ...prevState,
                                    application: true,
                                    applicant: false,
                                    organization: false,
                                    applicanttab: false,
                                    applicationtab: true,
                                    orgtab: false
                                }
                            })
                        }
                    }}

                    applicanttab={{
                        selected: uiStates.applicanttab,
                        onClick: () => {
                            setUiStates(prevState => {
                                return {
                                    ...prevState,
                                    application: false,
                                    applicant: true,
                                    organization: false,
                                    applicanttab: true,
                                    applicationtab: false,
                                    orgtab: false
                                }
                            })
                        }
                    }}

                    orgtab={{
                        selected: uiStates.orgtab,
                        onClick: () => {
                            setUiStates(prevState => {
                                return {
                                    ...prevState,
                                    application: false,
                                    applicant: false,
                                    organization: true,
                                    applicanttab: false,
                                    applicationtab: false,
                                    orgtab: true
                                }
                            })
                        }
                    }}

                    paramdisplay={{
                        application: uiStates.application,
                        applicant: uiStates.applicant,
                        organization: uiStates.organization,
                        applicationNo: urlParams.appNo,
                        txnNo: urlParams.txnNo,
                        receiptNo: appState.rNo,
                        paymentDate: appState.pDate,
                        fullName: urlParams.fName,
                        passportNo: urlParams.pNo,
                        fileNo: urlParams.fNo,
                        nationality: urlParams.nationality,
                        accompanied: urlParams.accompanied,
                        orgName: urlParams.oName,
                        orgFileNo: urlParams.ofNo
                    }}

                    transactiondashboard={{
                        appfeeq: urlParams.appfeeq,
                        iksfeeq: urlParams.iksfeeq,
                        taxq: urlParams.taxq,
                        appfeecu: urlParams.appfeecu,
                        iksfeecu: urlParams.iksfeecu,
                        taxcu: urlParams.taxcu,
                        appfeect: urlParams.appfeect,
                        iksfeect: urlParams.iksfeect,
                        taxct: urlParams.taxct,
                        totalcharge: urlParams.totalcharge,
                        totalgpi: (parseFloat(urlParams.totalcharge) / 0.12).toFixed(4)
                    }}

                    consent={{
                        agreed: uiStates.tickboxState,
                        tickbox: {
                            onClick: () => {
                                if (!uiStates.connectmm && !uiStates.processing && !uiStates.txnsuccess && !uiStates.txnfailed) {
                                    if (uiStates.tickboxState) {
                                        setUrlParams(prevState => {
                                            return {
                                                ...prevState,
                                                consent: false
                                            }
                                        })
                                        setUiStates(prevState => {
                                            return {
                                                ...prevState,
                                                tickboxState: false,
                                                sendtxnconsent: true,
                                                sendtxn: false
                                            }
                                        })
                                    } else {
                                        setUrlParams(prevState => {
                                            return {
                                                ...prevState,
                                                consent: true
                                            }
                                        })
                                        setUiStates(prevState => {
                                            return {
                                                ...prevState,
                                                tickboxState: true,
                                                sendtxnconsent: false,
                                                sendtxn: true
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

    // function that will,
    // * parse params from URL
    // * create a new refID from the last record in the DB
    const urlParser = async _ => {

        axios.post("http://localhost:5000/getLastRecord").then(function (response, error) {
            if (response) {
                
                //refID creation
                setAppState(prevState => {
                    return {
                        ...prevState,
                        referenceId: parseInt(response["data"]["Last Record"][0]["JSdoc"]["refId"]) + 1
                    }
                })

                // url parsing
                var params = {};
                var parser = document.createElement('a');
                parser.href = window.location.href;
                var query = parser.search.substring(1);

                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    params[pair[0]] = decodeURIComponent(pair[1]);
                }

                // updating the state
                setUrlParams(prevState => {
                    return {
                        ...prevState,
                        ...params,
                        refId: parseInt(response["data"]["Last Record"][0]["JSdoc"]["refId"]) + 1,
                        rNo: params.appNo + new Date().toISOString().slice(0, 10).replaceAll("-", "") + appState.referenceId,
                        pDate: new Date().toDateString() + " " + new Date().toLocaleTimeString()
                    }
                })
                console.log(urlParams)
            } else {
                console.log(error)
            }
        })



    }

   

    // useEffect will only run once when the component is mounted for the first time
    // since we didn't pass any dependency. This function
    // will filter the url params and update the urlParams state
    useEffect(() => {
        // uncomment this to automate the process of connecting Metamask without user interaction
        //setupMetamask();

        urlParser();
    }, [])

    return (
        <>
            <div className="columns is-centered">
                {formRender()}
            </div>
        </>
    );
}

export default PrefilledForm;