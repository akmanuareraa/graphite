import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import config from '../../config-frontend'
import axios from 'axios';

import VerifyId from '../plasmicComponents/VerifyId.jsx';

function VerifyEstId(props) {

    const { token } = useParams()

    // renders and handles the state of the UI component
    const idrenderer = () => {
        return (
            <VerifyId
                displayId={props.allUiStates.verifyestid.displayId}
                notfound={props.allUiStates.verifyestid.notfound}

                idimage = {
                    <img src={props.allUrlParams.verifyestid.imgUrl}/>
                }

                idphoto={<img src={props.allUrlParams.verifyestid.imgUrl}/>}
                nationality={props.allUrlParams.verifyestid.nationality}
                name={props.allUrlParams.verifyestid.name}
                docno={props.allUrlParams.verifyestid.docno}
                dob={props.allUrlParams.verifyestid.dob}
                expiry={props.allUrlParams.verifyestid.expiry}
                issued={props.allUrlParams.verifyestid.issued}
                sex={props.allUrlParams.verifyestid.sex}
            />
        )
    }

    // when the component mounts initially, setupMetamask is executed
    useEffect(() => {
        props.setAllUiStates(prevState => {
            return {
                ...prevState,
                navbar: {
                    verifyid: true
                }
            }
        })
        
        props.setAllUrlParams(prevState => {
            return {
                ...prevState,
                verifyestid: {
                    ...prevState.verifyestid,
                    token: token
                }
            }
        })
    }, [])

    useEffect(() => {
        console.log('urlParams', props.allUrlParams.verifyestid)
        // retrieves the ID card from the database 
        if (props.allUrlParams.verifyestid.token != null) {
            axios.get(config.backendServer + "getIdCardVerify", { params: { "token": props.allUrlParams.verifyestid.token } }).then(function (response, error) {
                console.log(response.data)
                if (response) {
                    props.setAllUrlParams(prevState => {
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
                    console.log("Error: ", error)
                }
            })
                .catch(function (e) {
                    if (e.response.status === 404) {
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
                    } else {
                        alert(e.response.status + ":" + e.response.statusText + ".  Redirecting back to portal..")
                    }
                })
        }
        console.log('ui', props.allUiStates.verifyestid)
        
    }, [props.allUrlParams.verifyestid.token])

    return (
        <div className="columns is-centered">
            {idrenderer()}
        </div>
    );

}

export default VerifyEstId;
