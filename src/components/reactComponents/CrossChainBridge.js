import React, { useEffect } from 'react';

import Crosschainbridge from '../plasmicComponents/Crosschainbridge.jsx'

//import { MoralisProvider } from "react-moralis";


function CrossChainBridge(props) {

    //Moralis.start({ serverUrl, appId });  // on component mount
    //console.log('Morallis Integ: ',Moralis)
    //Moralis.Web3 = //Put state web3 object obtained from metamask here - On component mount

    // to access the inputfield value: props.mainState.crosschainbridge.tokenamount
    // handles the input field
    const handleChange = e => {
        console.log(e.target.value)
        props.setMainState(prevState => {
            return {
                ...prevState,
                crosschainbridge: {
                    ...prevState.crosschainbridge,
                    tokenamount: e.target.value
                }
            }
        })
    }

    // component that solely manages the UI
    const dashboardrenderer = () => {
        return (
            <>
                <Crosschainbridge

                    onChange={handleChange}

                    switchtab={{
                        deposit: props.allUiStates.crosschainbridge.deposittab,
                        withdraw: props.allUiStates.crosschainbridge.withdrawtab,
                        deposittab: {
                            onClick: () => {
                                console.log('d cl')
                                // on changing tabs, also change the UI states
                                props.setAllUiStates(prevState => {
                                    return {
                                        ...prevState,
                                        crosschainbridge: {
                                            ...prevState.crosschainbridge,
                                            deposittab: true,
                                            withdrawtab: false,
                                            depositdashboard: true,
                                            withdrawdashboard: false,
                                            depositbutton: true,
                                            withdrawbutton: false
                                        }
                                    }
                                })
                            }
                        },
                        withdrawtab: {
                            onClick: () => {
                                console.log('w cl')
                                // on changing tabs, also change the UI states
                                props.setAllUiStates(prevState => {
                                    return {
                                        ...prevState,
                                        crosschainbridge: {
                                            ...prevState.crosschainbridge,
                                            deposittab: false,
                                            withdrawtab: true,
                                            depositdashboard: false,
                                            withdrawdashboard: true,
                                            depositbutton: false,
                                            withdrawbutton: true
                                        }
                                    }
                                })
                            }
                        }
                    }}

                    bridgedashboard={{
                        deposit: props.allUiStates.crosschainbridge.depositdashboard,
                        withdraw: props.allUiStates.crosschainbridge.withdrawdashboard
                    }}

                    transferbutton={{
                        deposit: props.allUiStates.crosschainbridge.depositbutton,
                        withdraw: props.allUiStates.crosschainbridge.withdrawbutton,
                        onClick: () => {
                            // if the current active state of button is withdraw
                            if (props.allUiStates.crosschainbridge.tbuttonwithdraw) {
                                // execute withdraw function
                                //depositToPolygon(props.mainState.crosschainbridge.tokenamount)
                                // if the current active state of button is deposit    
                            } else if (props.allUiStates.crosschainbridge.tbuttondeposit) {
                                // execute deposit function
                                //depositToBSC(props.mainState.crosschainbridge.tokenamount)
                            }
                        }
                    }}
                />
            </>
        )
    }

    useEffect(() => {
        // changing the navbar state
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                navbar: {
                    verifyid: false,
                    bridge: true
                }
            }
        })
    }, [])

    // whenever user changes the tab, reset the tokenamount in the state
    useEffect(() => {
        props.setMainState(prevState => {
            return {
                ...prevState,
                crosschainbridge: {
                    tokenamount: ''
                }
            }
        })
    }, [props.allUiStates.crosschainbridge.depositselected])

    return (
        <div className="columns is-centered">
            {dashboardrenderer()}
        </div>
    );
}

export default CrossChainBridge;