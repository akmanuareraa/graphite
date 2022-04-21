import React, {useState} from 'react';

import NavBar from '../plasmicComponents/NavBar';
import config from '../../config-frontend';

function Nav(props) {

    return (
        <div className="columns is-centered">
            <NavBar
                navbarbuttons={{
                    verifyid: props.allUiStates.navbar.verifyid,
                    bridge: props.allUiStates.navbar.bridge,
                    verifyidbutton: {onClick: () => {window.location.href = config.domain + "verifyId"}},
                    bridgebutton: {onClick: () => {window.location.href = config.domain + "crosschainbridge"}}
                }}
                walletbar={{
                  address: props.mainState.account,
                  disconnected: props.allUiStates.navbar.walletdisconnect,
                  connected: props.allUiStates.navbar.walletconnect
                }}
            />
        </div>
    );
}

export default Nav;