import React, {useState} from 'react';

import NavBar from '../plasmicComponents/NavBar';
import config from '../../config-frontend';

function Nav(props) {

    

    return (
        <div className="columns is-centered">
            <NavBar
                navbarbuttons={{
                    newasset: props.allUiStates.navbar.newasset,
                    gensalesorder: props.allUiStates.navbar.gensalesorder,
                    confirmsalesorder: props.allUiStates.navbar.confirmsalesorder,
                    newassetbutton: {onClick: () => {window.location.href = config.domain + "createNewAsset"}},
                    gensalesbutton: {onClick: () => {window.location.href = config.domain + "generateSalesOrder"}},
                    confirmsalesbutton: {onClick: () => {window.location.href = config.domain + "confirmSalesOrder"}}
                }}
                walletbar={{
                  address: props.mainState.account
                }}
            />
        </div>
    );
}

export default Nav;