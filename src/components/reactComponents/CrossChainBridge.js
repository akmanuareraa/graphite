import React, { useEffect } from 'react';

import Crosschainbridge from '../plasmicComponents/Crosschainbridge.jsx'
import IndvTxnElement from '../plasmicComponents/IndvTxnElement.jsx'

function CrossChainBridge(props) {

    // handles the input  field
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
        console.log('tok amount: ',props.mainState.crosschainbridge.tokenamount)
    }

    const dashboardrenderer = () => {
        return (
            <>
                <Crosschainbridge
                    
                    onChange={handleChange}
                    value={props.mainState.crosschainbridge.tokenamount}

                    tokeninput={{
                        bridgeinput: props.allUiStates.crosschainbridge.bridgeinput,
                        returninput: props.allUiStates.crosschainbridge.returninput
                    }}

                    bridgetab={{
                        selected: props.allUiStates.crosschainbridge.bridgeselected,
                        onClick: () => {
                            props.setAllUiStates(prevState => {
                                return{
                                    ...prevState,
                                    crosschainbridge: {
                                        ...prevState.crosschainbridge,
                                        bridgeselected: true,
                                        returnselected: false,
                                        bridgetoken: true,
                                        returntoken: false,
                                        bridgeinput: true,
                                        returninput: false
                                    }
                                }
                            })
                        }
                    }}
                    returntab={{
                        selected: props.allUiStates.crosschainbridge.returnselected,
                        onClick: () => {
                            props.setAllUiStates(prevState => {
                                return{
                                    ...prevState,
                                    crosschainbridge: {
                                        ...prevState.crosschainbridge,
                                        bridgeselected: false,
                                        returnselected: true,
                                        bridgetoken: false,
                                        returntoken: true,
                                        bridgeinput: false,
                                        returninput: true
                                    }
                                }
                            })
                        }
                    }}
                    dashboard={{
                        bridgetoken: props.allUiStates.crosschainbridge.bridgetoken,
                        returntoken: props.allUiStates.crosschainbridge.returntoken
                    }}
                />
            </>
        )
    }

    useEffect(() => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                navbar: {
                    verifyid: false,
                    bridge: true
                }
            }
        })
    },[])

    useEffect(() => {
        console.log('Use Effect called')
        props.setMainState(prevState => {
            return {
                ...prevState,
                crosschainbridge: {
                    ...prevState.crosschainbridge,
                    tokenamount: ''
                }
            }
        })
    },[props.allUiStates.crosschainbridge.bridgeselected])

    return (
        <div className="columns is-centered">
            {dashboardrenderer()}    
        </div>
    );
}

export default CrossChainBridge;