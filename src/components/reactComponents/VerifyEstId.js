import React, { useEffect } from 'react';
import config from '../../config-frontend'
import axios from 'axios';

import VerifyId from '../plasmicComponents/VerifyId.jsx';
import idassetminterabi from '../../ABI/IdAssetMinterABI'

function VerifyEstId(props) {

    // handles the input  field
    const handleChange = e => {
        props.setMainState(prevState => {
            return {
                ...prevState,
                verifyestid: {
                    ...prevState.verifyestid,
                    tokenNo: e.target.value
                }
            }
        })
    }

    // retrieves the ID card from the database after checking with the Smart Contract
    const getIdCard = async (tokenno) => {
        let web3 = props.mainState.web3
        let idAssetMinterAddress = config.idAssetMinterAddress
        let idAssetMinterABI = JSON.parse(idassetminterabi)
        let idAssetMinterContract = new web3.eth.Contract(idAssetMinterABI, idAssetMinterAddress)

        // retireve the document number from the smart contract which will be used for fetching the ID
        let estIdFromContract = await idAssetMinterContract.methods.verifyToken(tokenno.toString()).call({ from: props.mainState.account })
        props.setMainState(prevState => {
            return {
                ...prevState,
                verifyestid: {
                    ...prevState.verifyestid,
                    docno: estIdFromContract
                }
            }
        })
        
        // retrieves the ID
        axios.get(config.backendServer + "getIdCardVerify", {params:{"docno": estIdFromContract.toString()}}).then(function (response, error) {
            if (response) {
                props.setMainState(prevState => {
                    return {
                        ...prevState,
                        verifyestid: {
                            ...prevState.verifyestid,
                            ...response.data.ID
                        }
                    }
                })
                props.setAllUiStates(prevState => {
                    return {
                        ...prevState,
                        verifyestid: {
                            ...prevState.verifyestid,
                            displayId: true,
                            notfound: false
                        }
                    }
                })
            } else {
                console.log("Error: ",error)
            }
        })
        .catch(function (e) {
            props.setAllUiStates(prevState => {
                return {
                    ...prevState,
                    verifyestid: {
                        ...prevState.verifyestid,
                        displayId: false,
                        notfound: true
                    }
                }
            })
        })
    }

    // renders and handles the state of the UI component
    const idrenderer = () => {
        return (
            <VerifyId
                displayId={props.allUiStates.verifyestid.displayId}
                notfound = {props.allUiStates.verifyestid.notfound}
                onChange={handleChange}

                nationality = {props.mainState.verifyestid.nationality}
                name = {props.mainState.verifyestid.name}
                docno = {props.mainState.verifyestid.docno}
                dob = {props.mainState.verifyestid.dob}
                expiry = {props.mainState.verifyestid.expiry}
                issued = {props.mainState.verifyestid.issued}
                sex = {props.mainState.verifyestid.sex}

                verifyidbutton={{
                    onClick: () => {
                        if (props.mainState.verifyestid.tokenNo.length != 0) {
                                getIdCard(props.mainState.verifyestid.tokenNo)
                        } else {
                            alert("Please provide a Token Number")
                        }
                    }
                }}

                verifyagain={{
                    onClick: () => {
                        props.setAllUiStates(prevState => {
                            return {
                                ...prevState,
                                verifyestid: {
                                    ...prevState.verifyestid,
                                    displayId: false,
                                    notfound: false
                                }
                            }
                        })
                    } 
                }}
            />
        )
    }

    // when the component mounts initially, setupMetamask is executed
    useEffect(() => {
        props.setupMetamask("verifyestid");
    }, [])

    return (
        <div className="columns is-centered">
            {idrenderer()}
        </div>
    );

}

export default VerifyEstId;